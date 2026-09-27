import type { Content } from '../types';
import type { Measurement } from './progress';

// Версия формата файла разбора. Растёт, когда в него добавится несовместимое —
// например, лексические ошибки во второй волне.
export const PROFILE_FORMAT = 1;

export interface SpeechProfileError {
  conceptId: string | null;
  label: string;
  count: number;
  examples?: string[];
}

export interface SpeechProfileFile {
  app: 'english-gym';
  format: number;
  recordedAt: string;
  wordCount: number;
  contentVersion: string;
  errors: SpeechProfileError[];
}

export type ProfileParseResult =
  | { ok: true; measurement: Measurement; mapped: number; unmapped: number }
  | { ok: false; error: string };

// Проверяет, что дата в формате YYYY-MM-DD и является корректной календарной датой.
// Использует round-trip подход: парсит дату, создаёт Date, форматирует обратно и сравнивает.
// Это отвергает некорректные даты вроде 2026-13-45 или 2026-02-30.
function isValidDate(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const [, year, month, day] = match;
  const date = new Date(`${year}-${month}-${day}T00:00:00Z`);
  // Проверяем, что дата валидна (не Invalid Date) и форматируется обратно в исходную строку.
  if (isNaN(date.getTime())) return false;
  const formatted = date.toISOString().slice(0, 10);
  return formatted === value;
}

export function parseSpeechProfile(raw: string, content: Content): ProfileParseResult {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return { ok: false, error: 'Это не JSON' };
  }
  if (typeof data !== 'object' || data === null) {
    return { ok: false, error: 'Файл не похож на разбор речи' };
  }
  const file = data as Partial<SpeechProfileFile>;
  if (file.app !== 'english-gym' || !Array.isArray(file.errors)) {
    return { ok: false, error: 'Файл не похож на разбор речи' };
  }
  if (typeof file.format !== 'number' || file.format > PROFILE_FORMAT) {
    return { ok: false, error: 'Разбор сделан более новой версией приложения' };
  }
  if (typeof file.wordCount !== 'number' || !Number.isInteger(file.wordCount) || file.wordCount <= 0) {
    return { ok: false, error: 'В разборе нет числа слов — без него не посчитать частоту' };
  }
  if (!isValidDate(file.recordedAt)) {
    return { ok: false, error: 'Разбор испорчен: дата записи должна быть в виде 2026-09-27' };
  }

  const wordCount = file.wordCount;
  const recordedAt = file.recordedAt;

  const known = new Set(content.concepts.map((c) => c.id));
  const errors: Record<string, number> = {};
  const unmapped: { label: string; count: number }[] = [];
  let mapped = 0;

  for (const e of file.errors) {
    // Проверяем, что label — непустая строка.
    if (typeof e?.label !== 'string' || e.label === '') {
      return { ok: false, error: 'Разбор испорчен: у одной из ошибок нет названия' };
    }
    // Проверяем, что count — положительное целое число.
    if (!Number.isInteger(e.count) || e.count <= 0) {
      return {
        ok: false,
        error: `Разбор испорчен: у ошибки «${e.label}» число повторов не целое положительное`,
      };
    }
    // Профиль мог быть собран против другой сборки контента: незнакомый
    // концепт не повод отвергать файл, но и тренировать его нечем.
    if (e.conceptId !== null && known.has(e.conceptId)) {
      errors[e.conceptId] = (errors[e.conceptId] ?? 0) + e.count;
      mapped += 1;
    } else {
      unmapped.push({ label: e.label, count: e.count });
    }
  }

  const measurement: Measurement = {
    date: recordedAt,
    wordCount,
    errors,
    unmapped,
  };
  return { ok: true, measurement, mapped, unmapped: unmapped.length };
}
