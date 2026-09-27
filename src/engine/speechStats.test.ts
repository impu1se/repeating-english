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
    const stats = unmappedErrorStats(content, [
      m('2026-09-20', 100, {}, [{ label: 'старое', count: 9 }]),
      m('2026-09-27', 100, {}, [{ label: 'предлоги места', count: 3 }]),
    ]);
    expect(stats).toEqual([{ label: 'предлоги места', last: 3 }]);
  });

  it('концепт, которого больше нет в контенте, попадает в неразмеченные под своим id', () => {
    const stats = unmappedErrorStats(content, [
      m('2026-09-27', 100, { [a]: 2, 'ушедший-концепт': 4 }),
    ]);
    expect(stats).toContainEqual({ label: 'ушедший-концепт', last: 4 });
    // известный концепт в этот список не попадает — у него есть своя строка
    expect(stats.some((s) => s.label === a)).toBe(false);
  });

  it('игнорирует порядок массива и сортирует по дате', () => {
    const stats1 = conceptErrorStats(content, [
      m('2026-09-20', 100, { [a]: 12 }),
      m('2026-09-27', 200, { [a]: 6 }),
    ]);
    const stats2 = conceptErrorStats(content, [
      m('2026-09-27', 200, { [a]: 6 }),
      m('2026-09-20', 100, { [a]: 12 }),
    ]);
    const row1 = stats1.find((s) => s.conceptId === a)!;
    const row2 = stats2.find((s) => s.conceptId === a)!;
    expect(row1.trend).toBe('down');
    expect(row2.trend).toBe('down');
    expect(row1.per100).toBe(row2.per100);
    expect(row1.prevPer100).toBe(row2.prevPer100);
  });

  it('показывает тренд «вверх»', () => {
    const stats = conceptErrorStats(content, [
      m('2026-09-20', 200, { [a]: 6 }),
      m('2026-09-27', 100, { [a]: 6 }),
    ]);
    const row = stats.find((s) => s.conceptId === a)!;
    expect(row.per100).toBe(6);
    expect(row.prevPer100).toBe(3);
    expect(row.trend).toBe('up');
  });

  it('показывает тренд «плоский»', () => {
    const stats = conceptErrorStats(content, [
      m('2026-09-20', 100, { [a]: 3 }),
      m('2026-09-27', 100, { [a]: 3 }),
    ]);
    const row = stats.find((s) => s.conceptId === a)!;
    expect(row.per100).toBe(3);
    expect(row.prevPer100).toBe(3);
    expect(row.trend).toBe('flat');
  });

  it('не путает появившуюся ошибку с исчезнувшей', () => {
    const stats = conceptErrorStats(content, [
      m('2026-09-20', 100, { [a]: 4 }),
      m('2026-09-27', 100, { [b]: 2 }),
    ]);
    const rowA = stats.find((s) => s.conceptId === a)!;
    const rowB = stats.find((s) => s.conceptId === b)!;
    // Исчезнувшая ошибка: было 4, стало 0 — стрелка вниз
    expect(rowA.last).toBe(0);
    expect(rowA.per100).toBe(0);
    expect(rowA.trend).toBe('down');
    // Появившаяся ошибка: было 0, стало 2 — не улучшение, а ухудшение
    expect(rowB.last).toBe(2);
    expect(rowB.per100).toBe(2);
    expect(rowB.trend).toBe('up');
  });
});
