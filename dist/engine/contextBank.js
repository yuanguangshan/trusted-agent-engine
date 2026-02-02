"use strict";
// src/engine/contextBank.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextBank = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class ContextBank {
    storagePath;
    constructor(workspaceRoot) {
        this.storagePath = path_1.default.join(workspaceRoot, '.ai', 'ledger.json');
        this.ensureStorageExists();
    }
    ensureStorageExists() {
        const dir = path_1.default.dirname(this.storagePath);
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        if (!fs_1.default.existsSync(this.storagePath)) {
            fs_1.default.writeFileSync(this.storagePath, JSON.stringify([], null, 2));
        }
    }
    /**
     * 记录一次决策追踪
     */
    async record(trace) {
        const data = fs_1.default.readFileSync(this.storagePath, 'utf8');
        const ledger = JSON.parse(data);
        // 保持轻量，只存最近 1000 条记录
        ledger.unshift(trace);
        if (ledger.length > 1000) {
            ledger.pop();
        }
        fs_1.default.writeFileSync(this.storagePath, JSON.stringify(ledger, null, 2));
    }
    /**
     * 检索历史决策（用于未来的 Skill 晋升和 Context 注入）
     */
    async getHistory() {
        const data = fs_1.default.readFileSync(this.storagePath, 'utf8');
        return JSON.parse(data);
    }
    /**
     * 统计最近的成功率
     */
    async getSuccessRate() {
        const ledger = await this.getHistory();
        if (ledger.length === 0)
            return 1;
        const applied = ledger.filter(t => t.outcome === 'applied').length;
        return applied / ledger.length;
    }
}
exports.ContextBank = ContextBank;
