import { describe, it, expect } from 'vitest';
import { freshDay, ensureToday, isDayComplete, FOCUS_DRILLS_PER_DAY } from './daily';

describe('состояние дня', () => {
  it('новый день пустой', () => {
    expect(freshDay('2026-09-27')).toEqual({
      date: '2026-09-27',
      listened: false,
      recorded: false,
      reviewed: false,
      focusDrills: 0,
    });
  });

  it('вчерашний день заменяется свежим', () => {
    const yesterday = { date: '2026-09-26', listened: true, recorded: true, reviewed: true, focusDrills: 8 };
    expect(ensureToday(yesterday, '2026-09-27')).toEqual(freshDay('2026-09-27'));
  });

  it('сегодняшний день сохраняется как есть', () => {
    const today = { date: '2026-09-27', listened: true, recorded: false, reviewed: false, focusDrills: 3 };
    expect(ensureToday(today, '2026-09-27')).toBe(today);
  });

  it('пустое состояние превращается в свежий день', () => {
    expect(ensureToday(null, '2026-09-27')).toEqual(freshDay('2026-09-27'));
  });

  it('день закрыт только когда закрыто всё', () => {
    const full = { date: '2026-09-27', listened: true, recorded: true, reviewed: true, focusDrills: FOCUS_DRILLS_PER_DAY };
    expect(isDayComplete(full)).toBe(true);
    expect(isDayComplete({ ...full, listened: false })).toBe(false);
    expect(isDayComplete({ ...full, focusDrills: FOCUS_DRILLS_PER_DAY - 1 })).toBe(false);
  });

  it('норма заданий фокуса — восемь', () => {
    expect(FOCUS_DRILLS_PER_DAY).toBe(8);
  });
});
