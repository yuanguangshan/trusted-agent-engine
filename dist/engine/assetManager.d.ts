import { DecisionTrace, GovernanceAsset } from './types';
export declare class AssetManager {
    /**
     * 将原始追踪转化为治理资产
     * 逻辑：
     * 1. 统计违规高发路径 -> 建议 hardening
     * 2. 统计频繁成功的路径 -> 建议 promotion
     */
    mine(history: DecisionTrace[]): GovernanceAsset[];
    private getDirPattern;
}
