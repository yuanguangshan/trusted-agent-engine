import { Proposal, AnomalyReport } from './types';
export declare class AnomalyDetector {
    /**
     * 执行异常检测逻辑
     * 包含：
     * 1. 规模异常 (Size Variance): 如果单个 diff 超过 1000 行，标记为风险。
     * 2. 复杂度异常 (Chaos/Entropy): 如果 diff 中包含大量非 ASCII 字符或混淆模式。
     * 3. 语义走私 (Smuggling): 如果 diff 包含大量看似无关的小改动。
     */
    detect(proposal: Proposal): AnomalyReport;
    private detectObfuscation;
}
