"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SovereignManager = void 0;
// src/engine/sovereign.ts
const crypto_1 = __importDefault(require("crypto"));
class SovereignManager {
    /**
     * 生成主权密钥对
     */
    static generateKeyPair() {
        return crypto_1.default.generateKeyPairSync('ed25519', {
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
        });
    }
    /**
     * 签名政策内容
     */
    static signPolicy(content, privateKey) {
        return crypto_1.default.sign(null, Buffer.from(content), privateKey).toString('base64');
    }
    /**
     * 校验政策签名
     */
    static verifyPolicy(content, signature, publicKey) {
        try {
            return crypto_1.default.verify(null, Buffer.from(content), publicKey, Buffer.from(signature, 'base64'));
        }
        catch (e) {
            return false;
        }
    }
}
exports.SovereignManager = SovereignManager;
