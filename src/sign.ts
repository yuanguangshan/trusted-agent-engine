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
    const { publicKey, privateKey } = SovereignManager.generateKeyPair();
    fs.writeFileSync(privKeyPath, privateKey);
    fs.writeFileSync(pubKeyPath, publicKey);
    console.log('Sovereign keys generated in .ai/');
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
    console.log('Usage: ts-node src/sign.ts <init|sign [policy_path]>');
  }
}

main();
