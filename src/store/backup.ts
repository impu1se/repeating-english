import type { Content } from '../types';
import type { ConceptProgress } from '../engine/scoring';
import { mergeConcepts, type ProgressState } from './progress';

// Версия формата файла, а не версия контента. Растёт, когда в файл добавится
// что-то несовместимое — например, несколько профилей из бэклога v3.
export const BACKUP_FORMAT = 1;

export interface ProgressBackupFile {
  app: 'english-gym';
  format: number;
  exportedAt: string;
  contentVersion: string;
  concepts: Record<string, ConceptProgress>;
}

export type ParseResult =
  | { ok: true; state: ProgressState; restored: number }
  | { ok: false; error: string };

export function serializeProgress(state: ProgressState, now: Date = new Date()): string {
  const file: ProgressBackupFile = {
    app: 'english-gym',
    format: BACKUP_FORMAT,
    exportedAt: now.toISOString(),
    contentVersion: state.contentVersion,
    concepts: state.concepts,
  };
  return JSON.stringify(file, null, 2);
}

export function backupFileName(now: Date = new Date()): string {
  return `english-gym-progress-${now.toISOString().slice(0, 10)}.json`;
}

// Копия с другой версией контента не отвергается: сливаем по id концептов,
// как это уже делает загрузка из localStorage.
export function parseBackup(raw: string, content: Content): ParseResult {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return { ok: false, error: 'Файл не похож на JSON' };
  }
  if (typeof data !== 'object' || data === null) {
    return { ok: false, error: 'Файл не похож на выгрузку прогресса' };
  }
  const file = data as Partial<ProgressBackupFile>;
  if (file.app !== 'english-gym') {
    return { ok: false, error: 'Файл не похож на выгрузку прогресса' };
  }
  if (typeof file.format !== 'number' || file.format > BACKUP_FORMAT) {
    return { ok: false, error: 'Файл сделан более новой версией приложения' };
  }
  if (typeof file.concepts !== 'object' || file.concepts === null) {
    return { ok: false, error: 'В файле нет прогресса' };
  }
  const incoming = file.concepts as Record<string, ConceptProgress>;
  const state = mergeConcepts(content, incoming);
  const restored = Object.keys(state.concepts).filter((id) => incoming[id] !== undefined).length;
  return { ok: true, state, restored };
}
