import type { Content } from '../types';
import type { FocusState, ProgressState } from '../store/progress';
import { conceptErrorStats } from './speechStats';

export const FOCUS_DAYS = 7;

// Пока замеров речи нет, слабое место ищем по ошибкам в упражнениях.
// По наименьшему счёту искать нельзя: ноль — это пол, и такой поиск всегда
// указывал бы на концепт, которого просто не касались.
function fallbackFocus(content: Content, progress: ProgressState): string | null {
  let best: string | null = null;
  let bestErrors = 0;
  let bestScore = Infinity;
  for (const c of content.concepts) {
    if (c.kind !== 'grammar') continue;
    const p = progress.concepts[c.id];
    if (!p || p.errorCount === 0) continue;
    if (p.errorCount > bestErrors || (p.errorCount === bestErrors && p.score < bestScore)) {
      best = c.id;
      bestErrors = p.errorCount;
      bestScore = p.score;
    }
  }
  return best;
}

export function suggestFocus(content: Content, progress: ProgressState): string | null {
  const stats = conceptErrorStats(content, progress.measurements);
  if (stats.length > 0) return stats[0].conceptId;
  return fallbackFocus(content, progress);
}

export function focusExpired(focus: FocusState | null, today: string): boolean {
  if (focus === null) return false;
  const started = Date.parse(focus.startedAt + 'T00:00:00Z');
  const now = Date.parse(today + 'T00:00:00Z');
  if (Number.isNaN(started) || Number.isNaN(now)) return false;
  return (now - started) / 86_400_000 >= FOCUS_DAYS;
}
