import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
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
    render(<Training moduleId="present-perfect" onComplete={vi.fn()} onExit={vi.fn()} />);
    // module title and current concept title are shown
    expect(screen.getByRole('heading', { name: 'Present Perfect' })).toBeInTheDocument();
    expect(screen.getByText(/Опыт: ever\/never/)).toBeInTheDocument();
  });

  it('advances to a new exercise after answering', async () => {
    render(<Training moduleId="m" onComplete={vi.fn()} onExit={vi.fn()} content={multiConcept} rng={first} />);
    await userEvent.type(screen.getByRole('textbox'), 'a');
    await userEvent.click(screen.getByRole('button', { name: 'Проверить' }));
    const next = await screen.findByRole('button', { name: 'Дальше' });
    expect(next).toBeInTheDocument();
  });

  it('keeps the answered card and its result on screen until "Дальше" (multi-concept)', async () => {
    render(<Training moduleId="m" onComplete={vi.fn()} onExit={vi.fn()} content={multiConcept} rng={first} />);
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
    render(<Training moduleId="m" onComplete={vi.fn()} onExit={onExit} content={multiConcept} rng={first} />);
    await userEvent.click(screen.getByRole('button', { name: '← К списку' }));
    expect(onExit).toHaveBeenCalled();
  });
});
