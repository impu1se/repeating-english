import { useState } from 'react';
import type { ExerciseProps } from './index';

export function MatchPairs({ exercise, onResult }: ExerciseProps) {
  const pairs = exercise.pairs ?? [];
  const [selectedEn, setSelectedEn] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set()); // en values matched
  const [mistakes, setMistakes] = useState(0);

  function pickEn(en: string) {
    if (matched.has(en)) return;
    setSelectedEn(en);
  }
  function pickRu(ru: string) {
    if (selectedEn === null) return;
    const pair = pairs.find((p) => p.en === selectedEn);
    if (pair && pair.ru === ru) {
      const next = new Set(matched);
      next.add(selectedEn);
      setMatched(next);
      setSelectedEn(null);
      if (next.size === pairs.length) onResult(mistakes === 0);
    } else {
      setMistakes((m) => m + 1);
      setSelectedEn(null);
    }
  }

  return (
    <div>
      <p>{exercise.prompt}</p>
      <div style={{ display: 'flex', gap: 16 }}>
        <div>
          {pairs.map((p) => (
            <button key={p.en} disabled={matched.has(p.en)} aria-pressed={selectedEn === p.en} onClick={() => pickEn(p.en)}>{p.en}</button>
          ))}
        </div>
        <div>
          {pairs.map((p) => (
            <button key={p.ru} disabled={matched.has(p.en)} onClick={() => pickRu(p.ru)}>{p.ru}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
