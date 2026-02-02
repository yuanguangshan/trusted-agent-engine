// tests/consensus.test.ts
import { ConsensusEngine } from '../src/engine/consensus';
import { Vote, Decision } from '../src/engine/types';

describe('Consensus Engine (Day 18)', () => {
  const engine = new ConsensusEngine();

  const mockDecision = (allowed: boolean, risk: Decision['riskLevel'] = 'low'): Decision => ({
    allowed,
    riskLevel: risk,
    actions: allowed ? [] : ['block'],
    violations: [],
    auditLog: 'mock'
  });

  test('Should reach agreement when all voters allow', () => {
    const votes: Vote[] = [
      { voterId: 'agent-1', weight: 1, decision: mockDecision(true) },
      { voterId: 'agent-2', weight: 1, decision: mockDecision(true) }
    ];
    const result = engine.resolve(votes);
    expect(result.finalDecision.allowed).toBe(true);
    expect(result.agreementRate).toBe(1.0);
  });

  test('Should VETO when a high-weight voter blocks', () => {
    const votes: Vote[] = [
      { voterId: 'main-governor', weight: 1.0, decision: mockDecision(false) },
      { voterId: 'sub-agent', weight: 0.5, decision: mockDecision(true) }
    ];
    const result = engine.resolve(votes);
    expect(result.finalDecision.allowed).toBe(false);
    expect(result.isVetoed).toBe(true);
  });

  test('Should FAIL if agreement rate is too low even without veto', () => {
    const votes: Vote[] = [
      { voterId: 'a1', weight: 0.4, decision: mockDecision(false) }, // low weight, no veto
      { voterId: 'a2', weight: 0.6, decision: mockDecision(true) }
    ];
    // agreement rate = 0.6 / 1.0 = 0.6. threshold is > 0.6 (60%)
    const result = engine.resolve(votes);
    expect(result.finalDecision.allowed).toBe(false);
    expect(result.agreementRate).toBe(0.6);
  });
});
