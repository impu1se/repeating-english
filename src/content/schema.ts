import type { Content } from '../types';

export function validateContent(content: Content): string[] {
  const errors: string[] = [];
  const conceptIds = new Set(content.concepts.map((c) => c.id));
  const exerciseIds = new Set(content.exercises.map((e) => e.id));

  for (const m of content.modules) {
    for (const cid of m.conceptIds) {
      if (!conceptIds.has(cid)) errors.push(`module ${m.id} references missing concept ${cid}`);
    }
  }
  for (const c of content.concepts) {
    for (const eid of c.exerciseIds) {
      if (!exerciseIds.has(eid)) errors.push(`concept ${c.id} references missing exercise ${eid}`);
    }
  }
  for (const c of content.concepts) {
    if (c.exerciseIds.length === 0) errors.push(`concept ${c.id} has no exercises`);
  }
  return errors;
}
