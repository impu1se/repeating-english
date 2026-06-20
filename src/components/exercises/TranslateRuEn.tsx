import { useState } from 'react';
import type { ExerciseProps } from './index';
import { checkExercise, type Verdict } from '../../engine/checker';

export function TranslateRuEn({ exercise, onResult }: ExerciseProps) {
  const [answer, setAnswer] = useState('');
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  function check() {
    const v = checkExercise(exercise, answer);
    setVerdict(v);
    if (v.kind === 'correct') onResult(true);
    if (v.kind === 'wrong') onResult(false);
  }

  return (
    <div>
      <p>{exercise.prompt}</p>
      <input aria-label="answer" value={answer} disabled={verdict !== null && verdict.kind !== 'close'} onChange={(e) => setAnswer(e.target.value)} />
      {verdict === null && <button onClick={check}>Проверить</button>}
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
            {verdict.diff.map((t, i) => (
              <span key={i} data-status={t.status} style={{ textDecoration: t.status === 'missing' ? 'underline' : t.status === 'extra' ? 'line-through' : 'none' }}>
                {t.text}{' '}
              </span>
            ))}
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
