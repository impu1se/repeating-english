import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => localStorage.clear());

describe('App', () => {
  it('shows the module list on start', () => {
    render(<App />);
    expect(screen.getByText(/Present Perfect/)).toBeInTheDocument();
    expect(screen.getByText(/Слова A2: повседневное/)).toBeInTheDocument();
  });

  it('navigates into training when a module is picked', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /Present Perfect/ }));
    expect(screen.getByText(/Опыт: ever\/never/)).toBeInTheDocument();
  });
});
