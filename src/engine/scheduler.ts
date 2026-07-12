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
    // mastered concepts stay in rotation — the gym never closes;
    // lowest score first keeps the weakest concept trained hardest
    const score = progress.concepts[cid]?.score ?? 0;
    if (score < bestScore) {
      bestScore = score;
      chosen = cid;
    }
  }
  return chosen;
}

export function pickNextExercise(
  content: Content,
  conceptId: string,
  progress: ProgressState,
  rng: () => number = Math.random,
): Exercise | null {
  const pool = content.exercises.filter((e) => e.conceptId === conceptId);
  if (pool.length === 0) return null;
  const recent = new Set(progress.concepts[conceptId]?.recentExerciseIds ?? []);
  const fresh = pool.filter((e) => !recent.has(e.id));
  const candidates = fresh.length > 0 ? fresh : pool;
  return candidates[Math.floor(rng() * candidates.length)] ?? candidates[0];
}
