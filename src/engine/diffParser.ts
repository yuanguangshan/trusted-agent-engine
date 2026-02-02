// src/engine/diffParser.ts

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
export function parseUnifiedDiff(diff: string): DiffAnalysis {
  const files = new Set<string>();
  let additions = 0;
  let deletions = 0;
  let hunks = 0;

  const lines = diff.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]; // DON'T trim here yet, we need the first character to be exact

    // 1. diff --git header
    if (line.startsWith('diff --git ')) {
      const parts = line.split(' ');
      const bPath = parts[parts.length - 1]; // b/path
      if (bPath.startsWith('b/')) {
        files.add(bPath.substring(2));
      }
      continue;
    }

    // 2. --- and +++ headers
    if (line.startsWith('--- ') || line.startsWith('+++ ')) {
      const pathPart = line.substring(4).trim();
      if (pathPart.startsWith('a/') || pathPart.startsWith('b/')) {
        files.add(pathPart.substring(2));
      } else if (pathPart !== '/dev/null' && pathPart !== '') {
        files.add(pathPart);
      }
      continue;
    }

    // Support for 4+ pluses/minuses (sometimes LLMs do this)
    if (line.startsWith('----') || line.startsWith('++++')) {
      continue;
    }

    // 3. Hunk header
    if (line.startsWith('@@')) {
      hunks++;
      continue;
    }

    // 4. Content stats
    // Skip any header-like lines just in case
    if (line.startsWith('---') || line.startsWith('+++') || line.startsWith('diff --git')) {
      continue;
    }

    if (line.startsWith('+')) {
      additions++;
    } else if (line.startsWith('-')) {
      deletions++;
    }
  }

  return {
    filesTouched: Array.from(files),
    additions,
    deletions,
    hunks,
  };
}
