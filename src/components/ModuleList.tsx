import { content } from '../content';
import { loadProgress } from '../store/progress';

export function ModuleList({ onPick }: { onPick: (moduleId: string) => void }) {
  const progress = loadProgress(content);
  return (
    <div>
      <h1>Repeating English</h1>
      <ul>
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
