import { describe, it, expect, beforeEach } from 'vitest';
import { loadProgress, saveProgress, pushRecent } from './progress';
import type { Content } from '../types';

const content: Content = {
  version: '2',
  modules: [{ id: 'm', title: 'M', level: 'A1', masteryThreshold: 5, conceptIds: ['c1'] }],
  concepts: [{ id: 'c1', moduleId: 'm', title: 'C', kind: 'grammar', exerciseIds: ['e1'] }],
  exercises: [{ id: 'e1', conceptId: 'c1', type: 'fill_gap', prompt: 'p', points: 1, accepted: ['a'] }],
};

beforeEach(() => localStorage.clear());

describe('loadProgress', () => {
  it('returns fresh state with empty progress per concept when nothing stored', () => {
    const s = loadProgress(content);
    expect(s.contentVersion).toBe('2');
    expect(s.concepts.c1.score).toBe(0);
  });
  it('resets when stored version mismatches', () => {
    saveProgress({ contentVersion: '1', concepts: { c1: { score: 5, mastered: true, recentExerciseIds: [], errorCount: 0 } } });
    expect(loadProgress(content).concepts.c1.score).toBe(0);
  });
  it('restores matching version', () => {
    saveProgress({ contentVersion: '2', concepts: { c1: { score: 3, mastered: false, recentExerciseIds: [], errorCount: 1 } } });
    expect(loadProgress(content).concepts.c1.score).toBe(3);
  });
});

describe('pushRecent', () => {
  it('caps window at min(poolSize-1, 5)', () => {
    expect(pushRecent(['a', 'b'], 'c', 3)).toEqual(['b', 'c']); // poolSize 3 -> window 2
    expect(pushRecent([], 'a', 1)).toEqual([]);                 // poolSize 1 -> window 0
  });
});
