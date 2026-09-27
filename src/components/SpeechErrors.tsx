import { useRef, useState } from 'react';
import { content } from '../content';
import { loadProgress, saveProgress, type ProgressState } from '../store/progress';
import { parseSpeechProfile } from '../store/speechProfile';
import { readTextFile } from '../store/readTextFile';
import { conceptErrorStats, unmappedErrorStats } from '../engine/speechStats';

export interface SpeechErrorsProps {
  onBack: () => void;
  onDrill: (conceptId: string) => void;
}

const ARROW = { down: '↓', up: '↑', flat: '=', new: '·' } as const;

export function SpeechErrors({ onBack, onDrill }: SpeechErrorsProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress(content));
  const [status, setStatus] = useState<string | null>(null);
  const [pasting, setPasting] = useState(false);
  const [draft, setDraft] = useState('');

  function applyProfile(raw: string) {
    const result = parseSpeechProfile(raw, content);
    if (!result.ok) {
      setStatus(result.error);
      return;
    }
    // Повторная вставка того же разбора — обычное дело (например, после
    // опечатки): замер с той же датой заменяет прежний, а не дублирует его —
    // иначе два замера с одинаковой датой читаются статистикой как «последний
    // и предыдущий» и любой тренд плющится в сравнение с самим собой.
    const existingIndex = progress.measurements.findIndex((m) => m.date === result.measurement.date);
    const measurements = existingIndex >= 0
      ? progress.measurements.map((m, i) => (i === existingIndex ? result.measurement : m))
      : [...progress.measurements, result.measurement];
    const next: ProgressState = { ...progress, measurements };
    saveProgress(next);
    setProgress(next);
    setPasting(false);
    setDraft('');
    setStatus(
      existingIndex >= 0
        ? `Замер за эту дату обновлён: размечено ${result.mapped}, без концепта ${result.unmapped}`
        : `Замер принят: размечено ${result.mapped}, без концепта ${result.unmapped}`,
    );
  }

  const rows = conceptErrorStats(content, progress.measurements);
  const unmapped = unmappedErrorStats(content, progress.measurements);

  return (
    <div>
      <header>
        <nav>
          <button onClick={onBack}>← Сегодня</button>
        </nav>
        <h2>Мои ошибки</h2>
        <p className="subtitle">частота в живой речи, на сто слов</p>
      </header>

      {progress.measurements.length === 0 && (
        <p>Замеров пока нет. Запиши две минуты речи, расшифруй и принеси разбор сюда.</p>
      )}

      <ul className="modules">
        {rows.map((r) => (
          <li key={r.conceptId}>
            <button onClick={() => onDrill(r.conceptId)}>
              {r.title} — {r.per100} на 100 слов {ARROW[r.trend]}
              {r.prevPer100 !== null && ` (было ${r.prevPer100})`}
            </button>
          </li>
        ))}
      </ul>

      {unmapped.length > 0 && (
        <section>
          <h3 className="level-header">Без концепта</h3>
          <p className="subtitle">тренировать нечем, но видеть надо</p>
          <ul className="gap-feedback">
            {unmapped.map((u) => (
              <li key={u.label}>{u.label} — {u.last}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="backup">
        <button onClick={() => fileRef.current?.click()}>Загрузить файлом</button>
        <button aria-expanded={pasting} onClick={() => setPasting((v) => !v)}>
          Вставить текстом
        </button>
        <input
          ref={fileRef}
          className="sr-only"
          type="file"
          accept="application/json,.json"
          aria-label="файл разбора"
          onChange={(e) => {
            const chosen = e.target.files?.[0];
            if (chosen) {
              void readTextFile(chosen)
                .then(applyProfile)
                .catch(() => setStatus('Не удалось прочитать файл'));
            }
            e.target.value = '';
          }}
        />
        {pasting && (
          <div>
            <textarea
              aria-label="текст разбора"
              value={draft}
              rows={6}
              onChange={(e) => setDraft(e.target.value)}
            />
            <button onClick={() => applyProfile(draft)}>Загрузить разбор</button>
          </div>
        )}
        <p role="status">{status}</p>
      </section>
    </div>
  );
}
