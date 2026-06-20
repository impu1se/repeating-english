import { content } from '../content';
import { loadProgress } from '../store/progress';

export function ModuleSummary({ moduleId, onBack }: { moduleId: string; onBack: () => void }) {
  const mod = content.modules.find((m) => m.id === moduleId)!;
  const progress = loadProgress(content);
  const rows = mod.conceptIds
    .map((id) => ({ concept: content.concepts.find((c) => c.id === id)!, errors: progress.concepts[id]?.errorCount ?? 0 }))
    .sort((a, b) => b.errors - a.errors);

  return (
    <div>
      <h2>Итоги: {mod.title}</h2>
      <ul>
        {rows.map((r) => (
          <li key={r.concept.id}>{r.concept.title} — ошибок: {r.errors}</li>
        ))}
      </ul>
      <button onClick={onBack}>К списку</button>
    </div>
  );
}
