import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { content } from './content';
import { FOCUS_DRILLS_PER_DAY } from './engine/daily';

beforeEach(() => localStorage.clear());
afterEach(() => vi.restoreAllMocks());

describe('App', () => {
  it('starts on Today and can reach the level folders', async () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Сегодня' })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Уровни и модули' }));
    for (const lv of ['A1', 'A2', 'B1', 'B1-B2', 'B2']) {
      expect(screen.getByRole('button', { name: new RegExp(`^${lv} —`) })).toBeInTheDocument();
    }
  });

  it('navigates level → module → training', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: 'Уровни и модули' }));
    await userEvent.click(screen.getByRole('button', { name: /^B1 —/ }));
    await userEvent.click(screen.getByRole('button', { name: /^Present Perfect —/ }));
    expect(screen.getByText(/Опыт: ever\/never/)).toBeInTheDocument();
  });

  it('returns to the same level folder after exiting training', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: 'Уровни и модули' }));
    await userEvent.click(screen.getByRole('button', { name: /^B1 —/ }));
    await userEvent.click(screen.getByRole('button', { name: /^Present Perfect —/ }));
    await userEvent.click(screen.getByRole('button', { name: '← К списку' }));
    // мы внутри папки B1, а не в корне
    expect(screen.getByRole('button', { name: /^Present Perfect —/ })).toBeInTheDocument();
  });

  it('shows stored module progress in the list and inside training', async () => {
    // прогресс из «прошлой сессии»: два концепта Present Perfect по 6 очков
    localStorage.setItem('re:progress', JSON.stringify({
      contentVersion: content.version,
      concepts: {
        'pp-experience': { score: 6, mastered: false, recentExerciseIds: [], errorCount: 0 },
        'pp-just-already-yet': { score: 6, mastered: false, recentExerciseIds: [], errorCount: 0 },
      },
    }));
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: 'Уровни и модули' }));
    await userEvent.click(screen.getByRole('button', { name: /^B1 —/ }));
    // порог 20, три концепта -> модуль это 60 очков, из них набрано 12
    const card = screen.getByRole('button', { name: /^Present Perfect —/ });
    expect(card).toHaveTextContent('12/60');
    await userEvent.click(card);
    expect(screen.getByText('Модуль: 12 / 60')).toBeInTheDocument();
  });

  it('walks the whole error loop: paste a profile, take the focus, drill it', async () => {
    // pickNextExercise и shuffle() читают Math.random через свой rng по
    // умолчанию — App не даёт seam для инъекции, поэтому детерминируем сам
    // источник случайности. При rng()=0 выбирается первый пункт пула.
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const today = new Date().toISOString().slice(0, 10);
    const concept = content.concepts.find((c) => c.id === 'psp-contrast')!;

    render(<App />);
    expect(screen.getByRole('heading', { name: 'Сегодня' })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Мои ошибки' }));
    await userEvent.click(screen.getByRole('button', { name: 'Вставить текстом' }));
    await userEvent.click(screen.getByLabelText('текст разбора'));
    // userEvent.type читает `{` и `[` как описания клавиш и ломается на JSON —
    // вставляем текст готовым, как и в SpeechErrors.test.tsx.
    await userEvent.paste(JSON.stringify({
      app: 'english-gym',
      format: 1,
      recordedAt: today,
      wordCount: 100,
      contentVersion: content.version,
      errors: [{ conceptId: concept.id, label: 'паст симпл вместо перфекта', count: 5 }],
    }));
    await userEvent.click(screen.getByRole('button', { name: 'Загрузить разбор' }));
    expect(await screen.findByText(new RegExp(concept.title))).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: '← Сегодня' }));
    await userEvent.click(screen.getByRole('button', { name: /Взять в фокус/ }));
    await userEvent.click(screen.getByRole('button', { name: 'Тренировать' }));

    expect(screen.getByRole('heading', { name: /Ошибка недели/ })).toBeInTheDocument();
    // psc-e1 (первое задание пула psp-contrast) — choose_word с вариантом
    // 'saw', который не является подстрокой других вариантов.
    await userEvent.click(screen.getByRole('button', { name: 'saw' }));

    await userEvent.click(screen.getByRole('button', { name: '← Сегодня' }));
    expect(screen.getByText(`1 / ${FOCUS_DRILLS_PER_DAY}`)).toBeInTheDocument();
  });
});
