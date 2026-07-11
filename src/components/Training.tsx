import { useEffect, useMemo, useState } from 'react';
import { content as defaultContent } from '../content';
import { pickNextConcept, pickNextExercise } from '../engine/scheduler';
import { applyAnswer } from '../engine/scoring';
import { loadProgress, saveProgress, pushRecent, type ProgressState } from '../store/progress';
import { getRenderer } from './exercises';
import type { Content } from '../types';

export interface TrainingProps {
  moduleId: string;
  onComplete: () => void;
  onExit: () => void;
  content?: Content;
  rng?: () => number;
}

export function Training({ moduleId, onComplete, onExit, content = defaultContent, rng = Math.random }: TrainingProps) {
  const mod = useMemo(() => content.modules.find((m) => m.id === moduleId)!, [moduleId]); // eslint-disable-line react-hooks/exhaustive-deps
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress(content));
  const [answered, setAnswered] = useState(false);
  const [tick, setTick] = useState(0); // forces a fresh exercise pick after "Дальше"

  // Persist outside the state updater: updaters must stay pure (StrictMode
  // re-invokes them). Saving the freshly loaded state on mount also persists
  // the version merge done by loadProgress.
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Freeze the active concept+exercise per step (tick). They are picked from
  // progress at advance time and stay stable while the user reads their result,
  // so answering (which mutates progress) cannot swap the card mid-result.
  // Advancing via next() (tick++) re-picks against the updated progress.
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
        <p>Модуль пройден!</p>
        <button onClick={onComplete}>К итогам</button>
      </div>
    );
  }

  const concept = content.concepts.find((c) => c.id === conceptId)!;
  const Renderer = getRenderer(exercise.type);
  const cp = progress.concepts[conceptId];
  const activeConceptId = conceptId;   // narrowed to string for use in nested closures
  const activeExercise = exercise;     // narrowed to Exercise for use in nested closures

  function handleResult(correct: boolean) {
    setAnswered(true);
    setProgress((prev) => {
      const poolSize = content.exercises.filter((e) => e.conceptId === activeConceptId).length;
      const updatedConcept = applyAnswer(prev.concepts[activeConceptId], correct, activeExercise.points, mod.masteryThreshold);
      updatedConcept.recentExerciseIds = pushRecent(prev.concepts[activeConceptId].recentExerciseIds, activeExercise.id, poolSize);
      return {
        ...prev,
        concepts: { ...prev.concepts, [activeConceptId]: updatedConcept },
      };
    });
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
        </nav>
        <h2>{mod.title}</h2>
        <p className="score">{concept.title} — {cp.score}/{mod.masteryThreshold}</p>
      </header>
      {/* getRenderer returns a stable reference from a static registry, so the
          component identity is constant per exercise type — state cannot reset. */}
      {/* eslint-disable-next-line react-hooks/static-components */}
      <Renderer key={exercise.id + ':' + tick} exercise={exercise} onResult={handleResult} />
      {answered && <button className="next" onClick={next}>Дальше</button>}
    </div>
  );
}
