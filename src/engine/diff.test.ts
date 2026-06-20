import { describe, it, expect } from 'vitest';
import { wordDiff, diffDistance } from './diff';

describe('wordDiff / diffDistance', () => {
  it('identical sentences have distance 0', () => {
    expect(diffDistance('have you been to london', 'have you been to london')).toBe(0);
  });
  it('one wrong word counts as 1 missing + 1 extra = distance 2', () => {
    expect(diffDistance('have you been in london', 'have you been to london')).toBe(2);
  });
  it('one missing word counts as distance 1', () => {
    expect(diffDistance('have you been london', 'have you been to london')).toBe(1);
  });
  it('marks tokens by status', () => {
    const d = wordDiff('have you been in london', 'have you been to london');
    expect(d.filter((t) => t.status === 'missing').map((t) => t.text)).toEqual(['to']);
    expect(d.filter((t) => t.status === 'extra').map((t) => t.text)).toEqual(['in']);
    expect(d.filter((t) => t.status === 'same').map((t) => t.text)).toEqual(['have', 'you', 'been', 'london']);
  });
});
