import { useState } from 'react';
import { content } from '../content';
import { loadProgress } from '../store/progress';
import { isModuleComplete } from '../engine/scoring';

const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B1-B2', 'B2'];
const levelRank = (level: string) => {
  const i = LEVEL_ORDER.indexOf(level);
  return i === -1 ? LEVEL_ORDER.length : i;
};

export function ModuleList({ onPick }: { onPick: (moduleId: string) => void }) {
  const [progress] = useState(() => loadProgress(content));
  const modules = [...content.modules].sort((a, b) => levelRank(a.level) - levelRank(b.level));
  const levels = [...new Set(modules.map((m) => m.level))]; // sorted above, so ranks ascend
  return (
    <div>
      <h1>English Gym</h1>
      <p className="subtitle">тренажёрный зал английского</p>
      {levels.map((level) => (
        <section key={level} className="level">
          <h2 className="level-header">{level}</h2>
          <ul className="modules">
            {modules
              .filter((m) => m.level === level)
              .map((m) => {
                const total = m.conceptIds.length;
                const mastered = m.conceptIds.filter((id) => progress.concepts[id]?.mastered).length;
                const complete = isModuleComplete(m.conceptIds, progress.concepts);
                return (
                  <li key={m.id}>
                    <button onClick={() => onPick(m.id)}>
                      {complete ? '✓ ' : ''}{m.title} — освоено {mastered}/{total}
                    </button>
                  </li>
                );
              })}
          </ul>
        </section>
      ))}
    </div>
  );
}
