import { describe, it, expect } from 'vitest';
import { content } from '../content';
import { suggestFocus, focusExpired, FOCUS_DAYS } from './focus';
import { emptyConceptProgress, type ConceptProgress } from './scoring';
import type { ProgressState } from '../store/progress';

const grammar = content.concepts.filter((c) => c.kind === 'grammar');
const a = grammar[0].id;
const b = grammar[1].id;

function state(concepts: Record<string, Partial<ConceptProgress>>, measurements: ProgressState['measurements'] = []): ProgressState {
  const all: Record<string, ConceptProgress> = {};
  for (const c of content.concepts) all[c.id] = emptyConceptProgress();
  for (const [id, patch] of Object.entries(concepts)) all[id] = { ...all[id], ...patch };
  return { contentVersion: content.version, concepts: all, measurements, focus: null, daily: null };
}

describe('выбор фокуса', () => {
  it('берёт самую частую ошибку речи, когда есть замеры', () => {
    const s = state({}, [{ date: '2026-09-27', wordCount: 100, errors: { [b]: 5, [a]: 1 }, unmapped: [] }]);
    expect(suggestFocus(content, s)).toBe(b);
  });

  it('без замеров берёт концепт с наибольшим числом ошибок в упражнениях', () => {
    const s = state({ [a]: { errorCount: 2, score: 30 }, [b]: { errorCount: 9, score: 30 } });
    expect(suggestFocus(content, s)).toBe(b);
  });

  it('при равенстве ошибок берёт меньший счёт', () => {
    const s = state({ [a]: { errorCount: 4, score: 30 }, [b]: { errorCount: 4, score: 5 } });
    expect(suggestFocus(content, s)).toBe(b);
  });

  it('не предлагает концепт, которого не касались', () => {
    expect(suggestFocus(content, state({}))).toBeNull();
  });

  it('неделя истекает на седьмой день', () => {
    const focus = { conceptId: a, startedAt: '2026-09-20' };
    expect(focusExpired(focus, '2026-09-26')).toBe(false);
    expect(focusExpired(focus, '2026-09-27')).toBe(true);
    expect(focusExpired(null, '2026-09-27')).toBe(false);
    expect(FOCUS_DAYS).toBe(7);
  });
});
