// src/server.ts
import express from 'express';
import { TrustedGuard } from './index';
import path from 'path';
import { readFileSync } from 'fs';

const app = express();
const port = Number(process.env.PORT || 3000);
// 默认只监听回环地址：这是一个能读写磁盘的治理接口，不该默认暴露到局域网。
// 需要对外时显式 TAE_HOST=0.0.0.0，并强烈建议同时设置 TAE_API_TOKEN。
const host = process.env.TAE_HOST || '127.0.0.1';
const apiToken = process.env.TAE_API_TOKEN;
const allowedBase = path.resolve(process.env.TAE_BASE_DIR || process.cwd());
const pkgVersion = JSON.parse(readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8')).version;

app.use(express.json());

// Bearer 鉴权（设置了 TAE_API_TOKEN 才启用）
app.use('/v1', (req, res, next) => {
  if (!apiToken) return next();
  const auth = req.headers.authorization || '';
  if (auth === `Bearer ${apiToken}`) return next();
  res.status(401).json({ error: 'Unauthorized' });
});

/**
 * Health Check
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', engine: 'trusted-agent-engine', version: pkgVersion });
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
    const { workspaceRoot, proposal, allowUnsignedPolicy } = req.body;

    if (!workspaceRoot || !proposal) {
      return res.status(400).json({ error: 'Missing workspaceRoot or proposal in request body' });
    }

    // 路径围栏：workspaceRoot 必须落在允许的基目录内（防任意路径读写）
    const root = path.resolve(String(workspaceRoot));
    if (root !== allowedBase && !root.startsWith(allowedBase + path.sep)) {
      return res.status(400).json({
        error: 'workspaceRoot is outside the allowed base directory',
        allowedBase,
      });
    }

    // 执行审计
    const decision = await TrustedGuard.evaluate(root, proposal, { allowUnsignedPolicy: allowUnsignedPolicy === true });

    res.json(decision);
  } catch (error: any) {
    console.error('[API] Evaluation failed:', error);
    res.status(500).json({ 
      error: 'Governance evaluation failed', 
      message: error.message 
    });
  }
});

app.listen(port, host, () => {
  console.log(`🛡️ Trusted Governance API v${pkgVersion} listening on http://${host}:${port}`);
  console.log(`Endpoint: POST /v1/evaluate`);
  console.log(`Auth: ${apiToken ? 'Bearer token' : 'none (local only)'}`);
  console.log(`Workspace base dir: ${allowedBase}`);
});
