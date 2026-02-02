export interface DiffAnalysis {
    filesTouched: string[];
    additions: number;
    deletions: number;
    hunks: number;
}
/**
 * Parse unified diff and extract factual change data
 * Design Principles:
 * 1. Robustness: Handle standard git diff headers
 * 2. Independence: No git CLI dependency
 * 3. Accuracy: Distinguish between file headers and content changes
 */
export declare function parseUnifiedDiff(diff: string): DiffAnalysis;
