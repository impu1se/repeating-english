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

  it('складывает повторы неразмеченных ошибок с одинаковой меткой', () => {
    const result = parseSpeechProfile(
      profile([
        { conceptId: null, label: 'предлоги места', count: 2 },
        { conceptId: null, label: 'предлоги места', count: 3 },
      ]),
      content,
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.measurement.unmapped).toEqual([{ label: 'предлоги места', count: 5 }]);
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

  it('отвергает дробное число повторов', () => {
    const result = parseSpeechProfile(
      profile([{ conceptId: known, label: 'артикли', count: 2.5 }]),
      content,
    );
    expect(result).toEqual({
      ok: false,
      error: 'Разбор испорчен: у ошибки «артикли» число повторов не целое положительное',
    });
  });

  it('отвергает бесконечное число повторов', () => {
    // 1e400 парсится в Infinity
    const result = parseSpeechProfile(
      `{"app":"english-gym","format":1,"recordedAt":"2026-09-27","wordCount":300,"contentVersion":"${content.version}","errors":[{"conceptId":"${known}","label":"артикли","count":1e400}]}`,
      content,
    );
    expect(result).toEqual({
      ok: false,
      error: 'Разбор испорчен: у ошибки «артикли» число повторов не целое положительное',
    });
  });

  it('отвергает строку в поле count', () => {
    const result = parseSpeechProfile(
      profile([{ conceptId: known, label: 'артикли', count: '7' }]),
      content,
    );
    expect(result).toEqual({
      ok: false,
      error: 'Разбор испорчен: у ошибки «артикли» число повторов не целое положительное',
    });
  });

  it('отвергает ошибку без названия', () => {
    const result = parseSpeechProfile(
      profile([{ conceptId: known, label: undefined, count: 5 }]),
      content,
    );
    expect(result).toEqual({
      ok: false,
      error: 'Разбор испорчен: у одной из ошибок нет названия',
    });
  });

  it('отвергает плохую дату', () => {
    expect(
      parseSpeechProfile(profile([], { recordedAt: 'not-a-date' }), content),
    ).toEqual({
      ok: false,
      error: 'Разбор испорчен: дата записи должна быть в виде 2026-09-27',
    });
    expect(parseSpeechProfile(profile([], { recordedAt: '' }), content)).toEqual({
      ok: false,
      error: 'Разбор испорчен: дата записи должна быть в виде 2026-09-27',
    });
    expect(parseSpeechProfile(profile([], { recordedAt: 123 }), content)).toEqual({
      ok: false,
      error: 'Разбор испорчен: дата записи должна быть в виде 2026-09-27',
    });
  });

  it('отвергает errors, если это не массив', () => {
    const result = parseSpeechProfile(
      JSON.stringify({
        app: 'english-gym',
        format: 1,
        recordedAt: '2026-09-27',
        wordCount: 300,
        contentVersion: content.version,
        errors: { some: 'object' },
      }),
      content,
    );
    expect(result).toEqual({
      ok: false,
      error: 'Файл не похож на разбор речи',
    });
  });

  it('отвергает некорректную календарную дату (месяц 13)', () => {
    const result = parseSpeechProfile(profile([], { recordedAt: '2026-13-45' }), content);
    expect(result).toEqual({
      ok: false,
      error: 'Разбор испорчен: дата записи должна быть в виде 2026-09-27',
    });
  });

  it('отвергает некорректную календарную дату (февраль 30)', () => {
    const result = parseSpeechProfile(profile([], { recordedAt: '2026-02-30' }), content);
    expect(result).toEqual({
      ok: false,
      error: 'Разбор испорчен: дата записи должна быть в виде 2026-09-27',
    });
  });

  it('отвергает дробное число слов', () => {
    const result = parseSpeechProfile(profile([], { wordCount: 300.5 }), content);
    expect(result).toEqual({
      ok: false,
      error: 'В разборе нет числа слов — без него не посчитать частоту',
    });
  });
});
