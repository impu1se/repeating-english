import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { content } from './content';

beforeEach(() => localStorage.clear());

describe('App', () => {
  it('shows the level folders on start', () => {
    render(<App />);
    for (const lv of ['A1', 'A2', 'B1', 'B1-B2', 'B2']) {
      expect(screen.getByRole('button', { name: new RegExp(`^${lv} —`) })).toBeInTheDocument();
    }
  });

  it('navigates level → module → training', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /^B1 —/ }));
    await userEvent.click(screen.getByRole('button', { name: /^Present Perfect —/ }));
    expect(screen.getByText(/Опыт: ever\/never/)).toBeInTheDocument();
  });

  it('returns to the same level folder after exiting training', async () => {
    render(<App />);
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
    await userEvent.click(screen.getByRole('button', { name: /^B1 —/ }));
    // порог 20, три концепта -> модуль это 60 очков, из них набрано 12
    const card = screen.getByRole('button', { name: /^Present Perfect —/ });
    expect(card).toHaveTextContent('12/60');
    await userEvent.click(card);
    expect(screen.getByText('Модуль: 12 / 60')).toBeInTheDocument();
  });
});
