import { useMemo, useState } from 'react';
import { content } from '../content';
import { pickNextConcept, pickNextExercise } from '../engine/scheduler';
import { applyAnswer } from '../engine/scoring';
import { loadProgress, saveProgress, pushRecent, type ProgressState } from '../store/progress';
import { getRenderer } from './exercises';

export interface TrainingProps {
  moduleId: string;
  onComplete: () => void;
}

export function Training({ moduleId, onComplete }: TrainingProps) {
  const mod = useMemo(() => content.modules.find((m) => m.id === moduleId)!, [moduleId]);
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress(content));
  const [answered, setAnswered] = useState(false);
  const [tick, setTick] = useState(0); // forces a fresh exercise pick after "Дальше"

  const conceptId = pickNextConcept(content, moduleId, progress);
  // All hooks must run unconditionally — pick the exercise via a hook that
  // returns null when the module is complete, then branch on the result.
  const exercise = useMemo(
    () => (conceptId ? pickNextExercise(content, conceptId, progress) : null),
    // re-pick when concept changes or we advance
    [conceptId, tick], // eslint-disable-line react-hooks/exhaustive-deps
  );

  if (conceptId === null || exercise === null) {
    return (
      <div>
        <p>Модуль пройден!</p>
        <button onClick={onComplete}>К списку</button>
      </div>
    );
  }

  const concept = content.concepts.find((c) => c.id === conceptId)!;
  const Renderer = getRenderer(exercise.type);
  const cp = progress.concepts[conceptId];

  function handleResult(correct: boolean) {
    setAnswered(true);
    setProgress((prev) => {
      const poolSize = content.exercises.filter((e) => e.conceptId === conceptId).length;
      const updatedConcept = applyAnswer(prev.concepts[conceptId], correct, exercise.points, mod.masteryThreshold);
      updatedConcept.recentExerciseIds = pushRecent(prev.concepts[conceptId].recentExerciseIds, exercise.id, poolSize);
      const next: ProgressState = {
        ...prev,
        concepts: { ...prev.concepts, [conceptId]: updatedConcept },
      };
      saveProgress(next);
      return next;
    });
  }

  function next() {
    setAnswered(false);
    setTick((t) => t + 1);
  }

  return (
    <div>
      <header>
        <h2>{mod.title}</h2>
        <p>{concept.title} — {cp.score}/{mod.masteryThreshold}</p>
      </header>
      <Renderer key={exercise.id + tick} exercise={exercise} onResult={handleResult} />
      {answered && <button onClick={next}>Дальше</button>}
    </div>
  );
}
