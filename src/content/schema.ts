import { normalize, tokenize } from '../engine/normalize';
import type { Content, Exercise } from '../types';

function duplicates(ids: string[]): string[] {
  const seen = new Set<string>();
  const dup = new Set<string>();
  for (const id of ids) (seen.has(id) ? dup : seen).add(id);
  return [...dup];
}

// Per-type field requirements. The runtime renderers assume these hold.
function validateExercise(e: Exercise): string[] {
  const errors: string[] = [];
  const need = (ok: unknown, msg: string) => {
    if (!ok) errors.push(`exercise ${e.id} (${e.type}): ${msg}`);
  };

  switch (e.type) {
    case 'translate_ru_en':
    case 'fill_gap':
    case 'verb_form':
      need(e.accepted?.length, 'accepted must be non-empty');
      break;
    case 'choose_word': {
      need((e.options?.length ?? 0) >= 2, 'needs at least 2 options');
      need(e.accepted?.length, 'accepted must be non-empty');
      if (e.options) {
        need(duplicates(e.options).length === 0, 'options must be unique');
        if (e.accepted?.length) {
          need(e.accepted.every((a) => e.options!.includes(a)), 'accepted must be among options');
        }
      }
      break;
    }
    case 'word_order': {
      need(e.bank?.length, 'bank must be non-empty');
      need(e.accepted?.length, 'accepted must be non-empty');
      if (e.bank?.length && e.accepted?.length) {
        // every accepted ordering must be assemblable from the bank tokens
        for (const ref of e.accepted) {
          const supply = new Map<string, number>();
          for (const w of e.bank) {
            const t = normalize(w);
            supply.set(t, (supply.get(t) ?? 0) + 1);
          }
          const buildable = tokenize(ref).every((t) => {
            const left = supply.get(t) ?? 0;
            if (left === 0) return false;
            supply.set(t, left - 1);
            return true;
          });
          need(buildable, `accepted "${ref}" is not assemblable from bank`);
        }
      }
      break;
    }
    case 'multi_gap': {
      need(e.gaps?.length, 'gaps must be non-empty');
      e.gaps?.forEach((g, i) => need(g.accepted.length, `gap ${i} has empty accepted`));
      if (e.gaps?.length) {
        const markers = (e.prompt.match(/_{2,}/g) ?? []).length;
        need(markers === e.gaps.length, `prompt has ${markers} gap markers for ${e.gaps.length} gaps`);
      }
      break;
    }
    case 'match_pairs': {
      need((e.pairs?.length ?? 0) >= 2, 'needs at least 2 pairs');
      if (e.pairs?.length) {
        need(duplicates(e.pairs.map((p) => p.en)).length === 0, 'en values must be unique');
        need(duplicates(e.pairs.map((p) => p.ru)).length === 0, 'ru values must be unique');
      }
      break;
    }
  }
  return errors;
}

export function validateContent(content: Content): string[] {
  const errors: string[] = [];

  for (const [what, ids] of [
    ['module', content.modules.map((m) => m.id)],
    ['concept', content.concepts.map((c) => c.id)],
    ['exercise', content.exercises.map((e) => e.id)],
  ] as const) {
    for (const id of duplicates([...ids])) errors.push(`duplicate ${what} id ${id}`);
  }

  const conceptIds = new Set(content.concepts.map((c) => c.id));
  const exerciseById = new Map(content.exercises.map((e) => [e.id, e]));

  for (const m of content.modules) {
    if (m.masteryThreshold < 1) errors.push(`module ${m.id} has masteryThreshold < 1`);
    for (const cid of m.conceptIds) {
      if (!conceptIds.has(cid)) errors.push(`module ${m.id} references missing concept ${cid}`);
    }
  }

  for (const c of content.concepts) {
    if (c.exerciseIds.length === 0) errors.push(`concept ${c.id} has no exercises`);
    for (const eid of c.exerciseIds) {
      const e = exerciseById.get(eid);
      if (!e) {
        errors.push(`concept ${c.id} references missing exercise ${eid}`);
      } else if (e.conceptId !== c.id) {
        // the scheduler builds pools by exercise.conceptId, so both sides must agree
        errors.push(`exercise ${eid} is listed by concept ${c.id} but has conceptId ${e.conceptId}`);
      }
    }
  }

  for (const e of content.exercises) {
    if (!conceptIds.has(e.conceptId)) {
      errors.push(`exercise ${e.id} references missing concept ${e.conceptId}`);
    }
    if (e.points < 1) errors.push(`exercise ${e.id} has points < 1`);
    errors.push(...validateExercise(e));
  }

  return errors;
}
