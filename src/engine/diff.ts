import { tokenize } from './normalize';

export interface DiffToken {
  text: string;
  status: 'same' | 'missing' | 'extra';
}

export function wordDiff(answer: string, reference: string): DiffToken[] {
  const a = tokenize(answer);
  const b = tokenize(reference);
  const m = a.length;
  const n = b.length;

  // LCS table over (answer x reference)
  const lcs: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      lcs[i][j] = a[i] === b[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
    }
  }

  const out: DiffToken[] = [];
  let i = 0;
  let j = 0;
  while (i < m && j < n) {
    if (a[i] === b[j]) {
      out.push({ text: b[j], status: 'same' });
      i++;
      j++;
    } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
      out.push({ text: a[i], status: 'extra' });
      i++;
    } else {
      out.push({ text: b[j], status: 'missing' });
      j++;
    }
  }
  while (i < m) out.push({ text: a[i++], status: 'extra' });
  while (j < n) out.push({ text: b[j++], status: 'missing' });
  return out;
}

// Edit distance with insert/delete/replace all costing 1, so "one changed word"
// is distance 1 (the old extra+missing metric charged 2 for a substitution).
// Works over word arrays and over plain strings (per character).
export function levenshtein(a: string | readonly string[], b: string | readonly string[]): number {
  const m = a.length;
  const n = b.length;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = new Array<number>(n + 1);
    cur[0] = i;
    for (let j = 1; j <= n; j++) {
      cur[j] = a[i - 1] === b[j - 1] ? prev[j - 1] : 1 + Math.min(prev[j - 1], prev[j], cur[j - 1]);
    }
    prev = cur;
  }
  return prev[n];
}
