"use strict";
// src/engine/selfAudit.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfAuditor = void 0;
class SelfAuditor {
    /**
     * 执行治理自审
     * 目标：检测长期运行中的隐性风险
     */
    audit(history) {
        const findings = [];
        let healthScore = 100;
        if (history.length < 5) {
            return { timestamp: Date.now(), healthScore, findings };
        }
        // 1. 成功率飘移检测 (Policy Drift)
        const recent = history.slice(0, 10);
        const older = history.slice(10, 30);
        if (older.length > 5) {
            const recentRate = recent.filter(t => t.allowed).length / recent.length;
            const olderRate = older.filter(t => t.allowed).length / older.length;
            if (Math.abs(recentRate - olderRate) > 0.4) {
                healthScore -= 20;
                findings.push({
                    severity: 'medium',
                    type: 'policy-drift',
                    message: `Decision pattern alignment shifted significantly: ${recentRate.toFixed(2)} vs ${olderRate.toFixed(2)}`
                });
            }
        }
        // 2. 权限蔓延检测 (Permission Creep)
        const touchedDirs = new Set();
        history.forEach(t => t.proposal.files.forEach(f => touchedDirs.add(this.getTopDir(f))));
        if (touchedDirs.size > 15) {
            healthScore -= 15;
            findings.push({
                severity: 'low',
                type: 'permission-creep',
                message: `Agent is interacting with a wide variety of directories (${touchedDirs.size}). Review scope boundaries.`
            });
        }
        // 3. 高风险累积 (Risk Accumulation)
        const highRiskCount = history.filter(t => t.riskLevel === 'high').length;
        if (highRiskCount / history.length > 0.3) {
            healthScore -= 30;
            findings.push({
                severity: 'high',
                type: 'risk-accumulation',
                message: `High percentage of high-risk operations (${(highRiskCount / history.length * 100).toFixed(1)}%). System is under strain.`
            });
        }
        return {
            timestamp: Date.now(),
            healthScore: Math.max(0, healthScore),
            findings
        };
    }
    getTopDir(filePath) {
        return filePath.split('/')[0] || '.';
    }
}
exports.SelfAuditor = SelfAuditor;
