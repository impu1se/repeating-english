import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TranslateRuEn } from './TranslateRuEn';
import type { Exercise } from '../../types';

const ex: Exercise = {
  id: 'e', conceptId: 'c', type: 'translate_ru_en',
  prompt: 'Я счастлив', points: 2, accepted: ['I am happy'],
};

describe('TranslateRuEn', () => {
  it('reports correct on exact answer', async () => {
    const onResult = vi.fn();
    render(<TranslateRuEn exercise={ex} onResult={onResult} />);
    await userEvent.type(screen.getByRole('textbox'), 'I am happy');
    await userEvent.click(screen.getByRole('button', { name: 'Проверить' }));
    expect(onResult).toHaveBeenCalledWith(true);
  });

  it('asks for self-grade on a close answer and honors "Нет"', async () => {
    const onResult = vi.fn();
    render(<TranslateRuEn exercise={ex} onResult={onResult} />);
    await userEvent.type(screen.getByRole('textbox'), 'I am happi');
    await userEvent.click(screen.getByRole('button', { name: 'Проверить' }));
    expect(screen.getByText('Засчитать?')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Нет' }));
    expect(onResult).toHaveBeenCalledWith(false);
  });
});
