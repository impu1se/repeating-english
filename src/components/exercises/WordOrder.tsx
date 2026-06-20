import { useState } from 'react';
import type { ExerciseProps } from './index';
import { checkExact } from '../../engine/checker';

export function WordOrder({ exercise, onResult }: ExerciseProps) {
  const bank = exercise.bank ?? [];
  const [built, setBuilt] = useState<number[]>([]); // indices into bank
  const [done, setDone] = useState(false);

  const used = new Set(built);
  function pick(i: number) {
    if (used.has(i) || done) return;
    setBuilt((prev) => [...prev, i]);
  }
  function reset() {
    setBuilt([]);
  }
  function check() {
    const sentence = built.map((i) => bank[i]).join(' ');
    setDone(true);
    onResult(checkExact(sentence, exercise.accepted ?? []));
  }

  return (
    <div>
      <p>{exercise.prompt}</p>
      <p aria-label="built">{built.map((i) => bank[i]).join(' ')}</p>
      <div>
        {bank.map((w, i) => (
          <button key={i} disabled={used.has(i) || done} onClick={() => pick(i)}>{w}</button>
        ))}
      </div>
      {!done && <button onClick={reset} aria-label="Сбросить">Сбросить</button>}
      {!done && <button onClick={check}>Проверить</button>}
      {done && (
        <p role="status">
          {checkExact(built.map((i) => bank[i]).join(' '), exercise.accepted ?? [])
            ? 'Верно!'
            : `Неверно. Ответ: ${(exercise.accepted ?? [])[0]}`}
        </p>
      )}
    </div>
  );
}
