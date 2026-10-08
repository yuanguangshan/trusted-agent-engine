// src/sign.ts
import fs from 'fs';
import path from 'path';
import { SovereignManager } from './engine/sovereign';

function main() {
  const command = process.argv[2];
  const aiDir = path.join(process.cwd(), '.ai');
  if (!fs.existsSync(aiDir)) fs.mkdirSync(aiDir, { recursive: true });

  const privKeyPath = path.join(aiDir, 'sovereign.key');
  const pubKeyPath = path.join(aiDir, 'sovereign.pub');

  if (command === 'init') {
    // 重新 init 会换掉密钥对 → 所有已签名的策略立刻失效（而且没有任何提示）
    // 因此默认拒绝覆盖，必须显式 --force
    if (fs.existsSync(privKeyPath) && !process.argv.includes('--force')) {
      console.error('Refusing to overwrite existing sovereign key at ' + privKeyPath);
      console.error('Running init again invalidates every existing policy signature.');
      console.error('If that is really what you want, run: trusted-sign init --force');
      process.exit(1);
    }
    const { publicKey, privateKey } = SovereignManager.generateKeyPair();
    fs.writeFileSync(privKeyPath, privateKey, { mode: 0o600 });  // 私钥仅属主可读
    fs.writeFileSync(pubKeyPath, publicKey, { mode: 0o644 });
    console.log('Sovereign keys generated in .ai/');
  } else if (command === 'verify') {
    const policyPath = process.argv[3] || 'agent.policy.yaml';
    const pubKeyPathOnly = process.argv[4] || pubKeyPath;
    if (!fs.existsSync(policyPath + '.sig') || !fs.existsSync(pubKeyPathOnly)) {
      console.error('Missing signature or public key.');
      process.exit(1);
    }
    const ok = SovereignManager.verifyPolicy(
      fs.readFileSync(policyPath, 'utf8'),
      fs.readFileSync(policyPath + '.sig', 'utf8').trim(),
      fs.readFileSync(pubKeyPathOnly, 'utf8'),
    );
    console.log(ok ? '✓ Signature valid' : '✗ Signature INVALID');
    process.exit(ok ? 0 : 1);
  } else if (command === 'sign') {
    const policyPath = process.argv[3] || 'agent.policy.yaml';
    if (!fs.existsSync(privKeyPath)) {
      console.error('Private key not found. Run init first.');
      process.exit(1);
    }
    const privateKey = fs.readFileSync(privKeyPath, 'utf8');
    const content = fs.readFileSync(policyPath, 'utf8');
    const sig = SovereignManager.signPolicy(content, privateKey);
    fs.writeFileSync(`${policyPath}.sig`, sig);
    console.log(`Signed ${policyPath}. Signature saved to ${policyPath}.sig`);
  } else {
    console.log('Usage: trusted-sign <init [--force] | sign [policy_path] | verify [policy_path] [pubkey]>');
  }
}

main();
