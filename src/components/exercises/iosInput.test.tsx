import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TranslateRuEn } from './TranslateRuEn';
import { MultiGap } from './MultiGap';
import type { Exercise } from '../../types';

const translate: Exercise = {
  id: 't1',
  conceptId: 'c1',
  type: 'translate_ru_en',
  prompt: 'Я ещё не ел.',
  points: 2,
  accepted: ["I haven't eaten yet"],
};

const multi: Exercise = {
  id: 'm1',
  conceptId: 'c1',
  type: 'multi_gap',
  prompt: 'I ___ already ___ .',
  points: 1,
  gaps: [{ accepted: ['have'] }, { accepted: ['eaten'] }],
};

// iOS сам дописывает апостроф в dont и поднимает первую букву. Для тренажёра,
// который проверяет сокращения и орфографию, это тихая подмена ответа.
function expectIosSafe(input: HTMLElement) {
  expect(input).toHaveAttribute('autocapitalize', 'none');
  expect(input).toHaveAttribute('autocorrect', 'off');
  expect(input).toHaveAttribute('autocomplete', 'off');
  expect(input).toHaveAttribute('spellcheck', 'false');
  expect(input).toHaveAttribute('enterkeyhint', 'go');
}

describe('текстовые поля не отдают ответ автокоррекции iOS', () => {
  it('поле перевода', () => {
    render(<TranslateRuEn exercise={translate} onResult={() => {}} />);
    expectIosSafe(screen.getByLabelText('answer'));
  });

  it('каждое поле мультипропуска', () => {
    render(<MultiGap exercise={multi} onResult={() => {}} />);
    expectIosSafe(screen.getByLabelText('gap-0'));
    expectIosSafe(screen.getByLabelText('gap-1'));
  });
});
