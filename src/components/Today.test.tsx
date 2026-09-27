import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Today } from './Today';
import { content } from '../content';
import { loadProgress, saveProgress } from '../store/progress';
import { FOCUS_DRILLS_PER_DAY } from '../engine/daily';

beforeEach(() => localStorage.clear());

const grammar = content.concepts.filter((c) => c.kind === 'grammar');

function seedMeasurement(conceptId: string) {
  const state = loadProgress(content);
  state.measurements = [{ date: '2026-09-27', wordCount: 100, errors: { [conceptId]: 5 }, unmapped: [] }];
  saveProgress(state);
}

describe('Today', () => {
  it('показывает три внешние отметки и блок фокуса', () => {
    render(<Today today="2026-09-27" onOpenErrors={() => {}} onOpenLevels={() => {}} onDrill={() => {}} />);
    expect(screen.getByRole('button', { name: /Слушал/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Записал/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Разобрал/ })).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`0 / ${FOCUS_DRILLS_PER_DAY}`))).toBeInTheDocument();
  });

  it('отметка сохраняется', async () => {
    render(<Today today="2026-09-27" onOpenErrors={() => {}} onOpenLevels={() => {}} onDrill={() => {}} />);
    await userEvent.click(screen.getByRole('button', { name: /Слушал/ }));
    expect(loadProgress(content).daily?.listened).toBe(true);
  });

  it('предлагает взять в фокус самую частую ошибку', async () => {
    seedMeasurement(grammar[0].id);
    render(<Today today="2026-09-27" onOpenErrors={() => {}} onOpenLevels={() => {}} onDrill={() => {}} />);

    await userEvent.click(screen.getByRole('button', { name: new RegExp(`Взять в фокус`) }));

    expect(loadProgress(content).focus?.conceptId).toBe(grammar[0].id);
  });

  it('ведёт в тренировку выбранного фокуса', async () => {
    const onDrill = vi.fn();
    const state = loadProgress(content);
    state.focus = { conceptId: grammar[0].id, startedAt: '2026-09-27' };
    saveProgress(state);

    render(<Today today="2026-09-27" onOpenErrors={() => {}} onOpenLevels={() => {}} onDrill={onDrill} />);
    await userEvent.click(screen.getByRole('button', { name: 'Тренировать' }));

    expect(onDrill).toHaveBeenCalledWith(grammar[0].id);
  });

  it('по истечении недели предлагает сменить, но не меняет сам', () => {
    const state = loadProgress(content);
    state.focus = { conceptId: grammar[0].id, startedAt: '2026-09-20' };
    saveProgress(state);

    render(<Today today="2026-09-27" onOpenErrors={() => {}} onOpenLevels={() => {}} onDrill={() => {}} />);

    expect(screen.getByRole('status')).toHaveTextContent('Неделя прошла');
    expect(loadProgress(content).focus?.conceptId).toBe(grammar[0].id);
  });

  it('по кнопке смены берёт новую ошибку недели с сегодняшней даты', async () => {
    seedMeasurement(grammar[1].id);
    const state = loadProgress(content);
    state.focus = { conceptId: grammar[0].id, startedAt: '2026-09-20' };
    saveProgress(state);

    render(<Today today="2026-09-27" onOpenErrors={() => {}} onOpenLevels={() => {}} onDrill={() => {}} />);
    await userEvent.click(screen.getByRole('button', { name: /Сменить фокус/ }));

    expect(loadProgress(content).focus).toEqual({ conceptId: grammar[1].id, startedAt: '2026-09-27' });
  });

  it('закрывает день, когда закрыто всё', () => {
    const state = loadProgress(content);
    state.daily = { date: '2026-09-27', listened: true, recorded: true, reviewed: true, focusDrills: FOCUS_DRILLS_PER_DAY };
    saveProgress(state);

    render(<Today today="2026-09-27" onOpenErrors={() => {}} onOpenLevels={() => {}} onDrill={() => {}} />);

    expect(screen.getByText('Минимум на сегодня закрыт')).toBeInTheDocument();
  });
});
