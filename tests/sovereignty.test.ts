// tests/sovereignty.test.ts
import { SovereignManager } from '../src/engine/sovereign';
import { loadPolicy } from '../src/engine/policyLoader';
import fs from 'fs';
import path from 'path';

describe('Sovereign Policy Signing (Day 22)', () => {
  const tmpDir = path.join(__dirname, 'tmp_sov');
  const policyPath = path.join(tmpDir, 'test.policy.yaml');
  const sigPath = `${policyPath}.sig`;

  let publicKey: string;
  let privateKey: string;

  beforeAll(() => {
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
    const keys = SovereignManager.generateKeyPair();
    publicKey = keys.publicKey;
    privateKey = keys.privateKey;
    
    fs.writeFileSync(policyPath, 'meta:\n  mode: strict\nscopes: []\nrisks: []\nrules: []');
  });

  afterAll(() => {
    if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true });
  });

  test('Should load signed policy correctly', () => {
    const content = fs.readFileSync(policyPath, 'utf8');
    const sig = SovereignManager.signPolicy(content, privateKey);
    fs.writeFileSync(sigPath, sig);

    const config = loadPolicy(policyPath, { publicKey });
    expect(config.meta.mode).toBe('strict');
  });

  test('Should REJECT tampered policy', () => {
    // 1. Sign
    const content = fs.readFileSync(policyPath, 'utf8');
    const sig = SovereignManager.signPolicy(content, privateKey);
    fs.writeFileSync(sigPath, sig);

    // 2. Tamper
    fs.writeFileSync(policyPath, 'meta:\n  mode: monitor\nscopes: []\nrisks: []\nrules: []');

    // 3. Load (should throw)
    expect(() => {
      loadPolicy(policyPath, { publicKey });
    }).toThrow('Policy signature verification failed');
  });

  test('Should REJECT policy without signature when pubkey provided', () => {
    if (fs.existsSync(sigPath)) fs.unlinkSync(sigPath);
    expect(() => {
      loadPolicy(policyPath, { publicKey });
    }).toThrow('Policy signature missing');
  });
});
