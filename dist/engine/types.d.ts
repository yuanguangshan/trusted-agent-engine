export interface Proposal {
    id: string;
    timestamp: number;
    author: 'ai-agent';
    reasoning: string;
    files: string[];
    diff: string;
    tags?: string[];
}
export interface PolicyConfig {
    meta: {
        mode: 'strict' | 'monitor';
    };
    scopes: Array<{
        id: string;
        allow: string[];
    }>;
    risks: Array<{
        id: string;
        level: 'low' | 'medium' | 'high';
        match: string[];
    }>;
    rules: Array<{
        id: string;
        check?: string;
        condition?: string;
        action: PolicyAction;
        description: string;
        valueId?: string;
    }>;
}
export interface ValueManifesto {
    values: Array<{
        id: string;
        weight: number;
        description: string;
    }>;
    mercy_hooks: Array<{
        id: string;
        condition: string;
        action: string;
        description: string;
    }>;
}
export interface Accountability {
    responsibleEntity: 'ai-agent' | 'human-approver' | 'policy-author';
    signature: string;
    creditImpact: number;
}
export interface Vote {
    voterId: string;
    decision: Decision;
    weight: number;
}
export interface ConsensusResult {
    finalDecision: Decision;
    agreementRate: number;
    isVetoed: boolean;
    voters: string[];
}
export interface AnomalyReport {
    isAnomaly: boolean;
    score: number;
    reasons: string[];
}
export interface GovernanceAsset {
    id: string;
    type: 'frequent-violation' | 'trusted-pattern';
    description: string;
    evidenceCount: number;
    suggestedAction?: 'promote-to-scope' | 'harden-rule';
    pattern: string;
}
export interface SelfAuditReport {
    timestamp: number;
    healthScore: number;
    findings: Array<{
        severity: 'low' | 'medium' | 'high';
        type: 'policy-drift' | 'permission-creep' | 'risk-accumulation';
        message: string;
    }>;
}
export type PolicyAction = 'allow' | 'warn' | 'block' | 'require_human';
export interface Decision {
    allowed: boolean;
    riskLevel: 'low' | 'medium' | 'high';
    actions: PolicyAction[];
    violations: Array<{
        ruleId: string;
        description: string;
        level: 'warn' | 'block';
        valueWeight?: number;
    }>;
    valueScore?: number;
    accountability?: Accountability;
    anomalyReport?: AnomalyReport;
    auditLog: string;
}
export interface DecisionTrace extends Decision {
    proposal: Proposal;
    outcome: 'applied' | 'rejected' | 'pending';
}
