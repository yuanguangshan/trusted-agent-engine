// tests/value_mercy.test.ts
import { PolicyEngine } from '../src/engine/evaluator';
import { Proposal, PolicyConfig, ValueManifesto } from '../src/engine/types';

const mockPolicy: PolicyConfig = {
  meta: { mode: 'strict' },
  scopes: [{ id: 'src', allow: ['src/**'] }],
  risks: [{ id: 'secret', level: 'high', match: ['src/secret/**'] }],
  rules: [
    {
      id: 'no-secret',
      condition: "engine.riskLevel == 'high'",
      action: 'block',
      description: 'No touching secrets',
      valueId: 'security'
    }
  ]
};

const mockManifesto: ValueManifesto = {
  values: [
    { id: 'security', weight: 1.0, description: 'Safety first' }
  ],
  mercy_hooks: [
    {
      id: 'emergency-mercy',
      condition: "payload.tags && payload.tags.includes('emergency')",
      action: 'downgrade_to_warn',
      description: 'Emergency downgrade'
    }
  ]
};

describe('Value & Mercy Logic (Day 16)', () => {
  const engine = new PolicyEngine(mockPolicy, mockManifesto);

  test('Should block normal secret access', () => {
    const proposal: Proposal = {
      id: 'v1',
      timestamp: Date.now(),
      author: 'ai-agent',
      reasoning: 'Just testing',
      files: ['src/secret/key.txt'],
      diff: '+key'
    };
    const decision = engine.evaluate(proposal);
    expect(decision.allowed).toBe(false);
    expect(decision.valueScore).toBeLessThan(1.0);
  });

  test('Should Mercy (warn) for emergency secret access', () => {
    const proposal: Proposal = {
      id: 'v2',
      timestamp: Date.now(),
      author: 'ai-agent',
      reasoning: 'EMERGENCY FIX',
      files: ['src/secret/key.txt'],
      diff: '+key',
      tags: ['emergency']
    };
    const decision = engine.evaluate(proposal);
    expect(decision.allowed).toBe(true); // Downgraded to warn
    expect(decision.actions).toContain('warn');
    expect(decision.violations[0].level).toBe('warn');
  });
});
