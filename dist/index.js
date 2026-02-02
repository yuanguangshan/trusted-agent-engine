"use strict";
// src/index.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrustedGuard = exports.SelfAuditor = exports.AnomalyDetector = exports.AssetManager = exports.ContextBank = exports.parseUnifiedDiff = exports.SovereignManager = exports.loadPolicy = exports.PolicyEngine = void 0;
const evaluator_1 = require("./engine/evaluator");
const policyLoader_1 = require("./engine/policyLoader");
const contextBank_1 = require("./engine/contextBank");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const yaml_1 = __importDefault(require("yaml"));
// Re-export core types
__exportStar(require("./engine/types"), exports);
var evaluator_2 = require("./engine/evaluator");
Object.defineProperty(exports, "PolicyEngine", { enumerable: true, get: function () { return evaluator_2.PolicyEngine; } });
var policyLoader_2 = require("./engine/policyLoader");
Object.defineProperty(exports, "loadPolicy", { enumerable: true, get: function () { return policyLoader_2.loadPolicy; } });
var sovereign_1 = require("./engine/sovereign");
Object.defineProperty(exports, "SovereignManager", { enumerable: true, get: function () { return sovereign_1.SovereignManager; } });
var diffParser_1 = require("./engine/diffParser");
Object.defineProperty(exports, "parseUnifiedDiff", { enumerable: true, get: function () { return diffParser_1.parseUnifiedDiff; } });
var contextBank_2 = require("./engine/contextBank");
Object.defineProperty(exports, "ContextBank", { enumerable: true, get: function () { return contextBank_2.ContextBank; } });
var assetManager_1 = require("./engine/assetManager");
Object.defineProperty(exports, "AssetManager", { enumerable: true, get: function () { return assetManager_1.AssetManager; } });
var anomalyDetector_1 = require("./engine/anomalyDetector");
Object.defineProperty(exports, "AnomalyDetector", { enumerable: true, get: function () { return anomalyDetector_1.AnomalyDetector; } });
var selfAudit_1 = require("./engine/selfAudit");
Object.defineProperty(exports, "SelfAuditor", { enumerable: true, get: function () { return selfAudit_1.SelfAuditor; } });
/**
 * TrustedGuard - 高层集成封装
 * 为其他本地项目提供“零配置”快速治理能力
 */
class TrustedGuard {
    /**
     * 一键决策检查
     * @param workspaceRoot 项目根目录
     * @param proposal 变更提案
     */
    static async evaluate(workspaceRoot, proposal) {
        const policyPath = path_1.default.join(workspaceRoot, 'agent.policy.yaml');
        const manifestoPath = path_1.default.join(workspaceRoot, 'value_manifesto.yaml');
        const pubKeyPath = path_1.default.join(workspaceRoot, '.ai', 'sovereign.pub');
        // 1. 加载主权公钥 (如果存在)
        let publicKey;
        if (fs_1.default.existsSync(pubKeyPath)) {
            publicKey = fs_1.default.readFileSync(pubKeyPath, 'utf8');
        }
        // 2. 加载政策 (带签名校验)
        const config = (0, policyLoader_1.loadPolicy)(policyPath, { publicKey });
        // 3. 加载价值观 (可选)
        let manifesto;
        if (fs_1.default.existsSync(manifestoPath)) {
            manifesto = yaml_1.default.parse(fs_1.default.readFileSync(manifestoPath, 'utf8'));
        }
        // 4. 执行评估
        const engine = new evaluator_1.PolicyEngine(config, manifesto, workspaceRoot);
        const decision = engine.evaluate(proposal);
        // 5. 异步记录审计日志
        const bank = new contextBank_1.ContextBank(workspaceRoot);
        bank.record({
            ...decision,
            proposal,
            outcome: decision.allowed ? 'applied' : 'rejected'
        }).catch(err => console.error('[TrustedGuard] Failed to record trace:', err));
        return decision;
    }
}
exports.TrustedGuard = TrustedGuard;
