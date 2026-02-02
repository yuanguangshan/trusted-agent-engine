// tests/diff_parser.test.ts
import { parseUnifiedDiff } from '../src/engine/diffParser';

describe('Unified Diff Parser - Day 2', () => {
  
  test('Standard Git Diff: Extracts modified files correctly', () => {
    const diff = 'diff --git a/src/app.ts b/src/app.ts\n' +
                 'index 83db48f..f735c20 100644\n' +
                 '--- a/src/app.ts\n' +
                 '+++ b/src/app.ts\n' +
                 '@@ -1,3 +1,4 @@\n' +
                 ' console.log("hello");\n' +
                 '+console.log("world");';
    const result = parseUnifiedDiff(diff);
    expect(result.filesTouched).toEqual(['src/app.ts']);
    expect(result.additions).toBe(1);
    expect(result.deletions).toBe(0);
    expect(result.hunks).toBe(1);
  });

  test('File Deletion: Detects deleted file correctly', () => {
    const diff = 'diff --git a/src/old.ts b/src/old.ts\n' +
                 'deleted file mode 100644\n' +
                 '--- a/src/old.ts\n' +
                 '+++ /dev/null\n' +
                 '@@ -1,2 +0,0 @@\n' +
                 '-console.log("bye");';
    const result = parseUnifiedDiff(diff);
    expect(result.filesTouched).toEqual(['src/old.ts']);
    expect(result.deletions).toBe(1);
  });

  test('Multiple Files: Handles mixed changes', () => {
    const diff = 'diff --git a/A.ts b/A.ts\n' +
                 '--- a/A.ts\n' +
                 '+++ b/A.ts\n' +
                 '@@ -1 +1 @@\n' +
                 '-old\n' +
                 '+new\n' +
                 'diff --git a/B.ts b/B.ts\n' +
                 '--- a/B.ts\n' +
                 '+++ b/B.ts\n' +
                 '@@ -5 +5 @@\n' +
                 '+added';
    const result = parseUnifiedDiff(diff);
    expect(result.filesTouched).toEqual(['A.ts', 'B.ts']);
    expect(result.additions).toBe(2);
    expect(result.deletions).toBe(1);
    expect(result.hunks).toBe(2);
  });
});
