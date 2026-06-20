import { useState } from 'react';
import type { ExerciseProps } from './index';
import { checkExact } from '../../engine/checker';

export function MultiGap({ exercise, onResult }: ExerciseProps) {
  const gaps = exercise.gaps ?? [];
  const [values, setValues] = useState<string[]>(() => gaps.map(() => ''));
  const [done, setDone] = useState(false);

  function setAt(i: number, v: string) {
    setValues((prev) => prev.map((x, idx) => (idx === i ? v : x)));
  }
  function check() {
    const allCorrect = gaps.every((g, i) => checkExact(values[i], g.accepted));
    setDone(true);
    onResult(allCorrect);
  }
  return (
    <div>
      <p>{exercise.prompt}</p>
      {gaps.map((g, i) => (
        <input key={i} aria-label={`gap-${i}`} value={values[i]} disabled={done} onChange={(e) => setAt(i, e.target.value)} />
      ))}
      {!done && <button onClick={check}>Проверить</button>}
      {done && (
        <p role="status">
          {gaps.every((g, i) => checkExact(values[i], g.accepted))
            ? 'Верно!'
            : `Неверно. Ответы: ${gaps.map((g) => g.accepted[0]).join(', ')}`}
        </p>
      )}
    </div>
  );
}
