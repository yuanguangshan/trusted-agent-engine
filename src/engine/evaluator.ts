// src/engine/evaluator.ts

import { Proposal, PolicyConfig, Decision, PolicyAction, ValueManifesto } from './types';
import { minimatch } from 'minimatch';
import { LiabilityManager } from './liabilityManager';
import { AnomalyDetector } from './anomalyDetector';
import { SafeEvaluator } from './safeEvaluator';

export class PolicyEngine {
  private policy: PolicyConfig;
  private manifesto?: ValueManifesto;
  private liability?: LiabilityManager;
  private anomalyDetector: AnomalyDetector;

  constructor(policy: PolicyConfig, manifesto?: ValueManifesto, workspaceRoot?: string) {
    this.policy = policy;
    this.manifesto = manifesto;
    this.anomalyDetector = new AnomalyDetector();
    if (workspaceRoot) {
      this.liability = new LiabilityManager(workspaceRoot);
    }
  }

  evaluate(proposal: Proposal): Decision {
    let violations: Decision['violations'] = [];
    let actions: PolicyAction[] = [];

    // -----------------------------
    // 1. Signals Preparation（信号准备）
    // -----------------------------
    let riskLevel: Decision['riskLevel'] = 'low';
    for (const risk of this.policy.risks) {
      for (const pattern of risk.match) {
        if (proposal.files.some(file => minimatch(file, pattern))) {
          riskLevel = risk.level;
        }
      }
    }

    const anomalyReport = this.anomalyDetector.detect(proposal);
    const evaluationContext = {
      payload: proposal,
      engine: {
        riskLevel,
        isAnomaly: anomalyReport.isAnomaly,
        anomalyScore: anomalyReport.score,
        isOnlyDocs: proposal.files.every(f => f.endsWith('.md') || f.startsWith('docs/')),
        isScoped: this.isWithinScope(proposal.files),
      },
      anomaly: anomalyReport // v1.1: 别名为 anomaly 方便访问
    };

    // -----------------------------
    // 2. Rule Evaluation（规则引擎 - 基于信号）
    // -----------------------------
    for (const rule of this.policy.rules) {
      // condition: 如果满足，则执行 action
      if (rule.condition) {
        if (SafeEvaluator.evaluate(rule.condition, evaluationContext)) {
          this.applyRuleAction(rule, actions, violations);
        }
      }

      // check: 如果不满足，则执行 action
      if (rule.check) {
        if (!SafeEvaluator.evaluate(rule.check, evaluationContext)) {
          this.applyRuleAction(rule, actions, violations);
        }
      }
    }

    // -----------------------------
    // 3. Value & Mercy (Day 16)
    // -----------------------------
    let valueScore = 1.0;
    if (this.manifesto) {
      // 计算价值得分（根据规则绑定的价值）
      violations = violations.map(v => {
        const rule = this.policy.rules.find(r => r.id === v.ruleId);
        if (rule?.valueId) {
          const value = this.manifesto?.values.find(val => val.id === rule.valueId);
          if (value) {
            v.valueWeight = value.weight;
            valueScore -= (value.weight * 0.2);
          }
        }
        return v;
      });

      // 仁慈钩子处理（依然使用 SafeEvaluator）
      for (const hook of this.manifesto.mercy_hooks) {
        if (SafeEvaluator.evaluate(hook.condition, evaluationContext)) {
          if (hook.action === 'downgrade_to_warn') {
            actions = actions.map(a => (a === 'block' || a === 'require_human') ? 'warn' : a as PolicyAction);
            violations = violations.map(v => ({ ...v, level: 'warn' }));
          } else if (hook.action === 'auto_allow') {
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

    const decision: Decision = {
      allowed: !blocked,
      riskLevel,
      actions,
      violations,
      valueScore: Math.max(0, valueScore),
      anomalyReport,
      auditLog: '',
    };

    if (this.liability) {
      decision.accountability = {
        responsibleEntity: this.liability.attribute(decision),
        signature: this.liability.generateSignature(proposal, decision),
        creditImpact: this.liability.calculateCreditImpact(decision),
      };
      // v1.1: 只有非系统故障才更新信用
      if (decision.accountability.responsibleEntity !== 'system-fault') {
        this.liability.updateCredits(decision.accountability.creditImpact);
      }
    }

    decision.auditLog = this.buildAuditLog(proposal, actions, violations);

    // v1.1 Hardening: 共识引擎接入点 - 诚实模式 (Fail-fast)
    if (this.policy.requiresConsensus) {
      throw new Error(
        'Policy requires consensus, but consensus enforcement (ConsensusEngine) is not yet active in v1.1. ' +
        'Please disable requiresConsensus in policy or implement real consensus flow.'
      );
    }

    return decision;
  }

  private applyRuleAction(rule: any, actions: PolicyAction[], violations: Decision['violations']) {
    const HIGH_RISK_ACTIONS = ['block', 'require_human'];

    // v1.1 Hardening: 强制检查 Policy 是否拥有执行高危动作的特权
    if (
      HIGH_RISK_ACTIONS.includes(rule.action) &&
      !this.policy.meta?.privileges?.includes('high-risk-decision')
    ) {
      violations.push({
        ruleId: 'privilege-violation',
        description: `Policy rule "${rule.id}" lacks privilege for action: ${rule.action}. Meta privileges must include "high-risk-decision".`,
        level: 'block'
      });
      actions.push('block'); // 权限不足时强制拦截
      return;
    }

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
  private isWithinScope(files: string[]): boolean {
    const allowedPatterns = this.policy.scopes.flatMap(s => s.allow);

    return files.every(file =>
      allowedPatterns.some(pattern => minimatch(file, pattern))
    );
  }


  // -----------------------------
  // Audit Log
  // -----------------------------
  private buildAuditLog(
    proposal: Proposal,
    actions: PolicyAction[],
    violations: Decision['violations']
  ): string {
    return JSON.stringify(
      {
        proposalId: proposal.id,
        timestamp: proposal.timestamp,
        actions,
        violations,
      },
      null,
      2
    );
  }
}
