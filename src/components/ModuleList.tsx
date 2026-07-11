import { useState } from 'react';
import { content } from '../content';
import { loadProgress } from '../store/progress';

export function ModuleList({ onPick }: { onPick: (moduleId: string) => void }) {
  // read once per mount: render must stay pure, and App remounts this screen on navigation
  const [progress] = useState(() => loadProgress(content));
  return (
    <div>
      <h1>Repeating English</h1>
      <ul className="modules">
        {content.modules.map((m) => {
          const total = m.conceptIds.length;
          const mastered = m.conceptIds.filter((id) => progress.concepts[id]?.mastered).length;
          return (
            <li key={m.id}>
              <button onClick={() => onPick(m.id)}>
                {m.title} ({m.level}) — {mastered}/{total} концептов
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
