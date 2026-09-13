import { useState } from 'react';
import { content } from '../content';
import { loadProgress } from '../store/progress';
import { isModuleComplete, moduleProgress } from '../engine/scoring';
import { ProgressBackup } from './ProgressBackup';

const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B1-B2', 'B2'];
const levelRank = (level: string) => {
  const i = LEVEL_ORDER.indexOf(level);
  return i === -1 ? LEVEL_ORDER.length : i;
};

export interface ModuleListProps {
  onPick: (moduleId: string) => void;
  initialLevel?: string | null; // открыть сразу внутри уровня (возврат из тренировки)
}

export function ModuleList({ onPick, initialLevel = null }: ModuleListProps) {
  const [progress, setProgress] = useState(() => loadProgress(content));
  const [level, setLevel] = useState<string | null>(initialLevel);
  const modules = [...content.modules].sort((a, b) => levelRank(a.level) - levelRank(b.level));

  if (level === null) {
    const levels = [...new Set(modules.map((m) => m.level))]; // sorted above, so ranks ascend
    return (
      <div>
        <h1>English Gym</h1>
        <p className="subtitle">тренажёрный зал английского</p>
        <ul className="modules levels">
          {levels.map((lv) => {
            const group = modules.filter((m) => m.level === lv);
            const done = group.filter((m) => isModuleComplete(m.conceptIds, progress.concepts)).length;
            return (
              <li key={lv}>
                <button onClick={() => setLevel(lv)}>
                  {done === group.length ? '✓ ' : ''}{lv} — освоено {done}/{group.length} модулей
                </button>
              </li>
            );
          })}
        </ul>
        <ProgressBackup onImported={() => setProgress(loadProgress(content))} />
      </div>
    );
  }

  const group = modules.filter((m) => m.level === level);
  return (
    <div>
      <header>
        <nav>
          <button onClick={() => setLevel(null)}>← Уровни</button>
        </nav>
        <h2 className="level-header">{level}</h2>
      </header>
      <ul className="modules">
        {group.map((m) => {
          const total = m.conceptIds.length;
          const mastered = m.conceptIds.filter((id) => progress.concepts[id]?.mastered).length;
          const complete = isModuleComplete(m.conceptIds, progress.concepts);
          const mp = moduleProgress(m.conceptIds, progress.concepts, m.masteryThreshold);
          return (
            <li key={m.id}>
              <button onClick={() => onPick(m.id)}>
                {complete ? '✓ ' : ''}{m.title} — освоено {mastered}/{total} · {mp.score}/{mp.total}
                <span className="bar" aria-hidden="true">
                  <span className="bar-fill" style={{ width: `${(mp.score / mp.total) * 100}%` }} />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
