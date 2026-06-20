import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WordOrder } from './WordOrder';
import type { Exercise } from '../../types';

const ex: Exercise = {
  id: 'e', conceptId: 'c', type: 'word_order',
  prompt: 'Соберите', points: 1,
  bank: ['you', 'have', 'tried', 'sushi', 'ever'],
  accepted: ['have you ever tried sushi'],
};

describe('WordOrder', () => {
  it('reports correct when tokens assembled in the right order', async () => {
    const onResult = vi.fn();
    render(<WordOrder exercise={ex} onResult={onResult} />);
    for (const w of ['have', 'you', 'ever', 'tried', 'sushi']) {
      await userEvent.click(screen.getByRole('button', { name: w }));
    }
    await userEvent.click(screen.getByRole('button', { name: 'Проверить' }));
    expect(onResult).toHaveBeenCalledWith(true);
  });
});
