// src/engine/safeEvaluator.ts

import jsonLogic from 'json-logic-js';

/**
 * v1.1 Safe Evaluator
 * 彻底移除 new Function，改用 JSON Logic。
 * 它可以防止 RCE 攻击，并且可以被静态审计。
 */
export class PolicyEvaluationError extends Error {
  constructor(public expression: unknown, message: string) {
    super(message);
    this.name = 'PolicyEvaluationError';
  }
}

export class SafeEvaluator {
  /**
   * 执行表达式评估。
   *
   * Fail-closed 原则：任何求值问题都抛 PolicyEvaluationError，
   * 由上层转成 block 违规，而不是静默返回 false ——
   * 因为对 condition 规则来说 false 意味着"不触发动作"，那是 fail-open。
   *
   * @param expression JSON Logic 规则对象
   * @param context 数据上下文
   */
  static evaluate(expression: any, context: Record<string, any>): boolean {
    if (typeof expression === 'string') {
      // v1.1 Hardening: 彻底禁用字符串表达式，消除 RCE 后门
      throw new PolicyEvaluationError(expression,
        `[Governance Critical] String-based policy conditions are disabled in v1.1 for security. ` +
        `Detected unsafe condition: "${expression}". Please migrate to JSON Logic.`);
    }

    try {
      return Boolean(jsonLogic.apply(expression, context));
    } catch (e) {
      throw new PolicyEvaluationError(expression,
        `[Governance Critical] Rule evaluation failed (fail-closed): ${(e as Error).message}`);
    }
  }
}
