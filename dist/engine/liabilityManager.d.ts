import { Proposal, Decision } from './types';
export declare class LiabilityManager {
    private ledgerPath;
    constructor(workspaceRoot: string);
    private ensureStorageExists;
    /**
     * 计算决策指纹
     */
    generateSignature(proposal: Proposal, decision: Partial<Decision>): string;
    /**
     * 判定责任实体
     */
    attribute(decision: Partial<Decision>): 'ai-agent' | 'human-approver' | 'policy-author';
    /**
     * 计算信用影响
     */
    calculateCreditImpact(decision: Partial<Decision>): number;
    updateCredits(impact: number): Promise<number>;
    getCredits(): number;
}
