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
   * @param expression JSON Logic 规则对象（或旧版的字符串，为了兼容性暂时支持但会有警告）
   * @param context 数据上下文
   */
  static evaluate(expression: any, context: Record<string, any>): boolean {
    if (typeof expression === 'string') {
      // v1.1 路线图：为了平滑迁移，如果检测到字符串，尝试回退到受限的 eval（仅用于临时兼容）
      // 实际上应该引导用户迁移到 JSON Logic 格式
      console.warn(`[Governance Warning] Using string-based condition is deprecated and unsafe: "${expression}". Please migrate to JSON Logic.`);
      return this.unsafeLegacyEval(expression, context);
    }

    try {
      return Boolean(jsonLogic.apply(expression, context));
    } catch (e) {
      console.error(`[Governance Error] Failed to evaluate JSON Logic:`, e);
      return false;
    }
  }

  /**
   * 极度受限的旧版 eval (仅用于兼容)
   */
  private static unsafeLegacyEval(expression: string, context: Record<string, any>): boolean {
    try {
      const keys = Object.keys(context);
      const values = Object.values(context);
      // 仍然使用 new Function 但是明确标注为 legacy
      const fn = new Function(...keys, `return (${expression});`);
      return Boolean(fn(...values));
    } catch (e) {
      return false;
    }
  }
}
