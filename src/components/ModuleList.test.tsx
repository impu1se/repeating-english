import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ModuleList } from './ModuleList';
import { content } from '../content';
import { saveProgress, loadProgress } from '../store/progress';

beforeEach(() => localStorage.clear());

describe('ModuleList', () => {
  it('is titled English Gym and sorts modules by level', () => {
    render(<ModuleList onPick={vi.fn()} />);
    expect(screen.getByRole('heading', { name: /English Gym/ })).toBeInTheDocument();
    const labels = screen.getAllByRole('button').map((b) => b.textContent ?? '');
    const levelOf = (label: string) => content.modules.find((m) => label.includes(m.title))!.level;
    const order = ['A1', 'A2', 'B1', 'B1-B2', 'B2'];
    const ranks = labels.map((l) => order.indexOf(levelOf(l)));
    expect([...ranks].sort((a, b) => a - b)).toEqual(ranks);
  });

  it('marks a fully mastered module with a check', () => {
    const progress = loadProgress(content);
    const mod = content.modules[0];
    for (const cid of mod.conceptIds) progress.concepts[cid] = { score: 50, mastered: true, recentExerciseIds: [], errorCount: 0 };
    saveProgress(progress);
    render(<ModuleList onPick={vi.fn()} />);
    expect(screen.getByRole('button', { name: new RegExp('✓ ' + mod.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) })).toBeInTheDocument();
  });
});
