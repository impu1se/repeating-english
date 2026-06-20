import { normalize } from './normalize';
import { wordDiff, diffDistance, type DiffToken } from './diff';
import type { Exercise } from '../types';

export const CLOSE_THRESHOLD = 2;

export type Verdict =
  | { kind: 'correct' }
  | { kind: 'close'; diff: DiffToken[]; closest: string }
  | { kind: 'wrong'; accepted: string[] };

export function checkExact(answer: string, accepted: string[]): boolean {
  const a = normalize(answer);
  return accepted.some((ref) => normalize(ref) === a);
}

export function checkFreeText(answer: string, accepted: string[]): Verdict {
  if (checkExact(answer, accepted)) return { kind: 'correct' };

  let closest = accepted[0];
  let best = Infinity;
  for (const ref of accepted) {
    const d = diffDistance(answer, ref);
    if (d < best) {
      best = d;
      closest = ref;
    }
  }
  if (best <= CLOSE_THRESHOLD) {
    return { kind: 'close', diff: wordDiff(answer, closest), closest };
  }
  return { kind: 'wrong', accepted };
}

export function checkExercise(exercise: Exercise, answer: string): Verdict {
  const accepted = exercise.accepted ?? [];
  switch (exercise.type) {
    case 'translate_ru_en':
    case 'fill_gap':
      return checkFreeText(answer, accepted);
    case 'verb_form':
    case 'choose_word':
    case 'word_order':
      return checkExact(answer, accepted) ? { kind: 'correct' } : { kind: 'wrong', accepted };
    default:
      // multi_gap and match_pairs are checked by their own renderers (Tasks 9, 11)
      return checkExact(answer, accepted) ? { kind: 'correct' } : { kind: 'wrong', accepted };
  }
}
