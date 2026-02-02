// tests/asset_manager.test.ts
import { AssetManager } from '../src/engine/assetManager';
import { DecisionTrace, Proposal } from '../src/engine/types';

describe('Asset Manager (Day 20)', () => {
  const manager = new AssetManager();

  const mockTrace = (allowed: boolean, files: string[], rules: string[] = []): DecisionTrace => ({
    allowed,
    riskLevel: 'low',
    actions: allowed ? [] : ['block'],
    violations: rules.map(r => ({ ruleId: r, description: r, level: 'block' })),
    auditLog: 'mock',
    outcome: allowed ? 'applied' : 'rejected',
    proposal: {
      id: 'p', timestamp: 0, author: 'ai-agent', reasoning: 'r',
      files, diff: 'd'
    }
  });

  test('Should suggest promotion for frequent successes', () => {
    const history: DecisionTrace[] = Array(5).fill(null).map(() => 
      mockTrace(true, ['src/components/button.tsx'])
    );
    const assets = manager.mine(history);
    const promotion = assets.find(a => a.type === 'trusted-pattern');
    expect(promotion).toBeDefined();
    expect(promotion?.pattern).toBe('src/components/**');
  });

  test('Should suggest hardening for frequent violations', () => {
    const history: DecisionTrace[] = Array(3).fill(null).map(() => 
      mockTrace(false, ['src/auth/secret.ts'], ['scope-enforcement'])
    );
    const assets = manager.mine(history);
    const hardening = assets.find(a => a.type === 'frequent-violation');
    expect(hardening).toBeDefined();
    expect(hardening?.description).toContain('violated 3 times');
  });
});
