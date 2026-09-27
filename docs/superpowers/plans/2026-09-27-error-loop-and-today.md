# Волна 1: петля ошибок и «Сегодня» — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Замкнуть петлю «записал речь → разобрал в чате → загрузил профиль → увидел топ ошибок → неделю гоняешь одну из них → следующий замер показывает, изменилась ли её частота», не написав ни одного нового задания.

**Architecture:** Хранилище получает три новых поля верхнего уровня — замеры, фокус и день — и вторую версию формата выгрузки. Разбор профиля и подсчёт частот делаются чистыми функциями без DOM. Поверх них три новых экрана: «Мои ошибки», тренировка одного концепта и «Сегодня», который становится точкой входа. Существующий `Training` не трогаем вообще: у тренировки фокуса другие правила, и отдельный компонент дешевле, чем разбор чужого.

**Tech Stack:** React 18.3, TypeScript 5.5 (strict), Vite 5.3 + vite-plugin-pwa, Vitest 2.0 + @testing-library/react (jsdom), Node 22 в CI.

**Spec:** `docs/superpowers/specs/2026-09-27-error-loop-and-today.md`

## Global Constraints

- Новых зависимостей нет — ни runtime, ни dev. В `dependencies` остаются `react` и `react-dom`.
- После каждой задачи `npm test`, `npm run build` и `npm run lint` зелёные. Базовая линия: 112 тестов в 20 файлах.
- TypeScript strict, `noUnusedLocals`, `noUnusedParameters`.
- Комментарии в коде и весь текст интерфейса — по-русски.
- Контент (`src/content/*`) и движок проверки ответов (`src/engine/checker.ts`, `normalize.ts`, `diff.ts`) не трогать. Новых заданий волна не создаёт.
- `masteryThreshold` равен **20** во всех 21 модуле. Число 50 из спеки v2 — неправда, не копировать.
- Грамматических концептов **46**, словарных 3. Каталог для анализатора — только 46 грамматических.
- Дневной минимум: три отметки внешних частей плюс **восемь** заданий фокуса.
- Фокус — ровно один концепт. По истечении недели приложение предлагает сменить, но само не переключает.
- Ошибки без концепта (`conceptId: null`) обязаны храниться и показываться: два из четырёх примеров фокуса в ролике ни в один концепт не попадают.
- `Training.tsx` и его тесты не изменяются этой волной.

## File Structure

**Создаются:**
- `scripts/generate-concept-catalog.mjs` — генератор каталога концептов из контента.
- `docs/analyzer/concepts.md` — каталог 46 грамматических концептов; его читает Claude в чате и, позже, преподаватель.
- `docs/analyzer/README.md` — схема файла профиля и инструкция, что присылать в чат.
- `src/store/speechProfile.ts` — разбор файла профиля в замер. Чистая логика.
- `src/store/speechProfile.test.ts`
- `src/engine/speechStats.ts` — частоты и динамика по замерам. Чистая логика.
- `src/engine/speechStats.test.ts`
- `src/engine/focus.ts` — выбор фокуса и срок. Чистая логика.
- `src/engine/focus.test.ts`
- `src/engine/daily.ts` — состояние дня и его закрытие. Чистая логика.
- `src/engine/daily.test.ts`
- `src/components/SpeechErrors.tsx` — экран «Мои ошибки» с загрузкой профиля.
- `src/components/SpeechErrors.test.tsx`
- `src/components/FocusDrill.tsx` — тренировка одного концепта на восемь заданий.
- `src/components/FocusDrill.test.tsx`
- `src/components/Today.tsx` — главный экран.
- `src/components/Today.test.tsx`

**Изменяются:**
- `src/store/progress.ts` — три новых поля верхнего уровня, их сохранение при загрузке.
- `src/store/progress.test.ts` — тесты на выживание новых полей.
- `src/store/backup.ts` — формат 2.
- `src/store/backup.test.ts`
- `src/App.tsx` — «Сегодня» как точка входа, маршруты на новые экраны.
- `src/App.test.tsx`
- `src/index.css` — стили новых экранов.
- `docs/superpowers/specs/2026-07-12-english-gym-design.md` — попутная уборка числа 50.

**Порядок:** хранилище первым, потому что сейчас любое новое поле верхнего уровня молча теряется при перезапуске и всё остальное строилось бы на песке. Дальше чистая логика, дальше экраны, дальше точка входа.

---

### Task 1: Хранилище держит замеры, фокус и день

**Files:**
- Modify: `src/store/progress.ts:6-9,46-56`
- Modify: `src/store/progress.test.ts`
- Modify: `src/engine/scheduler.test.ts:23,52` (два литерала `ProgressState`)

**Interfaces:**
- Consumes: ничего.
- Produces:
  - `interface Measurement { date: string; wordCount: number; errors: Record<string, number>; unmapped: { label: string; count: number }[] }`
  - `interface FocusState { conceptId: string; startedAt: string }`
  - `interface DailyState { date: string; listened: boolean; recorded: boolean; reviewed: boolean; focusDrills: number }`
  - `ProgressState` получает поля `measurements: Measurement[]`, `focus: FocusState | null`, `daily: DailyState | null`.
  - `mergeConcepts(content, incoming)` сохраняет прежнюю сигнатуру и по-прежнему отвечает только за концепты.

**Почему это первая задача.** Сейчас `loadProgress` собирает результат из `freshState` и переносит только `concepts` (`src/store/progress.ts:52`). Любое новое поле верхнего уровня исчезает при следующем запуске, молча и без ошибки.

- [ ] **Step 1: Написать падающий тест**

Добавить в конец `src/store/progress.test.ts`:

```ts
describe('поля верхнего уровня переживают перезапуск', () => {
  it('сохраняет замеры, фокус и день', () => {
    const state = loadProgress(content);
    state.measurements = [
      { date: '2026-09-27', wordCount: 300, errors: { 'a1-some-any': 4 }, unmapped: [{ label: 'предлоги', count: 2 }] },
    ];
    state.focus = { conceptId: 'a1-some-any', startedAt: '2026-09-27' };
    state.daily = { date: '2026-09-27', listened: true, recorded: false, reviewed: false, focusDrills: 3 };
    saveProgress(state);

    const reloaded = loadProgress(content);

    expect(reloaded.measurements).toEqual(state.measurements);
    expect(reloaded.focus).toEqual(state.focus);
    expect(reloaded.daily).toEqual(state.daily);
  });

  it('у нового пользователя поля пустые, а не undefined', () => {
    const fresh = loadProgress(content);
    expect(fresh.measurements).toEqual([]);
    expect(fresh.focus).toBeNull();
    expect(fresh.daily).toBeNull();
  });

  it('старая запись без новых полей читается без падения', () => {
    localStorage.setItem('re:progress', JSON.stringify({ contentVersion: content.version, concepts: {} }));
    const loaded = loadProgress(content);
    expect(loaded.measurements).toEqual([]);
    expect(loaded.focus).toBeNull();
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npx vitest run src/store/progress.test.ts`
Expected: FAIL, `Property 'measurements' does not exist on type 'ProgressState'` либо `expected undefined to equal []`.

- [ ] **Step 3: Расширить тип и загрузку**

В `src/store/progress.ts` заменить блок типов и `freshState`:

```ts
// Один разбор расшифровки речи. Хранится целиком, а не числами на концептах:
// иначе ошибкам без концепта (предлоги, произношение) не на чем висеть.
export interface Measurement {
  date: string; // YYYY-MM-DD
  wordCount: number; // нужен, чтобы считать частоту на 100 слов
  errors: Record<string, number>; // conceptId -> сколько раз ошибся
  unmapped: { label: string; count: number }[]; // ошибки без концепта
}

export interface FocusState {
  conceptId: string;
  startedAt: string; // YYYY-MM-DD
}

export interface DailyState {
  date: string; // YYYY-MM-DD
  listened: boolean;
  recorded: boolean;
  reviewed: boolean;
  focusDrills: number;
}

export interface ProgressState {
  contentVersion: string;
  concepts: Record<string, ConceptProgress>;
  measurements: Measurement[];
  focus: FocusState | null;
  daily: DailyState | null;
}

function freshState(content: Content): ProgressState {
  const concepts: Record<string, ConceptProgress> = {};
  for (const c of content.concepts) concepts[c.id] = emptyConceptProgress();
  return { contentVersion: content.version, concepts, measurements: [], focus: null, daily: null };
}
```

- [ ] **Step 4: Перенести поля верхнего уровня при загрузке**

В `src/store/progress.ts` заменить `loadProgress`:

```ts
export function loadProgress(content: Content): ProgressState {
  const raw = localStorage.getItem(KEY);
  if (!raw) return freshState(content);
  try {
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    if (parsed.contentVersion !== content.version) return freshState(content);
    const merged = mergeConcepts(content, parsed.concepts ?? {});
    // mergeConcepts отвечает только за концепты; поля верхнего уровня
    // переносятся здесь, иначе они молча исчезнут при перезапуске
    merged.measurements = Array.isArray(parsed.measurements) ? parsed.measurements : [];
    merged.focus = parsed.focus ?? null;
    merged.daily = parsed.daily ?? null;
    return merged;
  } catch {
    return freshState(content);
  }
}
```

- [ ] **Step 5: Починить литералы `ProgressState` в тестах планировщика**

Три новых поля обязательны, поэтому объектные литералы, объявленные как
`ProgressState`, перестают компилироваться. В репозитории таких два, оба в
`src/engine/scheduler.test.ts` (строки 23 и 52). В каждый добавить три поля
рядом с `concepts`:

```ts
    measurements: [],
    focus: null,
    daily: null,
```

Больше нигде править не нужно: `Training.tsx` собирает состояние через
`{ ...progress }`, а литерал в `Training.test.tsx` не типизирован и уходит в
`JSON.stringify`. Тесты `Training` этой волной не меняются.

Run: `npx tsc --noEmit`
Expected: ошибок нет.

- [ ] **Step 6: Убедиться, что тесты проходят**

Run: `npx vitest run src/store/progress.test.ts`
Expected: все зелёные, включая прежние тесты файла без правок.

Run: `npm test && npm run build && npm run lint`
Expected: 115 passed, сборка и линт чистые.

- [ ] **Step 7: Закоммитить**

```bash
git add src/store/progress.ts src/store/progress.test.ts src/engine/scheduler.test.ts
git commit -m "feat: progress keeps measurements, focus and daily state"
```

---

### Task 2: Вторая версия формата выгрузки

**Files:**
- Modify: `src/store/backup.ts:5-34,38-62`
- Modify: `src/store/backup.test.ts`

**Interfaces:**
- Consumes: `Measurement`, `FocusState`, `DailyState`, `ProgressState` из задачи 1.
- Produces: `BACKUP_FORMAT = 2`; `ProgressBackupFile` получает поля `measurements`, `focus`, `daily`; `parseBackup` принимает и файлы формата 1 (без этих полей), и формата 2.

- [ ] **Step 1: Написать падающий тест**

Добавить в конец `src/store/backup.test.ts`:

```ts
describe('формат 2', () => {
  it('выгружает замеры, фокус и день', () => {
    const state = loadProgress(content);
    state.measurements = [{ date: '2026-09-27', wordCount: 200, errors: {}, unmapped: [] }];
    state.focus = { conceptId: content.concepts[0].id, startedAt: '2026-09-27' };
    state.daily = { date: '2026-09-27', listened: true, recorded: true, reviewed: false, focusDrills: 8 };

    const parsed = JSON.parse(serializeProgress(state));

    expect(parsed.format).toBe(2);
    expect(parsed.measurements).toEqual(state.measurements);
    expect(parsed.focus).toEqual(state.focus);
    expect(parsed.daily).toEqual(state.daily);
  });

  it('круг выгрузка → загрузка не теряет замеры', () => {
    const state = loadProgress(content);
    state.measurements = [{ date: '2026-09-27', wordCount: 200, errors: { x: 1 }, unmapped: [] }];

    const result = parseBackup(serializeProgress(state), content);

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.state.measurements).toEqual(state.measurements);
  });

  it('принимает файл первой версии и подставляет пустые поля', () => {
    const old = JSON.stringify({
      app: 'english-gym',
      format: 1,
      exportedAt: '2026-09-13T10:00:00.000Z',
      contentVersion: content.version,
      concepts: {},
    });

    const result = parseBackup(old, content);

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.state.measurements).toEqual([]);
    expect(result.state.focus).toBeNull();
    expect(result.state.daily).toBeNull();
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npx vitest run src/store/backup.test.ts`
Expected: FAIL, `expected 1 to be 2`.

- [ ] **Step 3: Поднять формат**

В `src/store/backup.ts` заменить константу, тип и `serializeProgress`:

```ts
// Версия формата файла, а не версия контента. Вторая версия добавила замеры
// речи, фокус недели и состояние дня.
export const BACKUP_FORMAT = 2;

export interface ProgressBackupFile {
  app: 'english-gym';
  format: number;
  exportedAt: string;
  contentVersion: string;
  concepts: Record<string, ConceptProgress>;
  measurements: Measurement[];
  focus: FocusState | null;
  daily: DailyState | null;
}

export function serializeProgress(state: ProgressState, now: Date = new Date()): string {
  const file: ProgressBackupFile = {
    app: 'english-gym',
    format: BACKUP_FORMAT,
    exportedAt: now.toISOString(),
    contentVersion: state.contentVersion,
    concepts: state.concepts,
    measurements: state.measurements,
    focus: state.focus,
    daily: state.daily,
  };
  return JSON.stringify(file, null, 2);
}
```

Импорт в начале файла заменить на:

```ts
import { mergeConcepts, type ProgressState, type Measurement, type FocusState, type DailyState } from './progress';
```

- [ ] **Step 4: Научить разбор читать обе версии**

В `src/store/backup.ts` заменить хвост `parseBackup`, начиная со строки с `const incoming`:

```ts
  const incoming = file.concepts as Record<string, ConceptProgress>;
  const state = mergeConcepts(content, incoming);
  // Файл первой версии не знает про замеры — подставляем пустые, а не падаем.
  state.measurements = Array.isArray(file.measurements) ? file.measurements : [];
  state.focus = file.focus ?? null;
  state.daily = file.daily ?? null;
  const restored = Object.keys(state.concepts).filter((id) => incoming[id] !== undefined).length;
  return { ok: true, state, restored };
```

- [ ] **Step 5: Убедиться, что тесты проходят**

Run: `npx vitest run src/store/backup.test.ts`
Expected: все зелёные. Прежний тест «Файл сделан более новой версией приложения» по-прежнему проходит: он использует `format: 99`.

Run: `npm test && npm run build && npm run lint`
Expected: 118 passed, чисто.

- [ ] **Step 6: Закоммитить**

```bash
git add src/store/backup.ts src/store/backup.test.ts
git commit -m "feat: backup format 2 carries speech measurements"
```

---

### Task 3: Каталог концептов для анализатора

**Files:**
- Create: `scripts/generate-concept-catalog.mjs`
- Create: `docs/analyzer/concepts.md` (результат работы скрипта)
- Create: `docs/analyzer/README.md`
- Create: `src/content/catalog.test.ts`
- Modify: `package.json` (скрипт `catalog`)

**Interfaces:**
- Consumes: `content` из `src/content`.
- Produces: файл `docs/analyzer/concepts.md` — по строке на каждый из 46 грамматических концептов: идентификатор, название, первая строка теории. Это тот артефакт, который читает Claude в чате, размечая ошибки, и который позже прочитает преподаватель.

**Зачем тест.** Без него каталог разъедется со сборкой при первом же переименовании концепта, и профиль начнёт ссылаться на то, чего нет. Проверено: теория есть у всех 46 грамматических концептов, так что строка каталога всегда содержательна.

- [ ] **Step 1: Написать падающий тест**

Создать `src/content/catalog.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { content } from './index';

// Каталог читает Claude в чате, размечая ошибки речи по концептам.
// Если он разойдётся со сборкой, профиль начнёт ссылаться на несуществующее.
describe('каталог концептов для анализатора', () => {
  // vitest запускается из корня репозитория, поэтому путь относительный
  const catalog = readFileSync('docs/analyzer/concepts.md', 'utf8');
  const grammar = content.concepts.filter((c) => c.kind === 'grammar');

  it('содержит все грамматические концепты и только их', () => {
    const ids = [...catalog.matchAll(/^- `([a-z0-9-]+)`/gm)].map((m) => m[1]).sort();
    expect(ids).toEqual(grammar.map((c) => c.id).sort());
  });

  it('у каждой строки есть название концепта', () => {
    for (const c of grammar) {
      expect(catalog).toContain(c.title);
    }
  });

  it('объявляет версию контента, против которой собран', () => {
    expect(catalog).toContain(`contentVersion: ${content.version}`);
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npx vitest run src/content/catalog.test.ts`
Expected: FAIL, `ENOENT: no such file or directory, open 'docs/analyzer/concepts.md'`.

- [ ] **Step 3: Написать генератор**

Создать `scripts/generate-concept-catalog.mjs`:

```js
// Каталог грамматических концептов для разбора речи в чате.
// Запуск: npm run catalog
import { writeFileSync, mkdirSync } from 'node:fs';
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
const { content } = await server.ssrLoadModule('/src/content/index.ts');
await server.close();

const grammar = content.concepts.filter((c) => c.kind === 'grammar');
const firstLine = (t) => (t ?? '').split('\n')[0].trim();

const lines = [
  '# Каталог грамматических концептов',
  '',
  'Сгенерирован `npm run catalog` из контента. Руками не править.',
  '',
  `contentVersion: ${content.version}`,
  `концептов: ${grammar.length}`,
  '',
  'Этот файл читает Claude в чате, когда размечает ошибки из расшифровки речи.',
  'Ошибка, которой здесь нет соответствия, помечается `conceptId: null`.',
  '',
];
for (const c of grammar) {
  lines.push(`- \`${c.id}\` — ${c.title}. ${firstLine(c.theory)}`);
}

mkdirSync('docs/analyzer', { recursive: true });
writeFileSync('docs/analyzer/concepts.md', lines.join('\n') + '\n');
console.log(`каталог собран: ${grammar.length} концептов`);
```

Добавить в `package.json` в `scripts`:

```json
"catalog": "node scripts/generate-concept-catalog.mjs"
```

- [ ] **Step 4: Сгенерировать каталог и проверить тест**

Run: `npm run catalog`
Expected: `каталог собран: 46 концептов`.

Run: `npx vitest run src/content/catalog.test.ts`
Expected: 3 passed.

- [ ] **Step 5: Написать инструкцию для чата**

Создать `docs/analyzer/README.md`:

```markdown
# Разбор речи: что присылать и что приходит обратно

## Что делает человек

1. Записывает две минуты речи на диктофон и расшифровывает через Whisper.
   Встроенная диктовка iOS не годится: на неродном английском она вставляет
   собственные ошибки, которые разбор припишет говорящему.
2. Присылает расшифровку в чат вместе с этой папкой.

## Что делает Claude

Размечает грамматические ошибки по `concepts.md`. К каждой ошибке даёт цитату
из расшифровки. Человек выкидывает выдумки распознавалки — и только потом
получает файл. Подтверждение происходит в чате, до создания файла.

Ошибка, которой нет соответствия среди 46 концептов, получает `conceptId: null`
и живёт в профиле по своему названию: тренировать её нечем, но видеть её надо.

## Формат файла профиля

```json
{
  "app": "english-gym",
  "format": 1,
  "recordedAt": "2026-09-27",
  "wordCount": 312,
  "contentVersion": "2",
  "errors": [
    { "conceptId": "a1-nouns-articles", "label": "артикли", "count": 7,
      "examples": ["I went to shop", "he is teacher"] },
    { "conceptId": null, "label": "предлоги места", "count": 3,
      "examples": ["in the weekend"] }
  ]
}
```

`wordCount` обязателен: без него не посчитать частоту на 100 слов, а без
частоты замеры несравнимы — двенадцать ошибок за три минуты и три за
тридцать секунд говорят о разном.

## Как файл попадает в приложение

Экран «Мои ошибки» принимает и файл, и вставленный текст. На телефоне вставка
удобнее: файл пришлось бы сначала сохранять в «Файлы».
```

- [ ] **Step 6: Проверить всё и закоммитить**

Run: `npm test && npm run build && npm run lint`
Expected: 121 passed, чисто.

```bash
git add scripts/generate-concept-catalog.mjs docs/analyzer package.json src/content/catalog.test.ts
git commit -m "feat: concept catalog for the speech analyzer"
```

---

### Task 4: Разбор файла профиля

**Files:**
- Create: `src/store/speechProfile.ts`
- Create: `src/store/speechProfile.test.ts`

**Interfaces:**
- Consumes: `Measurement` из `src/store/progress.ts`, `Content` из `src/types.ts`.
- Produces:
  - `export const PROFILE_FORMAT = 1`
  - `export interface SpeechProfileFile { app: 'english-gym'; format: number; recordedAt: string; wordCount: number; contentVersion: string; errors: { conceptId: string | null; label: string; count: number; examples?: string[] }[] }`
  - `export type ProfileParseResult = { ok: true; measurement: Measurement; mapped: number; unmapped: number } | { ok: false; error: string }`
  - `export function parseSpeechProfile(raw: string, content: Content): ProfileParseResult`

**Правила разбора.** Ошибка с `conceptId`, которого нет в контенте, переезжает в `unmapped` по своему `label` — файл не отвергается: профиль мог быть сделан против другой сборки. Ошибка с `conceptId: null` сразу идёт в `unmapped`. Счётчики с одинаковым концептом складываются.

- [ ] **Step 1: Написать падающий тест**

Создать `src/store/speechProfile.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { content } from '../content';
import { parseSpeechProfile } from './speechProfile';

const known = content.concepts.find((c) => c.kind === 'grammar')!.id;

function profile(errors: unknown[], extra: Record<string, unknown> = {}) {
  return JSON.stringify({
    app: 'english-gym',
    format: 1,
    recordedAt: '2026-09-27',
    wordCount: 300,
    contentVersion: content.version,
    errors,
    ...extra,
  });
}

describe('разбор профиля речи', () => {
  it('превращает ошибки в замер', () => {
    const result = parseSpeechProfile(
      profile([{ conceptId: known, label: 'артикли', count: 7, examples: ['I went to shop'] }]),
      content,
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.measurement.date).toBe('2026-09-27');
    expect(result.measurement.wordCount).toBe(300);
    expect(result.measurement.errors[known]).toBe(7);
    expect(result.mapped).toBe(1);
  });

  it('ошибку без концепта кладёт в неразмеченные', () => {
    const result = parseSpeechProfile(
      profile([{ conceptId: null, label: 'предлоги места', count: 3 }]),
      content,
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.measurement.errors).toEqual({});
    expect(result.measurement.unmapped).toEqual([{ label: 'предлоги места', count: 3 }]);
    expect(result.unmapped).toBe(1);
  });

  it('неизвестный концепт не отвергает файл, а уходит в неразмеченные', () => {
    const result = parseSpeechProfile(
      profile([{ conceptId: 'concept-from-another-build', label: 'что-то', count: 2 }]),
      content,
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.measurement.errors).toEqual({});
    expect(result.measurement.unmapped).toEqual([{ label: 'что-то', count: 2 }]);
  });

  it('складывает повторы одного концепта', () => {
    const result = parseSpeechProfile(
      profile([
        { conceptId: known, label: 'артикли', count: 2 },
        { conceptId: known, label: 'артикли снова', count: 3 },
      ]),
      content,
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.measurement.errors[known]).toBe(5);
  });

  it('объясняет, что файл не тот', () => {
    expect(parseSpeechProfile('не json', content)).toEqual({ ok: false, error: 'Это не JSON' });
    expect(parseSpeechProfile('{"hello":1}', content)).toEqual({
      ok: false,
      error: 'Файл не похож на разбор речи',
    });
    expect(parseSpeechProfile(profile([], { format: 99 }), content)).toEqual({
      ok: false,
      error: 'Разбор сделан более новой версией приложения',
    });
    expect(parseSpeechProfile(profile([], { wordCount: 0 }), content)).toEqual({
      ok: false,
      error: 'В разборе нет числа слов — без него не посчитать частоту',
    });
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npx vitest run src/store/speechProfile.test.ts`
Expected: FAIL, `Failed to resolve import "./speechProfile"`.

- [ ] **Step 3: Написать модуль**

Создать `src/store/speechProfile.ts`:

```ts
import type { Content } from '../types';
import type { Measurement } from './progress';

// Версия формата файла разбора. Растёт, когда в него добавится несовместимое —
// например, лексические ошибки во второй волне.
export const PROFILE_FORMAT = 1;

export interface SpeechProfileError {
  conceptId: string | null;
  label: string;
  count: number;
  examples?: string[];
}

export interface SpeechProfileFile {
  app: 'english-gym';
  format: number;
  recordedAt: string;
  wordCount: number;
  contentVersion: string;
  errors: SpeechProfileError[];
}

export type ProfileParseResult =
  | { ok: true; measurement: Measurement; mapped: number; unmapped: number }
  | { ok: false; error: string };

export function parseSpeechProfile(raw: string, content: Content): ProfileParseResult {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return { ok: false, error: 'Это не JSON' };
  }
  if (typeof data !== 'object' || data === null) {
    return { ok: false, error: 'Файл не похож на разбор речи' };
  }
  const file = data as Partial<SpeechProfileFile>;
  if (file.app !== 'english-gym' || !Array.isArray(file.errors)) {
    return { ok: false, error: 'Файл не похож на разбор речи' };
  }
  if (typeof file.format !== 'number' || file.format > PROFILE_FORMAT) {
    return { ok: false, error: 'Разбор сделан более новой версией приложения' };
  }
  if (typeof file.wordCount !== 'number' || file.wordCount <= 0) {
    return { ok: false, error: 'В разборе нет числа слов — без него не посчитать частоту' };
  }

  const known = new Set(content.concepts.map((c) => c.id));
  const errors: Record<string, number> = {};
  const unmapped: { label: string; count: number }[] = [];
  let mapped = 0;

  for (const e of file.errors) {
    const count = typeof e?.count === 'number' && e.count > 0 ? e.count : 0;
    if (count === 0) continue;
    // Профиль мог быть собран против другой сборки контента: незнакомый
    // концепт не повод отвергать файл, но и тренировать его нечем.
    if (e.conceptId !== null && known.has(e.conceptId)) {
      errors[e.conceptId] = (errors[e.conceptId] ?? 0) + count;
      mapped += 1;
    } else {
      unmapped.push({ label: String(e.label ?? 'без названия'), count });
    }
  }

  const measurement: Measurement = {
    date: String(file.recordedAt ?? '').slice(0, 10),
    wordCount: file.wordCount,
    errors,
    unmapped,
  };
  return { ok: true, measurement, mapped, unmapped: unmapped.length };
}
```

- [ ] **Step 4: Убедиться, что тесты проходят**

Run: `npx vitest run src/store/speechProfile.test.ts`
Expected: 5 passed.

Run: `npm test && npm run build && npm run lint`
Expected: 132 passed, чисто. (Раунд правок добавил шесть тестов проверки входа сверх изначальных пяти.)

- [ ] **Step 5: Закоммитить**

```bash
git add src/store/speechProfile.ts src/store/speechProfile.test.ts
git commit -m "feat: parse a speech analysis profile into a measurement"
```

---

### Task 5: Частоты ошибок и динамика

**Files:**
- Create: `src/engine/speechStats.ts`
- Create: `src/engine/speechStats.test.ts`

**Interfaces:**
- Consumes: `Measurement` из `src/store/progress.ts`, `Content` из `src/types.ts`.
- Produces:
  - `export interface ConceptErrorStat { conceptId: string; title: string; last: number; per100: number; prevPer100: number | null; trend: 'new' | 'down' | 'up' | 'flat' }`
  - `export function conceptErrorStats(content: Content, measurements: Measurement[]): ConceptErrorStat[]` — отсортировано по убыванию `per100`.
  - `export function unmappedErrorStats(measurements: Measurement[]): { label: string; last: number }[]`

**Почему частота, а не счёт.** Двенадцать ошибок за три минуты речи и три за тридцать секунд говорят о разном. Сравнивать можно только на сто слов.

**Почему учитываются два последних замера, а не один.** Концепт, который был в прошлом замере и исчез в последнем, — это исправленная ошибка, и её надо показать с нулём и стрелкой вниз. Иначе главное событие всей затеи проходит молча.

- [ ] **Step 1: Написать падающий тест**

Создать `src/engine/speechStats.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { content } from '../content';
import { conceptErrorStats, unmappedErrorStats } from './speechStats';
import type { Measurement } from '../store/progress';

const grammar = content.concepts.filter((c) => c.kind === 'grammar');
const a = grammar[0].id;
const b = grammar[1].id;

const m = (date: string, wordCount: number, errors: Record<string, number>, unmapped: { label: string; count: number }[] = []): Measurement =>
  ({ date, wordCount, errors, unmapped });

describe('частоты ошибок речи', () => {
  it('считает частоту на сто слов по последнему замеру', () => {
    const stats = conceptErrorStats(content, [m('2026-09-27', 200, { [a]: 6 })]);
    const row = stats.find((s) => s.conceptId === a)!;
    expect(row.last).toBe(6);
    expect(row.per100).toBe(3);
    expect(row.prevPer100).toBeNull();
    expect(row.trend).toBe('new');
  });

  it('сравнивает с предыдущим замером, а не с суммой', () => {
    const stats = conceptErrorStats(content, [
      m('2026-09-20', 100, { [a]: 12 }),
      m('2026-09-27', 200, { [a]: 6 }),
    ]);
    const row = stats.find((s) => s.conceptId === a)!;
    expect(row.per100).toBe(3);
    expect(row.prevPer100).toBe(12);
    expect(row.trend).toBe('down');
  });

  it('показывает исчезнувшую ошибку нулём со стрелкой вниз', () => {
    const stats = conceptErrorStats(content, [
      m('2026-09-20', 100, { [a]: 4 }),
      m('2026-09-27', 100, {}),
    ]);
    const row = stats.find((s) => s.conceptId === a)!;
    expect(row.last).toBe(0);
    expect(row.per100).toBe(0);
    expect(row.trend).toBe('down');
  });

  it('сортирует по убыванию частоты', () => {
    const stats = conceptErrorStats(content, [m('2026-09-27', 100, { [a]: 1, [b]: 5 })]);
    expect(stats[0].conceptId).toBe(b);
  });

  it('подставляет название концепта', () => {
    const stats = conceptErrorStats(content, [m('2026-09-27', 100, { [a]: 1 })]);
    expect(stats[0].title).toBe(grammar[0].title);
  });

  it('на пустой истории возвращает пусто', () => {
    expect(conceptErrorStats(content, [])).toEqual([]);
  });

  it('отдаёт неразмеченные ошибки последнего замера', () => {
    const stats = unmappedErrorStats([
      m('2026-09-20', 100, {}, [{ label: 'старое', count: 9 }]),
      m('2026-09-27', 100, {}, [{ label: 'предлоги места', count: 3 }]),
    ]);
    expect(stats).toEqual([{ label: 'предлоги места', last: 3 }]);
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npx vitest run src/engine/speechStats.test.ts`
Expected: FAIL, `Failed to resolve import "./speechStats"`.

- [ ] **Step 3: Написать модуль**

Создать `src/engine/speechStats.ts`:

```ts
import type { Content } from '../types';
import type { Measurement } from '../store/progress';

export interface ConceptErrorStat {
  conceptId: string;
  title: string;
  last: number; // ошибок в последнем замере
  per100: number; // на сто слов, последний замер
  prevPer100: number | null;
  trend: 'new' | 'down' | 'up' | 'flat';
}

const per100 = (count: number, words: number) =>
  words > 0 ? Math.round((count / words) * 1000) / 10 : 0;

function trendOf(now: number, prev: number | null): ConceptErrorStat['trend'] {
  if (prev === null) return 'new';
  // полделения шкалы — чтобы шум округления не выглядел как движение
  if (now < prev - 0.05) return 'down';
  if (now > prev + 0.05) return 'up';
  return 'flat';
}

export function conceptErrorStats(content: Content, measurements: Measurement[]): ConceptErrorStat[] {
  if (measurements.length === 0) return [];
  const last = measurements[measurements.length - 1];
  const prev = measurements.length > 1 ? measurements[measurements.length - 2] : null;

  // Концепт из предыдущего замера, исчезнувший в последнем, — это исправленная
  // ошибка. Её показываем нулём: иначе главное событие проходит молча.
  const ids = new Set([...Object.keys(last.errors), ...Object.keys(prev?.errors ?? {})]);

  const rows: ConceptErrorStat[] = [];
  for (const id of ids) {
    const concept = content.concepts.find((c) => c.id === id);
    if (!concept) continue;
    const lastCount = last.errors[id] ?? 0;
    const nowRate = per100(lastCount, last.wordCount);
    const prevRate = prev ? per100(prev.errors[id] ?? 0, prev.wordCount) : null;
    rows.push({
      conceptId: id,
      title: concept.title,
      last: lastCount,
      per100: nowRate,
      prevPer100: prevRate,
      trend: trendOf(nowRate, prevRate),
    });
  }
  return rows.sort((x, y) => y.per100 - x.per100);
}

export function unmappedErrorStats(measurements: Measurement[]): { label: string; last: number }[] {
  if (measurements.length === 0) return [];
  const last = measurements[measurements.length - 1];
  return last.unmapped.map((u) => ({ label: u.label, last: u.count }));
}
```

- [ ] **Step 4: Убедиться, что тесты проходят**

Run: `npx vitest run src/engine/speechStats.test.ts`
Expected: 7 passed.

Run: `npm test && npm run build && npm run lint`
Expected: 139 passed, чисто.

- [ ] **Step 5: Закоммитить**

```bash
git add src/engine/speechStats.ts src/engine/speechStats.test.ts
git commit -m "feat: error frequency per hundred words and its trend"
```

---

### Task 6: Фокус недели и состояние дня

**Files:**
- Create: `src/engine/focus.ts`
- Create: `src/engine/focus.test.ts`
- Create: `src/engine/daily.ts`
- Create: `src/engine/daily.test.ts`

**Interfaces:**
- Consumes: `ConceptProgress` из `src/engine/scoring.ts`; `FocusState`, `DailyState`, `ProgressState` из `src/store/progress.ts`; `conceptErrorStats` из `src/engine/speechStats.ts`.
- Produces:
  - `export const FOCUS_DAYS = 7`
  - `export function suggestFocus(content: Content, progress: ProgressState): string | null`
  - `export function focusExpired(focus: FocusState | null, today: string): boolean`
  - `export const FOCUS_DRILLS_PER_DAY = 8`
  - `export function freshDay(date: string): DailyState`
  - `export function ensureToday(daily: DailyState | null, today: string): DailyState`
  - `export function isDayComplete(daily: DailyState): boolean`

**Почему запасной выбор идёт по числу ошибок, а не по счёту.** Ноль очков — это пол: концепт, которого не касались, всегда будет с наименьшим счётом. Такой выбор указывал бы на «не начинал», а не на «слабое место».

- [ ] **Step 1: Написать падающий тест фокуса**

Создать `src/engine/focus.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { content } from '../content';
import { suggestFocus, focusExpired, FOCUS_DAYS } from './focus';
import { emptyConceptProgress, type ConceptProgress } from './scoring';
import type { ProgressState } from '../store/progress';

const grammar = content.concepts.filter((c) => c.kind === 'grammar');
const a = grammar[0].id;
const b = grammar[1].id;

function state(concepts: Record<string, Partial<ConceptProgress>>, measurements: ProgressState['measurements'] = []): ProgressState {
  const all: Record<string, ConceptProgress> = {};
  for (const c of content.concepts) all[c.id] = emptyConceptProgress();
  for (const [id, patch] of Object.entries(concepts)) all[id] = { ...all[id], ...patch };
  return { contentVersion: content.version, concepts: all, measurements, focus: null, daily: null };
}

describe('выбор фокуса', () => {
  it('берёт самую частую ошибку речи, когда есть замеры', () => {
    const s = state({}, [{ date: '2026-09-27', wordCount: 100, errors: { [b]: 5, [a]: 1 }, unmapped: [] }]);
    expect(suggestFocus(content, s)).toBe(b);
  });

  it('без замеров берёт концепт с наибольшим числом ошибок в упражнениях', () => {
    const s = state({ [a]: { errorCount: 2, score: 30 }, [b]: { errorCount: 9, score: 30 } });
    expect(suggestFocus(content, s)).toBe(b);
  });

  it('при равенстве ошибок берёт меньший счёт', () => {
    const s = state({ [a]: { errorCount: 4, score: 30 }, [b]: { errorCount: 4, score: 5 } });
    expect(suggestFocus(content, s)).toBe(b);
  });

  it('не предлагает концепт, которого не касались', () => {
    expect(suggestFocus(content, state({}))).toBeNull();
  });

  it('неделя истекает на седьмой день', () => {
    const focus = { conceptId: a, startedAt: '2026-09-20' };
    expect(focusExpired(focus, '2026-09-26')).toBe(false);
    expect(focusExpired(focus, '2026-09-27')).toBe(true);
    expect(focusExpired(null, '2026-09-27')).toBe(false);
    expect(FOCUS_DAYS).toBe(7);
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npx vitest run src/engine/focus.test.ts`
Expected: FAIL, `Failed to resolve import "./focus"`.

- [ ] **Step 3: Написать модуль фокуса**

Создать `src/engine/focus.ts`:

```ts
import type { Content } from '../types';
import type { FocusState, ProgressState } from '../store/progress';
import { conceptErrorStats } from './speechStats';

export const FOCUS_DAYS = 7;

// Пока замеров речи нет, слабое место ищем по ошибкам в упражнениях.
// По наименьшему счёту искать нельзя: ноль — это пол, и такой поиск всегда
// указывал бы на концепт, которого просто не касались.
function fallbackFocus(content: Content, progress: ProgressState): string | null {
  let best: string | null = null;
  let bestErrors = 0;
  let bestScore = Infinity;
  for (const c of content.concepts) {
    if (c.kind !== 'grammar') continue;
    const p = progress.concepts[c.id];
    if (!p || p.errorCount === 0) continue;
    if (p.errorCount > bestErrors || (p.errorCount === bestErrors && p.score < bestScore)) {
      best = c.id;
      bestErrors = p.errorCount;
      bestScore = p.score;
    }
  }
  return best;
}

export function suggestFocus(content: Content, progress: ProgressState): string | null {
  const stats = conceptErrorStats(content, progress.measurements);
  if (stats.length > 0) return stats[0].conceptId;
  return fallbackFocus(content, progress);
}

export function focusExpired(focus: FocusState | null, today: string): boolean {
  if (focus === null) return false;
  const started = Date.parse(focus.startedAt + 'T00:00:00Z');
  const now = Date.parse(today + 'T00:00:00Z');
  if (Number.isNaN(started) || Number.isNaN(now)) return false;
  return (now - started) / 86_400_000 >= FOCUS_DAYS;
}
```

- [ ] **Step 4: Написать падающий тест дня**

Создать `src/engine/daily.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { freshDay, ensureToday, isDayComplete, FOCUS_DRILLS_PER_DAY } from './daily';

describe('состояние дня', () => {
  it('новый день пустой', () => {
    expect(freshDay('2026-09-27')).toEqual({
      date: '2026-09-27',
      listened: false,
      recorded: false,
      reviewed: false,
      focusDrills: 0,
    });
  });

  it('вчерашний день заменяется свежим', () => {
    const yesterday = { date: '2026-09-26', listened: true, recorded: true, reviewed: true, focusDrills: 8 };
    expect(ensureToday(yesterday, '2026-09-27')).toEqual(freshDay('2026-09-27'));
  });

  it('сегодняшний день сохраняется как есть', () => {
    const today = { date: '2026-09-27', listened: true, recorded: false, reviewed: false, focusDrills: 3 };
    expect(ensureToday(today, '2026-09-27')).toBe(today);
  });

  it('пустое состояние превращается в свежий день', () => {
    expect(ensureToday(null, '2026-09-27')).toEqual(freshDay('2026-09-27'));
  });

  it('день закрыт только когда закрыто всё', () => {
    const full = { date: '2026-09-27', listened: true, recorded: true, reviewed: true, focusDrills: FOCUS_DRILLS_PER_DAY };
    expect(isDayComplete(full)).toBe(true);
    expect(isDayComplete({ ...full, listened: false })).toBe(false);
    expect(isDayComplete({ ...full, focusDrills: FOCUS_DRILLS_PER_DAY - 1 })).toBe(false);
  });

  it('норма заданий фокуса — восемь', () => {
    expect(FOCUS_DRILLS_PER_DAY).toBe(8);
  });
});
```

- [ ] **Step 5: Написать модуль дня**

Создать `src/engine/daily.ts`:

```ts
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
```

- [ ] **Step 6: Убедиться, что оба набора проходят**

Run: `npx vitest run src/engine/focus.test.ts src/engine/daily.test.ts`
Expected: 11 passed.

Run: `npm test && npm run build && npm run lint`
Expected: 150 passed, чисто.

- [ ] **Step 7: Закоммитить**

```bash
git add src/engine/focus.ts src/engine/focus.test.ts src/engine/daily.ts src/engine/daily.test.ts
git commit -m "feat: weekly focus selection and daily minimum state"
```

---

### Task 7: Экран «Мои ошибки» и загрузка разбора

**Files:**
- Create: `src/components/SpeechErrors.tsx`
- Create: `src/components/SpeechErrors.test.tsx`

**Interfaces:**
- Consumes: `parseSpeechProfile` (задача 4), `conceptErrorStats` и `unmappedErrorStats` (задача 5), `loadProgress`/`saveProgress` (задача 1).
- Produces: `export function SpeechErrors({ onBack, onDrill }: { onBack: () => void; onDrill: (conceptId: string) => void })`

**Имя экрана.** «Мои ошибки», не «Итоги». Существующий экран `ModuleSummary` показывает `errorCount` — ошибки в упражнениях. Это другая величина, и путать их нельзя.

**Два пути загрузки.** Файл нужен на ноутбуке, вставка текста — на телефоне, где файл пришлось бы сначала сохранять в «Файлы». Разбор один и тот же, различается только источник строки.

- [ ] **Step 1: Написать падающий тест**

Создать `src/components/SpeechErrors.test.tsx`:

```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SpeechErrors } from './SpeechErrors';
import { content } from '../content';
import { loadProgress } from '../store/progress';

beforeEach(() => localStorage.clear());

const grammar = content.concepts.filter((c) => c.kind === 'grammar');

function profileJson(errors: unknown[], wordCount = 200, recordedAt = '2026-09-27') {
  return JSON.stringify({
    app: 'english-gym',
    format: 1,
    recordedAt,
    wordCount,
    contentVersion: content.version,
    errors,
  });
}

// userEvent.type трактует `{` и `[` как описания клавиш, поэтому JSON именно
// вставляем: сначала фокус в поле, потом paste.
async function pasteProfile(json: string) {
  await userEvent.click(screen.getByRole('button', { name: 'Вставить текстом' }));
  await userEvent.click(screen.getByLabelText('текст разбора'));
  await userEvent.paste(json);
  await userEvent.click(screen.getByRole('button', { name: 'Загрузить разбор' }));
}

describe('SpeechErrors', () => {
  it('принимает разбор из вставленного текста и показывает частоту', async () => {
    render(<SpeechErrors onBack={() => {}} onDrill={() => {}} />);

    await pasteProfile(profileJson([{ conceptId: grammar[0].id, label: 'артикли', count: 6 }]));

    expect(await screen.findByText(new RegExp(grammar[0].title))).toBeInTheDocument();
    expect(screen.getByText(/3 на 100 слов/)).toBeInTheDocument();
  });

  it('сохраняет замер в прогресс', async () => {
    render(<SpeechErrors onBack={() => {}} onDrill={() => {}} />);

    await pasteProfile(profileJson([{ conceptId: grammar[0].id, label: 'артикли', count: 6 }]));
    await screen.findByText(new RegExp(grammar[0].title));

    expect(loadProgress(content).measurements).toHaveLength(1);
  });

  it('объясняет непонятный текст и ничего не сохраняет', async () => {
    render(<SpeechErrors onBack={() => {}} onDrill={() => {}} />);

    await pasteProfile('совсем не json');

    expect(await screen.findByRole('status')).toHaveTextContent('Это не JSON');
    expect(loadProgress(content).measurements).toHaveLength(0);
  });

  it('показывает ошибки без концепта отдельно и не даёт их тренировать', async () => {
    render(<SpeechErrors onBack={() => {}} onDrill={() => {}} />);

    await pasteProfile(profileJson([{ conceptId: null, label: 'предлоги места', count: 3 }]));

    expect(await screen.findByText(/предлоги места/)).toBeInTheDocument();
    expect(screen.getByText(/тренировать нечем/)).toBeInTheDocument();
  });

  it('ведёт в тренировку концепта', async () => {
    const onDrill = vi.fn();
    render(<SpeechErrors onBack={() => {}} onDrill={onDrill} />);

    await pasteProfile(profileJson([{ conceptId: grammar[0].id, label: 'артикли', count: 6 }]));
    await userEvent.click(await screen.findByRole('button', { name: new RegExp(grammar[0].title) }));

    expect(onDrill).toHaveBeenCalledWith(grammar[0].id);
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npx vitest run src/components/SpeechErrors.test.tsx`
Expected: FAIL, `Failed to resolve import "./SpeechErrors"`.

- [ ] **Step 3: Написать компонент**

Создать `src/components/SpeechErrors.tsx`:

```tsx
import { useRef, useState } from 'react';
import { content } from '../content';
import { loadProgress, saveProgress, type ProgressState } from '../store/progress';
import { parseSpeechProfile } from '../store/speechProfile';
import { conceptErrorStats, unmappedErrorStats } from '../engine/speechStats';

export interface SpeechErrorsProps {
  onBack: () => void;
  onDrill: (conceptId: string) => void;
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
    const next: ProgressState = { ...progress, measurements: [...progress.measurements, result.measurement] };
    saveProgress(next);
    setProgress(next);
    setPasting(false);
    setDraft('');
    setStatus(`Замер принят: размечено ${result.mapped}, без концепта ${result.unmapped}`);
  }

  const rows = conceptErrorStats(content, progress.measurements);
  const unmapped = unmappedErrorStats(progress.measurements);

  return (
    <div>
      <header>
        <nav>
          <button onClick={onBack}>← Сегодня</button>
        </nav>
        <h2>Мои ошибки</h2>
        <p className="subtitle">частота в живой речи, на сто слов</p>
      </header>

      {rows.length === 0 && <p>Замеров пока нет. Запиши две минуты речи, расшифруй и принеси разбор сюда.</p>}

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
        <button onClick={() => setPasting((v) => !v)}>Вставить текстом</button>
        <input
          ref={fileRef}
          className="sr-only"
          type="file"
          accept="application/json,.json"
          aria-label="файл разбора"
          onChange={(e) => {
            const chosen = e.target.files?.[0];
            if (chosen) void readText(chosen).then(applyProfile);
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
        {status && <p role="status">{status}</p>}
      </section>
    </div>
  );
}
```

- [ ] **Step 4: Убедиться, что тесты проходят**

Run: `npx vitest run src/components/SpeechErrors.test.tsx`
Expected: 5 passed.

Run: `npm test && npm run build && npm run lint`
Expected: 155 passed, чисто.

- [ ] **Step 5: Закоммитить**

```bash
git add src/components/SpeechErrors.tsx src/components/SpeechErrors.test.tsx
git commit -m "feat: my errors screen with file and paste import"
```

---

### Task 8: Тренировка одного концепта

**Files:**
- Create: `src/components/FocusDrill.tsx`
- Create: `src/components/FocusDrill.test.tsx`

**Interfaces:**
- Consumes: `pickNextExercise` из `src/engine/scheduler.ts`, `applyAnswer` из `src/engine/scoring.ts`, `pushRecent`/`loadProgress`/`saveProgress` из `src/store/progress.ts`, `ensureToday` и `FOCUS_DRILLS_PER_DAY` из `src/engine/daily.ts`, `getRenderer` из `src/components/exercises`.
- Produces: `export function FocusDrill({ conceptId, today, onExit, content?, rng? })`

**Почему отдельный компонент, а не правка `Training`.** У тренировки фокуса другие правила: один концепт вместо модуля, потолок в восемь заданий, счётчик дня вместо полосы модуля, никакого баннера освоения. `Training.tsx` завязан на `moduleId` в шести местах, и его переделка потянула бы за собой его тесты и тесты `App`. Новый компонент на семьдесят строк дешевле и ничего не ломает. Спека называла отвязку `Training` фактом, который надо учесть, — учитываем именно так.

- [ ] **Step 1: Написать падающий тест**

Создать `src/components/FocusDrill.test.tsx`:

```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FocusDrill } from './FocusDrill';
import { loadProgress, saveProgress } from '../store/progress';
import { FOCUS_DRILLS_PER_DAY } from '../engine/daily';
import type { Content } from '../types';

beforeEach(() => localStorage.clear());

// Фикстура вместо настоящего контента: один концепт и одно задание типа
// choose_word. Выбор варианта сразу засчитывает ответ, поэтому проверка
// счётчика не зависит от того, какое задание выпало из большого пула, —
// у translate/fill_gap/verb_form ответ надо набрать, у word_order собрать,
// у match_pairs сопоставить, и «щёлкнуть любую кнопку» там не работает.
const fixture: Content = {
  version: 'focus-drill-test',
  modules: [{ id: 'm', title: 'Тест', level: 'A1', masteryThreshold: 20, conceptIds: ['c'] }],
  concepts: [
    {
      id: 'c',
      moduleId: 'm',
      title: 'Артикли',
      kind: 'grammar',
      theory: 'a перед согласным звуком, an перед гласным',
      exerciseIds: ['e1'],
    },
  ],
  exercises: [
    {
      id: 'e1',
      conceptId: 'c',
      type: 'choose_word',
      prompt: 'I have ___ apple.',
      points: 1,
      options: ['an', 'a', 'the'],
      accepted: ['an'],
    },
  ],
};

function renderDrill(onExit: () => void = () => {}) {
  return render(
    <FocusDrill conceptId="c" today="2026-09-27" onExit={onExit} content={fixture} rng={() => 0} />,
  );
}

describe('FocusDrill', () => {
  it('показывает название концепта и счётчик дня', () => {
    renderDrill();
    expect(screen.getByRole('heading', { name: /Артикли/ })).toBeInTheDocument();
    expect(screen.getByText(`0 / ${FOCUS_DRILLS_PER_DAY}`)).toBeInTheDocument();
  });

  it('засчитывает задание в счётчик дня и сохраняет его', async () => {
    renderDrill();

    // ChooseWord перемешивает варианты, поэтому выбираем по тексту, а не по
    // порядку. Ответ неверный — для счётчика это неважно.
    await userEvent.click(screen.getByRole('button', { name: 'the' }));

    expect(screen.getByText(`1 / ${FOCUS_DRILLS_PER_DAY}`)).toBeInTheDocument();
    expect(loadProgress(fixture).daily?.focusDrills).toBe(1);
  });

  it('закрывает блок на восьмом задании', () => {
    const state = loadProgress(fixture);
    state.daily = { date: '2026-09-27', listened: false, recorded: false, reviewed: false, focusDrills: FOCUS_DRILLS_PER_DAY };
    saveProgress(state);

    renderDrill();

    expect(screen.getByRole('status')).toHaveTextContent('Блок фокуса закрыт');
  });

  it('вчерашний счётчик не засчитывается сегодня', () => {
    const state = loadProgress(fixture);
    state.daily = { date: '2026-09-26', listened: true, recorded: true, reviewed: true, focusDrills: FOCUS_DRILLS_PER_DAY };
    saveProgress(state);

    renderDrill();

    expect(screen.getByText(`0 / ${FOCUS_DRILLS_PER_DAY}`)).toBeInTheDocument();
  });

  it('выходит по кнопке', async () => {
    const onExit = vi.fn();
    renderDrill(onExit);
    await userEvent.click(screen.getByRole('button', { name: '← Сегодня' }));
    expect(onExit).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npx vitest run src/components/FocusDrill.test.tsx`
Expected: FAIL, `Failed to resolve import "./FocusDrill"`.

- [ ] **Step 3: Написать компонент**

Создать `src/components/FocusDrill.tsx`:

```tsx
import { useEffect, useMemo, useState } from 'react';
import { content as defaultContent } from '../content';
import { pickNextExercise } from '../engine/scheduler';
import { applyAnswer } from '../engine/scoring';
import { ensureToday, FOCUS_DRILLS_PER_DAY } from '../engine/daily';
import { loadProgress, saveProgress, pushRecent, type ProgressState } from '../store/progress';
import { getRenderer } from './exercises';
import type { Content } from '../types';

export interface FocusDrillProps {
  conceptId: string;
  today: string; // YYYY-MM-DD
  onExit: () => void;
  content?: Content;
  rng?: () => number;
}

export function FocusDrill({ conceptId, today, onExit, content = defaultContent, rng = Math.random }: FocusDrillProps) {
  const [progress, setProgress] = useState<ProgressState>(() => {
    const loaded = loadProgress(content);
    return { ...loaded, daily: ensureToday(loaded.daily, today) };
  });
  const [answered, setAnswered] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const concept = content.concepts.find((c) => c.id === conceptId)!;
  const mod = content.modules.find((m) => m.conceptIds.includes(conceptId))!;
  const done = progress.daily?.focusDrills ?? 0;

  const exercise = useMemo(
    () => pickNextExercise(content, conceptId, progress, rng),
    [conceptId, tick], // eslint-disable-line react-hooks/exhaustive-deps
  );
  // Так же, как в Training: компонент задания достаётся до JSX, чтобы
  // eslint-строка про статические компоненты стояла на самом использовании.
  const Renderer = exercise ? getRenderer(exercise.type) : null;

  function handleResult(correct: boolean) {
    if (exercise === null) return;
    setAnswered(true);
    const poolSize = content.exercises.filter((e) => e.conceptId === conceptId).length;
    const updated = applyAnswer(progress.concepts[conceptId], correct, exercise.points, mod.masteryThreshold);
    updated.recentExerciseIds = pushRecent(progress.concepts[conceptId].recentExerciseIds, exercise.id, poolSize);
    const daily = ensureToday(progress.daily, today);
    setProgress({
      ...progress,
      concepts: { ...progress.concepts, [conceptId]: updated },
      // потолок: грамматика входит в день только этим блоком и не больше нормы
      daily: { ...daily, focusDrills: Math.min(daily.focusDrills + 1, FOCUS_DRILLS_PER_DAY) },
    });
  }

  return (
    <div>
      <header>
        <nav>
          <button onClick={onExit}>← Сегодня</button>
        </nav>
        <h2>Ошибка недели: {concept.title}</h2>
        <p className="module-score">
          <span>{`${done} / ${FOCUS_DRILLS_PER_DAY}`}</span>
          <span className="bar" aria-hidden="true">
            <span className="bar-fill" style={{ width: `${(done / FOCUS_DRILLS_PER_DAY) * 100}%` }} />
          </span>
        </p>
        {concept.theory && (
          <details key={'theory' + tick} className="theory">
            <summary>📖 Правило</summary>
            <p>{concept.theory}</p>
          </details>
        )}
      </header>

      {done >= FOCUS_DRILLS_PER_DAY ? (
        <p className="banner" role="status">Блок фокуса закрыт на сегодня. Можно продолжать, но норма уже сделана.</p>
      ) : exercise && Renderer ? (
        <>
          {/* getRenderer отдаёт стабильную ссылку из статического реестра */}
          {/* eslint-disable-next-line react-hooks/static-components */}
          <Renderer key={exercise.id + ':' + tick} exercise={exercise} onResult={handleResult} />
          {answered && (
            <button className="next" onClick={() => { setAnswered(false); setTick((t) => t + 1); }}>
              Дальше
            </button>
          )}
        </>
      ) : (
        <p>У этого концепта нет заданий.</p>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Убедиться, что тесты проходят**

Run: `npx vitest run src/components/FocusDrill.test.tsx`
Expected: 5 passed.

Run: `npm test && npm run build && npm run lint`
Expected: 160 passed, чисто.

- [ ] **Step 5: Закоммитить**

```bash
git add src/components/FocusDrill.tsx src/components/FocusDrill.test.tsx
git commit -m "feat: single-concept focus drill capped at the daily norm"
```

---

### Task 9: Экран «Сегодня» и новая точка входа

**Files:**
- Create: `src/components/Today.tsx`
- Create: `src/components/Today.test.tsx`
- Modify: `src/App.tsx` (целиком)
- Modify: `src/App.test.tsx`
- Modify: `src/components/ModuleList.tsx` (проп `onBack` и кнопка «← Сегодня» в корне)
- Modify: `src/index.css` (добавить блок в конец)

**Interfaces:**
- Consumes: `suggestFocus` и `focusExpired` (задача 6), `ensureToday`, `isDayComplete`, `FOCUS_DRILLS_PER_DAY` (задача 6), `loadProgress`/`saveProgress` (задача 1).
- Produces: `export function Today({ today?, onOpenErrors, onOpenLevels, onDrill })`; `App` показывает `Today` первым экраном.

**Почему отметки внешних частей обязательны.** Приложение ведёт одну часть цикла из четырёх. Без отметок «слушал», «записал», «разобрал» его галочка закрывала бы четверть работы и называла это днём.

- [ ] **Step 1: Написать падающий тест**

Создать `src/components/Today.test.tsx`:

```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Today } from './Today';
import { content } from '../content';
import { loadProgress, saveProgress } from '../store/progress';
import { FOCUS_DRILLS_PER_DAY } from '../engine/daily';

beforeEach(() => localStorage.clear());

const grammar = content.concepts.filter((c) => c.kind === 'grammar');

function seedMeasurement(conceptId: string) {
  const state = loadProgress(content);
  state.measurements = [{ date: '2026-09-27', wordCount: 100, errors: { [conceptId]: 5 }, unmapped: [] }];
  saveProgress(state);
}

describe('Today', () => {
  it('показывает три внешние отметки и блок фокуса', () => {
    render(<Today today="2026-09-27" onOpenErrors={() => {}} onOpenLevels={() => {}} onDrill={() => {}} />);
    expect(screen.getByRole('button', { name: /Слушал/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Записал/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Разобрал/ })).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`0 / ${FOCUS_DRILLS_PER_DAY}`))).toBeInTheDocument();
  });

  it('отметка сохраняется', async () => {
    render(<Today today="2026-09-27" onOpenErrors={() => {}} onOpenLevels={() => {}} onDrill={() => {}} />);
    await userEvent.click(screen.getByRole('button', { name: /Слушал/ }));
    expect(loadProgress(content).daily?.listened).toBe(true);
  });

  it('предлагает взять в фокус самую частую ошибку', async () => {
    seedMeasurement(grammar[0].id);
    render(<Today today="2026-09-27" onOpenErrors={() => {}} onOpenLevels={() => {}} onDrill={() => {}} />);

    await userEvent.click(screen.getByRole('button', { name: new RegExp(`Взять в фокус`) }));

    expect(loadProgress(content).focus?.conceptId).toBe(grammar[0].id);
  });

  it('ведёт в тренировку выбранного фокуса', async () => {
    const onDrill = vi.fn();
    const state = loadProgress(content);
    state.focus = { conceptId: grammar[0].id, startedAt: '2026-09-27' };
    saveProgress(state);

    render(<Today today="2026-09-27" onOpenErrors={() => {}} onOpenLevels={() => {}} onDrill={onDrill} />);
    await userEvent.click(screen.getByRole('button', { name: 'Тренировать' }));

    expect(onDrill).toHaveBeenCalledWith(grammar[0].id);
  });

  it('по истечении недели предлагает сменить, но не меняет сам', () => {
    const state = loadProgress(content);
    state.focus = { conceptId: grammar[0].id, startedAt: '2026-09-20' };
    saveProgress(state);

    render(<Today today="2026-09-27" onOpenErrors={() => {}} onOpenLevels={() => {}} onDrill={() => {}} />);

    expect(screen.getByRole('status')).toHaveTextContent('Неделя прошла');
    expect(loadProgress(content).focus?.conceptId).toBe(grammar[0].id);
  });

  it('по кнопке смены берёт новую ошибку недели с сегодняшней даты', async () => {
    seedMeasurement(grammar[1].id);
    const state = loadProgress(content);
    state.focus = { conceptId: grammar[0].id, startedAt: '2026-09-20' };
    saveProgress(state);

    render(<Today today="2026-09-27" onOpenErrors={() => {}} onOpenLevels={() => {}} onDrill={() => {}} />);
    await userEvent.click(screen.getByRole('button', { name: /Сменить фокус/ }));

    expect(loadProgress(content).focus).toEqual({ conceptId: grammar[1].id, startedAt: '2026-09-27' });
  });

  it('закрывает день, когда закрыто всё', () => {
    const state = loadProgress(content);
    state.daily = { date: '2026-09-27', listened: true, recorded: true, reviewed: true, focusDrills: FOCUS_DRILLS_PER_DAY };
    saveProgress(state);

    render(<Today today="2026-09-27" onOpenErrors={() => {}} onOpenLevels={() => {}} onDrill={() => {}} />);

    expect(screen.getByText('Минимум на сегодня закрыт')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npx vitest run src/components/Today.test.tsx`
Expected: FAIL, `Failed to resolve import "./Today"`.

- [ ] **Step 3: Написать компонент**

Создать `src/components/Today.tsx`:

```tsx
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

      {isDayComplete(daily) && <p className="banner">Минимум на сегодня закрыт</p>}

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
            Неделя прошла. Посмотри, изменилась ли частота, и выбери следующую.
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
```

- [ ] **Step 4: Сделать «Сегодня» точкой входа**

Заменить `src/App.tsx` целиком:

```tsx
import { useState } from 'react';
import { content } from './content';
import { Today } from './components/Today';
import { SpeechErrors } from './components/SpeechErrors';
import { FocusDrill } from './components/FocusDrill';
import { ModuleList } from './components/ModuleList';
import { Training } from './components/Training';
import { ModuleSummary } from './components/ModuleSummary';

type Screen = 'today' | 'errors' | 'focus' | 'list' | 'training' | 'summary';

const isoToday = () => new Date().toISOString().slice(0, 10);

export default function App() {
  const [screen, setScreen] = useState<Screen>('today');
  const [moduleId, setModuleId] = useState<string | null>(null);
  const [focusConceptId, setFocusConceptId] = useState<string | null>(null);

  function drill(conceptId: string) {
    setFocusConceptId(conceptId);
    setScreen('focus');
  }

  if (screen === 'today') {
    return (
      <Today
        onOpenErrors={() => setScreen('errors')}
        onOpenLevels={() => setScreen('list')}
        onDrill={drill}
      />
    );
  }
  if (screen === 'errors') {
    return <SpeechErrors onBack={() => setScreen('today')} onDrill={drill} />;
  }
  if (screen === 'focus' && focusConceptId) {
    return <FocusDrill conceptId={focusConceptId} today={isoToday()} onExit={() => setScreen('today')} />;
  }
  if (screen === 'training' && moduleId) {
    return (
      <Training
        moduleId={moduleId}
        onExit={() => setScreen('list')}
        onSummary={() => setScreen('summary')}
      />
    );
  }
  if (screen === 'summary' && moduleId) {
    return <ModuleSummary moduleId={moduleId} onBack={() => setScreen('list')} />;
  }
  // возврат из тренировки ведёт в папку уровня последнего модуля, не в корень
  const lastLevel = moduleId ? content.modules.find((m) => m.id === moduleId)?.level ?? null : null;
  return (
    <ModuleList
      initialLevel={lastLevel}
      onBack={() => setScreen('today')}
      onPick={(id) => {
        setModuleId(id);
        setScreen('training');
      }}
    />
  );
}
```

В `src/components/ModuleList.tsx` добавить в интерфейс пропсов `onBack?: () => void;`, а в корневой ветке (`level === null`) перед `<h1>` вставить:

```tsx
        <nav>
          <button onClick={onBack}>← Сегодня</button>
        </nav>
```

и принять проп в сигнатуре: `export function ModuleList({ onPick, onBack, initialLevel = null }: ModuleListProps)`.

- [ ] **Step 5: Починить тесты App**

В `src/App.test.tsx` существующие тесты стартуют с корня и ждут список уровней. Теперь первый экран — «Сегодня». Добавить в начало каждого такого теста переход:

```tsx
    await userEvent.click(screen.getByRole('button', { name: 'Уровни и модули' }));
```

Первый тест файла (`shows the level folders on start`) переименовать и переписать так:

```tsx
  it('starts on Today and can reach the level folders', async () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Сегодня' })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Уровни и модули' }));
    for (const lv of ['A1', 'A2', 'B1', 'B1-B2', 'B2']) {
      expect(screen.getByRole('button', { name: new RegExp(`^${lv} —`) })).toBeInTheDocument();
    }
  });
```

- [ ] **Step 6: Добавить стили**

В конец `src/index.css` добавить:

```css
textarea {
  font: inherit;
  width: 100%;
  min-height: 8rem;
  padding: 0.45rem 0.65rem;
  margin: 0.15rem 0;
  border: 1px solid var(--border);
  border-radius: 0.55rem;
  background: var(--surface);
  color: inherit;
}

.today-done {
  color: var(--ok);
  font-weight: 600;
}
```

- [ ] **Step 7: Проверить всё**

Run: `npx vitest run src/components/Today.test.tsx src/App.test.tsx`
Expected: все зелёные.

Run: `npm test && npm run build && npm run lint`
Expected: 167 passed, чисто.

- [ ] **Step 8: Закоммитить**

```bash
git add src/components/Today.tsx src/components/Today.test.tsx src/App.tsx src/App.test.tsx src/components/ModuleList.tsx src/index.css
git commit -m "feat: Today becomes the entry point and runs the whole cycle"
```

---

### Task 10: Уборка и приёмка на устройстве

**Files:**
- Modify: `docs/superpowers/specs/2026-07-12-english-gym-design.md:14,23`
- Modify: `docs/superpowers/specs/2026-09-27-error-loop-and-today.md` (строка статуса)
- Modify: файл памяти проекта

**Interfaces:**
- Consumes: результат задач 1–9.
- Produces: ничего для кода.

- [ ] **Step 1: Исправить ложное число в спеке v2**

В `docs/superpowers/specs/2026-07-12-english-gym-design.md` две строки утверждают, что порог равен 50. В коде он равен 20 во всех 21 модуле с коммита 7ab5076. Заменить 50 на 20 в обеих строках и дописать в скобках «(в коде 20 с 2026-09; спека была неточна)».

Run: `grep -n "50" docs/superpowers/specs/2026-07-12-english-gym-design.md`
Expected: упоминаний порога 50 не осталось.

- [ ] **Step 2: Пройти чеклист на устройстве**

Собрать и опубликовать: `git push`, дождаться зелёного `gh run watch`.

- [ ] Записал две минуты речи, расшифровал через Whisper.
- [ ] Принёс расшифровку в чат, получил разбор с цитатами, выкинул выдумки распознавалки, получил файл профиля.
- [ ] На ноутбуке загрузил профиль файлом — экран «Мои ошибки» показал топ с частотами на сто слов.
- [ ] На телефоне загрузил тот же профиль вставкой текста — получилось без сохранения в «Файлы».
- [ ] Взял ошибку недели в фокус, блок тренировки открылся и считает задания.
- [ ] Восемь заданий закрывают блок фокуса.
- [ ] Три внешние отметки плюс блок фокуса закрывают день.
- [ ] Выгрузил прогресс и загрузил обратно — замеры на месте.
- [ ] Через неделю второй замер показал динамику частоты ошибки-фокуса.
- [ ] Всё то же в авиарежиме.

- [ ] **Step 3: Отметить спеку и память**

В `docs/superpowers/specs/2026-09-27-error-loop-and-today.md` в строке статуса дописать дату приёмки.

В файле памяти проекта записать: волна 1 реализована, что именно умеет, где лежит каталог концептов для разбора речи, и что следующая работа — волна 2 по спеке чанков.

- [ ] **Step 4: Закоммитить**

```bash
git add docs
git commit -m "docs: mark wave 1 delivered and fix the stale threshold"
git push
```

---

## Self-Review

**Покрытие спеки.** Решения 1–4 (границы) — работы не требуют, зафиксированы в ограничениях плана. Решение 5 и 6 (замеры отдельно, хранятся целиком) — задача 1. Решение 7 (частота на сто слов) — задача 5. Решение 8 (null-концепт) — задачи 4, 5, 7. Решение 9 (разные файлы) — задачи 2 и 4: формат выгрузки и формат профиля независимы. Решение 10 (файл и вставка) — задача 7. Решение 11 (подтверждение в чате) — задача 3, файл `docs/analyzer/README.md`; кода не требует, и это ровно та экономия, ради которой решение принималось. Решение 12 («Сегодня» главный) — задача 9. Решение 13 (отметки внешних частей) — задачи 6 и 9. Решение 14 (минимум количеством) — задача 6. Решение 15 (грамматика только через фокус, потолок 8) — задачи 6 и 8. Решение 16 (экран «Мои ошибки», имя отличается от «Итогов») — задача 7. Решение 17 (фокус один, по истечении предлагает) — задачи 6 и 9. Решение 18 (запасной выбор по числу ошибок) — задача 6. Договор чата и приложения — задача 3. Уборка числа 50 — задача 10.

**Заглушек нет.** Каждый шаг несёт либо код, либо команду с ожидаемым выводом.

**Согласованность имён.** `Measurement`, `FocusState`, `DailyState` объявлены в задаче 1 и потребляются в задачах 2, 4, 5, 6, 8, 9 с теми же полями. `parseSpeechProfile` объявлена в задаче 4, вызывается в задаче 7. `conceptErrorStats` и `unmappedErrorStats` объявлены в задаче 5, вызываются в задачах 6 и 7. `suggestFocus`, `focusExpired`, `FOCUS_DAYS`, `ensureToday`, `isDayComplete`, `FOCUS_DRILLS_PER_DAY` объявлены в задаче 6, вызываются в задачах 8 и 9.

**Отклонение от спеки, осознанное.** Спека перечисляет привязку `Training.tsx` к `moduleId` как факт, который волна обязана учесть. План учитывает его не переделкой `Training`, а отдельным компонентом `FocusDrill`: у тренировки фокуса другие правила, а переделка тянула бы за собой тесты `Training` и `App`. Обоснование записано в задаче 8.

**Хрупкости в тестах, снятые заранее.** Тест счётчика дня в задаче 8 не берёт задание из настоящего контента: у пяти типов из семи ответ нельзя дать одним щелчком, поэтому у теста своя фикстура из одного концепта и одного `choose_word`. Тесты задачи 7 вставляют JSON через `userEvent.paste`, а не `type`: `type` трактует `{` и `[` как описания клавиш и на первой же скобке ломается.
