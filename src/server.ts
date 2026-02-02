// src/server.ts
import express from 'express';
import { TrustedGuard } from './index';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

/**
 * Health Check
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', engine: 'trusted-agent-engine', version: '1.0.0' });
});

/**
 * POST /v1/evaluate
 *Body: {
 *  workspaceRoot: string,
 *  proposal: Proposal
 *}
 */
app.post('/v1/evaluate', async (req, res) => {
  try {
    const { workspaceRoot, proposal } = req.body;

    if (!workspaceRoot || !proposal) {
      return res.status(400).json({ error: 'Missing workspaceRoot or proposal in request body' });
    }

    // 执行审计
    const decision = await TrustedGuard.evaluate(workspaceRoot, proposal);

    res.json(decision);
  } catch (error: any) {
    console.error('[API] Evaluation failed:', error);
    res.status(500).json({ 
      error: 'Governance evaluation failed', 
      message: error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`🛡️ Trusted Governance API active on http://localhost:${port}`);
  console.log(`Endpoint: POST /v1/evaluate`);
});
