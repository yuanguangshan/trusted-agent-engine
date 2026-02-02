import { Proposal, PolicyConfig, Decision, ValueManifesto } from './types';
export declare class PolicyEngine {
    private policy;
    private manifesto?;
    private liability?;
    private anomalyDetector;
    constructor(policy: PolicyConfig, manifesto?: ValueManifesto, workspaceRoot?: string);
    evaluate(proposal: Proposal): Decision;
    private applyRuleAction;
    private isWithinScope;
    private evaluateExpression;
    private buildAuditLog;
}
