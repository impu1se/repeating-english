import { describe, it, expect } from 'vitest';
import { emptyConceptProgress, applyAnswer, isModuleComplete } from './scoring';

describe('applyAnswer', () => {
  it('adds points on correct with no cap', () => {
    const p = applyAnswer({ score: 49, mastered: false, recentExerciseIds: [], errorCount: 0 }, true, 2, 50);
    expect(p.score).toBe(51);
    expect(p.mastered).toBe(true);
  });
  it('keeps growing past the threshold', () => {
    const p = applyAnswer({ score: 60, mastered: true, recentExerciseIds: [], errorCount: 0 }, true, 1, 50);
    expect(p.score).toBe(61);
    expect(p.mastered).toBe(true);
  });
  it('subtracts 1 on wrong, never below 0, counts error', () => {
    const p = applyAnswer(emptyConceptProgress(), false, 2, 50);
    expect(p.score).toBe(0);
    expect(p.errorCount).toBe(1);
    expect(p.mastered).toBe(false);
  });
  it('mastered is sticky: a wrong answer below the threshold does not revoke it', () => {
    const p = applyAnswer({ score: 50, mastered: true, recentExerciseIds: [], errorCount: 0 }, false, 1, 50);
    expect(p.score).toBe(49);
    expect(p.mastered).toBe(true);
  });
  it('does not mutate the input', () => {
    const prev = emptyConceptProgress();
    applyAnswer(prev, true, 1, 50);
    expect(prev.score).toBe(0);
  });
});

describe('isModuleComplete', () => {
  it('true only when every concept is mastered', () => {
    const progress = {
      c1: { score: 5, mastered: true, recentExerciseIds: [], errorCount: 0 },
      c2: { score: 3, mastered: false, recentExerciseIds: [], errorCount: 0 },
    };
    expect(isModuleComplete(['c1'], progress)).toBe(true);
    expect(isModuleComplete(['c1', 'c2'], progress)).toBe(false);
    expect(isModuleComplete(['c1', 'missing'], progress)).toBe(false);
  });
});
