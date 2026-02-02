import { PolicyConfig } from './types';
export declare function loadPolicy(path: string, options?: {
    publicKey?: string;
    signaturePath?: string;
}): PolicyConfig;
