// tests/golden_set.test.ts
import { PolicyEngine } from '../src/engine/evaluator';
import { Proposal, PolicyConfig } from '../src/engine/types';

const mockPolicy: PolicyConfig = {
  meta: { mode: 'strict' },
  scopes: [
    { id: 'source-code', allow: ['src/**', 'lib/**', 'components/**'] },
    { id: 'documentation', allow: ['docs/**', 'README.md'] }
  ],
  risks: [
    { id: 'infra-danger', level: 'high', match: ['**/.env*', '**/docker-compose.yml', '**/*.tf'] },
    { id: 'auth-module', level: 'high', match: ['src/auth/**', 'src/security/**'] }
  ],
  rules: [
    {
      id: 'must-have-diff',
      description: 'Reject any proposal without explicit diff content',
      check: 'payload.diff.length > 0',
      action: 'block'
    },
    {
      id: 'scope-enforcement',
      description: 'Reject changes outside allowed scopes',
      check: 'engine.isScoped(payload.files)',
      action: 'block'
    },
    {
      id: 'reasoning-required',
      description: 'Must provide context/reasoning for changes',
      check: 'payload.reasoning.length > 10',
      action: 'warn'
    },
    {
      id: 'high-risk-gate',
      description: 'High risk changes require explicit human confirmation',
      condition: "engine.riskLevel == 'high'",
      action: 'require_human'
    }
  ]
};

const mockProposal = (overrides: Partial<Proposal>): Proposal => ({
  id: 'test-1',
  timestamp: Date.now(),
  author: 'ai-agent',
  reasoning: 'Normal changes for testing purposes.',
  files: ['src/app.ts'],
  diff: 'diff --git a/src/app.ts b/src/app.ts\n+console.log("test");',
  ...overrides
});

describe('Trusted Policy Engine - Sprint 1', () => {
  const engine = new PolicyEngine(mockPolicy);

  // 场景 1：越权访问
  test('Should BLOCK changes outside scope', () => {
    const proposal = mockProposal({ files: ['private/keys.txt'] });
    const decision = engine.evaluate(proposal);
    
    expect(decision.allowed).toBe(false);
    expect(decision.violations).toContainEqual(
      expect.objectContaining({ ruleId: 'scope-enforcement' })
    );
  });

  // 场景 2：触碰高危文件
  test('Should REQUIRE HUMAN for infra changes', () => {
    const proposal = mockProposal({ files: ['src/auth/login.ts'] });
    const decision = engine.evaluate(proposal);
    
    expect(decision.allowed).toBe(false); 
    expect(decision.actions).toContain('require_human');
    expect(decision.riskLevel).toBe('high');
  });

  // 场景 3：无理由修改
  test('Should WARN if reasoning is missing', () => {
    const proposal = mockProposal({ reasoning: '' }); // 空理由
    const decision = engine.evaluate(proposal);
    
    expect(decision.allowed).toBe(true);
    expect(decision.violations).toContainEqual(
      expect.objectContaining({ ruleId: 'reasoning-required', level: 'warn' })
    );
  });
});
