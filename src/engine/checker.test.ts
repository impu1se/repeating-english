import { describe, it, expect } from 'vitest';
import { checkFreeText, checkExact, checkExercise } from './checker';
import type { Exercise } from '../types';

describe('checkFreeText', () => {
  const accepted = ['Have you ever been to London?'];
  it('exact (normalized) match is correct', () => {
    expect(checkFreeText('have you ever been to london', accepted).kind).toBe('correct');
  });
  it('typographic apostrophe still matches exactly', () => {
    expect(checkFreeText('I haven’t seen this film', ['I haven\'t seen this film']).kind).toBe('correct');
  });
  it('one substituted word is close', () => {
    const v = checkFreeText('Have you ever been in London', accepted);
    expect(v.kind).toBe('close');
  });
  it('two changed words are close (spec: отличие 1–2 слова)', () => {
    const v = checkFreeText('Has you ever been in London', accepted);
    expect(v.kind).toBe('close');
  });
  it('far answer is wrong and returns accepted', () => {
    const v = checkFreeText('I like apples', accepted);
    expect(v).toEqual({ kind: 'wrong', accepted });
  });
  it('empty answer is wrong, never close', () => {
    expect(checkFreeText('', ['eaten']).kind).toBe('wrong');
    expect(checkFreeText('   ', accepted).kind).toBe('wrong');
  });
  it('single word: typo is close, unrelated word is wrong', () => {
    expect(checkFreeText('eatn', ['eaten']).kind).toBe('close');
    expect(checkFreeText('ate', ['eaten']).kind).toBe('close');
    expect(checkFreeText('pizza', ['eaten']).kind).toBe('wrong');
  });
});

describe('checkExact', () => {
  it('matches any accepted ignoring case/punctuation', () => {
    expect(checkExact('Goes', ['goes'])).toBe(true);
    expect(checkExact('go', ['goes'])).toBe(false);
  });
});

describe('checkExercise', () => {
  it('auto type choose_word never returns close', () => {
    const ex: Exercise = { id: 'x', conceptId: 'c', type: 'choose_word', prompt: 'p', points: 1, options: ['a', 'b'], accepted: ['a'] };
    expect(checkExercise(ex, 'b').kind).toBe('wrong');
    expect(checkExercise(ex, 'a').kind).toBe('correct');
  });
  it('translate_ru_en uses hybrid check', () => {
    const ex: Exercise = { id: 'x', conceptId: 'c', type: 'translate_ru_en', prompt: 'p', points: 2, accepted: ['I am happy'] };
    expect(checkExercise(ex, 'I am happy').kind).toBe('correct');
    expect(checkExercise(ex, 'I am happi').kind).toBe('close');
  });
});
