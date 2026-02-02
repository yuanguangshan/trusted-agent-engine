// tests/self_audit.test.ts
import { SelfAuditor } from '../src/engine/selfAudit';
import { DecisionTrace } from '../src/engine/types';

describe('Self Audit Algorithm (Day 23)', () => {
  const auditor = new SelfAuditor();

  const mockTrace = (allowed: boolean, risk: 'low' | 'high', files: string[]): DecisionTrace => ({
    allowed, riskLevel: risk, actions: [], violations: [], auditLog: 'mock',
    outcome: allowed ? 'applied' : 'rejected',
    proposal: {
      id: 'p', timestamp: Date.now(), author: 'ai-agent', reasoning: 'r',
      files, diff: 'd'
    }
  });

  test('Should detect Policy Drift when success rate shifts', () => {
    // 之前 20 条全是允许的 (100%)
    const older = Array(20).fill(null).map(() => mockTrace(true, 'low', ['src/a.ts']));
    // 最近 10 条全是阻断的 (0%)
    const recent = Array(10).fill(null).map(() => mockTrace(false, 'low', ['src/b.ts']));
    
    const report = auditor.audit([...recent, ...older]);
    expect(report.healthScore).toBeLessThan(100);
    expect(report.findings.some(f => f.type === 'policy-drift')).toBe(true);
  });

  test('Should detect Risk Accumulation', () => {
    // 40% 的操作是高风险的
    const history = [
      ...Array(4).fill(null).map(() => mockTrace(true, 'high', ['src/env.ts'])),
      ...Array(6).fill(null).map(() => mockTrace(true, 'low', ['src/main.ts']))
    ];
    const report = auditor.audit(history);
    expect(report.findings.some(f => f.type === 'risk-accumulation')).toBe(true);
  });
});
