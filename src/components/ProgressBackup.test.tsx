import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProgressBackup } from './ProgressBackup';
import { content } from '../content';
import { loadProgress } from '../store/progress';
import { serializeProgress } from '../store/backup';

beforeEach(() => localStorage.clear());

function fileWithScore(conceptId: string, score: number): File {
  const state = loadProgress(content);
  state.concepts[conceptId] = { ...state.concepts[conceptId], score };
  return new File([serializeProgress(state)], 'progress.json', { type: 'application/json' });
}

describe('ProgressBackup', () => {
  it('загружает файл и сохраняет прогресс', async () => {
    const id = content.concepts[0].id;
    const onImported = vi.fn();
    render(<ProgressBackup onImported={onImported} />);

    await userEvent.upload(screen.getByLabelText('файл прогресса'), fileWithScore(id, 7));

    expect(await screen.findByRole('status')).toHaveTextContent(/Восстановлено концептов/);
    expect(loadProgress(content).concepts[id].score).toBe(7);
    expect(onImported).toHaveBeenCalled();
  });

  it('объясняет, что файл не тот', async () => {
    render(<ProgressBackup onImported={() => {}} />);
    const junk = new File(['{"hello":1}'], 'progress.json', { type: 'application/json' });

    await userEvent.upload(screen.getByLabelText('файл прогресса'), junk);

    expect(await screen.findByRole('status')).toHaveTextContent('Файл не похож на выгрузку прогресса');
  });

  it('копирует выгрузку в буфер, когда системного «Поделиться» нет', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    render(<ProgressBackup onImported={() => {}} />);

    await userEvent.click(screen.getByRole('button', { name: 'Выгрузить прогресс' }));

    expect(await screen.findByRole('status')).toHaveTextContent('буфер обмена');
    expect(writeText).toHaveBeenCalledOnce();
  });
});
