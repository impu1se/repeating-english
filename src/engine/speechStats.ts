import type { Content } from '../types';
import type { Measurement } from '../store/progress';

export interface ConceptErrorStat {
  conceptId: string;
  title: string;
  last: number; // ошибок в последнем замере
  per100: number; // на сто слов, последний замер
  prevPer100: number | null;
  trend: 'new' | 'down' | 'up' | 'flat';
}

const per100 = (count: number, words: number) =>
  words > 0 ? Math.round((count / words) * 1000) / 10 : 0;

function trendOf(now: number, prev: number | null): ConceptErrorStat['trend'] {
  if (prev === null) return 'new';
  // полделения шкалы — чтобы шум округления не выглядел как движение
  if (now < prev - 0.05) return 'down';
  if (now > prev + 0.05) return 'up';
  return 'flat';
}

export function conceptErrorStats(content: Content, measurements: Measurement[]): ConceptErrorStat[] {
  if (measurements.length === 0) return [];
  const sorted = [...measurements].sort((a, b) => a.date.localeCompare(b.date));
  const last = sorted[sorted.length - 1];
  const prev = sorted.length > 1 ? sorted[sorted.length - 2] : null;

  // Концепт из предыдущего замера, исчезнувший в последнем, — это исправленная
  // ошибка. Её показываем нулём: иначе главное событие проходит молча.
  const ids = new Set([...Object.keys(last.errors), ...Object.keys(prev?.errors ?? {})]);

  const rows: ConceptErrorStat[] = [];
  for (const id of ids) {
    const concept = content.concepts.find((c) => c.id === id);
    if (!concept) continue;
    const lastCount = last.errors[id] ?? 0;
    const nowRate = per100(lastCount, last.wordCount);
    const prevRate = prev ? per100(prev.errors[id] ?? 0, prev.wordCount) : null;
    rows.push({
      conceptId: id,
      title: concept.title,
      last: lastCount,
      per100: nowRate,
      prevPer100: prevRate,
      trend: trendOf(nowRate, prevRate),
    });
  }
  return rows.sort((x, y) => y.per100 - x.per100);
}

export function unmappedErrorStats(content: Content, measurements: Measurement[]): { label: string; last: number }[] {
  if (measurements.length === 0) return [];
  const sorted = [...measurements].sort((a, b) => a.date.localeCompare(b.date));
  const last = sorted[sorted.length - 1];
  const rows = last.unmapped.map((u) => ({ label: u.label, last: u.count }));
  const known = new Set(content.concepts.map((c) => c.id));
  // Концепт, которого больше нет в текущей сборке (например, после бампа
  // версии контента — см. loadProgress), не должен пропадать молча:
  // показываем его тут же, под собственным id вместо названия.
  for (const [id, count] of Object.entries(last.errors)) {
    if (!known.has(id)) rows.push({ label: id, last: count });
  }
  return rows;
}
