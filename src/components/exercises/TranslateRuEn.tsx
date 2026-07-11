import { useState } from 'react';
import type { ExerciseProps } from './index';
import { checkExercise, type Verdict } from '../../engine/checker';
import { DiffLine } from './DiffLine';

export function TranslateRuEn({ exercise, onResult }: ExerciseProps) {
  const [answer, setAnswer] = useState('');
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  function check() {
    if (verdict !== null || answer.trim() === '') return;
    const v = checkExercise(exercise, answer);
    setVerdict(v);
    if (v.kind === 'correct') onResult(true);
    if (v.kind === 'wrong') onResult(false);
  }

  return (
    <div>
      <p className="prompt">{exercise.prompt}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          check();
        }}
      >
        <input
          aria-label="answer"
          value={answer}
          disabled={verdict !== null}
          autoFocus
          onChange={(e) => setAnswer(e.target.value)}
        />
        {verdict === null && (
          <button type="submit" disabled={answer.trim() === ''}>
            Проверить
          </button>
        )}
      </form>
      {verdict?.kind === 'correct' && <p role="status">Верно!</p>}
      {verdict?.kind === 'wrong' && (
        <div role="status">
          <p>Неверно. Правильный ответ:</p>
          <ul>{verdict.accepted.map((a) => <li key={a}>{a}</li>)}</ul>
        </div>
      )}
      {verdict?.kind === 'close' && (
        <div role="status">
          <p>
            <DiffLine diff={verdict.diff} />
          </p>
          <p>Эталон: {verdict.closest}</p>
          <p>Засчитать?</p>
          <button onClick={() => { setVerdict({ kind: 'correct' }); onResult(true); }}>Да</button>
          <button onClick={() => { setVerdict({ kind: 'wrong', accepted: exercise.accepted ?? [] }); onResult(false); }}>Нет</button>
        </div>
      )}
    </div>
  );
}
