// src/engine/sovereign.ts
import crypto from 'crypto';

export class SovereignManager {
  /**
   * 生成主权密钥对
   */
  static generateKeyPair() {
    return crypto.generateKeyPairSync('ed25519', {
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    });
  }

  /**
   * 签名政策内容
   */
  static signPolicy(content: string, privateKey: string): string {
    return crypto.sign(null, Buffer.from(content), privateKey).toString('base64');
  }

  /**
   * 校验政策签名
   */
  static verifyPolicy(content: string, signature: string, publicKey: string): boolean {
    try {
      return crypto.verify(null, Buffer.from(content), publicKey, Buffer.from(signature, 'base64'));
    } catch (e) {
      return false;
    }
  }
}
