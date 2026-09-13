import { describe, it, expect } from 'vitest';
import { content } from '../content';
import { loadProgress } from './progress';
import { serializeProgress, parseBackup, backupFileName } from './backup';

function stateWithScore(conceptId: string, score: number) {
  const state = loadProgress(content);
  state.concepts[conceptId] = { ...state.concepts[conceptId], score };
  return state;
}

describe('резервная копия прогресса', () => {
  it('переживает круг выгрузка → загрузка', () => {
    const id = content.concepts[0].id;
    const json = serializeProgress(stateWithScore(id, 7));

    const result = parseBackup(json, content);

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.state.concepts[id].score).toBe(7);
    expect(result.restored).toBe(content.concepts.length);
  });

  it('кладёт в файл версию формата и дату', () => {
    const parsed = JSON.parse(serializeProgress(loadProgress(content), new Date('2026-09-13T10:00:00Z')));
    expect(parsed.app).toBe('english-gym');
    expect(parsed.format).toBe(1);
    expect(parsed.exportedAt).toBe('2026-09-13T10:00:00.000Z');
  });

  it('выбрасывает концепты, которых больше нет в контенте', () => {
    const json = JSON.stringify({
      app: 'english-gym',
      format: 1,
      exportedAt: '2026-09-13T10:00:00.000Z',
      contentVersion: content.version,
      concepts: { 'ушедший-концепт': { score: 99, mastered: true, attempts: 3 } },
    });

    const result = parseBackup(json, content);

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.state.concepts['ушедший-концепт']).toBeUndefined();
    expect(result.restored).toBe(0);
  });

  it('пересчитывает освоенность по текущему порогу модуля', () => {
    const module = content.modules[0];
    const id = module.conceptIds[0];
    const json = JSON.stringify({
      app: 'english-gym',
      format: 1,
      exportedAt: '2026-09-13T10:00:00.000Z',
      contentVersion: content.version,
      concepts: { [id]: { score: module.masteryThreshold, mastered: false, attempts: 1 } },
    });

    const result = parseBackup(json, content);

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.state.concepts[id].mastered).toBe(true);
  });

  it('объясняет, что файл не тот', () => {
    expect(parseBackup('не json вовсе', content)).toEqual({ ok: false, error: 'Файл не похож на JSON' });
    expect(parseBackup('{"hello":1}', content)).toEqual({
      ok: false,
      error: 'Файл не похож на выгрузку прогресса',
    });
    expect(parseBackup('{"app":"english-gym","format":99,"concepts":{}}', content)).toEqual({
      ok: false,
      error: 'Файл сделан более новой версией приложения',
    });
  });

  it('называет файл по дате', () => {
    expect(backupFileName(new Date('2026-09-13T10:00:00Z'))).toBe('english-gym-progress-2026-09-13.json');
  });
});
