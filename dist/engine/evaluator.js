"use strict";
// src/engine/evaluator.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyEngine = void 0;
const minimatch_1 = require("minimatch");
const liabilityManager_1 = require("./liabilityManager");
const anomalyDetector_1 = require("./anomalyDetector");
class PolicyEngine {
    policy;
    manifesto;
    liability;
    anomalyDetector;
    constructor(policy, manifesto, workspaceRoot) {
        this.policy = policy;
        this.manifesto = manifesto;
        this.anomalyDetector = new anomalyDetector_1.AnomalyDetector();
        if (workspaceRoot) {
            this.liability = new liabilityManager_1.LiabilityManager(workspaceRoot);
        }
    }
    evaluate(proposal) {
        let violations = [];
        let actions = [];
        // -----------------------------
        // 1. Risk Evaluation（风险优先）
        // -----------------------------
        let riskLevel = 'low';
        for (const risk of this.policy.risks) {
            for (const pattern of risk.match) {
                if (proposal.files.some(file => (0, minimatch_1.minimatch)(file, pattern))) {
                    riskLevel = risk.level;
                }
            }
        }
        // -----------------------------
        // 2. Rule Evaluation（规则引擎）
        // -----------------------------
        for (const rule of this.policy.rules) {
            if (rule.condition) {
                const triggered = this.evaluateExpression(rule.condition, {
                    engine: { riskLevel },
                    payload: proposal,
                });
                if (triggered) {
                    this.applyRuleAction(rule, actions, violations);
                }
            }
            if (rule.check) {
                const passed = this.evaluateExpression(rule.check, {
                    payload: proposal,
                    engine: {
                        isScoped: (files) => this.isWithinScope(files),
                    },
                });
                if (!passed) {
                    this.applyRuleAction(rule, actions, violations);
                }
            }
        }
        // -----------------------------
        // 3. Value & Mercy (Day 16)
        // -----------------------------
        let valueScore = 1.0;
        // ... value logic (skipped for brevity but assuming it stays) ...
        // -----------------------------
        // 3.5 Anomaly Detection (Day 19)
        // -----------------------------
        const anomalyReport = this.anomalyDetector.detect(proposal);
        if (anomalyReport.isAnomaly) {
            actions.push('block');
            violations.push({
                ruleId: 'anomaly-detected',
                description: `Suspicious patterns: ${anomalyReport.reasons.join('; ')}`,
                level: 'block'
            });
        }
        if (this.manifesto) {
            // 计算价值得分
            violations = violations.map(v => {
                const rule = this.policy.rules.find(r => r.id === v.ruleId);
                if (rule?.valueId) {
                    const value = this.manifesto?.values.find(val => val.id === rule.valueId);
                    if (value) {
                        v.valueWeight = value.weight;
                        valueScore -= (value.weight * 0.2); // 简单的惩罚逻辑
                    }
                }
                return v;
            });
            // 仁慈钩子处理
            for (const hook of this.manifesto.mercy_hooks) {
                const triggered = this.evaluateExpression(hook.condition, {
                    payload: proposal,
                    engine: {
                        riskLevel,
                        isOnlyDocs: (files) => files.every(f => f.endsWith('.md') || f.startsWith('docs/')),
                    }
                });
                if (triggered) {
                    if (hook.action === 'downgrade_to_warn') {
                        actions = actions.map(a => (a === 'block' || a === 'require_human') ? 'warn' : a);
                        violations = violations.map(v => ({ ...v, level: 'warn' }));
                    }
                    else if (hook.action === 'auto_allow') {
                        actions = [];
                        violations = [];
                        break;
                    }
                }
            }
        }
        // -----------------------------
        // 4. Final Decision（裁决合成）
        // -----------------------------
        const blocked = actions.includes('block') || actions.includes('require_human');
        const decision = {
            allowed: !blocked,
            riskLevel,
            actions,
            violations,
            valueScore: Math.max(0, valueScore),
            anomalyReport,
            auditLog: '', // Will be set below
        };
        if (this.liability) {
            decision.accountability = {
                responsibleEntity: this.liability.attribute(decision),
                signature: this.liability.generateSignature(proposal, decision),
                creditImpact: this.liability.calculateCreditImpact(decision),
            };
            this.liability.updateCredits(decision.accountability.creditImpact);
        }
        decision.auditLog = this.buildAuditLog(proposal, actions, violations);
        return decision;
    }
    applyRuleAction(rule, actions, violations) {
        actions.push(rule.action);
        const level = (rule.action === 'block' || rule.action === 'require_human') ? 'block' : 'warn';
        violations.push({
            ruleId: rule.id,
            description: rule.description || rule.id,
            level,
        });
    }
    // -----------------------------
    // Scope Enforcement
    // -----------------------------
    isWithinScope(files) {
        const allowedPatterns = this.policy.scopes.flatMap(s => s.allow);
        return files.every(file => allowedPatterns.some(pattern => (0, minimatch_1.minimatch)(file, pattern)));
    }
    // -----------------------------
    // Expression Evaluator
    // -----------------------------
    evaluateExpression(expression, context) {
        try {
            const fn = new Function(...Object.keys(context), `return (${expression});`);
            return Boolean(fn(...Object.values(context)));
        }
        catch (e) {
            return false;
        }
    }
    // -----------------------------
    // Audit Log
    // -----------------------------
    buildAuditLog(proposal, actions, violations) {
        return JSON.stringify({
            proposalId: proposal.id,
            timestamp: proposal.timestamp,
            actions,
            violations,
        }, null, 2);
    }
}
exports.PolicyEngine = PolicyEngine;
