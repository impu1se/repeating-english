import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FocusDrill } from './FocusDrill';
import { loadProgress, saveProgress } from '../store/progress';
import { FOCUS_DRILLS_PER_DAY } from '../engine/daily';
import type { Content } from '../types';

beforeEach(() => {
  localStorage.clear();
  // По умолчанию концепт 'c' — ошибка недели: так вело себя большинство
  // существующих тестов ниже ещё до разделения на фокус/не-фокус.
  saveProgress({ ...loadProgress(fixture), focus: { conceptId: 'c', startedAt: '2026-09-27' } });
});

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

// Концепт без единого задания: pickNextExercise возвращает null для пустого
// пула, и это единственный способ проверить ветку «нет заданий», а не просто
// прочитать код и поверить, что она сработает.
const emptyFixture: Content = {
  version: 'focus-drill-empty-test',
  modules: [{ id: 'm', title: 'Тест', level: 'A1', masteryThreshold: 20, conceptIds: ['c'] }],
  concepts: [
    {
      id: 'c',
      moduleId: 'm',
      title: 'Пустой концепт',
      kind: 'grammar',
      exerciseIds: [],
    },
  ],
  exercises: [],
};

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

  it('после восьмого ответа сначала показывает результат, а блок закрывает только «Дальше»', async () => {
    const state = loadProgress(fixture);
    state.daily = { date: '2026-09-27', listened: false, recorded: false, reviewed: false, focusDrills: FOCUS_DRILLS_PER_DAY - 1 };
    saveProgress(state);

    renderDrill();
    await userEvent.click(screen.getByRole('button', { name: 'the' }));

    // Восьмой ответ уже засчитан, но фидбэк ответа ещё на экране — баннер
    // не должен подменить его мгновенно.
    expect(loadProgress(fixture).daily?.focusDrills).toBe(FOCUS_DRILLS_PER_DAY);
    expect(screen.getByRole('status')).toHaveTextContent('Неверно');
    expect(screen.queryByText(/Свободная тренировка/)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Дальше' }));

    expect(screen.getByRole('status')).toHaveTextContent('Блок фокуса закрыт');
  });

  it('показывает сообщение, если у концепта нет заданий', () => {
    render(
      <FocusDrill conceptId="c" today="2026-09-27" onExit={() => {}} content={emptyFixture} rng={() => 0} />,
    );
    expect(screen.getByText('У этого концепта нет заданий.')).toBeInTheDocument();
  });

  it('дрилл не из фокуса не называется ошибкой недели и не трогает счётчик дня', async () => {
    // концепт 'c' — не фокус: фокуса вообще нет. Счётчик дня уже ненулевой,
    // чтобы проверить именно «не трогает», а не только «остался нулём».
    const state = loadProgress(fixture);
    state.focus = null;
    state.daily = { date: '2026-09-27', listened: false, recorded: false, reviewed: false, focusDrills: 3 };
    saveProgress(state);
    renderDrill();

    expect(screen.getByRole('heading', { name: 'Тренировка: Артикли' })).toBeInTheDocument();
    expect(screen.queryByText(`3 / ${FOCUS_DRILLS_PER_DAY}`)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'the' }));

    expect(loadProgress(fixture).daily?.focusDrills).toBe(3);
  });

  it('дрилл из фокуса называется ошибкой недели и засчитывается в день', async () => {
    // фокус на 'c' выставлен в beforeEach
    renderDrill();

    expect(screen.getByRole('heading', { name: 'Ошибка недели: Артикли' })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'the' }));

    expect(loadProgress(fixture).daily?.focusDrills).toBe(1);
  });
});
