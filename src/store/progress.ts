import type { Content } from '../types';
import { emptyConceptProgress, type ConceptProgress } from '../engine/scoring';

const KEY = 're:progress';

export interface ProgressState {
  contentVersion: string;
  concepts: Record<string, ConceptProgress>;
}

function freshState(content: Content): ProgressState {
  const concepts: Record<string, ConceptProgress> = {};
  for (const c of content.concepts) concepts[c.id] = emptyConceptProgress();
  return { contentVersion: content.version, concepts };
}

// conceptId -> порог его модуля; нужен, чтобы пересчитать mastered при загрузке
function thresholdByConcept(content: Content): Map<string, number> {
  const map = new Map<string, number>();
  for (const m of content.modules) {
    for (const cid of m.conceptIds) map.set(cid, m.masteryThreshold);
  }
  return map;
}

// Накладывает чужой набор концептов на текущий контент: неизвестные концепты
// отбрасываются, новые остаются нулевыми, освоенность пересчитывается по
// актуальному порогу модуля (порог мог снизиться с прошлого запуска).
export function mergeConcepts(
  content: Content,
  incoming: Record<string, ConceptProgress>,
): ProgressState {
  const merged = freshState(content);
  const thresholds = thresholdByConcept(content);
  for (const id of Object.keys(merged.concepts)) {
    const src = incoming[id];
    if (!src) continue;
    const restored = { ...emptyConceptProgress(), ...src };
    const threshold = thresholds.get(id);
    if (threshold !== undefined && restored.score >= threshold) restored.mastered = true;
    merged.concepts[id] = restored;
  }
  return merged;
}

export function loadProgress(content: Content): ProgressState {
  const raw = localStorage.getItem(KEY);
  if (!raw) return freshState(content);
  try {
    const parsed = JSON.parse(raw) as ProgressState;
    if (parsed.contentVersion !== content.version) return freshState(content);
    return mergeConcepts(content, parsed.concepts);
  } catch {
    return freshState(content);
  }
}

export function saveProgress(state: ProgressState): void {
  localStorage.setItem(KEY, JSON.stringify(state));
}

// «Мешок»: упражнение не повторяется, пока не показаны все остальные из пула.
// Когда круг пройден, мешок обнуляется — в нём остаётся только что показанная
// карточка, чтобы она не выпала дважды подряд на стыке кругов.
export function pushRecent(prev: string[], exerciseId: string, poolSize: number): string[] {
  if (poolSize <= 1) return [];
  const next = [...prev.filter((id) => id !== exerciseId), exerciseId];
  return next.length >= poolSize ? [exerciseId] : next;
}
