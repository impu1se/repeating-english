import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Training } from './Training';
import type { Content } from '../types';

const first = () => 0; // deterministic rng for stable exercise picks

const multiConcept: Content = {
  version: 'test-multi',
  modules: [{ id: 'm', title: 'Test Module', level: 'A1', masteryThreshold: 2, conceptIds: ['c1', 'c2'] }],
  concepts: [
    { id: 'c1', moduleId: 'm', title: 'Concept One', kind: 'grammar', exerciseIds: ['c1e1', 'c1e2'] },
    { id: 'c2', moduleId: 'm', title: 'Concept Two', kind: 'grammar', exerciseIds: ['c2e1', 'c2e2'] },
  ],
  exercises: [
    { id: 'c1e1', conceptId: 'c1', type: 'fill_gap', prompt: 'C1 first ___', points: 1, accepted: ['a'] },
    { id: 'c1e2', conceptId: 'c1', type: 'fill_gap', prompt: 'C1 second ___', points: 1, accepted: ['b'] },
    { id: 'c2e1', conceptId: 'c2', type: 'fill_gap', prompt: 'C2 first ___', points: 1, accepted: ['c'] },
    { id: 'c2e2', conceptId: 'c2', type: 'fill_gap', prompt: 'C2 second ___', points: 1, accepted: ['d'] },
  ],
};

beforeEach(() => localStorage.clear());

describe('Training', () => {
  it('renders an exercise prompt for the chosen module', () => {
    render(<Training moduleId="present-perfect" onExit={vi.fn()} onSummary={vi.fn()} />);
    // module title and current concept title are shown
    expect(screen.getByRole('heading', { name: 'Present Perfect' })).toBeInTheDocument();
    expect(screen.getByText(/Опыт: ever\/never/)).toBeInTheDocument();
  });

  it('advances to a new exercise after answering', async () => {
    render(<Training moduleId="m" onExit={vi.fn()} onSummary={vi.fn()} content={multiConcept} rng={first} />);
    await userEvent.type(screen.getByRole('textbox'), 'a');
    await userEvent.click(screen.getByRole('button', { name: 'Проверить' }));
    const next = await screen.findByRole('button', { name: 'Дальше' });
    expect(next).toBeInTheDocument();
  });

  it('keeps the answered card and its result on screen until "Дальше" (multi-concept)', async () => {
    render(<Training moduleId="m" onExit={vi.fn()} onSummary={vi.fn()} content={multiConcept} rng={first} />);
    // first card belongs to c1 (both concepts score 0 -> first listed wins)
    expect(screen.getByText('C1 first ___')).toBeInTheDocument();
    await userEvent.type(screen.getByRole('textbox'), 'a');
    await userEvent.click(screen.getByRole('button', { name: 'Проверить' }));
    // result is shown AND the same card stays — it must NOT swap to a c2 card
    expect(screen.getByText('Верно!')).toBeInTheDocument();
    expect(screen.getByText('C1 first ___')).toBeInTheDocument();
    expect(screen.queryByText('C2 first ___')).not.toBeInTheDocument();
    // advancing moves on (c1 now scored higher, so c2 becomes the lowest concept)
    await userEvent.click(screen.getByRole('button', { name: 'Дальше' }));
    expect(screen.getByText('C2 first ___')).toBeInTheDocument();
    expect(screen.queryByText('Верно!')).not.toBeInTheDocument();
  });

  it('lets the user exit mid-session', async () => {
    const onExit = vi.fn();
    render(<Training moduleId="m" onExit={onExit} onSummary={vi.fn()} content={multiConcept} rng={first} />);
    await userEvent.click(screen.getByRole('button', { name: '← К списку' }));
    expect(onExit).toHaveBeenCalled();
  });

  it('shows a banner when the module first becomes complete and keeps training', async () => {
    render(<Training moduleId="m" onExit={vi.fn()} onSummary={vi.fn()} content={multiConcept} rng={first} />);
    // threshold 2, points 1: два верных ответа на концепт
    for (let i = 0; i < 4; i++) {
      const input = screen.getByRole('textbox');
      const prompt = screen.getByText(/(C1|C2) (first|second) ___/).textContent!;
      const answer = prompt.startsWith('C1 first') ? 'a' : prompt.startsWith('C1 second') ? 'b' : prompt.startsWith('C2 first') ? 'c' : 'd';
      await userEvent.type(input, answer);
      await userEvent.click(screen.getByRole('button', { name: 'Проверить' }));
      if (i < 3) {
        expect(screen.queryByText(/Модуль освоен/)).not.toBeInTheDocument();
      }
      await userEvent.click(screen.getByRole('button', { name: 'Дальше' }));
    }
    // после 4-го верного ответа модуль впервые завершён
    expect(screen.getByText(/Модуль освоен/)).toBeInTheDocument();
    // тренировка продолжается: карточка на экране
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('does not show the banner when entering an already-complete module', () => {
    const complete = {
      contentVersion: 'test-multi',
      concepts: {
        c1: { score: 2, mastered: true, recentExerciseIds: [], errorCount: 0 },
        c2: { score: 2, mastered: true, recentExerciseIds: [], errorCount: 0 },
      },
    };
    localStorage.setItem('re:progress', JSON.stringify(complete));
    render(<Training moduleId="m" onExit={vi.fn()} onSummary={vi.fn()} content={multiConcept} rng={first} />);
    expect(screen.queryByText(/Модуль освоен/)).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument(); // и тренировка идёт
  });

  it('renders collapsed theory for grammar concepts that have it', () => {
    render(<Training moduleId="present-perfect" onExit={vi.fn()} onSummary={vi.fn()} rng={first} />);
    expect(screen.getByText('📖 Правило')).toBeInTheDocument();
    expect(screen.getByText(/Present Perfect для опыта/)).not.toBeVisible();
  });

  it('opens the summary from the header', async () => {
    const onSummary = vi.fn();
    render(<Training moduleId="m" onExit={vi.fn()} onSummary={onSummary} content={multiConcept} rng={first} />);
    await userEvent.click(screen.getByRole('button', { name: 'Итоги' }));
    expect(onSummary).toHaveBeenCalled();
  });

  it('shows "score / threshold" before mastery and "score ✓" after', () => {
    localStorage.setItem('re:progress', JSON.stringify({
      contentVersion: 'test-multi',
      concepts: {
        c1: { score: 3, mastered: true, recentExerciseIds: [], errorCount: 0 },
        c2: { score: 1, mastered: false, recentExerciseIds: [], errorCount: 0 },
      },
    }));
    render(<Training moduleId="m" onExit={vi.fn()} onSummary={vi.fn()} content={multiConcept} rng={first} />);
    // c2 слабее (1 < 3) — показан первым: «1 / 2»
    expect(screen.getByText(/— 1 \/ 2$/)).toBeInTheDocument();
  });

  it('shows module-wide progress that survives leaving and re-entering', async () => {
    const view = render(<Training moduleId="m" onExit={vi.fn()} onSummary={vi.fn()} content={multiConcept} rng={first} />);
    // порог 2 на концепт, два концепта -> модуль целиком это 4 очка
    expect(screen.getByText('Модуль: 0 / 4')).toBeInTheDocument();
    await userEvent.type(screen.getByRole('textbox'), 'a');
    await userEvent.click(screen.getByRole('button', { name: 'Проверить' }));
    expect(screen.getByText('Модуль: 1 / 4')).toBeInTheDocument();

    // выход из тренировки и повторный вход — прогресс на месте
    view.unmount();
    cleanup();
    render(<Training moduleId="m" onExit={vi.fn()} onSummary={vi.fn()} content={multiConcept} rng={first} />);
    expect(screen.getByText('Модуль: 1 / 4')).toBeInTheDocument();
  });

  it('caps a concept that overshot its threshold so the module bar cannot exceed 100%', () => {
    localStorage.setItem('re:progress', JSON.stringify({
      contentVersion: 'test-multi',
      concepts: {
        c1: { score: 9, mastered: true, recentExerciseIds: [], errorCount: 0 },
        c2: { score: 2, mastered: true, recentExerciseIds: [], errorCount: 0 },
      },
    }));
    render(<Training moduleId="m" onExit={vi.fn()} onSummary={vi.fn()} content={multiConcept} rng={first} />);
    expect(screen.getByText('Модуль: 4 / 4')).toBeInTheDocument();
  });
});
