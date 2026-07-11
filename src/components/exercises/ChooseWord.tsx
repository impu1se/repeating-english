import { useState } from 'react';
import type { ExerciseProps } from './index';
import { checkExact } from '../../engine/checker';
import { shuffle } from '../../engine/random';

export function ChooseWord({ exercise, onResult }: ExerciseProps) {
  const [options] = useState(() => shuffle(exercise.options ?? []));
  const [picked, setPicked] = useState<string | null>(null);
  function choose(opt: string) {
    if (picked !== null) return;
    setPicked(opt);
    onResult(checkExact(opt, exercise.accepted ?? []));
  }
  return (
    <div>
      <p className="prompt">{exercise.prompt}</p>
      {options.map((opt) => (
        <button key={opt} disabled={picked !== null} onClick={() => choose(opt)}>{opt}</button>
      ))}
      {picked !== null && <p role="status">{checkExact(picked, exercise.accepted ?? []) ? 'Верно!' : `Неверно. Ответ: ${(exercise.accepted ?? []).join(', ')}`}</p>}
    </div>
  );
}
