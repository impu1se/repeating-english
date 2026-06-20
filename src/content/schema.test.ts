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
});
