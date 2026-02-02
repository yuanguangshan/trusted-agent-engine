"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/sign.ts
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sovereign_1 = require("./engine/sovereign");
function main() {
    const command = process.argv[2];
    const aiDir = path_1.default.join(process.cwd(), '.ai');
    if (!fs_1.default.existsSync(aiDir))
        fs_1.default.mkdirSync(aiDir, { recursive: true });
    const privKeyPath = path_1.default.join(aiDir, 'sovereign.key');
    const pubKeyPath = path_1.default.join(aiDir, 'sovereign.pub');
    if (command === 'init') {
        const { publicKey, privateKey } = sovereign_1.SovereignManager.generateKeyPair();
        fs_1.default.writeFileSync(privKeyPath, privateKey);
        fs_1.default.writeFileSync(pubKeyPath, publicKey);
        console.log('Sovereign keys generated in .ai/');
    }
    else if (command === 'sign') {
        const policyPath = process.argv[3] || 'agent.policy.yaml';
        if (!fs_1.default.existsSync(privKeyPath)) {
            console.error('Private key not found. Run init first.');
            process.exit(1);
        }
        const privateKey = fs_1.default.readFileSync(privKeyPath, 'utf8');
        const content = fs_1.default.readFileSync(policyPath, 'utf8');
        const sig = sovereign_1.SovereignManager.signPolicy(content, privateKey);
        fs_1.default.writeFileSync(`${policyPath}.sig`, sig);
        console.log(`Signed ${policyPath}. Signature saved to ${policyPath}.sig`);
    }
    else {
        console.log('Usage: ts-node src/sign.ts <init|sign [policy_path]>');
    }
}
main();
