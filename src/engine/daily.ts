import type { DailyState } from '../store/progress';

// Грамматика попадает в день только через блок фокуса, и с потолком.
// В четырёх частях метода грамматики нет вообще: «ещё немного грамматики,
// и я заговорю» — это способ не заговорить.
export const FOCUS_DRILLS_PER_DAY = 8;

export function freshDay(date: string): DailyState {
  return { date, listened: false, recorded: false, reviewed: false, focusDrills: 0 };
}

export function ensureToday(daily: DailyState | null, today: string): DailyState {
  if (daily !== null && daily.date === today) return daily;
  return freshDay(today);
}

// Минимум закрыт, только когда закрыт весь цикл. Приложение ведёт одну часть
// из четырёх, поэтому три отметки — внешние, и без них галочка врала бы.
export function isDayComplete(daily: DailyState): boolean {
  return daily.listened && daily.recorded && daily.reviewed && daily.focusDrills >= FOCUS_DRILLS_PER_DAY;
}
