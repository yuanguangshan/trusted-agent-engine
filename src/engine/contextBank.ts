// src/engine/contextBank.ts

import fs from 'fs';
import path from 'path';
import { DecisionTrace } from './types';

export class ContextBank {
  private storagePath: string;

  constructor(workspaceRoot: string) {
    this.storagePath = path.join(workspaceRoot, '.ai', 'ledger.jsonl'); // v1.1: 切换到 JSONL (Append-only)
    this.ensureStorageExists();
  }

  private ensureStorageExists() {
    const dir = path.dirname(this.storagePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(this.storagePath)) {
      fs.writeFileSync(this.storagePath, ''); // 初始为空文件
    }
  }

  /**
   * 记录一次决策追踪 (Append-only)
   */
  async record(trace: DecisionTrace): Promise<void> {
    const logEntry = JSON.stringify(trace) + '\n';
    // v1.1: 直接追加到文件末尾，不再读取全量
    fs.appendFileSync(this.storagePath, logEntry);
  }

  /**
   * 检索历史决策 (Stream Parsing)
   */
  async getHistory(): Promise<DecisionTrace[]> {
    if (!fs.existsSync(this.storagePath)) return [];
    
    const content = fs.readFileSync(this.storagePath, 'utf8');
    const lines = content.trim().split('\n').filter(l => l.length > 0);
    
    // 解析每一行 JSON，并保持最新的在前面
    return lines.map(line => JSON.parse(line)).reverse();
  }

  /**
   * 统计最近的成功率
   */
  async getSuccessRate(): Promise<number> {
    const ledger = await this.getHistory();
    // 只取最近 1000 条
    const recent = ledger.slice(0, 1000);
    if (recent.length === 0) return 1;
    
    const applied = recent.filter(t => t.outcome === 'applied').length;
    return applied / recent.length;
  }
}
