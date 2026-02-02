// src/index.ts

import { PolicyEngine } from './engine/evaluator';
import { loadPolicy } from './engine/policyLoader';
import { Proposal, Decision, ValueManifesto } from './engine/types';
import { ContextBank } from './engine/contextBank';
import { SovereignManager } from './engine/sovereign';
import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

// Re-export core types
export * from './engine/types';
export { PolicyEngine } from './engine/evaluator';
export { loadPolicy } from './engine/policyLoader';
export { SovereignManager } from './engine/sovereign';
export { parseUnifiedDiff } from './engine/diffParser';
export { ContextBank } from './engine/contextBank';
export { AssetManager } from './engine/assetManager';
export { AnomalyDetector } from './engine/anomalyDetector';
export { SelfAuditor } from './engine/selfAudit';

/**
 * TrustedGuard - 高层集成封装
 * 为其他本地项目提供“零配置”快速治理能力
 */
export class TrustedGuard {
  /**
   * 一键决策检查
   * @param workspaceRoot 项目根目录
   * @param proposal 变更提案
   */
  static async evaluate(workspaceRoot: string, proposal: Proposal): Promise<Decision> {
    const policyPath = path.join(workspaceRoot, 'agent.policy.yaml');
    const manifestoPath = path.join(workspaceRoot, 'value_manifesto.yaml');
    const pubKeyPath = path.join(workspaceRoot, '.ai', 'sovereign.pub');

    // 1. 加载主权公钥 (如果存在)
    let publicKey: string | undefined;
    if (fs.existsSync(pubKeyPath)) {
      publicKey = fs.readFileSync(pubKeyPath, 'utf8');
    }

    // 2. 加载政策 (带签名校验)
    const config = loadPolicy(policyPath, { publicKey });

    // 3. 加载价值观 (可选)
    let manifesto: ValueManifesto | undefined;
    if (fs.existsSync(manifestoPath)) {
      manifesto = yaml.parse(fs.readFileSync(manifestoPath, 'utf8'));
    }

    // 4. 执行评估
    const engine = new PolicyEngine(config, manifesto, workspaceRoot);
    const decision = engine.evaluate(proposal);

    // 5. 异步记录审计日志
    const bank = new ContextBank(workspaceRoot);
    bank.record({
      ...decision,
      proposal,
      outcome: decision.allowed ? 'applied' : 'rejected'
    }).catch(err => console.error('[TrustedGuard] Failed to record trace:', err));

    return decision;
  }
}
