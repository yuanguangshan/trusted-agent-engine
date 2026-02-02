import { Vote, ConsensusResult } from './types';
export declare class ConsensusEngine {
    /**
     * 达成共识的主要方法
     * 规则 1：一票否决权 (Veto)。如果任何高权重投票者投了 block，整体结果为 blocked。
     * 规则 2：加权平均。计算允许与拒绝的加权分比例。
     */
    resolve(votes: Vote[]): ConsensusResult;
    private riskToScore;
    private uniqueViolations;
}
