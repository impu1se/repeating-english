import { describe, it, expect } from 'vitest';
import { content } from '../content';
import { conceptErrorStats, unmappedErrorStats } from './speechStats';
import type { Measurement } from '../store/progress';

const grammar = content.concepts.filter((c) => c.kind === 'grammar');
const a = grammar[0].id;
const b = grammar[1].id;

const m = (date: string, wordCount: number, errors: Record<string, number>, unmapped: { label: string; count: number }[] = []): Measurement =>
  ({ date, wordCount, errors, unmapped });

describe('частоты ошибок речи', () => {
  it('считает частоту на сто слов по последнему замеру', () => {
    const stats = conceptErrorStats(content, [m('2026-09-27', 200, { [a]: 6 })]);
    const row = stats.find((s) => s.conceptId === a)!;
    expect(row.last).toBe(6);
    expect(row.per100).toBe(3);
    expect(row.prevPer100).toBeNull();
    expect(row.trend).toBe('new');
  });

  it('сравнивает с предыдущим замером, а не с суммой', () => {
    const stats = conceptErrorStats(content, [
      m('2026-09-20', 100, { [a]: 12 }),
      m('2026-09-27', 200, { [a]: 6 }),
    ]);
    const row = stats.find((s) => s.conceptId === a)!;
    expect(row.per100).toBe(3);
    expect(row.prevPer100).toBe(12);
    expect(row.trend).toBe('down');
  });

  it('показывает исчезнувшую ошибку нулём со стрелкой вниз', () => {
    const stats = conceptErrorStats(content, [
      m('2026-09-20', 100, { [a]: 4 }),
      m('2026-09-27', 100, {}),
    ]);
    const row = stats.find((s) => s.conceptId === a)!;
    expect(row.last).toBe(0);
    expect(row.per100).toBe(0);
    expect(row.trend).toBe('down');
  });

  it('сортирует по убыванию частоты', () => {
    const stats = conceptErrorStats(content, [m('2026-09-27', 100, { [a]: 1, [b]: 5 })]);
    expect(stats[0].conceptId).toBe(b);
  });

  it('подставляет название концепта', () => {
    const stats = conceptErrorStats(content, [m('2026-09-27', 100, { [a]: 1 })]);
    expect(stats[0].title).toBe(grammar[0].title);
  });

  it('на пустой истории возвращает пусто', () => {
    expect(conceptErrorStats(content, [])).toEqual([]);
  });

  it('отдаёт неразмеченные ошибки последнего замера', () => {
    const stats = unmappedErrorStats([
      m('2026-09-20', 100, {}, [{ label: 'старое', count: 9 }]),
      m('2026-09-27', 100, {}, [{ label: 'предлоги места', count: 3 }]),
    ]);
    expect(stats).toEqual([{ label: 'предлоги места', last: 3 }]);
  });
});
