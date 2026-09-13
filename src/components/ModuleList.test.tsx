import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModuleList } from './ModuleList';
import { content } from '../content';
import { saveProgress, loadProgress } from '../store/progress';

beforeEach(() => localStorage.clear());

const LEVELS = ['A1', 'A2', 'B1', 'B1-B2', 'B2'];
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

describe('ModuleList', () => {
  it('shows level folders in CEFR order at the root, without modules', () => {
    render(<ModuleList onPick={vi.fn()} />);
    expect(screen.getByRole('heading', { name: /English Gym/ })).toBeInTheDocument();
    const rows = within(screen.getByRole('list')).getAllByRole('button').map((b) => b.textContent ?? '');
    expect(rows.map((r) => r.split(' — ')[0])).toEqual(LEVELS);
    expect(screen.queryByText(/Present Perfect/)).not.toBeInTheDocument();
  });

  it('drills into a level, lists only its modules, and goes back', async () => {
    render(<ModuleList onPick={vi.fn()} />);
    await userEvent.click(screen.getByRole('button', { name: /^A1 —/ }));
    for (const m of content.modules.filter((m) => m.level === 'A1')) {
      expect(screen.getByRole('button', { name: new RegExp(`^${esc(m.title)} —`) })).toBeInTheDocument();
    }
    expect(screen.queryByRole('button', { name: /^Present Perfect —/ })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: '← Уровни' }));
    expect(screen.getByRole('button', { name: /^A1 —/ })).toBeInTheDocument();
  });

  it('opens directly inside a level when initialLevel is given', () => {
    render(<ModuleList onPick={vi.fn()} initialLevel="B1" />);
    expect(screen.getByRole('button', { name: /^Present Perfect —/ })).toBeInTheDocument();
  });

  it('reports the picked module id from inside a level', async () => {
    const onPick = vi.fn();
    render(<ModuleList onPick={onPick} initialLevel="B1" />);
    await userEvent.click(screen.getByRole('button', { name: /^Present Perfect —/ }));
    expect(onPick).toHaveBeenCalledWith('present-perfect');
  });

  it('marks a fully mastered module with a check inside its level', () => {
    const progress = loadProgress(content);
    const mod = content.modules.find((m) => m.level === 'A1')!;
    for (const cid of mod.conceptIds) progress.concepts[cid] = { score: 50, mastered: true, recentExerciseIds: [], errorCount: 0 };
    saveProgress(progress);
    render(<ModuleList onPick={vi.fn()} initialLevel="A1" />);
    expect(screen.getByRole('button', { name: new RegExp('✓ ' + esc(mod.title)) })).toBeInTheDocument();
  });
});
