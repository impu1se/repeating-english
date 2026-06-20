import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MatchPairs } from './MatchPairs';
import type { Exercise } from '../../types';

const ex: Exercise = {
  id: 'e', conceptId: 'c', type: 'match_pairs', prompt: 'Сопоставьте', points: 1,
  pairs: [{ en: 'street', ru: 'улица' }, { en: 'money', ru: 'деньги' }],
};

describe('MatchPairs', () => {
  it('reports correct when all pairs matched with no mistakes', async () => {
    const onResult = vi.fn();
    render(<MatchPairs exercise={ex} onResult={onResult} />);
    await userEvent.click(screen.getByRole('button', { name: 'street' }));
    await userEvent.click(screen.getByRole('button', { name: 'улица' }));
    await userEvent.click(screen.getByRole('button', { name: 'money' }));
    await userEvent.click(screen.getByRole('button', { name: 'деньги' }));
    expect(onResult).toHaveBeenCalledWith(true);
  });

  it('reports false if any wrong match was made', async () => {
    const onResult = vi.fn();
    render(<MatchPairs exercise={ex} onResult={onResult} />);
    await userEvent.click(screen.getByRole('button', { name: 'street' }));
    await userEvent.click(screen.getByRole('button', { name: 'деньги' })); // wrong
    await userEvent.click(screen.getByRole('button', { name: 'street' }));
    await userEvent.click(screen.getByRole('button', { name: 'улица' }));
    await userEvent.click(screen.getByRole('button', { name: 'money' }));
    await userEvent.click(screen.getByRole('button', { name: 'деньги' }));
    expect(onResult).toHaveBeenLastCalledWith(false);
  });
});
