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
  it('every grammar concept ships a theory reference', () => {
    for (const c of content.concepts.filter((c) => c.kind === 'grammar')) {
      expect(c.theory, `concept ${c.id}`).toBeTruthy();
    }
  });
  it('uses version 2 and threshold 20 everywhere', () => {
    expect(content.version).toBe('2');
    for (const m of content.modules) expect(m.masteryThreshold, `module ${m.id}`).toBe(20);
  });
  it('gives every concept a pool big enough to clear the threshold without repeats', () => {
    // порог берётся из модуля концепта; сумма очков пула должна покрывать его,
    // иначе карточки начнут повторяться до освоения
    const thresholdOf = new Map<string, number>();
    for (const m of content.modules) for (const cid of m.conceptIds) thresholdOf.set(cid, m.masteryThreshold);
    for (const c of content.concepts) {
      const points = content.exercises
        .filter((e) => e.conceptId === c.id)
        .reduce((sum, e) => sum + e.points, 0);
      expect(points, `concept ${c.id}`).toBeGreaterThanOrEqual(thresholdOf.get(c.id)!);
    }
  });
});
