// tests/anomaly.test.ts
import { PolicyEngine } from '../src/engine/evaluator';
import { Proposal, PolicyConfig } from '../src/engine/types';

const mockPolicy: PolicyConfig = {
  meta: { mode: 'strict' },
  scopes: [{ id: 'src', allow: ['src/**'] }],
  risks: [],
  rules: []
};

describe('Anomaly Detection (Day 19)', () => {
  const engine = new PolicyEngine(mockPolicy);

  test('Should detect multi-factor anomaly (Large + Many Files)', () => {
    const largeDiff = 'line\n'.repeat(600);
    const files = Array.from({ length: 11 }, (_, i) => `src/file${i}.ts`);
    const proposal: Proposal = {
      id: 'a1', timestamp: Date.now(), author: 'ai-agent',
      reasoning: 'Massive change', files: files, diff: largeDiff
    };
    const decision = engine.evaluate(proposal);
    // 0.4 (large) + 0.3 (files) = 0.7
    expect(decision.allowed).toBe(false);
    expect(decision.anomalyReport?.score).toBeGreaterThanOrEqual(0.7);
  });

  test('Should detect high-score anomaly (Obfuscation + Large)', () => {
    const suspiciousDiff = 'const x = "68656c6c6f20776f726c6420746869732069732061206c6f6e672068657820737472696e6720746f2074657374206f62667573636174696f6e20646574656374696f6e";\n' + 'line\n'.repeat(600);
    const proposal: Proposal = {
      id: 'a2', timestamp: Date.now(), author: 'ai-agent',
      reasoning: 'Secret stuff', files: ['src/secret.ts'], diff: suspiciousDiff
    };
    const decision = engine.evaluate(proposal);
    // 0.6 (obfuscation) + 0.4 (large) = 1.0
    expect(decision.allowed).toBe(false);
    expect(decision.anomalyReport?.score).toBe(1);
  });
});
