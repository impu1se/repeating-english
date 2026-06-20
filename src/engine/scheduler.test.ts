import { describe, it, expect } from 'vitest';
import { pickNextConcept, pickNextExercise } from './scheduler';
import type { Content } from '../types';
import type { ProgressState } from '../store/progress';

const content: Content = {
  version: '1',
  modules: [{ id: 'm', title: 'M', level: 'A1', masteryThreshold: 5, conceptIds: ['c1', 'c2'] }],
  concepts: [
    { id: 'c1', moduleId: 'm', title: 'C1', kind: 'grammar', exerciseIds: ['e1', 'e2'] },
    { id: 'c2', moduleId: 'm', title: 'C2', kind: 'grammar', exerciseIds: ['e3'] },
  ],
  exercises: [
    { id: 'e1', conceptId: 'c1', type: 'fill_gap', prompt: 'p1', points: 1, accepted: ['a'] },
    { id: 'e2', conceptId: 'c1', type: 'fill_gap', prompt: 'p2', points: 1, accepted: ['b'] },
    { id: 'e3', conceptId: 'c2', type: 'fill_gap', prompt: 'p3', points: 1, accepted: ['c'] },
  ],
};

function progressWith(overrides: Partial<Record<string, Partial<ProgressState['concepts'][string]>>>): ProgressState {
  const base: ProgressState = {
    contentVersion: '1',
    concepts: {
      c1: { score: 0, mastered: false, recentExerciseIds: [], errorCount: 0 },
      c2: { score: 0, mastered: false, recentExerciseIds: [], errorCount: 0 },
    },
  };
  for (const [id, o] of Object.entries(overrides)) base.concepts[id] = { ...base.concepts[id], ...o };
  return base;
}

describe('pickNextConcept', () => {
  it('picks the lowest-score non-mastered concept', () => {
    expect(pickNextConcept(content, 'm', progressWith({ c1: { score: 3 }, c2: { score: 1 } }))).toBe('c2');
  });
  it('skips mastered concepts', () => {
    expect(pickNextConcept(content, 'm', progressWith({ c1: { mastered: true } }))).toBe('c2');
  });
  it('returns null when all mastered', () => {
    expect(pickNextConcept(content, 'm', progressWith({ c1: { mastered: true }, c2: { mastered: true } }))).toBeNull();
  });
});

describe('pickNextExercise', () => {
  it('avoids recently shown exercises', () => {
    const ex = pickNextExercise(content, 'c1', progressWith({ c1: { recentExerciseIds: ['e1'] } }));
    expect(ex.id).toBe('e2');
  });
  it('falls back to pool order when all are recent', () => {
    const ex = pickNextExercise(content, 'c1', progressWith({ c1: { recentExerciseIds: ['e1', 'e2'] } }));
    expect(ex.id).toBe('e1');
  });
});
