"use strict";
// src/engine/liabilityManager.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiabilityManager = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
class LiabilityManager {
    ledgerPath;
    constructor(workspaceRoot) {
        this.ledgerPath = path_1.default.join(workspaceRoot, '.ai', 'credits.json');
        this.ensureStorageExists();
    }
    ensureStorageExists() {
        const dir = path_1.default.dirname(this.ledgerPath);
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        if (!fs_1.default.existsSync(this.ledgerPath)) {
            fs_1.default.writeFileSync(this.ledgerPath, JSON.stringify({ agentCredits: 100 }, null, 2));
        }
    }
    /**
     * 计算决策指纹
     */
    generateSignature(proposal, decision) {
        const data = JSON.stringify({
            p: proposal.id,
            f: proposal.files,
            v: decision.violations?.map(v => v.ruleId),
            a: decision.allowed
        });
        return crypto_1.default.createHash('sha256').update(data).digest('hex').substring(0, 16);
    }
    /**
     * 判定责任实体
     */
    attribute(decision) {
        if (decision.allowed === false) {
            if (decision.actions?.includes('require_human')) {
                return 'human-approver';
            }
            return 'ai-agent';
        }
        // 如果放行了但有警告，可能是策略定义者的边界问题
        if (decision.violations && decision.violations.length > 0) {
            return 'policy-author';
        }
        return 'ai-agent';
    }
    /**
     * 计算信用影响
     */
    calculateCreditImpact(decision) {
        if (decision.allowed)
            return 1; // 成功提案加 1 分
        if (decision.riskLevel === 'high')
            return -10; // 触碰高危被拦截扣 10 分
        return -2; // 普通拦截扣 2 分
    }
    async updateCredits(impact) {
        const data = JSON.parse(fs_1.default.readFileSync(this.ledgerPath, 'utf8'));
        data.agentCredits += impact;
        fs_1.default.writeFileSync(this.ledgerPath, JSON.stringify(data, null, 2));
        return data.agentCredits;
    }
    getCredits() {
        const data = JSON.parse(fs_1.default.readFileSync(this.ledgerPath, 'utf8'));
        return data.agentCredits;
    }
}
exports.LiabilityManager = LiabilityManager;
