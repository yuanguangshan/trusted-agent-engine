import crypto from 'crypto';
export declare class SovereignManager {
    /**
     * 生成主权密钥对
     */
    static generateKeyPair(): crypto.KeyPairSyncResult<string, string>;
    /**
     * 签名政策内容
     */
    static signPolicy(content: string, privateKey: string): string;
    /**
     * 校验政策签名
     */
    static verifyPolicy(content: string, signature: string, publicKey: string): boolean;
}
