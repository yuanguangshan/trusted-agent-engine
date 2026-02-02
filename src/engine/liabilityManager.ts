// src/engine/liabilityManager.ts

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Proposal, Decision, Accountability } from './types';

export class LiabilityManager {
  private ledgerPath: string;

  constructor(workspaceRoot: string) {
    this.ledgerPath = path.join(workspaceRoot, '.ai', 'credits.json');
    this.ensureStorageExists();
  }

  private ensureStorageExists() {
    const dir = path.dirname(this.ledgerPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(this.ledgerPath)) {
      fs.writeFileSync(this.ledgerPath, JSON.stringify({ agentCredits: 100 }, null, 2));
    }
  }

  /**
   * 计算决策指纹
   */
  generateSignature(proposal: Proposal, decision: Partial<Decision>): string {
    const data = JSON.stringify({
      p: proposal.id,
      f: proposal.files,
      v: decision.violations?.map(v => v.ruleId),
      a: decision.allowed
    });
    return crypto.createHash('sha256').update(data).digest('hex').substring(0, 16);
  }

  /**
   * 判定责任实体
   */
  attribute(decision: Partial<Decision>): 'ai-agent' | 'human-approver' | 'policy-author' | 'system-fault' {
    // 逻辑漏洞检测：如果没有明确违反规则却被拦截了，归类为系统故障或策略设计缺陷
    if (decision.allowed === false && (!decision.violations || decision.violations.length === 0)) {
       // v1.1 Hardening: 如果只是异常检测拦截（没有明确规则），归类为 policy-author（没说怎么处理该信号）
       if (decision.anomalyReport?.isAnomaly) {
         return 'policy-author';
       }
       return 'system-fault';
    }

    if (decision.allowed === false) {
      if (decision.actions?.includes('require_human')) {
        return 'human-approver';
      }
      return 'ai-agent';
    }
    
    // 如果放行了但有警告，可能是策略定义者的边界问题
    if (decision.violations && decision.violations.length > 0) {
      return 'policy-author';
    }
    return 'ai-agent';
  }

  /**
   * 计算信用影响
   */
  calculateCreditImpact(decision: Partial<Decision>): number {
    if (decision.allowed) return 1; // 成功提案加 1 分
    if (decision.riskLevel === 'high') return -10; // 触碰高危被拦截扣 10 分
    return -2; // 普通拦截扣 2 分
  }

  async updateCredits(impact: number): Promise<number> {
    const data = JSON.parse(fs.readFileSync(this.ledgerPath, 'utf8'));
    data.agentCredits += impact;
    fs.writeFileSync(this.ledgerPath, JSON.stringify(data, null, 2));
    return data.agentCredits;
  }

  getCredits(): number {
    const data = JSON.parse(fs.readFileSync(this.ledgerPath, 'utf8'));
    return data.agentCredits;
  }
}
