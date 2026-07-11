import { useState } from 'react';
import type { ExerciseProps } from './index';
import { checkExact } from '../../engine/checker';
import { shuffle } from '../../engine/random';

export function WordOrder({ exercise, onResult }: ExerciseProps) {
  const bank = exercise.bank ?? [];
  // Content may store bank tokens in any order (even the answer order) —
  // the renderer owns the shuffling. One shuffle per mount; Training remounts per step.
  const [order] = useState(() => shuffle(bank.map((_, i) => i)));
  const [built, setBuilt] = useState<number[]>([]); // indices into bank
  const [done, setDone] = useState(false);

  const used = new Set(built);
  function pick(i: number) {
    if (used.has(i) || done) return;
    setBuilt((prev) => [...prev, i]);
  }
  function undo() {
    setBuilt((prev) => prev.slice(0, -1));
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
      <p className="prompt">{exercise.prompt}</p>
      <p aria-label="built" className="built">{built.map((i) => bank[i]).join(' ')}</p>
      <div>
        {order.map((i) => (
          <button key={i} disabled={used.has(i) || done} onClick={() => pick(i)}>{bank[i]}</button>
        ))}
      </div>
      {!done && <button onClick={undo} disabled={built.length === 0} aria-label="Убрать слово">← Убрать</button>}
      {!done && <button onClick={reset} disabled={built.length === 0} aria-label="Сбросить">Сбросить</button>}
      {!done && <button onClick={check} disabled={built.length === 0}>Проверить</button>}
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
