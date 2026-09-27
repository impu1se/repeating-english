import { describe, it, expect, beforeEach } from 'vitest';
import { loadProgress, saveProgress, pushRecent, isMeasurement } from './progress';
import type { Content } from '../types';

const content: Content = {
  version: '2',
  modules: [{ id: 'm', title: 'M', level: 'A1', masteryThreshold: 5, conceptIds: ['c1'] }],
  concepts: [{ id: 'c1', moduleId: 'm', title: 'C', kind: 'grammar', exerciseIds: ['e1'] }],
  exercises: [{ id: 'e1', conceptId: 'c1', type: 'fill_gap', prompt: 'p', points: 1, accepted: ['a'] }],
};

beforeEach(() => localStorage.clear());

describe('loadProgress', () => {
  it('returns fresh state with empty progress per concept when nothing stored', () => {
    const s = loadProgress(content);
    expect(s.contentVersion).toBe('2');
    expect(s.concepts.c1.score).toBe(0);
  });
  it('resets when stored version mismatches', () => {
    saveProgress({ contentVersion: '1', concepts: { c1: { score: 5, mastered: true, recentExerciseIds: [], errorCount: 0 } }, measurements: [], focus: null, daily: null });
    expect(loadProgress(content).concepts.c1.score).toBe(0);
  });
  it('restores matching version', () => {
    saveProgress({ contentVersion: '2', concepts: { c1: { score: 3, mastered: false, recentExerciseIds: [], errorCount: 1 } }, measurements: [], focus: null, daily: null });
    expect(loadProgress(content).concepts.c1.score).toBe(3);
  });
  it('marks a concept mastered when a stored score already clears a lowered threshold', () => {
    // порог модуля 5; сохранён счёт 7, но mastered=false (записано при старом пороге 50)
    saveProgress({ contentVersion: '2', concepts: { c1: { score: 7, mastered: false, recentExerciseIds: [], errorCount: 0 } }, measurements: [], focus: null, daily: null });
    expect(loadProgress(content).concepts.c1.mastered).toBe(true);
  });
  it('leaves a below-threshold score unmastered', () => {
    saveProgress({ contentVersion: '2', concepts: { c1: { score: 4, mastered: false, recentExerciseIds: [], errorCount: 0 } }, measurements: [], focus: null, daily: null });
    expect(loadProgress(content).concepts.c1.mastered).toBe(false);
  });
});

describe('pushRecent', () => {
  it('accumulates until the pool is exhausted, then starts a new bag', () => {
    expect(pushRecent(['a'], 'b', 3)).toEqual(['a', 'b']);   // круг ещё не пройден
    expect(pushRecent(['a', 'b'], 'c', 3)).toEqual(['c']);   // пул исчерпан -> новый мешок
    expect(pushRecent([], 'a', 1)).toEqual([]);              // пул из одного упражнения
  });
  it('never lets the same exercise sit in the bag twice', () => {
    expect(pushRecent(['a', 'b'], 'a', 4)).toEqual(['b', 'a']);
  });
});

describe('поля верхнего уровня переживают перезапуск', () => {
  it('сохраняет замеры, фокус и день', () => {
    const state = loadProgress(content);
    state.measurements = [
      { date: '2026-09-27', wordCount: 300, errors: { 'a1-some-any': 4 }, unmapped: [{ label: 'предлоги', count: 2 }] },
    ];
    state.focus = { conceptId: 'a1-some-any', startedAt: '2026-09-27' };
    state.daily = { date: '2026-09-27', listened: true, recorded: false, reviewed: false, focusDrills: 3 };
    saveProgress(state);

    const reloaded = loadProgress(content);

    expect(reloaded.measurements).toEqual(state.measurements);
    expect(reloaded.focus).toEqual(state.focus);
    expect(reloaded.daily).toEqual(state.daily);
  });

  it('у нового пользователя поля пустые, а не undefined', () => {
    const fresh = loadProgress(content);
    expect(fresh.measurements).toEqual([]);
    expect(fresh.focus).toBeNull();
    expect(fresh.daily).toBeNull();
  });

  it('старая запись без новых полей читается без падения', () => {
    localStorage.setItem('re:progress', JSON.stringify({ contentVersion: content.version, concepts: {} }));
    const loaded = loadProgress(content);
    expect(loaded.measurements).toEqual([]);
    expect(loaded.focus).toBeNull();
  });
});

describe('бамп версии контента', () => {
  const contentV3: Content = {
    version: '3',
    modules: [{ id: 'm', title: 'M', level: 'A1', masteryThreshold: 5, conceptIds: ['c1'] }],
    concepts: [{ id: 'c1', moduleId: 'm', title: 'C', kind: 'grammar', exerciseIds: ['e1'] }],
    exercises: [{ id: 'e1', conceptId: 'c1', type: 'fill_gap', prompt: 'p', points: 1, accepted: ['a'] }],
  };
  // Тот же номер версии, но концепт 'c1' в сборке уже не существует —
  // проверяет, что фокус на пропавший концепт не переживает бамп.
  const contentV3NoC1: Content = { version: '3', modules: [], concepts: [], exercises: [] };

  it('стирает концепты, но не замеры речи и не состояние дня', () => {
    const state = loadProgress(content);
    state.concepts.c1.score = 9;
    state.measurements = [{ date: '2026-09-27', wordCount: 100, errors: { c1: 2 }, unmapped: [] }];
    state.daily = { date: '2026-09-27', listened: true, recorded: false, reviewed: false, focusDrills: 4 };
    saveProgress(state);

    const reloaded = loadProgress(contentV3);

    expect(reloaded.contentVersion).toBe('3');
    expect(reloaded.concepts.c1.score).toBe(0);
    expect(reloaded.measurements).toEqual(state.measurements);
    expect(reloaded.daily).toEqual(state.daily);
  });

  it('переносит фокус, только если концепт остался в новом контенте', () => {
    const state = loadProgress(content);
    state.focus = { conceptId: 'c1', startedAt: '2026-09-20' };
    saveProgress(state);

    expect(loadProgress(contentV3).focus).toEqual(state.focus);
    expect(loadProgress(contentV3NoC1).focus).toBeNull();
  });
});

describe('isMeasurement', () => {
  const valid = { date: '2026-09-27', wordCount: 100, errors: { c1: 2 }, unmapped: [{ label: 'x', count: 1 }] };

  it('принимает корректный замер', () => {
    expect(isMeasurement(valid)).toBe(true);
  });

  it('отвергает не строку или не ту форму даты', () => {
    expect(isMeasurement({ ...valid, date: '27-09-2026' })).toBe(false);
    expect(isMeasurement({ ...valid, date: 123 })).toBe(false);
  });

  it('отвергает нецелый или неположительный wordCount', () => {
    expect(isMeasurement({ ...valid, wordCount: 0 })).toBe(false);
    expect(isMeasurement({ ...valid, wordCount: 1.5 })).toBe(false);
  });

  it('отвергает errors с нечисловым, неположительным значением или errors-массив', () => {
    expect(isMeasurement({ ...valid, errors: { c1: 0 } })).toBe(false);
    expect(isMeasurement({ ...valid, errors: { c1: 'два' } })).toBe(false);
    expect(isMeasurement({ ...valid, errors: [] })).toBe(false);
  });

  it('отвергает unmapped без непустого label или положительного count', () => {
    expect(isMeasurement({ ...valid, unmapped: [{ label: '', count: 1 }] })).toBe(false);
    expect(isMeasurement({ ...valid, unmapped: [{ label: 'x', count: 0 }] })).toBe(false);
    expect(isMeasurement({ ...valid, unmapped: 'нет' })).toBe(false);
  });

  it('отвергает не-объект', () => {
    expect(isMeasurement(null)).toBe(false);
    expect(isMeasurement('строка')).toBe(false);
  });
});

describe('loadProgress отбрасывает испорченные замеры вместо падения', () => {
  it('оставляет только валидный элемент', () => {
    localStorage.setItem('re:progress', JSON.stringify({
      contentVersion: content.version,
      concepts: {},
      measurements: [
        { date: '2026-09-27', wordCount: 100, errors: { c1: 2 }, unmapped: [] },
        { date: 'не дата', wordCount: 100, errors: {}, unmapped: [] },
      ],
      focus: null,
      daily: null,
    }));

    const loaded = loadProgress(content);

    expect(loaded.measurements).toHaveLength(1);
    expect(loaded.measurements[0].date).toBe('2026-09-27');
  });
});
