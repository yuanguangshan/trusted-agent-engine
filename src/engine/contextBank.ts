// src/engine/contextBank.ts

import fs from 'fs';
import path from 'path';
import { DecisionTrace } from './types';

export class ContextBank {
  private storagePath: string;

  constructor(workspaceRoot: string) {
    this.storagePath = path.join(workspaceRoot, '.ai', 'ledger.json');
    this.ensureStorageExists();
  }

  private ensureStorageExists() {
    const dir = path.dirname(this.storagePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(this.storagePath)) {
      fs.writeFileSync(this.storagePath, JSON.stringify([], null, 2));
    }
  }

  /**
   * 记录一次决策追踪
   */
  async record(trace: DecisionTrace): Promise<void> {
    const data = fs.readFileSync(this.storagePath, 'utf8');
    const ledger: DecisionTrace[] = JSON.parse(data);
    
    // 保持轻量，只存最近 1000 条记录
    ledger.unshift(trace);
    if (ledger.length > 1000) {
      ledger.pop();
    }

    fs.writeFileSync(this.storagePath, JSON.stringify(ledger, null, 2));
  }

  /**
   * 检索历史决策（用于未来的 Skill 晋升和 Context 注入）
   */
  async getHistory(): Promise<DecisionTrace[]> {
    const data = fs.readFileSync(this.storagePath, 'utf8');
    return JSON.parse(data);
  }

  /**
   * 统计最近的成功率
   */
  async getSuccessRate(): Promise<number> {
    const ledger = await this.getHistory();
    if (ledger.length === 0) return 1;
    
    const applied = ledger.filter(t => t.outcome === 'applied').length;
    return applied / ledger.length;
  }
}
