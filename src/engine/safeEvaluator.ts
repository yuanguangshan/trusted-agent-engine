// src/engine/safeEvaluator.ts

import jsonLogic from 'json-logic-js';

/**
 * v1.1 Safe Evaluator
 * 彻底移除 new Function，改用 JSON Logic。
 * 它可以防止 RCE 攻击，并且可以被静态审计。
 */
export class SafeEvaluator {
  /**
   * 执行表达式评估
   * @param expression JSON Logic 规则对象
   * @param context 数据上下文
   */
  static evaluate(expression: any, context: Record<string, any>): boolean {
    if (typeof expression === 'string') {
      // v1.1 Hardening: 彻底禁用字符串表达式，消除 RCE 后门
      throw new Error(
        `[Governance Critical] String-based policy conditions are disabled in v1.1 for security. ` +
        `Detected unsafe condition: "${expression}". Please migrate to JSON Logic.`
      );
    }

    try {
      return Boolean(jsonLogic.apply(expression, context));
    } catch (e) {
      console.error(`[Governance Error] Failed to evaluate JSON Logic:`, e);
      return false;
    }
  }
}
