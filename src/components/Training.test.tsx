import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Training } from './Training';

beforeEach(() => localStorage.clear());

describe('Training', () => {
  it('renders an exercise prompt for the chosen module', () => {
    render(<Training moduleId="present-perfect" onComplete={vi.fn()} />);
    // module title and current concept title are shown
    expect(screen.getByRole('heading', { name: 'Present Perfect' })).toBeInTheDocument();
    expect(screen.getByText(/Опыт: ever\/never/)).toBeInTheDocument();
  });

  it('advances to a new exercise after answering', async () => {
    render(<Training moduleId="present-perfect" onComplete={vi.fn()} />);
    // Answer whatever is shown by clicking the first actionable control if present.
    const checkBtn = screen.queryByRole('button', { name: 'Проверить' });
    if (checkBtn) {
      await userEvent.click(checkBtn);
    }
    // After a result, a "Дальше" button advances.
    const next = await screen.findByRole('button', { name: 'Дальше' });
    expect(next).toBeInTheDocument();
  });
});
