import { describe, it, expect } from 'vitest';
import { wordDiff, levenshtein } from './diff';

describe('levenshtein', () => {
  it('identical sequences have distance 0', () => {
    expect(levenshtein(['a', 'b'], ['a', 'b'])).toBe(0);
    expect(levenshtein('word', 'word')).toBe(0);
  });
  it('substitution costs 1 (one changed word = distance 1)', () => {
    expect(levenshtein(['been', 'in', 'london'], ['been', 'to', 'london'])).toBe(1);
  });
  it('insert/delete cost 1 each', () => {
    expect(levenshtein(['have', 'been'], ['have', 'ever', 'been'])).toBe(1);
    expect(levenshtein([], ['a', 'b'])).toBe(2);
  });
  it('works on characters for single-word typos', () => {
    expect(levenshtein('happi', 'happy')).toBe(1);
    expect(levenshtein('pizza', 'eaten')).toBe(5);
  });
});

describe('wordDiff', () => {
  it('marks tokens by status', () => {
    const d = wordDiff('have you been in london', 'have you been to london');
    expect(d.filter((t) => t.status === 'missing').map((t) => t.text)).toEqual(['to']);
    expect(d.filter((t) => t.status === 'extra').map((t) => t.text)).toEqual(['in']);
    expect(d.filter((t) => t.status === 'same').map((t) => t.text)).toEqual(['have', 'you', 'been', 'london']);
  });
});
