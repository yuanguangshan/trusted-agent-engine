"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPolicy = loadPolicy;
// src/engine/policyLoader.ts
const fs_1 = __importDefault(require("fs"));
const yaml_1 = __importDefault(require("yaml"));
const sovereign_1 = require("./sovereign");
function loadPolicy(path, options) {
    const content = fs_1.default.readFileSync(path, 'utf8');
    if (options?.publicKey) {
        const sigPath = options.signaturePath || `${path}.sig`;
        if (!fs_1.default.existsSync(sigPath)) {
            throw new Error(`Policy signature missing at ${sigPath}. Sovereign requirement not met.`);
        }
        const signature = fs_1.default.readFileSync(sigPath, 'utf8').trim();
        const isValid = sovereign_1.SovereignManager.verifyPolicy(content, signature, options.publicKey);
        if (!isValid) {
            throw new Error('Policy signature verification failed. Unauthorized policy modification detected!');
        }
    }
    return yaml_1.default.parse(content);
}
