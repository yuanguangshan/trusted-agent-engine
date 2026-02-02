// src/engine/assetManager.ts

import { DecisionTrace, GovernanceAsset } from './types';

export class AssetManager {
  /**
   * 将原始追踪转化为治理资产
   * 逻辑：
   * 1. 统计违规高发路径 -> 建议 hardening
   * 2. 统计频繁成功的路径 -> 建议 promotion
   */
  mine(history: DecisionTrace[]): GovernanceAsset[] {
    const assets: GovernanceAsset[] = [];
    const violationMap = new Map<string, number>();
    const successMap = new Map<string, number>();

    for (const trace of history) {
      if (trace.allowed) {
        trace.proposal.files.forEach(f => {
          const dir = this.getDirPattern(f);
          successMap.set(dir, (successMap.get(dir) || 0) + 1);
        });
      } else {
        trace.violations.forEach(v => {
          const key = `${v.ruleId}:${trace.proposal.files.join(',')}`;
          violationMap.set(key, (violationMap.get(key) || 0) + 1);
        });
      }
    }

    // 1. 提取频繁违规 (Threshold: 3次)
    violationMap.forEach((count, key) => {
      if (count >= 3) {
        const [ruleId, files] = key.split(':');
        assets.push({
          id: `asset-harden-${Date.now()}-${assets.length}`,
          type: 'frequent-violation',
          description: `Rule ${ruleId} violated ${count} times on ${files}`,
          evidenceCount: count,
          suggestedAction: 'harden-rule',
          pattern: files
        });
      }
    });

    // 2. 提取频繁成功 (Threshold: 5次)
    successMap.forEach((count, pattern) => {
      if (count >= 5) {
        assets.push({
          id: `asset-promote-${Date.now()}-${assets.length}`,
          type: 'trusted-pattern',
          description: `Pattern ${pattern} successfully applied ${count} times.`,
          evidenceCount: count,
          suggestedAction: 'promote-to-scope',
          pattern
        });
      }
    });

    return assets;
  }

  private getDirPattern(filePath: string): string {
    const parts = filePath.split('/');
    if (parts.length <= 1) return '*';
    return `${parts.slice(0, -1).join('/')}/**`;
  }
}
