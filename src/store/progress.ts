import type { Content } from '../types';
import { emptyConceptProgress, type ConceptProgress } from '../engine/scoring';

const KEY = 're:progress';
export const RECENT_WINDOW = 5;

export interface ProgressState {
  contentVersion: string;
  concepts: Record<string, ConceptProgress>;
}

function freshState(content: Content): ProgressState {
  const concepts: Record<string, ConceptProgress> = {};
  for (const c of content.concepts) concepts[c.id] = emptyConceptProgress();
  return { contentVersion: content.version, concepts };
}

export function loadProgress(content: Content): ProgressState {
  const raw = localStorage.getItem(KEY);
  if (!raw) return freshState(content);
  try {
    const parsed = JSON.parse(raw) as ProgressState;
    if (parsed.contentVersion !== content.version) return freshState(content);
    // ensure every current concept has an entry
    const merged = freshState(content);
    for (const id of Object.keys(merged.concepts)) {
      if (parsed.concepts[id]) merged.concepts[id] = parsed.concepts[id];
    }
    return merged;
  } catch {
    return freshState(content);
  }
}

export function saveProgress(state: ProgressState): void {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function pushRecent(prev: string[], exerciseId: string, poolSize: number): string[] {
  const window = Math.min(poolSize - 1, RECENT_WINDOW);
  if (window <= 0) return [];
  return [...prev, exerciseId].slice(-window);
}
