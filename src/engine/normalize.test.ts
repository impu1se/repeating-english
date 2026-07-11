import { describe, it, expect } from 'vitest';
import { normalize, tokenize } from './normalize';

describe('normalize', () => {
  it('lowercases, trims, collapses spaces, strips punctuation', () => {
    expect(normalize('  Have   you, been?  ')).toBe('have you been');
  });
  it('keeps apostrophes inside words', () => {
    expect(normalize("I haven't")).toBe("i haven't");
  });
  it('unifies typographic apostrophes (smart punctuation)', () => {
    expect(normalize('I haven’t')).toBe("i haven't");
    expect(normalize('don‘t')).toBe("don't");
    expect(normalize('I haven’t')).toBe(normalize("I haven't"));
  });
});

describe('tokenize', () => {
  it('splits normalized text into words', () => {
    expect(tokenize('Have you been?')).toEqual(['have', 'you', 'been']);
  });
  it('returns [] for empty input', () => {
    expect(tokenize('   ')).toEqual([]);
  });
});
