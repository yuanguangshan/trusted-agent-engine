import { DecisionTrace } from './types';
export declare class ContextBank {
    private storagePath;
    constructor(workspaceRoot: string);
    private ensureStorageExists;
    /**
     * 记录一次决策追踪
     */
    record(trace: DecisionTrace): Promise<void>;
    /**
     * 检索历史决策（用于未来的 Skill 晋升和 Context 注入）
     */
    getHistory(): Promise<DecisionTrace[]>;
    /**
     * 统计最近的成功率
     */
    getSuccessRate(): Promise<number>;
}
