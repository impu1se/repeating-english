import { useEffect, useMemo, useState } from 'react';
import { content as defaultContent } from '../content';
import { pickNextExercise } from '../engine/scheduler';
import { applyAnswer } from '../engine/scoring';
import { ensureToday, FOCUS_DRILLS_PER_DAY } from '../engine/daily';
import { loadProgress, saveProgress, pushRecent, type ProgressState } from '../store/progress';
import { getRenderer } from './exercises';
import type { Content } from '../types';

export interface FocusDrillProps {
  conceptId: string;
  today: string; // YYYY-MM-DD
  onExit: () => void;
  content?: Content;
  rng?: () => number;
}

export function FocusDrill({ conceptId, today, onExit, content = defaultContent, rng = Math.random }: FocusDrillProps) {
  const [progress, setProgress] = useState<ProgressState>(() => {
    const loaded = loadProgress(content);
    return { ...loaded, daily: ensureToday(loaded.daily, today) };
  });
  const [answered, setAnswered] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const concept = content.concepts.find((c) => c.id === conceptId)!;
  const mod = content.modules.find((m) => m.conceptIds.includes(conceptId))!;
  const done = progress.daily?.focusDrills ?? 0;

  const exercise = useMemo(
    () => pickNextExercise(content, conceptId, progress, rng),
    [conceptId, tick], // eslint-disable-line react-hooks/exhaustive-deps
  );
  // Так же, как в Training: компонент задания достаётся до JSX, чтобы
  // eslint-строка про статические компоненты стояла на самом использовании.
  const Renderer = exercise ? getRenderer(exercise.type) : null;

  function handleResult(correct: boolean) {
    if (exercise === null) return;
    setAnswered(true);
    const poolSize = content.exercises.filter((e) => e.conceptId === conceptId).length;
    const updated = applyAnswer(progress.concepts[conceptId], correct, exercise.points, mod.masteryThreshold);
    updated.recentExerciseIds = pushRecent(progress.concepts[conceptId].recentExerciseIds, exercise.id, poolSize);
    const daily = ensureToday(progress.daily, today);
    setProgress({
      ...progress,
      concepts: { ...progress.concepts, [conceptId]: updated },
      // потолок: грамматика входит в день только этим блоком и не больше нормы
      daily: { ...daily, focusDrills: Math.min(daily.focusDrills + 1, FOCUS_DRILLS_PER_DAY) },
    });
  }

  return (
    <div>
      <header>
        <nav>
          <button onClick={onExit}>← Сегодня</button>
        </nav>
        <h2>Ошибка недели: {concept.title}</h2>
        <p className="module-score">
          <span>{`${done} / ${FOCUS_DRILLS_PER_DAY}`}</span>
          <span className="bar" aria-hidden="true">
            <span className="bar-fill" style={{ width: `${(done / FOCUS_DRILLS_PER_DAY) * 100}%` }} />
          </span>
        </p>
        {concept.theory && (
          <details key={'theory' + tick} className="theory">
            <summary>📖 Правило</summary>
            <p>{concept.theory}</p>
          </details>
        )}
      </header>

      {done >= FOCUS_DRILLS_PER_DAY && !answered ? (
        // Баннер закрывает блок только после того, как ответ на последнее
        // задание прочитан и отпущен «Дальше» — иначе фидбэк по восьмому
        // ответу исчезает мгновенно, не успев показаться.
        <p className="banner" role="status">Блок фокуса закрыт на сегодня. Свободная тренировка есть в модулях.</p>
      ) : exercise && Renderer ? (
        <>
          {/* getRenderer отдаёт стабильную ссылку из статического реестра */}
          {/* eslint-disable-next-line react-hooks/static-components */}
          <Renderer key={exercise.id + ':' + tick} exercise={exercise} onResult={handleResult} />
          {answered && (
            <button className="next" onClick={() => { setAnswered(false); setTick((t) => t + 1); }}>
              Дальше
            </button>
          )}
        </>
      ) : (
        <p>У этого концепта нет заданий.</p>
      )}
    </div>
  );
}
