import type { Content, Exercise } from '../types';
import type { ProgressState } from '../store/progress';

export function pickNextConcept(
  content: Content,
  moduleId: string,
  progress: ProgressState,
): string | null {
  const mod = content.modules.find((m) => m.id === moduleId);
  if (!mod) return null;

  let chosen: string | null = null;
  let bestScore = Infinity;
  for (const cid of mod.conceptIds) {
    const cp = progress.concepts[cid];
    if (!cp || cp.mastered) continue;
    if (cp.score < bestScore) {
      bestScore = cp.score;
      chosen = cid;
    }
  }
  return chosen;
}

export function pickNextExercise(
  content: Content,
  conceptId: string,
  progress: ProgressState,
): Exercise {
  const pool = content.exercises.filter((e) => e.conceptId === conceptId);
  const recent = new Set(progress.concepts[conceptId]?.recentExerciseIds ?? []);
  const fresh = pool.filter((e) => !recent.has(e.id));
  return (fresh[0] ?? pool[0]);
}
