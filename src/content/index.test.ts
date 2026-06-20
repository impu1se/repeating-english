import { describe, it, expect } from 'vitest';
import { content } from './index';
import { validateContent } from './schema';

describe('seed content', () => {
  it('is structurally valid', () => {
    expect(validateContent(content)).toEqual([]);
  });
  it('has at least 2 modules', () => {
    expect(content.modules.length).toBeGreaterThanOrEqual(2);
  });
  it('every concept has at least 6 exercises', () => {
    for (const c of content.concepts) {
      expect(c.exerciseIds.length, `concept ${c.id}`).toBeGreaterThanOrEqual(6);
    }
  });
  it('covers all 7 exercise types', () => {
    const types = new Set(content.exercises.map((e) => e.type));
    for (const t of ['translate_ru_en', 'word_order', 'choose_word', 'fill_gap', 'multi_gap', 'verb_form', 'match_pairs']) {
      expect(types.has(t as never), `missing type ${t}`).toBe(true);
    }
  });
});
