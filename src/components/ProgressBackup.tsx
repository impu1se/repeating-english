import { useRef, useState } from 'react';
import { content } from '../content';
import { loadProgress, saveProgress } from '../store/progress';
import { serializeProgress, parseBackup, backupFileName } from '../store/backup';

export interface ProgressBackupProps {
  onImported: () => void;
}

// jsdom в этом проекте не даёт Blob.text(), а FileReader есть и там, и в Safari.
function readText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

export function ProgressBackup({ onImported }: ProgressBackupProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string | null>(null);

  async function exportProgress() {
    const json = serializeProgress(loadProgress(content));
    const name = backupFileName();
    // В установленном на домашний экран приложении ссылка со скачиванием
    // ненадёжна, поэтому основной путь — системное «Поделиться» с файлом.
    const file = new File([json], name, { type: 'application/json' });
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: name });
        setStatus('Прогресс выгружен');
      } catch (err) {
        // share() расходует пользовательский жест: буфер обмена после отказа
        // всё равно не сработает, поэтому в него не проваливаемся. Отмену
        // самим пользователем (закрыл шторку) не считаем ошибкой и молчим.
        if (err instanceof Error && err.name === 'AbortError') {
          setStatus(null);
        } else {
          setStatus('Не удалось поделиться прогрессом');
        }
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(json);
      setStatus('Прогресс скопирован в буфер обмена');
    } catch {
      setStatus('Не удалось выгрузить: ни «Поделиться», ни буфер обмена недоступны');
    }
  }

  async function importProgress(file: File) {
    const result = parseBackup(await readText(file), content);
    if (!result.ok) {
      setStatus(result.error);
      return;
    }
    saveProgress(result.state);
    setStatus(`Восстановлено концептов: ${result.restored}`);
    onImported();
  }

  return (
    <section className="backup">
      <button onClick={() => void exportProgress()}>Выгрузить прогресс</button>
      <button onClick={() => fileRef.current?.click()}>Загрузить прогресс</button>
      <input
        ref={fileRef}
        className="sr-only"
        type="file"
        accept="application/json,.json"
        aria-label="файл прогресса"
        onChange={(e) => {
          const chosen = e.target.files?.[0];
          if (chosen) void importProgress(chosen);
          e.target.value = ''; // чтобы тот же файл можно было выбрать повторно
        }}
      />
      {status && <p role="status">{status}</p>}
    </section>
  );
}
