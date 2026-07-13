import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => localStorage.clear());

describe('App', () => {
  it('shows the level folders on start', () => {
    render(<App />);
    for (const lv of ['A1', 'A2', 'B1', 'B1-B2', 'B2']) {
      expect(screen.getByRole('button', { name: new RegExp(`^${lv} —`) })).toBeInTheDocument();
    }
  });

  it('navigates level → module → training', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /^B1 —/ }));
    await userEvent.click(screen.getByRole('button', { name: /^Present Perfect —/ }));
    expect(screen.getByText(/Опыт: ever\/never/)).toBeInTheDocument();
  });

  it('returns to the same level folder after exiting training', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /^B1 —/ }));
    await userEvent.click(screen.getByRole('button', { name: /^Present Perfect —/ }));
    await userEvent.click(screen.getByRole('button', { name: '← К списку' }));
    // мы внутри папки B1, а не в корне
    expect(screen.getByRole('button', { name: /^Present Perfect —/ })).toBeInTheDocument();
  });
});
