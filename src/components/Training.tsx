import { useEffect, useMemo, useState } from 'react';
import { content as defaultContent } from '../content';
import { pickNextConcept, pickNextExercise } from '../engine/scheduler';
import { applyAnswer, isModuleComplete } from '../engine/scoring';
import { loadProgress, saveProgress, pushRecent, type ProgressState } from '../store/progress';
import { getRenderer } from './exercises';
import type { Content } from '../types';

export interface TrainingProps {
  moduleId: string;
  onExit: () => void;
  onSummary: () => void;
  content?: Content;
  rng?: () => number;
}

export function Training({ moduleId, onExit, onSummary, content = defaultContent, rng = Math.random }: TrainingProps) {
  const mod = useMemo(() => content.modules.find((m) => m.id === moduleId)!, [moduleId]); // eslint-disable-line react-hooks/exhaustive-deps
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress(content));
  const [answered, setAnswered] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const step = useMemo(
    () => {
      const cid = pickNextConcept(content, moduleId, progress);
      return { conceptId: cid, exercise: cid ? pickNextExercise(content, cid, progress, rng) : null };
    },
    [moduleId, tick], // eslint-disable-line react-hooks/exhaustive-deps
  );
  const conceptId = step.conceptId;
  const exercise = step.exercise;

  if (conceptId === null || exercise === null) {
    return (
      <div>
        <p>В этом модуле нет заданий.</p>
        <button onClick={onExit}>← К списку</button>
      </div>
    );
  }

  const concept = content.concepts.find((c) => c.id === conceptId)!;
  const Renderer = getRenderer(exercise.type);
  const cp = progress.concepts[conceptId];
  const activeConceptId = conceptId;
  const activeExercise = exercise;

  function handleResult(correct: boolean) {
    setAnswered(true);
    const poolSize = content.exercises.filter((e) => e.conceptId === activeConceptId).length;
    const updatedConcept = applyAnswer(progress.concepts[activeConceptId], correct, activeExercise.points, mod.masteryThreshold);
    updatedConcept.recentExerciseIds = pushRecent(progress.concepts[activeConceptId].recentExerciseIds, activeExercise.id, poolSize);
    const next: ProgressState = {
      ...progress,
      concepts: { ...progress.concepts, [activeConceptId]: updatedConcept },
    };
    // banner exactly on the not-complete -> complete transition of this session
    if (!isModuleComplete(mod.conceptIds, progress.concepts) && isModuleComplete(mod.conceptIds, next.concepts)) {
      setShowBanner(true);
    }
    setProgress(next);
  }

  function next() {
    setAnswered(false);
    setTick((t) => t + 1);
  }

  return (
    <div>
      <header>
        <nav>
          <button onClick={onExit}>← К списку</button>
          <button onClick={onSummary}>Итоги</button>
        </nav>
        <h2>{mod.title}</h2>
        <p className="score">
          {concept.title} — {cp.mastered ? `${cp.score} ✓` : `${cp.score} / ${mod.masteryThreshold}`}
        </p>
        {concept.theory && (
          <details key={'theory' + tick} className="theory">
            <summary>📖 Правило</summary>
            <p>{concept.theory}</p>
          </details>
        )}
      </header>
      {showBanner && <p className="banner" role="status">🏆 Модуль освоен — можно продолжать качаться!</p>}
      {/* getRenderer returns a stable reference from a static registry, so the
          component identity is constant per exercise type — state cannot reset. */}
      {/* eslint-disable-next-line react-hooks/static-components */}
      <Renderer key={exercise.id + ':' + tick} exercise={exercise} onResult={handleResult} />
      {answered && <button className="next" onClick={next}>Дальше</button>}
    </div>
  );
}
