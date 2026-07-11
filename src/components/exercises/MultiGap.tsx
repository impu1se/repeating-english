import { useState } from 'react';
import type { ExerciseProps } from './index';
import { checkFreeText, type Verdict } from '../../engine/checker';
import { DiffLine } from './DiffLine';

type Phase =
  | { kind: 'input' }
  | { kind: 'selfAssess'; verdicts: Verdict[] } // some gaps close, none wrong
  | { kind: 'done'; ok: boolean; verdicts: Verdict[] };

// Hybrid per gap (per spec): exact → ok, close → diff + one self-grade for the
// card, any wrong gap → wrong immediately.
export function MultiGap({ exercise, onResult }: ExerciseProps) {
  const gaps = exercise.gaps ?? [];
  const [values, setValues] = useState<string[]>(() => gaps.map(() => ''));
  const [phase, setPhase] = useState<Phase>({ kind: 'input' });

  const allFilled = values.every((v) => v.trim() !== '');

  function setAt(i: number, v: string) {
    setValues((prev) => prev.map((x, idx) => (idx === i ? v : x)));
  }

  function check() {
    if (phase.kind !== 'input' || !allFilled) return;
    const verdicts = gaps.map((g, i) => checkFreeText(values[i], g.accepted));
    if (verdicts.some((v) => v.kind === 'wrong')) {
      setPhase({ kind: 'done', ok: false, verdicts });
      onResult(false);
    } else if (verdicts.every((v) => v.kind === 'correct')) {
      setPhase({ kind: 'done', ok: true, verdicts });
      onResult(true);
    } else {
      setPhase({ kind: 'selfAssess', verdicts });
    }
  }

  function grade(ok: boolean) {
    if (phase.kind !== 'selfAssess') return;
    setPhase({ kind: 'done', ok, verdicts: phase.verdicts });
    onResult(ok);
  }

  const verdicts = phase.kind === 'input' ? null : phase.verdicts;

  return (
    <div>
      <p className="prompt">{exercise.prompt}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          check();
        }}
      >
        {gaps.map((_g, i) => (
          <input
            key={i}
            aria-label={`gap-${i}`}
            value={values[i]}
            disabled={phase.kind !== 'input'}
            onChange={(e) => setAt(i, e.target.value)}
          />
        ))}
        {phase.kind === 'input' && (
          <button type="submit" disabled={!allFilled}>
            Проверить
          </button>
        )}
      </form>
      {verdicts && (
        <ul className="gap-feedback">
          {gaps.map((g, i) => {
            const v = verdicts[i];
            return (
              <li key={i}>
                {v.kind === 'correct' && <span>✓ {values[i]}</span>}
                {v.kind === 'close' && (
                  <span>
                    <DiffLine diff={v.diff} /> → {v.closest}
                  </span>
                )}
                {v.kind === 'wrong' && (
                  <span>
                    ✗ {values[i]} → {g.accepted[0]}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
      {phase.kind === 'selfAssess' && (
        <div role="status">
          <p>Засчитать?</p>
          <button onClick={() => grade(true)}>Да</button>
          <button onClick={() => grade(false)}>Нет</button>
        </div>
      )}
      {phase.kind === 'done' && (
        <p role="status">{phase.ok ? 'Верно!' : `Неверно. Ответы: ${gaps.map((g) => g.accepted[0]).join(', ')}`}</p>
      )}
    </div>
  );
}
