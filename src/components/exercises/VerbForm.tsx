import { TranslateRuEn } from './TranslateRuEn';
import type { ExerciseProps } from './index';

// VerbForm shares the same single-input flow; verb_form is auto-checked (no self-grade).
export function VerbForm(props: ExerciseProps) {
  return <TranslateRuEn {...props} />;
}
