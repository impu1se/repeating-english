import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { content } from './content';

beforeEach(() => localStorage.clear());

describe('App', () => {
  it('shows every module on start', () => {
    render(<App />);
    for (const m of content.modules) {
      expect(screen.getByRole('button', { name: new RegExp(`^${m.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} —`) })).toBeInTheDocument();
    }
  });

  it('navigates into training when a module is picked', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /^Present Perfect —/ }));
    expect(screen.getByText(/Опыт: ever\/never/)).toBeInTheDocument();
  });
});
