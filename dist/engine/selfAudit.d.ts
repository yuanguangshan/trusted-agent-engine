import { DecisionTrace, SelfAuditReport } from './types';
export declare class SelfAuditor {
    /**
     * 执行治理自审
     * 目标：检测长期运行中的隐性风险
     */
    audit(history: DecisionTrace[]): SelfAuditReport;
    private getTopDir;
}
