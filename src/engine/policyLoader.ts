// src/engine/policyLoader.ts
import fs from 'fs';
import yaml from 'yaml';
import { PolicyConfig } from './types';
import { SovereignManager } from './sovereign';

export function loadPolicy(path: string, options?: { publicKey?: string, signaturePath?: string }): PolicyConfig {
  const content = fs.readFileSync(path, 'utf8');

  if (options?.publicKey) {
    const sigPath = options.signaturePath || `${path}.sig`;
    if (!fs.existsSync(sigPath)) {
      throw new Error(`Policy signature missing at ${sigPath}. Sovereign requirement not met.`);
    }
    const signature = fs.readFileSync(sigPath, 'utf8').trim();
    const isValid = SovereignManager.verifyPolicy(content, signature, options.publicKey);
    if (!isValid) {
      throw new Error('Policy signature verification failed. Unauthorized policy modification detected!');
    }
  }

  return yaml.parse(content) as PolicyConfig;
}
