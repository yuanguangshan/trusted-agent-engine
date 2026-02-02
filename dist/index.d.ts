import { Proposal, Decision } from './engine/types';
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
export declare class TrustedGuard {
    /**
     * 一键决策检查
     * @param workspaceRoot 项目根目录
     * @param proposal 变更提案
     */
    static evaluate(workspaceRoot: string, proposal: Proposal): Promise<Decision>;
}
