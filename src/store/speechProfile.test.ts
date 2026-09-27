import { describe, it, expect } from 'vitest';
import { content } from '../content';
import { parseSpeechProfile } from './speechProfile';

const known = content.concepts.find((c) => c.kind === 'grammar')!.id;

function profile(errors: unknown[], extra: Record<string, unknown> = {}) {
  return JSON.stringify({
    app: 'english-gym',
    format: 1,
    recordedAt: '2026-09-27',
    wordCount: 300,
    contentVersion: content.version,
    errors,
    ...extra,
  });
}

describe('разбор профиля речи', () => {
  it('превращает ошибки в замер', () => {
    const result = parseSpeechProfile(
      profile([{ conceptId: known, label: 'артикли', count: 7, examples: ['I went to shop'] }]),
      content,
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.measurement.date).toBe('2026-09-27');
    expect(result.measurement.wordCount).toBe(300);
    expect(result.measurement.errors[known]).toBe(7);
    expect(result.mapped).toBe(1);
  });

  it('ошибку без концепта кладёт в неразмеченные', () => {
    const result = parseSpeechProfile(
      profile([{ conceptId: null, label: 'предлоги места', count: 3 }]),
      content,
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.measurement.errors).toEqual({});
    expect(result.measurement.unmapped).toEqual([{ label: 'предлоги места', count: 3 }]);
    expect(result.unmapped).toBe(1);
  });

  it('неизвестный концепт не отвергает файл, а уходит в неразмеченные', () => {
    const result = parseSpeechProfile(
      profile([{ conceptId: 'concept-from-another-build', label: 'что-то', count: 2 }]),
      content,
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.measurement.errors).toEqual({});
    expect(result.measurement.unmapped).toEqual([{ label: 'что-то', count: 2 }]);
  });

  it('складывает повторы одного концепта', () => {
    const result = parseSpeechProfile(
      profile([
        { conceptId: known, label: 'артикли', count: 2 },
        { conceptId: known, label: 'артикли снова', count: 3 },
      ]),
      content,
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.measurement.errors[known]).toBe(5);
  });

  it('объясняет, что файл не тот', () => {
    expect(parseSpeechProfile('не json', content)).toEqual({ ok: false, error: 'Это не JSON' });
    expect(parseSpeechProfile('{"hello":1}', content)).toEqual({
      ok: false,
      error: 'Файл не похож на разбор речи',
    });
    expect(parseSpeechProfile(profile([], { format: 99 }), content)).toEqual({
      ok: false,
      error: 'Разбор сделан более новой версией приложения',
    });
    expect(parseSpeechProfile(profile([], { wordCount: 0 }), content)).toEqual({
      ok: false,
      error: 'В разборе нет числа слов — без него не посчитать частоту',
    });
  });
});
