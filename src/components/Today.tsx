import { useEffect, useMemo, useState } from 'react';
import { content } from '../content';
import { loadProgress, saveProgress, type DailyState, type ProgressState } from '../store/progress';
import { ensureToday, isDayComplete, FOCUS_DRILLS_PER_DAY } from '../engine/daily';
import { suggestFocus, focusExpired } from '../engine/focus';

export interface TodayProps {
  today?: string; // YYYY-MM-DD; тесты подставляют фиксированную дату
  onOpenErrors: () => void;
  onOpenLevels: () => void;
  onDrill: (conceptId: string) => void;
}

const isoToday = () => new Date().toISOString().slice(0, 10);

export function Today({ today = isoToday(), onOpenErrors, onOpenLevels, onDrill }: TodayProps) {
  const [progress, setProgress] = useState<ProgressState>(() => {
    const loaded = loadProgress(content);
    return { ...loaded, daily: ensureToday(loaded.daily, today) };
  });

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const daily = progress.daily ?? ensureToday(null, today);
  const focus = progress.focus;
  const expired = focusExpired(focus, today);
  // suggestFocus проходит по всем замерам; пересчитывать его на каждый клик
  // по галочке незачем.
  const suggestion = useMemo(() => suggestFocus(content, progress), [progress]);
  const focusConcept = focus ? content.concepts.find((c) => c.id === focus.conceptId) : undefined;
  const suggestedConcept = suggestion ? content.concepts.find((c) => c.id === suggestion) : undefined;

  function toggle(key: keyof Pick<DailyState, 'listened' | 'recorded' | 'reviewed'>) {
    setProgress({ ...progress, daily: { ...daily, [key]: !daily[key] } });
  }

  function takeFocus(conceptId: string) {
    setProgress({ ...progress, focus: { conceptId, startedAt: today } });
  }

  const mark = (on: boolean) => (on ? '✓' : '○');

  return (
    <div>
      <h1>Сегодня</h1>
      <p className="subtitle">минимум, который закрывается и в плохой день</p>

      {isDayComplete(daily) && <p className="banner today-done">Минимум на сегодня закрыт</p>}

      <section>
        <h2 className="level-header">Вне приложения</h2>
        <ul className="modules">
          <li><button onClick={() => toggle('listened')}>{mark(daily.listened)} Слушал английский</button></li>
          <li><button onClick={() => toggle('recorded')}>{mark(daily.recorded)} Записал свою речь</button></li>
          <li><button onClick={() => toggle('reviewed')}>{mark(daily.reviewed)} Разобрал ошибки</button></li>
        </ul>
      </section>

      <section>
        <h2 className="level-header">Ошибка недели</h2>
        {expired && (
          <p className="banner" role="status">
            {suggestedConcept
              ? 'Неделя прошла. Посмотри, изменилась ли частота, и выбери следующую.'
              : 'Неделя прошла. Принеси новый разбор речи, чтобы выбрать следующую ошибку.'}
          </p>
        )}
        {focusConcept ? (
          <>
            {/* счётчик заданий один — он ниже, вместе с полосой */}
            <p className="module-score"><span>{focusConcept.title}</span></p>
            <button onClick={() => onDrill(focusConcept.id)}>Тренировать</button>
            {/* Смена фокуса — только руками и только после недели. Подсказка
                может совпасть с текущим фокусом: тогда неделя начинается заново. */}
            {expired && suggestedConcept && (
              <button onClick={() => takeFocus(suggestedConcept.id)}>
                Сменить фокус: {suggestedConcept.title}
              </button>
            )}
          </>
        ) : suggestedConcept ? (
          <>
            <p>Самое частое сейчас: {suggestedConcept.title}</p>
            <button onClick={() => takeFocus(suggestedConcept.id)}>
              Взять в фокус: {suggestedConcept.title}
            </button>
          </>
        ) : (
          <p>Пока не из чего выбирать. Принеси разбор речи или позанимайся в модулях.</p>
        )}
        <p className="module-score">
          <span>{`${daily.focusDrills} / ${FOCUS_DRILLS_PER_DAY}`}</span>
          <span className="bar" aria-hidden="true">
            <span className="bar-fill" style={{ width: `${(daily.focusDrills / FOCUS_DRILLS_PER_DAY) * 100}%` }} />
          </span>
        </p>
      </section>

      <section className="backup">
        <button onClick={onOpenErrors}>Мои ошибки</button>
        <button onClick={onOpenLevels}>Уровни и модули</button>
      </section>
    </div>
  );
}
