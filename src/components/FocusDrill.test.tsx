import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FocusDrill } from './FocusDrill';
import { loadProgress, saveProgress } from '../store/progress';
import { FOCUS_DRILLS_PER_DAY } from '../engine/daily';
import type { Content } from '../types';

beforeEach(() => localStorage.clear());

// Фикстура вместо настоящего контента: один концепт и одно задание типа
// choose_word. Выбор варианта сразу засчитывает ответ, поэтому проверка
// счётчика не зависит от того, какое задание выпало из большого пула, —
// у translate/fill_gap/verb_form ответ надо набрать, у word_order собрать,
// у match_pairs сопоставить, и «щёлкнуть любую кнопку» там не работает.
const fixture: Content = {
  version: 'focus-drill-test',
  modules: [{ id: 'm', title: 'Тест', level: 'A1', masteryThreshold: 20, conceptIds: ['c'] }],
  concepts: [
    {
      id: 'c',
      moduleId: 'm',
      title: 'Артикли',
      kind: 'grammar',
      theory: 'a перед согласным звуком, an перед гласным',
      exerciseIds: ['e1'],
    },
  ],
  exercises: [
    {
      id: 'e1',
      conceptId: 'c',
      type: 'choose_word',
      prompt: 'I have ___ apple.',
      points: 1,
      options: ['an', 'a', 'the'],
      accepted: ['an'],
    },
  ],
};

function renderDrill(onExit: () => void = () => {}) {
  return render(
    <FocusDrill conceptId="c" today="2026-09-27" onExit={onExit} content={fixture} rng={() => 0} />,
  );
}

describe('FocusDrill', () => {
  it('показывает название концепта и счётчик дня', () => {
    renderDrill();
    expect(screen.getByRole('heading', { name: /Артикли/ })).toBeInTheDocument();
    expect(screen.getByText(`0 / ${FOCUS_DRILLS_PER_DAY}`)).toBeInTheDocument();
  });

  it('засчитывает задание в счётчик дня и сохраняет его', async () => {
    renderDrill();

    // ChooseWord перемешивает варианты, поэтому выбираем по тексту, а не по
    // порядку. Ответ неверный — для счётчика это неважно.
    await userEvent.click(screen.getByRole('button', { name: 'the' }));

    expect(screen.getByText(`1 / ${FOCUS_DRILLS_PER_DAY}`)).toBeInTheDocument();
    expect(loadProgress(fixture).daily?.focusDrills).toBe(1);
  });

  it('закрывает блок на восьмом задании', () => {
    const state = loadProgress(fixture);
    state.daily = { date: '2026-09-27', listened: false, recorded: false, reviewed: false, focusDrills: FOCUS_DRILLS_PER_DAY };
    saveProgress(state);

    renderDrill();

    expect(screen.getByRole('status')).toHaveTextContent('Блок фокуса закрыт');
  });

  it('вчерашний счётчик не засчитывается сегодня', () => {
    const state = loadProgress(fixture);
    state.daily = { date: '2026-09-26', listened: true, recorded: true, reviewed: true, focusDrills: FOCUS_DRILLS_PER_DAY };
    saveProgress(state);

    renderDrill();

    expect(screen.getByText(`0 / ${FOCUS_DRILLS_PER_DAY}`)).toBeInTheDocument();
  });

  it('выходит по кнопке', async () => {
    const onExit = vi.fn();
    renderDrill(onExit);
    await userEvent.click(screen.getByRole('button', { name: '← Сегодня' }));
    expect(onExit).toHaveBeenCalled();
  });
});
