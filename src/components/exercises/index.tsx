import type { FC } from 'react';
import type { Exercise, ExerciseType } from '../../types';
import { TranslateRuEn } from './TranslateRuEn';
import { FillGap } from './FillGap';
import { VerbForm } from './VerbForm';
import { ChooseWord } from './ChooseWord';
import { MultiGap } from './MultiGap';
import { WordOrder } from './WordOrder';
import { MatchPairs } from './MatchPairs';

export interface ExerciseProps {
  exercise: Exercise;
  onResult: (correct: boolean) => void;
}

const registry: Partial<Record<ExerciseType, FC<ExerciseProps>>> = {
  translate_ru_en: TranslateRuEn,
  fill_gap: FillGap,
  verb_form: VerbForm,
  choose_word: ChooseWord,
  multi_gap: MultiGap,
  word_order: WordOrder,
  match_pairs: MatchPairs,
};

export function getRenderer(type: ExerciseType): FC<ExerciseProps> {
  const comp = registry[type];
  if (!comp) throw new Error(`No renderer registered for type ${type}`);
  return comp;
}
