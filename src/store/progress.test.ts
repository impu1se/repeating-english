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
  it('marks a concept mastered when a stored score already clears a lowered threshold', () => {
    // порог модуля 5; сохранён счёт 7, но mastered=false (записано при старом пороге 50)
    saveProgress({ contentVersion: '2', concepts: { c1: { score: 7, mastered: false, recentExerciseIds: [], errorCount: 0 } } });
    expect(loadProgress(content).concepts.c1.mastered).toBe(true);
  });
  it('leaves a below-threshold score unmastered', () => {
    saveProgress({ contentVersion: '2', concepts: { c1: { score: 4, mastered: false, recentExerciseIds: [], errorCount: 0 } } });
    expect(loadProgress(content).concepts.c1.mastered).toBe(false);
  });
});

describe('pushRecent', () => {
  it('accumulates until the pool is exhausted, then starts a new bag', () => {
    expect(pushRecent(['a'], 'b', 3)).toEqual(['a', 'b']);   // круг ещё не пройден
    expect(pushRecent(['a', 'b'], 'c', 3)).toEqual(['c']);   // пул исчерпан -> новый мешок
    expect(pushRecent([], 'a', 1)).toEqual([]);              // пул из одного упражнения
  });
  it('never lets the same exercise sit in the bag twice', () => {
    expect(pushRecent(['a', 'b'], 'a', 4)).toEqual(['b', 'a']);
  });
});
