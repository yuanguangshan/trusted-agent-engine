// tests/accountability.test.ts
import { PolicyEngine } from '../src/engine/evaluator';
import { Proposal, PolicyConfig } from '../src/engine/types';
import fs from 'fs';
import path from 'path';

const mockPolicy: PolicyConfig = {
  meta: { mode: 'strict' },
  scopes: [{ id: 'src', allow: ['src/**'] }],
  risks: [{ id: 'infra', level: 'high', match: ['**/.env*'] }],
  rules: [
    {
      id: 'no-infra',
      condition: "engine.riskLevel == 'high'",
      action: 'block',
      description: 'Blocking infra'
    }
  ]
};

describe('Accountability Logic (Day 17)', () => {
  const workspaceRoot = path.join(__dirname, 'tmp_ws');
  
  beforeAll(() => {
    if (!fs.existsSync(workspaceRoot)) fs.mkdirSync(workspaceRoot, { recursive: true });
  });

  afterAll(() => {
    if (fs.existsSync(workspaceRoot)) fs.rmSync(workspaceRoot, { recursive: true });
  });

  test('Should assign responsibility and track credits', () => {
    const engine = new PolicyEngine(mockPolicy, undefined, workspaceRoot);
    
    // 场景：正常提案
    const p1: Proposal = {
      id: 'p1', timestamp: Date.now(), author: 'ai-agent',
      reasoning: 'Good reasoning here', files: ['src/main.ts'], diff: '+log'
    };
    const d1 = engine.evaluate(p1);
    expect(d1.accountability?.responsibleEntity).toBe('ai-agent');
    expect(d1.accountability?.creditImpact).toBe(1);

    // 场景：被拦截的高危操作
    const p2: Proposal = {
      id: 'p2', timestamp: Date.now(), author: 'ai-agent',
      reasoning: 'Bad reasoning', files: ['.env'], diff: '-secret'
    };
    const d2 = engine.evaluate(p2);
    expect(d2.accountability?.responsibleEntity).toBe('ai-agent');
    expect(d2.accountability?.creditImpact).toBe(-10);
  });
});
