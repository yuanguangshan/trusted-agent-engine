// src/engine/consensus.ts

import { Vote, ConsensusResult, Decision, PolicyAction } from './types';

export class ConsensusEngine {
  /**
   * 达成共识的主要方法
   * 规则 1：一票否决权 (Veto)。如果任何高权重投票者投了 block，整体结果为 blocked。
   * 规则 2：加权平均。计算允许与拒绝的加权分比例。
   */
  resolve(votes: Vote[]): ConsensusResult {
    if (votes.length === 0) {
      throw new Error('No votes provided for consensus');
    }

    const voters = votes.map(v => v.voterId);
    let isVetoed = false;
    let totalWeight = 0;
    let allowedWeight = 0;

    const allViolations: Decision['violations'] = [];
    const allActions: PolicyAction[] = [];
    let maxRiskLevel: Decision['riskLevel'] = 'low';

    for (const vote of votes) {
      const d = vote.decision;
      totalWeight += vote.weight;

      // 汇总风险等级
      if (this.riskToScore(d.riskLevel) > this.riskToScore(maxRiskLevel)) {
        maxRiskLevel = d.riskLevel;
      }

      // 汇总违规和行动
      allViolations.push(...d.violations);
      allActions.push(...d.actions);

      // 一票否决逻辑
      if (!d.allowed && vote.weight >= 0.5) { // 权重超过 0.5 的 Block 视为否决
        isVetoed = true;
      }

      if (d.allowed) {
        allowedWeight += vote.weight;
      }
    }

    const agreementRate = allowedWeight / totalWeight;
    const finalAllowed = !isVetoed && agreementRate > 0.6; // 必须无否决且加权通过率 > 60%

    // 合并后的决策
    const finalDecision: Decision = {
      allowed: finalAllowed,
      riskLevel: maxRiskLevel,
      actions: Array.from(new Set(allActions)),
      violations: this.uniqueViolations(allViolations),
      valueScore: votes.reduce((acc, v) => acc + (v.decision.valueScore || 0) * v.weight, 0) / totalWeight,
      auditLog: `Consensus reached by ${votes.length} voters. Rate: ${agreementRate.toFixed(2)}`
    };

    return {
      finalDecision,
      agreementRate,
      isVetoed,
      voters
    };
  }

  private riskToScore(level: Decision['riskLevel']): number {
    switch (level) {
      case 'high': return 3;
      case 'medium': return 2;
      case 'low': return 1;
      default: return 0;
    }
  }

  private uniqueViolations(violations: Decision['violations']): Decision['violations'] {
    const seen = new Set();
    return violations.filter(v => {
      const key = `${v.ruleId}-${v.level}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
}
