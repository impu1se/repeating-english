export interface ConceptProgress {
  score: number;
  mastered: boolean;
  recentExerciseIds: string[];
  errorCount: number;
}

export function emptyConceptProgress(): ConceptProgress {
  return { score: 0, mastered: false, recentExerciseIds: [], errorCount: 0 };
}

export function applyAnswer(
  prev: ConceptProgress,
  correct: boolean,
  points: number,
  threshold: number,
): ConceptProgress {
  if (correct) {
    const score = Math.min(threshold, prev.score + points);
    return { ...prev, score, mastered: score >= threshold };
  }
  return { ...prev, score: Math.max(0, prev.score - 1), errorCount: prev.errorCount + 1 };
}

export function isModuleComplete(
  conceptIds: string[],
  progress: Record<string, ConceptProgress>,
): boolean {
  return conceptIds.every((id) => progress[id]?.mastered === true);
}
