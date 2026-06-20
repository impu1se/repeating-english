import { useState } from 'react';
import type { ExerciseProps } from './index';
import { checkExact } from '../../engine/checker';

export function ChooseWord({ exercise, onResult }: ExerciseProps) {
  const [picked, setPicked] = useState<string | null>(null);
  function choose(opt: string) {
    setPicked(opt);
    onResult(checkExact(opt, exercise.accepted ?? []));
  }
  return (
    <div>
      <p>{exercise.prompt}</p>
      {(exercise.options ?? []).map((opt) => (
        <button key={opt} disabled={picked !== null} onClick={() => choose(opt)}>{opt}</button>
      ))}
      {picked !== null && <p role="status">{checkExact(picked, exercise.accepted ?? []) ? 'Верно!' : `Неверно. Ответ: ${(exercise.accepted ?? []).join(', ')}`}</p>}
    </div>
  );
}
