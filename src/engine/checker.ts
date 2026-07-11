import { normalize, tokenize } from './normalize';
import { wordDiff, levenshtein, type DiffToken } from './diff';
import type { Exercise } from '../types';

// Max edits (insert/delete/replace) to count as "close": words for phrases,
// characters when both answer and reference are single words.
export const CLOSE_THRESHOLD = 2;

export type Verdict =
  | { kind: 'correct' }
  | { kind: 'close'; diff: DiffToken[]; closest: string }
  | { kind: 'wrong'; accepted: string[] };

export function checkExact(answer: string, accepted: string[]): boolean {
  const a = normalize(answer);
  return accepted.some((ref) => normalize(ref) === a);
}

// Distance to the reference if the answer qualifies as "close", else null.
// Word-level distance is meaningless between single words (any word is one
// substitution away), so that case falls back to character distance: it keeps
// typos ("eatn" → "eaten") and rejects unrelated words ("pizza" → "eaten").
function closeDistance(answer: string, reference: string): number | null {
  const a = tokenize(answer);
  const b = tokenize(reference);
  if (a.length === 0) return null; // empty answer is never "close"
  const d =
    a.length === 1 && b.length === 1 ? levenshtein(a[0], b[0]) : levenshtein(a, b);
  return d <= CLOSE_THRESHOLD ? d : null;
}

export function checkFreeText(answer: string, accepted: string[]): Verdict {
  if (checkExact(answer, accepted)) return { kind: 'correct' };

  let closest: string | null = null;
  let best = Infinity;
  for (const ref of accepted) {
    const d = closeDistance(answer, ref);
    if (d !== null && d < best) {
      best = d;
      closest = ref;
    }
  }
  if (closest !== null) {
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
      // multi_gap and match_pairs are checked by their own renderers
      return checkExact(answer, accepted) ? { kind: 'correct' } : { kind: 'wrong', accepted };
  }
}
