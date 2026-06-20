import { TranslateRuEn } from './TranslateRuEn';
import type { ExerciseProps } from './index';

// FillGap shares the free-text flow; checkExercise dispatches on exercise.type internally.
export function FillGap(props: ExerciseProps) {
  return <TranslateRuEn {...props} />;
}
