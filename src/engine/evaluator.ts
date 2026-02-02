// src/engine/evaluator.ts

import { Proposal, PolicyConfig, Decision, PolicyAction, ValueManifesto } from './types';
import { minimatch } from 'minimatch';
import { LiabilityManager } from './liabilityManager';
import { AnomalyDetector } from './anomalyDetector';

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
    // 1. Risk Evaluation（风险优先）
    // -----------------------------
    let riskLevel: Decision['riskLevel'] = 'low';

    for (const risk of this.policy.risks) {
      for (const pattern of risk.match) {
        if (proposal.files.some(file => minimatch(file, pattern))) {
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
            isScoped: (files: string[]) => this.isWithinScope(files),
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
            isOnlyDocs: (files: string[]) => files.every(f => f.endsWith('.md') || f.startsWith('docs/')),
          }
        });

        if (triggered) {
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
    const blocked =
      actions.includes('block') || actions.includes('require_human');

    const decision: Decision = {
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

  private applyRuleAction(rule: any, actions: PolicyAction[], violations: Decision['violations']) {
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
  // Expression Evaluator
  // -----------------------------
  private evaluateExpression(
    expression: string,
    context: Record<string, any>
  ): boolean {
    try {
      const fn = new Function(
        ...Object.keys(context),
        `return (${expression});`
      );
      return Boolean(fn(...Object.values(context)));
    } catch (e) {
      return false;
    }
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
