import { describe, it, expect } from 'vitest';
import { validateContent } from './schema';
import type { Content } from '../types';

const base: Content = {
  version: '1',
  modules: [
    { id: 'm1', title: 'M1', level: 'A1', masteryThreshold: 5, conceptIds: ['c1'] },
  ],
  concepts: [
    { id: 'c1', moduleId: 'm1', title: 'C1', kind: 'grammar', exerciseIds: ['e1'] },
  ],
  exercises: [
    { id: 'e1', conceptId: 'c1', type: 'fill_gap', prompt: 'I ___ ok', points: 1, accepted: ['am'] },
  ],
};

describe('validateContent', () => {
  it('accepts well-formed content', () => {
    expect(validateContent(base)).toEqual([]);
  });

  it('reports a concept referencing a missing exercise', () => {
    const broken: Content = { ...base, concepts: [{ ...base.concepts[0], exerciseIds: ['missing'] }] };
    expect(validateContent(broken)).toContain('concept c1 references missing exercise missing');
  });

  it('reports a module referencing a missing concept', () => {
    const broken: Content = { ...base, modules: [{ ...base.modules[0], conceptIds: ['nope'] }] };
    expect(validateContent(broken)).toContain('module m1 references missing concept nope');
  });

  it('reports a concept with no exercises', () => {
    const broken: Content = { ...base, concepts: [{ ...base.concepts[0], exerciseIds: [] }] };
    expect(validateContent(broken)).toContain('concept c1 has no exercises');
  });

  it('reports an exercise listed by a concept but pointing elsewhere (runtime pool invariant)', () => {
    const broken: Content = {
      ...base,
      exercises: [{ ...base.exercises[0], conceptId: 'other' }],
    };
    expect(validateContent(broken)).toContain('exercise e1 is listed by concept c1 but has conceptId other');
  });

  it('reports duplicate ids', () => {
    const broken: Content = { ...base, exercises: [...base.exercises, { ...base.exercises[0] }] };
    expect(validateContent(broken)).toContain('duplicate exercise id e1');
  });

  it('reports missing per-type fields', () => {
    const broken: Content = {
      ...base,
      concepts: [{ ...base.concepts[0], exerciseIds: ['e1', 'e2', 'e3', 'e4'] }],
      exercises: [
        { ...base.exercises[0], accepted: [] },
        { id: 'e2', conceptId: 'c1', type: 'choose_word', prompt: 'p', points: 1, options: ['a', 'b'], accepted: ['zzz'] },
        { id: 'e3', conceptId: 'c1', type: 'multi_gap', prompt: 'one ___ here', points: 1, gaps: [{ accepted: ['x'] }, { accepted: ['y'] }] },
        { id: 'e4', conceptId: 'c1', type: 'match_pairs', prompt: 'p', points: 1, pairs: [{ en: 'a', ru: 'же' }, { en: 'b', ru: 'же' }] },
      ],
    };
    const errors = validateContent(broken);
    expect(errors).toContain('exercise e1 (fill_gap): accepted must be non-empty');
    expect(errors).toContain('exercise e2 (choose_word): accepted must be among options');
    expect(errors).toContain('exercise e3 (multi_gap): prompt has 1 gap markers for 2 gaps');
    expect(errors).toContain('exercise e4 (match_pairs): ru values must be unique');
  });

  it('reports a word_order answer not assemblable from the bank', () => {
    const broken: Content = {
      ...base,
      exercises: [
        { id: 'e1', conceptId: 'c1', type: 'word_order', prompt: 'p', points: 1, bank: ['have', 'you'], accepted: ['have you ever'] },
      ],
    };
    expect(validateContent(broken)).toContain('exercise e1 (word_order): accepted "have you ever" is not assemblable from bank');
  });
});
