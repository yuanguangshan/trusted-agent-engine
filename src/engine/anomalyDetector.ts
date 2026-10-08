// src/engine/anomalyDetector.ts

import { Proposal, AnomalyReport } from './types';

export class AnomalyDetector {
  /**
   * 执行异常检测逻辑
   * 包含：
   * 1. 规模异常 (Size Variance): 如果单个 diff 超过 1000 行，标记为风险。
   * 2. 复杂度异常 (Chaos/Entropy): 如果 diff 中包含大量非 ASCII 字符或混淆模式。
   * 3. 语义走私 (Smuggling): 如果 diff 包含大量看似无关的小改动。
   */
  detect(proposal: Proposal): AnomalyReport {
    const reasons: string[] = [];
    let score = 0;

    // 1. 规模检测
    const lines = proposal.diff.split('\n').length;
    if (lines > 500) {
      score += 0.4;
      reasons.push(`Unusually large diff (${lines} lines). Potential smuggling.`);
    }

    // 2. 熵分析 (简单混淆检测)
    if (this.detectObfuscation(proposal.diff)) {
      score += 0.6;
      reasons.push('Possible code obfuscation or binary smuggling detected.');
    }

    // 3. 文件分散度
    if (proposal.files.length > 10) {
      score += 0.3;
      reasons.push(`Too many files touched (${proposal.files.length}). High collateral risk.`);
    }

    return {
      isAnomaly: score >= 0.7,
      score: Math.min(1, score),
      reasons
    };
  }

  private detectObfuscation(diff: string): boolean {
    // 检查是否包含大量十六进制或 Base64 样式的长字符串
    const hexPattern = /[0-9a-fA-F]{50,}/;
    const base64Pattern = /[A-Za-z0-9+/]{100,}={0,2}/;
    
    if (hexPattern.test(diff) || base64Pattern.test(diff)) {
      return true;
    }

    // 只检查真正的不可见/控制字符（零宽、Bidi 覆写、控制码）。
    // 不要用"非 ASCII"当混淆信号 —— 中文/日文注释是正常内容，
    // 本项目通篇中文，用 non-ASCII 会把合法改动误判成"二进制走私"。
    const invisible = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u00AD\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u2069\uFEFF]/g;
    const matches = diff.match(invisible);
    if (matches && matches.length > 20) {
      return true;
    }

    return false;
  }
}
