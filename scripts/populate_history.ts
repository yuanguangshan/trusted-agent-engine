// scripts/populate_history.ts
import fs from 'fs';
import path from 'path';
import { DecisionTrace } from '../src/engine/types';

const aiDir = path.join(process.cwd(), '.ai');
const ledgerPath = path.join(aiDir, 'ledger.json');

const history: DecisionTrace[] = [];

// 1. 生成 20 条较老的记录 (100% 成功率)
for (let i = 0; i < 20; i++) {
  history.push({
    allowed: true, riskLevel: 'low', actions: [], violations: [], auditLog: '{}',
    outcome: 'applied',
    proposal: {
      id: `old-${i}`, timestamp: Date.now() - (1000 * 60 * 60 * 24), author: 'ai-agent',
      reasoning: 'normal', files: [`src/moduleA/file${i}.ts`], diff: '+content'
    }
  });
}

// 2. 生成 10 条最近的记录 (0% 成功率，涉及多目录，高风险)
for (let i = 0; i < 10; i++) {
  history.push({
    allowed: false, riskLevel: 'high', actions: ['block'], violations: [{ ruleId: 'r', description: 'd', level: 'block' }],
    auditLog: '{}',
    outcome: 'rejected',
    proposal: {
      id: `recent-${i}`, timestamp: Date.now() - (1000 * 60 * i), author: 'ai-agent',
      reasoning: 'suspicious', files: [`src/newDir${i}/secret.env`], diff: '-secret'
    }
  });
}

if (!fs.existsSync(aiDir)) fs.mkdirSync(aiDir, { recursive: true });
fs.writeFileSync(ledgerPath, JSON.stringify(history, null, 2));
console.log('Populated 30 mock history items into .ai/ledger.json');
