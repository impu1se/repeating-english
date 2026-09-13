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
    const score = prev.score + points;
    // no cap: the score is total volume of work, gym-style;
    // mastered is sticky — once earned, never revoked
    return { ...prev, score, mastered: prev.mastered || score >= threshold };
  }
  return { ...prev, score: Math.max(0, prev.score - 1), errorCount: prev.errorCount + 1 };
}

export function isModuleComplete(
  conceptIds: string[],
  progress: Record<string, ConceptProgress>,
): boolean {
  return conceptIds.every((id) => progress[id]?.mastered === true);
}

// Прогресс по модулю целиком. Счёт каждого концепта обрезается порогом, поэтому
// сумма только растёт и упирается в total — в отличие от счёта отдельного
// концепта, который в шапке «прыгает», когда планировщик переключается на самый
// слабый концепт. Именно это число читается как «прогресс по карточке».
export function moduleProgress(
  conceptIds: string[],
  progress: Record<string, ConceptProgress>,
  threshold: number,
): { score: number; total: number } {
  const score = conceptIds.reduce(
    (sum, id) => sum + Math.min(progress[id]?.score ?? 0, threshold),
    0,
  );
  return { score, total: threshold * conceptIds.length };
}
