import { describe, it, expect } from 'vitest';
import { shuffle } from './random';

describe('shuffle', () => {
  it('returns a permutation without mutating the input', () => {
    const input = [1, 2, 3, 4, 5];
    const out = shuffle(input);
    expect(out).toHaveLength(5);
    expect([...out].sort()).toEqual([1, 2, 3, 4, 5]);
    expect(input).toEqual([1, 2, 3, 4, 5]);
  });
  it('is deterministic for a fixed rng', () => {
    const rng = () => 0; // always swap with index 0
    expect(shuffle(['a', 'b', 'c'], rng)).toEqual(shuffle(['a', 'b', 'c'], rng));
  });
});
