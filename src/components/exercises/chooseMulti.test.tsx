import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChooseWord } from './ChooseWord';
import { MultiGap } from './MultiGap';
import type { Exercise } from '../../types';

describe('ChooseWord', () => {
  const ex: Exercise = { id: 'e', conceptId: 'c', type: 'choose_word', prompt: 'I have ___ been', points: 1, options: ['ever', 'never'], accepted: ['never'] };
  it('reports correct when the right option is clicked', async () => {
    const onResult = vi.fn();
    render(<ChooseWord exercise={ex} onResult={onResult} />);
    await userEvent.click(screen.getByRole('button', { name: 'never' }));
    expect(onResult).toHaveBeenCalledWith(true);
  });
});

describe('MultiGap', () => {
  const ex: Exercise = { id: 'e', conceptId: 'c', type: 'multi_gap', prompt: 'I ___ and ___', points: 1, gaps: [{ accepted: ['eat'] }, { accepted: ['sleep'] }] };
  it('is correct only when all gaps match', async () => {
    const onResult = vi.fn();
    render(<MultiGap exercise={ex} onResult={onResult} />);
    const inputs = screen.getAllByRole('textbox');
    await userEvent.type(inputs[0], 'eat');
    await userEvent.type(inputs[1], 'wrong');
    await userEvent.click(screen.getByRole('button', { name: 'Проверить' }));
    expect(onResult).toHaveBeenCalledWith(false);
  });
});
