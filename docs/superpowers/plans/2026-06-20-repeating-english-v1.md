# Repeating English v1 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Личный веб-тренажёр английского, где пользователь повторяет задания на правило/слово (концепт) разными заданиями из пула, пока не добьёт целевой скор по концепту и модулю.

**Architecture:** Статический React SPA без бэкенда. Доменная логика — чистые функции (checker, scoring, scheduler), легко тестируемые в изоляции. Контент — статические TS/JSON-модули. Прогресс — в localStorage. UI: список модулей → экран тренировки (оркестрирует движок и рендереры заданий) → итоги модуля.

**Tech Stack:** React 18 + TypeScript + Vite. Тесты: Vitest + @testing-library/react (jsdom). Без сторонних state/router-библиотек в v1 — состояние экрана держим в App через `useState`.

## Global Constraints

- Без бэкенда, без авторизации, без сети. Всё работает офлайн из статики.
- Прогресс хранится в `localStorage` под ключом `re:progress`, привязан к `content.version`. При несовпадении версии — прогресс сбрасывается.
- 7 типов заданий: `translate_ru_en`, `word_order`, `choose_word`, `fill_gap`, `multi_gap`, `verb_form`, `match_pairs`.
- Скоринг: верный ответ `+exercise.points` (дефолт 1; `translate_ru_en` → 2), ошибка `−1` (не ниже 0). Концепт освоен при `score >= module.masteryThreshold` (дефолт 5). Модуль завершён, когда все его концепты освоены.
- Проверка свободного ввода (`translate_ru_en`, `fill_gap`, `multi_gap`) — гибрид: точное/близкое(diff+самооценка)/далёкое. `word_order`, `choose_word`, `verb_form`, `match_pairs` — авто.
- Антиповтор: задание из пула концепта не повторяется, пока есть непоказанные; окно недавних = `min(poolSize - 1, 5)`.
- Все идентификаторы и тексты UI на русском для пользователя; код и доменные значения — на английском.

---

## File Structure

```
repeating-english/
  package.json, tsconfig.json, vite.config.ts, index.html
  src/
    main.tsx                      # точка входа
    App.tsx                       # роутинг экранов через useState
    types.ts                      # доменные типы
    content/
      schema.ts                   # валидация контента
      index.ts                    # сборка Content из модулей + version
      modules/present-perfect.ts  # seed-модуль
    engine/
      normalize.ts                # нормализация строк
      diff.ts                     # пословный diff
      checker.ts                  # проверка ответов
      scoring.ts                  # обновление скора/мастерства
      scheduler.ts                # выбор концепта и задания
    store/
      progress.ts                 # localStorage прогресс
    components/
      ModuleList.tsx
      Training.tsx
      ModuleSummary.tsx
      exercises/
        index.tsx                 # реестр рендереров + общий интерфейс
        TranslateRuEn.tsx
        FillGap.tsx
        VerbForm.tsx
        ChooseWord.tsx
        MultiGap.tsx
        WordOrder.tsx
        MatchPairs.tsx
  test/setup.ts                   # jest-dom
```

---

### Task 1: Project scaffold + test harness

**Files:**
- Create: `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `test/setup.ts`
- Test: `src/smoke.test.ts`

**Interfaces:**
- Produces: a runnable Vite app and a working `npm test` (Vitest + jsdom + jest-dom).

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "repeating-english",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.6",
    "@testing-library/react": "^16.0.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "jsdom": "^24.1.0",
    "typescript": "^5.5.3",
    "vite": "^5.3.3",
    "vitest": "^2.0.1"
  }
}
```

- [ ] **Step 2: Create config files**

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2021",
    "useDefineForClassFields": true,
    "lib": ["ES2021", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src", "test"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

`tsconfig.node.json`:
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

`vite.config.ts`:
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
  },
});
```

`index.html`:
```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Repeating English</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

`test/setup.ts`:
```ts
import '@testing-library/jest-dom/vitest';
```

`src/App.tsx`:
```tsx
export default function App() {
  return <h1>Repeating English</h1>;
}
```

`src/main.tsx`:
```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- [ ] **Step 3: Write the smoke test**

`src/smoke.test.ts`:
```ts
import { describe, it, expect } from 'vitest';

describe('smoke', () => {
  it('runs the test harness', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 4: Install and run**

Run: `npm install && npm test`
Expected: 1 passing test (`smoke`).

- [ ] **Step 5: Commit**

```bash
git init
printf "node_modules\ndist\n" > .gitignore
git add -A
git commit -m "chore: scaffold Vite + React + TS + Vitest"
```

---

### Task 2: Domain types + content schema + loader

**Files:**
- Create: `src/types.ts`, `src/content/schema.ts`, `src/content/index.ts`, `src/content/modules/present-perfect.ts`
- Test: `src/content/schema.test.ts`

**Interfaces:**
- Produces:
  - `types.ts` exports `ExerciseType`, `Pair`, `Exercise`, `Concept`, `Module`, `Content`, `Gap`.
  - `validateContent(content: Content): string[]` — returns array of error strings, empty if valid.
  - `content: Content` (default export-ish named export from `content/index.ts`) assembled from modules with a `version`.

- [ ] **Step 1: Write the failing test**

`src/content/schema.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { validateContent } from './schema';
import type { Content } from '../types';

const base: Content = {
  version: '1',
  modules: [
    { id: 'm1', title: 'M1', level: 'A1', masteryThreshold: 5, conceptIds: ['c1'] },
  ],
  concepts: [
    { id: 'c1', moduleId: 'm1', title: 'C1', kind: 'grammar', exerciseIds: ['e1'] },
  ],
  exercises: [
    { id: 'e1', conceptId: 'c1', type: 'fill_gap', prompt: 'I ___ ok', points: 1, accepted: ['am'] },
  ],
};

describe('validateContent', () => {
  it('accepts well-formed content', () => {
    expect(validateContent(base)).toEqual([]);
  });

  it('reports a concept referencing a missing exercise', () => {
    const broken: Content = { ...base, concepts: [{ ...base.concepts[0], exerciseIds: ['missing'] }] };
    expect(validateContent(broken)).toContain('concept c1 references missing exercise missing');
  });

  it('reports a module referencing a missing concept', () => {
    const broken: Content = { ...base, modules: [{ ...base.modules[0], conceptIds: ['nope'] }] };
    expect(validateContent(broken)).toContain('module m1 references missing concept nope');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- schema`
Expected: FAIL — `validateContent` / `../types` not found.

- [ ] **Step 3: Create the types**

`src/types.ts`:
```ts
export type ExerciseType =
  | 'translate_ru_en'
  | 'word_order'
  | 'choose_word'
  | 'fill_gap'
  | 'multi_gap'
  | 'verb_form'
  | 'match_pairs';

export interface Pair {
  en: string;
  ru: string;
}

export interface Gap {
  accepted: string[];
}

export interface Exercise {
  id: string;
  conceptId: string;
  type: ExerciseType;
  prompt: string;
  points: number;
  accepted?: string[];   // translate_ru_en | fill_gap | verb_form | word_order (full orderings) | choose_word (the correct option)
  gaps?: Gap[];          // multi_gap (one entry per blank, in order)
  options?: string[];    // choose_word
  bank?: string[];       // word_order (shuffled tokens)
  pairs?: Pair[];        // match_pairs
}

export interface Concept {
  id: string;
  moduleId: string;
  title: string;
  kind: 'grammar' | 'vocab';
  exerciseIds: string[];
}

export interface Module {
  id: string;
  title: string;
  level: string;
  masteryThreshold: number;
  conceptIds: string[];
}

export interface Content {
  version: string;
  modules: Module[];
  concepts: Concept[];
  exercises: Exercise[];
}
```

- [ ] **Step 4: Implement the validator**

`src/content/schema.ts`:
```ts
import type { Content } from '../types';

export function validateContent(content: Content): string[] {
  const errors: string[] = [];
  const conceptIds = new Set(content.concepts.map((c) => c.id));
  const exerciseIds = new Set(content.exercises.map((e) => e.id));

  for (const m of content.modules) {
    for (const cid of m.conceptIds) {
      if (!conceptIds.has(cid)) errors.push(`module ${m.id} references missing concept ${cid}`);
    }
  }
  for (const c of content.concepts) {
    for (const eid of c.exerciseIds) {
      if (!exerciseIds.has(eid)) errors.push(`concept ${c.id} references missing exercise ${eid}`);
    }
  }
  return errors;
}
```

- [ ] **Step 5: Create a minimal seed module + content index**

`src/content/modules/present-perfect.ts`:
```ts
import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'present-perfect',
  title: 'Present Perfect',
  level: 'B1',
  masteryThreshold: 5,
  conceptIds: ['pp-experience'],
};

export const concepts: Concept[] = [
  { id: 'pp-experience', moduleId: 'present-perfect', title: 'Опыт: ever/never', kind: 'grammar', exerciseIds: ['pp-e1'] },
];

export const exercises: Exercise[] = [
  {
    id: 'pp-e1',
    conceptId: 'pp-experience',
    type: 'translate_ru_en',
    prompt: 'Ты когда-нибудь был в Лондоне?',
    points: 2,
    accepted: ['Have you ever been to London?', 'Have you ever been in London?'],
  },
];
```

`src/content/index.ts`:
```ts
import type { Content } from '../types';
import * as presentPerfect from './modules/present-perfect';

export const content: Content = {
  version: '1',
  modules: [presentPerfect.module],
  concepts: [...presentPerfect.concepts],
  exercises: [...presentPerfect.exercises],
};
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npm test -- schema`
Expected: PASS (3 tests).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: domain types, content schema validator, seed module"
```

---

### Task 3: String normalization

**Files:**
- Create: `src/engine/normalize.ts`
- Test: `src/engine/normalize.test.ts`

**Interfaces:**
- Produces: `normalize(s: string): string` and `tokenize(s: string): string[]`.

- [ ] **Step 1: Write the failing test**

`src/engine/normalize.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { normalize, tokenize } from './normalize';

describe('normalize', () => {
  it('lowercases, trims, collapses spaces, strips punctuation', () => {
    expect(normalize('  Have   you, been?  ')).toBe('have you been');
  });
  it('keeps apostrophes inside words', () => {
    expect(normalize("I haven't")).toBe("i haven't");
  });
});

describe('tokenize', () => {
  it('splits normalized text into words', () => {
    expect(tokenize('Have you been?')).toEqual(['have', 'you', 'been']);
  });
  it('returns [] for empty input', () => {
    expect(tokenize('   ')).toEqual([]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- normalize`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

`src/engine/normalize.ts`:
```ts
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s']/gu, ' ') // drop punctuation except apostrophes
    .replace(/\s+/g, ' ')
    .trim();
}

export function tokenize(s: string): string[] {
  const n = normalize(s);
  return n.length === 0 ? [] : n.split(' ');
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- normalize`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: string normalization and tokenization"
```

---

### Task 4: Word-level diff

**Files:**
- Create: `src/engine/diff.ts`
- Test: `src/engine/diff.test.ts`

**Interfaces:**
- Produces:
  - `interface DiffToken { text: string; status: 'same' | 'missing' | 'extra' }`
  - `wordDiff(answer: string, reference: string): DiffToken[]` — `missing` = present in reference but not answer; `extra` = present in answer but not reference. Tokens ordered to read like the reference with extras interleaved.
  - `diffDistance(answer: string, reference: string): number` — count of `missing` + `extra` tokens.

- [ ] **Step 1: Write the failing test**

`src/engine/diff.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { wordDiff, diffDistance } from './diff';

describe('wordDiff / diffDistance', () => {
  it('identical sentences have distance 0', () => {
    expect(diffDistance('have you been to london', 'have you been to london')).toBe(0);
  });
  it('one wrong word counts as 1 missing + 1 extra = distance 2', () => {
    expect(diffDistance('have you been in london', 'have you been to london')).toBe(2);
  });
  it('one missing word counts as distance 1', () => {
    expect(diffDistance('have you been london', 'have you been to london')).toBe(1);
  });
  it('marks tokens by status', () => {
    const d = wordDiff('have you been in london', 'have you been to london');
    expect(d.filter((t) => t.status === 'missing').map((t) => t.text)).toEqual(['to']);
    expect(d.filter((t) => t.status === 'extra').map((t) => t.text)).toEqual(['in']);
    expect(d.filter((t) => t.status === 'same').map((t) => t.text)).toEqual(['have', 'you', 'been', 'london']);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- diff`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement (LCS-based diff)**

`src/engine/diff.ts`:
```ts
import { tokenize } from './normalize';

export interface DiffToken {
  text: string;
  status: 'same' | 'missing' | 'extra';
}

export function wordDiff(answer: string, reference: string): DiffToken[] {
  const a = tokenize(answer);
  const b = tokenize(reference);
  const m = a.length;
  const n = b.length;

  // LCS table over (answer x reference)
  const lcs: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      lcs[i][j] = a[i] === b[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
    }
  }

  const out: DiffToken[] = [];
  let i = 0;
  let j = 0;
  while (i < m && j < n) {
    if (a[i] === b[j]) {
      out.push({ text: b[j], status: 'same' });
      i++;
      j++;
    } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
      out.push({ text: a[i], status: 'extra' });
      i++;
    } else {
      out.push({ text: b[j], status: 'missing' });
      j++;
    }
  }
  while (i < m) out.push({ text: a[i++], status: 'extra' });
  while (j < n) out.push({ text: b[j++], status: 'missing' });
  return out;
}

export function diffDistance(answer: string, reference: string): number {
  return wordDiff(answer, reference).filter((t) => t.status !== 'same').length;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- diff`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: word-level diff with LCS"
```

---

### Task 5: Answer checker

**Files:**
- Create: `src/engine/checker.ts`
- Test: `src/engine/checker.test.ts`

**Interfaces:**
- Consumes: `normalize` (Task 3), `wordDiff`/`diffDistance`/`DiffToken` (Task 4), `Exercise`/`Gap` (Task 2).
- Produces:
  - `type Verdict = { kind: 'correct' } | { kind: 'close'; diff: DiffToken[]; closest: string } | { kind: 'wrong'; accepted: string[] }`
  - `checkFreeText(answer: string, accepted: string[]): Verdict` — exact normalized → correct; min `diffDistance` ≤ 2 → close; else wrong. `CLOSE_THRESHOLD = 2`.
  - `checkExact(answer: string, accepted: string[]): boolean` — normalized equality against any accepted (used by auto types: verb_form, choose_word, word_order).
  - `checkExercise(exercise: Exercise, answer: string): Verdict` — dispatches by `exercise.type`; auto types return only `correct`/`wrong`.

- [ ] **Step 1: Write the failing test**

`src/engine/checker.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { checkFreeText, checkExact, checkExercise } from './checker';
import type { Exercise } from '../types';

describe('checkFreeText', () => {
  const accepted = ['Have you ever been to London?'];
  it('exact (normalized) match is correct', () => {
    expect(checkFreeText('have you ever been to london', accepted).kind).toBe('correct');
  });
  it('one-word difference is close', () => {
    const v = checkFreeText('Have you ever been in London', accepted);
    expect(v.kind).toBe('close');
  });
  it('far answer is wrong and returns accepted', () => {
    const v = checkFreeText('I like apples', accepted);
    expect(v).toEqual({ kind: 'wrong', accepted });
  });
});

describe('checkExact', () => {
  it('matches any accepted ignoring case/punctuation', () => {
    expect(checkExact('Goes', ['goes'])).toBe(true);
    expect(checkExact('go', ['goes'])).toBe(false);
  });
});

describe('checkExercise', () => {
  it('auto type choose_word never returns close', () => {
    const ex: Exercise = { id: 'x', conceptId: 'c', type: 'choose_word', prompt: 'p', points: 1, options: ['a', 'b'], accepted: ['a'] };
    expect(checkExercise(ex, 'b').kind).toBe('wrong');
    expect(checkExercise(ex, 'a').kind).toBe('correct');
  });
  it('translate_ru_en uses hybrid check', () => {
    const ex: Exercise = { id: 'x', conceptId: 'c', type: 'translate_ru_en', prompt: 'p', points: 2, accepted: ['I am happy'] };
    expect(checkExercise(ex, 'I am happy').kind).toBe('correct');
    expect(checkExercise(ex, 'I am happi').kind).toBe('close');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- checker`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

`src/engine/checker.ts`:
```ts
import { normalize } from './normalize';
import { wordDiff, diffDistance, type DiffToken } from './diff';
import type { Exercise } from '../types';

export const CLOSE_THRESHOLD = 2;

export type Verdict =
  | { kind: 'correct' }
  | { kind: 'close'; diff: DiffToken[]; closest: string }
  | { kind: 'wrong'; accepted: string[] };

export function checkExact(answer: string, accepted: string[]): boolean {
  const a = normalize(answer);
  return accepted.some((ref) => normalize(ref) === a);
}

export function checkFreeText(answer: string, accepted: string[]): Verdict {
  if (checkExact(answer, accepted)) return { kind: 'correct' };

  let closest = accepted[0];
  let best = Infinity;
  for (const ref of accepted) {
    const d = diffDistance(answer, ref);
    if (d < best) {
      best = d;
      closest = ref;
    }
  }
  if (best <= CLOSE_THRESHOLD) {
    return { kind: 'close', diff: wordDiff(answer, closest), closest };
  }
  return { kind: 'wrong', accepted };
}

export function checkExercise(exercise: Exercise, answer: string): Verdict {
  const accepted = exercise.accepted ?? [];
  switch (exercise.type) {
    case 'translate_ru_en':
    case 'fill_gap':
      return checkFreeText(answer, accepted);
    case 'verb_form':
    case 'choose_word':
    case 'word_order':
      return checkExact(answer, accepted) ? { kind: 'correct' } : { kind: 'wrong', accepted };
    default:
      // multi_gap and match_pairs are checked by their own renderers (Tasks 9, 11)
      return checkExact(answer, accepted) ? { kind: 'correct' } : { kind: 'wrong', accepted };
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- checker`
Expected: PASS (7 tests).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: answer checker with hybrid and exact modes"
```

---

### Task 6: Scoring

**Files:**
- Create: `src/engine/scoring.ts`
- Test: `src/engine/scoring.test.ts`

**Interfaces:**
- Consumes: nothing from other engine files (operates on plain progress records).
- Produces:
  - `interface ConceptProgress { score: number; mastered: boolean; recentExerciseIds: string[]; errorCount: number }`
  - `emptyConceptProgress(): ConceptProgress`
  - `applyAnswer(prev: ConceptProgress, correct: boolean, points: number, threshold: number): ConceptProgress` — pure; correct → `score = min(threshold, score + points)`, `mastered = score >= threshold`; wrong → `score = max(0, score - 1)`, `errorCount++`.
  - `isModuleComplete(conceptIds: string[], progress: Record<string, ConceptProgress>): boolean`

- [ ] **Step 1: Write the failing test**

`src/engine/scoring.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { emptyConceptProgress, applyAnswer, isModuleComplete } from './scoring';

describe('applyAnswer', () => {
  it('adds points on correct and caps at threshold', () => {
    const p = applyAnswer({ score: 4, mastered: false, recentExerciseIds: [], errorCount: 0 }, true, 2, 5);
    expect(p.score).toBe(5);
    expect(p.mastered).toBe(true);
  });
  it('subtracts 1 on wrong, never below 0, counts error', () => {
    const p = applyAnswer(emptyConceptProgress(), false, 2, 5);
    expect(p.score).toBe(0);
    expect(p.errorCount).toBe(1);
    expect(p.mastered).toBe(false);
  });
  it('does not mutate the input', () => {
    const prev = emptyConceptProgress();
    applyAnswer(prev, true, 1, 5);
    expect(prev.score).toBe(0);
  });
});

describe('isModuleComplete', () => {
  it('true only when every concept is mastered', () => {
    const progress = {
      c1: { score: 5, mastered: true, recentExerciseIds: [], errorCount: 0 },
      c2: { score: 3, mastered: false, recentExerciseIds: [], errorCount: 0 },
    };
    expect(isModuleComplete(['c1'], progress)).toBe(true);
    expect(isModuleComplete(['c1', 'c2'], progress)).toBe(false);
    expect(isModuleComplete(['c1', 'missing'], progress)).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- scoring`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

`src/engine/scoring.ts`:
```ts
export interface ConceptProgress {
  score: number;
  mastered: boolean;
  recentExerciseIds: string[];
  errorCount: number;
}

export function emptyConceptProgress(): ConceptProgress {
  return { score: 0, mastered: false, recentExerciseIds: [], errorCount: 0 };
}

export function applyAnswer(
  prev: ConceptProgress,
  correct: boolean,
  points: number,
  threshold: number,
): ConceptProgress {
  if (correct) {
    const score = Math.min(threshold, prev.score + points);
    return { ...prev, score, mastered: score >= threshold };
  }
  return { ...prev, score: Math.max(0, prev.score - 1), errorCount: prev.errorCount + 1 };
}

export function isModuleComplete(
  conceptIds: string[],
  progress: Record<string, ConceptProgress>,
): boolean {
  return conceptIds.every((id) => progress[id]?.mastered === true);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- scoring`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: concept scoring and module completion"
```

---

### Task 7: Progress store (localStorage)

**Files:**
- Create: `src/store/progress.ts`
- Test: `src/store/progress.test.ts`

**Interfaces:**
- Consumes: `ConceptProgress`, `emptyConceptProgress` (Task 6); `Content` (Task 2).
- Produces:
  - `interface ProgressState { contentVersion: string; concepts: Record<string, ConceptProgress> }`
  - `loadProgress(content: Content): ProgressState` — reads `re:progress`; if absent or `contentVersion` mismatches → fresh state with `emptyConceptProgress()` per concept.
  - `saveProgress(state: ProgressState): void`
  - `RECENT_WINDOW = 5`
  - `pushRecent(prev: string[], exerciseId: string, poolSize: number): string[]` — keep last `min(poolSize - 1, RECENT_WINDOW)` ids.

- [ ] **Step 1: Write the failing test**

`src/store/progress.test.ts`:
```ts
import { describe, it, expect, beforeEach } from 'vitest';
import { loadProgress, saveProgress, pushRecent } from './progress';
import type { Content } from '../types';

const content: Content = {
  version: '2',
  modules: [{ id: 'm', title: 'M', level: 'A1', masteryThreshold: 5, conceptIds: ['c1'] }],
  concepts: [{ id: 'c1', moduleId: 'm', title: 'C', kind: 'grammar', exerciseIds: ['e1'] }],
  exercises: [{ id: 'e1', conceptId: 'c1', type: 'fill_gap', prompt: 'p', points: 1, accepted: ['a'] }],
};

beforeEach(() => localStorage.clear());

describe('loadProgress', () => {
  it('returns fresh state with empty progress per concept when nothing stored', () => {
    const s = loadProgress(content);
    expect(s.contentVersion).toBe('2');
    expect(s.concepts.c1.score).toBe(0);
  });
  it('resets when stored version mismatches', () => {
    saveProgress({ contentVersion: '1', concepts: { c1: { score: 5, mastered: true, recentExerciseIds: [], errorCount: 0 } } });
    expect(loadProgress(content).concepts.c1.score).toBe(0);
  });
  it('restores matching version', () => {
    saveProgress({ contentVersion: '2', concepts: { c1: { score: 3, mastered: false, recentExerciseIds: [], errorCount: 1 } } });
    expect(loadProgress(content).concepts.c1.score).toBe(3);
  });
});

describe('pushRecent', () => {
  it('caps window at min(poolSize-1, 5)', () => {
    expect(pushRecent(['a', 'b'], 'c', 3)).toEqual(['b', 'c']); // poolSize 3 -> window 2
    expect(pushRecent([], 'a', 1)).toEqual([]);                 // poolSize 1 -> window 0
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- store/progress`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

`src/store/progress.ts`:
```ts
import type { Content } from '../types';
import { emptyConceptProgress, type ConceptProgress } from '../engine/scoring';

const KEY = 're:progress';
export const RECENT_WINDOW = 5;

export interface ProgressState {
  contentVersion: string;
  concepts: Record<string, ConceptProgress>;
}

function freshState(content: Content): ProgressState {
  const concepts: Record<string, ConceptProgress> = {};
  for (const c of content.concepts) concepts[c.id] = emptyConceptProgress();
  return { contentVersion: content.version, concepts };
}

export function loadProgress(content: Content): ProgressState {
  const raw = localStorage.getItem(KEY);
  if (!raw) return freshState(content);
  try {
    const parsed = JSON.parse(raw) as ProgressState;
    if (parsed.contentVersion !== content.version) return freshState(content);
    // ensure every current concept has an entry
    const merged = freshState(content);
    for (const id of Object.keys(merged.concepts)) {
      if (parsed.concepts[id]) merged.concepts[id] = parsed.concepts[id];
    }
    return merged;
  } catch {
    return freshState(content);
  }
}

export function saveProgress(state: ProgressState): void {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function pushRecent(prev: string[], exerciseId: string, poolSize: number): string[] {
  const window = Math.min(poolSize - 1, RECENT_WINDOW);
  if (window <= 0) return [];
  return [...prev, exerciseId].slice(-window);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- store/progress`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: localStorage progress store with version binding"
```

---

### Task 8: Scheduler

**Files:**
- Create: `src/engine/scheduler.ts`
- Test: `src/engine/scheduler.test.ts`

**Interfaces:**
- Consumes: `Content`, `Concept`, `Exercise` (Task 2); `ProgressState` (Task 7).
- Produces:
  - `pickNextConcept(content: Content, moduleId: string, progress: ProgressState): string | null` — among the module's not-yet-mastered concepts, the one with the lowest score (ties → content order). `null` if all mastered.
  - `pickNextExercise(content: Content, conceptId: string, progress: ProgressState): Exercise` — from the concept's pool, prefer an exercise whose id is not in `recentExerciseIds`; if all are recent, pick the first in pool order.

- [ ] **Step 1: Write the failing test**

`src/engine/scheduler.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { pickNextConcept, pickNextExercise } from './scheduler';
import type { Content } from '../types';
import type { ProgressState } from '../store/progress';

const content: Content = {
  version: '1',
  modules: [{ id: 'm', title: 'M', level: 'A1', masteryThreshold: 5, conceptIds: ['c1', 'c2'] }],
  concepts: [
    { id: 'c1', moduleId: 'm', title: 'C1', kind: 'grammar', exerciseIds: ['e1', 'e2'] },
    { id: 'c2', moduleId: 'm', title: 'C2', kind: 'grammar', exerciseIds: ['e3'] },
  ],
  exercises: [
    { id: 'e1', conceptId: 'c1', type: 'fill_gap', prompt: 'p1', points: 1, accepted: ['a'] },
    { id: 'e2', conceptId: 'c1', type: 'fill_gap', prompt: 'p2', points: 1, accepted: ['b'] },
    { id: 'e3', conceptId: 'c2', type: 'fill_gap', prompt: 'p3', points: 1, accepted: ['c'] },
  ],
};

function progressWith(overrides: Partial<Record<string, Partial<ProgressState['concepts'][string]>>>): ProgressState {
  const base: ProgressState = {
    contentVersion: '1',
    concepts: {
      c1: { score: 0, mastered: false, recentExerciseIds: [], errorCount: 0 },
      c2: { score: 0, mastered: false, recentExerciseIds: [], errorCount: 0 },
    },
  };
  for (const [id, o] of Object.entries(overrides)) base.concepts[id] = { ...base.concepts[id], ...o };
  return base;
}

describe('pickNextConcept', () => {
  it('picks the lowest-score non-mastered concept', () => {
    expect(pickNextConcept(content, 'm', progressWith({ c1: { score: 3 }, c2: { score: 1 } }))).toBe('c2');
  });
  it('skips mastered concepts', () => {
    expect(pickNextConcept(content, 'm', progressWith({ c1: { mastered: true } }))).toBe('c2');
  });
  it('returns null when all mastered', () => {
    expect(pickNextConcept(content, 'm', progressWith({ c1: { mastered: true }, c2: { mastered: true } }))).toBeNull();
  });
});

describe('pickNextExercise', () => {
  it('avoids recently shown exercises', () => {
    const ex = pickNextExercise(content, 'c1', progressWith({ c1: { recentExerciseIds: ['e1'] } }));
    expect(ex.id).toBe('e2');
  });
  it('falls back to pool order when all are recent', () => {
    const ex = pickNextExercise(content, 'c1', progressWith({ c1: { recentExerciseIds: ['e1', 'e2'] } }));
    expect(ex.id).toBe('e1');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- scheduler`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

`src/engine/scheduler.ts`:
```ts
import type { Content, Exercise } from '../types';
import type { ProgressState } from '../store/progress';

export function pickNextConcept(
  content: Content,
  moduleId: string,
  progress: ProgressState,
): string | null {
  const mod = content.modules.find((m) => m.id === moduleId);
  if (!mod) return null;

  let chosen: string | null = null;
  let bestScore = Infinity;
  for (const cid of mod.conceptIds) {
    const cp = progress.concepts[cid];
    if (!cp || cp.mastered) continue;
    if (cp.score < bestScore) {
      bestScore = cp.score;
      chosen = cid;
    }
  }
  return chosen;
}

export function pickNextExercise(
  content: Content,
  conceptId: string,
  progress: ProgressState,
): Exercise {
  const pool = content.exercises.filter((e) => e.conceptId === conceptId);
  const recent = new Set(progress.concepts[conceptId]?.recentExerciseIds ?? []);
  const fresh = pool.filter((e) => !recent.has(e.id));
  return (fresh[0] ?? pool[0]);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- scheduler`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: scheduler for next concept and exercise"
```

---

### Task 9: Full seed content

**Files:**
- Modify: `src/content/modules/present-perfect.ts`
- Create: `src/content/modules/vocab-a2.ts`
- Modify: `src/content/index.ts`
- Test: `src/content/index.test.ts`

**Interfaces:**
- Consumes: `validateContent` (Task 2).
- Produces: `content` with ≥ 2 modules, each concept having ≥ 6 exercises spanning all 7 types, passing `validateContent`. (Pool ≥ 6 so the anti-repeat window of 5 always has a fresh option.)

- [ ] **Step 1: Write the failing test**

`src/content/index.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { content } from './index';
import { validateContent } from './schema';

describe('seed content', () => {
  it('is structurally valid', () => {
    expect(validateContent(content)).toEqual([]);
  });
  it('has at least 2 modules', () => {
    expect(content.modules.length).toBeGreaterThanOrEqual(2);
  });
  it('every concept has at least 6 exercises', () => {
    for (const c of content.concepts) {
      expect(c.exerciseIds.length, `concept ${c.id}`).toBeGreaterThanOrEqual(6);
    }
  });
  it('covers all 7 exercise types', () => {
    const types = new Set(content.exercises.map((e) => e.type));
    for (const t of ['translate_ru_en', 'word_order', 'choose_word', 'fill_gap', 'multi_gap', 'verb_form', 'match_pairs']) {
      expect(types.has(t as never), `missing type ${t}`).toBe(true);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- content/index`
Expected: FAIL — only 1 module, pools too small, missing types.

- [ ] **Step 3: Expand `present-perfect.ts`**

Replace the file body so the concept lists 6 exercises across grammar-appropriate types:

```ts
import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'present-perfect',
  title: 'Present Perfect',
  level: 'B1',
  masteryThreshold: 5,
  conceptIds: ['pp-experience'],
};

export const concepts: Concept[] = [
  {
    id: 'pp-experience',
    moduleId: 'present-perfect',
    title: 'Опыт: ever/never',
    kind: 'grammar',
    exerciseIds: ['pp-e1', 'pp-e2', 'pp-e3', 'pp-e4', 'pp-e5', 'pp-e6'],
  },
];

export const exercises: Exercise[] = [
  { id: 'pp-e1', conceptId: 'pp-experience', type: 'translate_ru_en', prompt: 'Ты когда-нибудь был в Лондоне?', points: 2, accepted: ['Have you ever been to London?', 'Have you ever been in London?'] },
  { id: 'pp-e2', conceptId: 'pp-experience', type: 'translate_ru_en', prompt: 'Я никогда не видел этот фильм.', points: 2, accepted: ['I have never seen this film', "I haven't seen this film", 'I have never watched this movie'] },
  { id: 'pp-e3', conceptId: 'pp-experience', type: 'fill_gap', prompt: 'Have you ever ___ sushi?', points: 1, accepted: ['eaten', 'had'] },
  { id: 'pp-e4', conceptId: 'pp-experience', type: 'verb_form', prompt: 'She has never (be) ___ abroad.', points: 1, accepted: ['been'] },
  { id: 'pp-e5', conceptId: 'pp-experience', type: 'choose_word', prompt: 'I have ___ been to Paris.', points: 1, options: ['ever', 'never', 'yet'], accepted: ['never'] },
  { id: 'pp-e6', conceptId: 'pp-experience', type: 'word_order', prompt: 'Соберите: «Ты когда-нибудь пробовал суши?»', points: 1, bank: ['have', 'you', 'ever', 'tried', 'sushi'], accepted: ['have you ever tried sushi'] },
];
```

- [ ] **Step 4: Create `vocab-a2.ts` covering multi_gap and match_pairs**

```ts
import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'vocab-a2',
  title: 'Слова A2: повседневное',
  level: 'A2',
  masteryThreshold: 5,
  conceptIds: ['va2-daily'],
};

export const concepts: Concept[] = [
  {
    id: 'va2-daily',
    moduleId: 'vocab-a2',
    title: 'Повседневные слова',
    kind: 'vocab',
    exerciseIds: ['va2-e1', 'va2-e2', 'va2-e3', 'va2-e4', 'va2-e5', 'va2-e6'],
  },
];

export const exercises: Exercise[] = [
  { id: 'va2-e1', conceptId: 'va2-daily', type: 'match_pairs', prompt: 'Сопоставьте слова и переводы', points: 1, pairs: [{ en: 'breakfast', ru: 'завтрак' }, { en: 'evening', ru: 'вечер' }, { en: 'street', ru: 'улица' }, { en: 'weather', ru: 'погода' }] },
  { id: 'va2-e2', conceptId: 'va2-daily', type: 'match_pairs', prompt: 'Сопоставьте слова и переводы', points: 1, pairs: [{ en: 'kitchen', ru: 'кухня' }, { en: 'window', ru: 'окно' }, { en: 'bus', ru: 'автобус' }, { en: 'money', ru: 'деньги' }] },
  { id: 'va2-e3', conceptId: 'va2-daily', type: 'multi_gap', prompt: 'I have ___ in the morning and ___ in the evening.', points: 1, gaps: [{ accepted: ['breakfast'] }, { accepted: ['dinner', 'supper'] }] },
  { id: 'va2-e4', conceptId: 'va2-daily', type: 'translate_ru_en', prompt: 'Какая сегодня погода?', points: 2, accepted: ["What's the weather like today?", 'What is the weather like today?', 'How is the weather today?'] },
  { id: 'va2-e5', conceptId: 'va2-daily', type: 'choose_word', prompt: 'I take the ___ to work.', points: 1, options: ['bus', 'breakfast', 'weather'], accepted: ['bus'] },
  { id: 'va2-e6', conceptId: 'va2-daily', type: 'fill_gap', prompt: 'I have no ___ to buy it.', points: 1, accepted: ['money'] },
];
```

- [ ] **Step 5: Update `src/content/index.ts`**

```ts
import type { Content } from '../types';
import * as presentPerfect from './modules/present-perfect';
import * as vocabA2 from './modules/vocab-a2';

export const content: Content = {
  version: '1',
  modules: [presentPerfect.module, vocabA2.module],
  concepts: [...presentPerfect.concepts, ...vocabA2.concepts],
  exercises: [...presentPerfect.exercises, ...vocabA2.exercises],
};
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npm test -- content/index`
Expected: PASS (4 tests). Also run `npm test -- schema` to confirm no regressions.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: full seed content across all exercise types"
```

---

### Task 10: Exercise renderer interface + registry + free-text renderers

**Files:**
- Create: `src/components/exercises/index.tsx`, `src/components/exercises/TranslateRuEn.tsx`, `src/components/exercises/FillGap.tsx`, `src/components/exercises/VerbForm.tsx`
- Test: `src/components/exercises/freeText.test.tsx`

**Interfaces:**
- Consumes: `Exercise` (Task 2); `checkExercise`, `Verdict` (Task 5).
- Produces:
  - `interface ExerciseProps { exercise: Exercise; onResult: (correct: boolean) => void }` — a renderer collects the answer, checks it, shows feedback (incl. diff + self-grade for `close`), and calls `onResult(correct)` exactly once when the user finishes the item.
  - `getRenderer(type: ExerciseType): React.FC<ExerciseProps>` — registry; throws for unregistered types (later tasks register the rest).
  - `Feedback` helper component rendering a `Verdict` with a diff and (for `close`) "Засчитать?" Да/Нет buttons.

- [ ] **Step 1: Write the failing test**

`src/components/exercises/freeText.test.tsx`:
```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TranslateRuEn } from './TranslateRuEn';
import type { Exercise } from '../../types';

const ex: Exercise = {
  id: 'e', conceptId: 'c', type: 'translate_ru_en',
  prompt: 'Я счастлив', points: 2, accepted: ['I am happy'],
};

describe('TranslateRuEn', () => {
  it('reports correct on exact answer', async () => {
    const onResult = vi.fn();
    render(<TranslateRuEn exercise={ex} onResult={onResult} />);
    await userEvent.type(screen.getByRole('textbox'), 'I am happy');
    await userEvent.click(screen.getByRole('button', { name: 'Проверить' }));
    expect(onResult).toHaveBeenCalledWith(true);
  });

  it('asks for self-grade on a close answer and honors "Нет"', async () => {
    const onResult = vi.fn();
    render(<TranslateRuEn exercise={ex} onResult={onResult} />);
    await userEvent.type(screen.getByRole('textbox'), 'I am happi');
    await userEvent.click(screen.getByRole('button', { name: 'Проверить' }));
    expect(screen.getByText('Засчитать?')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Нет' }));
    expect(onResult).toHaveBeenCalledWith(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- freeText`
Expected: FAIL — modules not found.

- [ ] **Step 3: Create the registry + Feedback + shared free-text component**

`src/components/exercises/index.tsx`:
```tsx
import type { FC } from 'react';
import type { Exercise, ExerciseType } from '../../types';
import { TranslateRuEn } from './TranslateRuEn';
import { FillGap } from './FillGap';
import { VerbForm } from './VerbForm';

export interface ExerciseProps {
  exercise: Exercise;
  onResult: (correct: boolean) => void;
}

const registry: Partial<Record<ExerciseType, FC<ExerciseProps>>> = {
  translate_ru_en: TranslateRuEn,
  fill_gap: FillGap,
  verb_form: VerbForm,
};

export function getRenderer(type: ExerciseType): FC<ExerciseProps> {
  const comp = registry[type];
  if (!comp) throw new Error(`No renderer registered for type ${type}`);
  return comp;
}
```

Later tasks (11–13) add their renderers by importing them here and adding an
entry to the `registry` object literal.

`src/components/exercises/TranslateRuEn.tsx` (also reused pattern for FillGap/VerbForm):
```tsx
import { useState } from 'react';
import type { ExerciseProps } from './index';
import { checkExercise, type Verdict } from '../../engine/checker';

export function TranslateRuEn({ exercise, onResult }: ExerciseProps) {
  const [answer, setAnswer] = useState('');
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  function check() {
    const v = checkExercise(exercise, answer);
    setVerdict(v);
    if (v.kind === 'correct') onResult(true);
    if (v.kind === 'wrong') onResult(false);
  }

  return (
    <div>
      <p>{exercise.prompt}</p>
      <input aria-label="answer" value={answer} disabled={verdict !== null && verdict.kind !== 'close'} onChange={(e) => setAnswer(e.target.value)} />
      {verdict === null && <button onClick={check}>Проверить</button>}
      {verdict?.kind === 'correct' && <p role="status">Верно!</p>}
      {verdict?.kind === 'wrong' && (
        <div role="status">
          <p>Неверно. Правильный ответ:</p>
          <ul>{verdict.accepted.map((a) => <li key={a}>{a}</li>)}</ul>
        </div>
      )}
      {verdict?.kind === 'close' && (
        <div role="status">
          <p>
            {verdict.diff.map((t, i) => (
              <span key={i} data-status={t.status} style={{ textDecoration: t.status === 'missing' ? 'underline' : t.status === 'extra' ? 'line-through' : 'none' }}>
                {t.text}{' '}
              </span>
            ))}
          </p>
          <p>Эталон: {verdict.closest}</p>
          <p>Засчитать?</p>
          <button onClick={() => { setVerdict({ kind: 'correct' }); onResult(true); }}>Да</button>
          <button onClick={() => { setVerdict({ kind: 'wrong', accepted: exercise.accepted ?? [] }); onResult(false); }}>Нет</button>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Create `FillGap.tsx` and `VerbForm.tsx`**

`src/components/exercises/FillGap.tsx`:
```tsx
import { TranslateRuEn } from './TranslateRuEn';
import type { ExerciseProps } from './index';

// FillGap shares the free-text flow; checkExercise dispatches on exercise.type internally.
export function FillGap(props: ExerciseProps) {
  return <TranslateRuEn {...props} />;
}
```

`src/components/exercises/VerbForm.tsx`:
```tsx
import { TranslateRuEn } from './TranslateRuEn';
import type { ExerciseProps } from './index';

// VerbForm shares the same single-input flow; verb_form is auto-checked (no self-grade).
export function VerbForm(props: ExerciseProps) {
  return <TranslateRuEn {...props} />;
}
```

> Note: `checkExercise` already returns only `correct`/`wrong` for `verb_form`, so the self-grade branch never renders for it.

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- freeText`
Expected: PASS (2 tests).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: exercise renderer registry and free-text renderers"
```

---

### Task 11: choose_word + multi_gap renderers

**Files:**
- Create: `src/components/exercises/ChooseWord.tsx`, `src/components/exercises/MultiGap.tsx`
- Modify: `src/components/exercises/index.tsx` (register both)
- Test: `src/components/exercises/chooseMulti.test.tsx`

**Interfaces:**
- Consumes: `ExerciseProps`, registry (Task 10); `checkExact` (Task 5); `Exercise`/`Gap` (Task 2).
- Produces: `ChooseWord` and `MultiGap` components registered for their types. `MultiGap` checks each gap with `checkExact` against `gaps[i].accepted`; correct only if every gap matches.

- [ ] **Step 1: Write the failing test**

`src/components/exercises/chooseMulti.test.tsx`:
```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChooseWord } from './ChooseWord';
import { MultiGap } from './MultiGap';
import type { Exercise } from '../../types';

describe('ChooseWord', () => {
  const ex: Exercise = { id: 'e', conceptId: 'c', type: 'choose_word', prompt: 'I have ___ been', points: 1, options: ['ever', 'never'], accepted: ['never'] };
  it('reports correct when the right option is clicked', async () => {
    const onResult = vi.fn();
    render(<ChooseWord exercise={ex} onResult={onResult} />);
    await userEvent.click(screen.getByRole('button', { name: 'never' }));
    expect(onResult).toHaveBeenCalledWith(true);
  });
});

describe('MultiGap', () => {
  const ex: Exercise = { id: 'e', conceptId: 'c', type: 'multi_gap', prompt: 'I ___ and ___', points: 1, gaps: [{ accepted: ['eat'] }, { accepted: ['sleep'] }] };
  it('is correct only when all gaps match', async () => {
    const onResult = vi.fn();
    render(<MultiGap exercise={ex} onResult={onResult} />);
    const inputs = screen.getAllByRole('textbox');
    await userEvent.type(inputs[0], 'eat');
    await userEvent.type(inputs[1], 'wrong');
    await userEvent.click(screen.getByRole('button', { name: 'Проверить' }));
    expect(onResult).toHaveBeenCalledWith(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- chooseMulti`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement `ChooseWord.tsx`**

```tsx
import { useState } from 'react';
import type { ExerciseProps } from './index';
import { checkExact } from '../../engine/checker';

export function ChooseWord({ exercise, onResult }: ExerciseProps) {
  const [picked, setPicked] = useState<string | null>(null);
  function choose(opt: string) {
    setPicked(opt);
    onResult(checkExact(opt, exercise.accepted ?? []));
  }
  return (
    <div>
      <p>{exercise.prompt}</p>
      {(exercise.options ?? []).map((opt) => (
        <button key={opt} disabled={picked !== null} onClick={() => choose(opt)}>{opt}</button>
      ))}
      {picked !== null && <p role="status">{checkExact(picked, exercise.accepted ?? []) ? 'Верно!' : `Неверно. Ответ: ${(exercise.accepted ?? []).join(', ')}`}</p>}
    </div>
  );
}
```

- [ ] **Step 4: Implement `MultiGap.tsx`**

```tsx
import { useState } from 'react';
import type { ExerciseProps } from './index';
import { checkExact } from '../../engine/checker';

export function MultiGap({ exercise, onResult }: ExerciseProps) {
  const gaps = exercise.gaps ?? [];
  const [values, setValues] = useState<string[]>(() => gaps.map(() => ''));
  const [done, setDone] = useState(false);

  function setAt(i: number, v: string) {
    setValues((prev) => prev.map((x, idx) => (idx === i ? v : x)));
  }
  function check() {
    const allCorrect = gaps.every((g, i) => checkExact(values[i], g.accepted));
    setDone(true);
    onResult(allCorrect);
  }
  return (
    <div>
      <p>{exercise.prompt}</p>
      {gaps.map((g, i) => (
        <input key={i} aria-label={`gap-${i}`} value={values[i]} disabled={done} onChange={(e) => setAt(i, e.target.value)} />
      ))}
      {!done && <button onClick={check}>Проверить</button>}
      {done && (
        <p role="status">
          {gaps.every((g, i) => checkExact(values[i], g.accepted))
            ? 'Верно!'
            : `Неверно. Ответы: ${gaps.map((g) => g.accepted[0]).join(', ')}`}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Register both in `index.tsx`**

Add imports and registry entries:
```tsx
import { ChooseWord } from './ChooseWord';
import { MultiGap } from './MultiGap';
```
and inside `registry`:
```tsx
  choose_word: ChooseWord,
  multi_gap: MultiGap,
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npm test -- chooseMulti`
Expected: PASS (2 tests).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: choose_word and multi_gap renderers"
```

---

### Task 12: word_order renderer

**Files:**
- Create: `src/components/exercises/WordOrder.tsx`
- Modify: `src/components/exercises/index.tsx` (register)
- Test: `src/components/exercises/wordOrder.test.tsx`

**Interfaces:**
- Consumes: `ExerciseProps`, registry (Task 10); `checkExact` (Task 5).
- Produces: `WordOrder` component. User clicks tokens from `bank` to append to the built sentence; "Проверить" joins built tokens with spaces and checks via `checkExact` against `exercise.accepted`.

- [ ] **Step 1: Write the failing test**

`src/components/exercises/wordOrder.test.tsx`:
```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WordOrder } from './WordOrder';
import type { Exercise } from '../../types';

const ex: Exercise = {
  id: 'e', conceptId: 'c', type: 'word_order',
  prompt: 'Соберите', points: 1,
  bank: ['you', 'have', 'tried', 'sushi', 'ever'],
  accepted: ['have you ever tried sushi'],
};

describe('WordOrder', () => {
  it('reports correct when tokens assembled in the right order', async () => {
    const onResult = vi.fn();
    render(<WordOrder exercise={ex} onResult={onResult} />);
    for (const w of ['have', 'you', 'ever', 'tried', 'sushi']) {
      await userEvent.click(screen.getByRole('button', { name: w }));
    }
    await userEvent.click(screen.getByRole('button', { name: 'Проверить' }));
    expect(onResult).toHaveBeenCalledWith(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- wordOrder`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

`src/components/exercises/WordOrder.tsx`:
```tsx
import { useState } from 'react';
import type { ExerciseProps } from './index';
import { checkExact } from '../../engine/checker';

export function WordOrder({ exercise, onResult }: ExerciseProps) {
  const bank = exercise.bank ?? [];
  const [built, setBuilt] = useState<number[]>([]); // indices into bank
  const [done, setDone] = useState(false);

  const used = new Set(built);
  function pick(i: number) {
    if (used.has(i) || done) return;
    setBuilt((prev) => [...prev, i]);
  }
  function reset() {
    setBuilt([]);
  }
  function check() {
    const sentence = built.map((i) => bank[i]).join(' ');
    setDone(true);
    onResult(checkExact(sentence, exercise.accepted ?? []));
  }

  return (
    <div>
      <p>{exercise.prompt}</p>
      <p aria-label="built">{built.map((i) => bank[i]).join(' ')}</p>
      <div>
        {bank.map((w, i) => (
          <button key={i} disabled={used.has(i) || done} onClick={() => pick(i)}>{w}</button>
        ))}
      </div>
      {!done && <button onClick={reset} aria-label="Сбросить">Сбросить</button>}
      {!done && <button onClick={check}>Проверить</button>}
      {done && (
        <p role="status">
          {checkExact(built.map((i) => bank[i]).join(' '), exercise.accepted ?? [])
            ? 'Верно!'
            : `Неверно. Ответ: ${(exercise.accepted ?? [])[0]}`}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Register in `index.tsx`**

```tsx
import { WordOrder } from './WordOrder';
```
and in `registry`:
```tsx
  word_order: WordOrder,
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- wordOrder`
Expected: PASS (1 test).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: word_order renderer"
```

---

### Task 13: match_pairs renderer

**Files:**
- Create: `src/components/exercises/MatchPairs.tsx`
- Modify: `src/components/exercises/index.tsx` (register)
- Test: `src/components/exercises/matchPairs.test.tsx`

**Interfaces:**
- Consumes: `ExerciseProps`, registry (Task 10); `Pair` (Task 2).
- Produces: `MatchPairs` component. Two columns (EN buttons, RU buttons). User selects an EN then a RU; a correct match locks the pair. When all pairs matched, `onResult(true)`. A wrong match increments a local mistake counter and, on first mistake, the final result is `false` (the item is "failed" but the user still completes the matching to learn).

- [ ] **Step 1: Write the failing test**

`src/components/exercises/matchPairs.test.tsx`:
```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MatchPairs } from './MatchPairs';
import type { Exercise } from '../../types';

const ex: Exercise = {
  id: 'e', conceptId: 'c', type: 'match_pairs', prompt: 'Сопоставьте', points: 1,
  pairs: [{ en: 'street', ru: 'улица' }, { en: 'money', ru: 'деньги' }],
};

describe('MatchPairs', () => {
  it('reports correct when all pairs matched with no mistakes', async () => {
    const onResult = vi.fn();
    render(<MatchPairs exercise={ex} onResult={onResult} />);
    await userEvent.click(screen.getByRole('button', { name: 'street' }));
    await userEvent.click(screen.getByRole('button', { name: 'улица' }));
    await userEvent.click(screen.getByRole('button', { name: 'money' }));
    await userEvent.click(screen.getByRole('button', { name: 'деньги' }));
    expect(onResult).toHaveBeenCalledWith(true);
  });

  it('reports false if any wrong match was made', async () => {
    const onResult = vi.fn();
    render(<MatchPairs exercise={ex} onResult={onResult} />);
    await userEvent.click(screen.getByRole('button', { name: 'street' }));
    await userEvent.click(screen.getByRole('button', { name: 'деньги' })); // wrong
    await userEvent.click(screen.getByRole('button', { name: 'street' }));
    await userEvent.click(screen.getByRole('button', { name: 'улица' }));
    await userEvent.click(screen.getByRole('button', { name: 'money' }));
    await userEvent.click(screen.getByRole('button', { name: 'деньги' }));
    expect(onResult).toHaveBeenLastCalledWith(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- matchPairs`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

`src/components/exercises/MatchPairs.tsx`:
```tsx
import { useState } from 'react';
import type { ExerciseProps } from './index';

export function MatchPairs({ exercise, onResult }: ExerciseProps) {
  const pairs = exercise.pairs ?? [];
  const [selectedEn, setSelectedEn] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set()); // en values matched
  const [mistakes, setMistakes] = useState(0);

  function pickEn(en: string) {
    if (matched.has(en)) return;
    setSelectedEn(en);
  }
  function pickRu(ru: string) {
    if (selectedEn === null) return;
    const pair = pairs.find((p) => p.en === selectedEn);
    if (pair && pair.ru === ru) {
      const next = new Set(matched);
      next.add(selectedEn);
      setMatched(next);
      setSelectedEn(null);
      if (next.size === pairs.length) onResult(mistakes === 0);
    } else {
      setMistakes((m) => m + 1);
      setSelectedEn(null);
    }
  }

  return (
    <div>
      <p>{exercise.prompt}</p>
      <div style={{ display: 'flex', gap: 16 }}>
        <div>
          {pairs.map((p) => (
            <button key={p.en} disabled={matched.has(p.en)} aria-pressed={selectedEn === p.en} onClick={() => pickEn(p.en)}>{p.en}</button>
          ))}
        </div>
        <div>
          {pairs.map((p) => (
            <button key={p.ru} disabled={matched.has(p.en)} onClick={() => pickRu(p.ru)}>{p.ru}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
```

> The RU column's `disabled={matched.has(p.en)}` disables each RU button once its own pair is matched (RU and EN share the same pair object index).

- [ ] **Step 4: Register in `index.tsx`**

```tsx
import { MatchPairs } from './MatchPairs';
```
and in `registry`:
```tsx
  match_pairs: MatchPairs,
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- matchPairs`
Expected: PASS (2 tests).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: match_pairs renderer"
```

---

### Task 14: Training screen

**Files:**
- Create: `src/components/Training.tsx`
- Test: `src/components/Training.test.tsx`

**Interfaces:**
- Consumes: `content` (Task 9); `Module` (Task 2); `pickNextConcept`/`pickNextExercise` (Task 8); `applyAnswer` (Task 6); `loadProgress`/`saveProgress`/`pushRecent`/`ProgressState` (Task 7); `getRenderer` (Task 10).
- Produces:
  - `interface TrainingProps { moduleId: string; onComplete: () => void }`
  - `Training` orchestrates one session: load progress → pick concept → pick exercise → render via `getRenderer` → on result, `applyAnswer` + `pushRecent`, persist, advance. When `pickNextConcept` returns `null`, call `onComplete()`.
  - Shows current concept title and its score `score/threshold`.

- [ ] **Step 1: Write the failing test**

`src/components/Training.test.tsx`:
```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Training } from './Training';

beforeEach(() => localStorage.clear());

describe('Training', () => {
  it('renders an exercise prompt for the chosen module', () => {
    render(<Training moduleId="present-perfect" onComplete={vi.fn()} />);
    // module title and current concept title are shown
    expect(screen.getByRole('heading', { name: 'Present Perfect' })).toBeInTheDocument();
    expect(screen.getByText(/Опыт: ever\/never/)).toBeInTheDocument();
  });

  it('advances to a new exercise after answering', async () => {
    render(<Training moduleId="present-perfect" onComplete={vi.fn()} />);
    // Answer whatever is shown by clicking the first actionable control if present.
    const checkBtn = screen.queryByRole('button', { name: 'Проверить' });
    if (checkBtn) {
      await userEvent.click(checkBtn);
    }
    // After a result, a "Дальше" button advances.
    const next = await screen.findByRole('button', { name: 'Дальше' });
    expect(next).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Training`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

`src/components/Training.tsx`:
```tsx
import { useMemo, useState } from 'react';
import { content } from '../content';
import { pickNextConcept, pickNextExercise } from '../engine/scheduler';
import { applyAnswer } from '../engine/scoring';
import { loadProgress, saveProgress, pushRecent, type ProgressState } from '../store/progress';
import { getRenderer } from './exercises';

export interface TrainingProps {
  moduleId: string;
  onComplete: () => void;
}

export function Training({ moduleId, onComplete }: TrainingProps) {
  const mod = useMemo(() => content.modules.find((m) => m.id === moduleId)!, [moduleId]);
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress(content));
  const [answered, setAnswered] = useState(false);
  const [tick, setTick] = useState(0); // forces a fresh exercise pick after "Дальше"

  const conceptId = pickNextConcept(content, moduleId, progress);
  // All hooks must run unconditionally — pick the exercise via a hook that
  // returns null when the module is complete, then branch on the result.
  const exercise = useMemo(
    () => (conceptId ? pickNextExercise(content, conceptId, progress) : null),
    // re-pick when concept changes or we advance
    [conceptId, tick], // eslint-disable-line react-hooks/exhaustive-deps
  );

  if (conceptId === null || exercise === null) {
    return (
      <div>
        <p>Модуль пройден!</p>
        <button onClick={onComplete}>К списку</button>
      </div>
    );
  }

  const concept = content.concepts.find((c) => c.id === conceptId)!;
  const Renderer = getRenderer(exercise.type);
  const cp = progress.concepts[conceptId];

  function handleResult(correct: boolean) {
    setAnswered(true);
    setProgress((prev) => {
      const poolSize = content.exercises.filter((e) => e.conceptId === conceptId).length;
      const updatedConcept = applyAnswer(prev.concepts[conceptId], correct, exercise.points, mod.masteryThreshold);
      updatedConcept.recentExerciseIds = pushRecent(prev.concepts[conceptId].recentExerciseIds, exercise.id, poolSize);
      const next: ProgressState = {
        ...prev,
        concepts: { ...prev.concepts, [conceptId]: updatedConcept },
      };
      saveProgress(next);
      return next;
    });
  }

  function next() {
    setAnswered(false);
    setTick((t) => t + 1);
  }

  return (
    <div>
      <header>
        <h2>{mod.title}</h2>
        <p>{concept.title} — {cp.score}/{mod.masteryThreshold}</p>
      </header>
      <Renderer key={exercise.id + tick} exercise={exercise} onResult={handleResult} />
      {answered && <button onClick={next}>Дальше</button>}
    </div>
  );
}
```

> `Renderer` is keyed by `exercise.id + tick` so each new item remounts with fresh internal state.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Training`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: training screen orchestrating engine and renderers"
```

---

### Task 15: Module list, summary, and App wiring

**Files:**
- Create: `src/components/ModuleList.tsx`, `src/components/ModuleSummary.tsx`
- Modify: `src/App.tsx`
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: `content` (Task 9); `loadProgress`/`ProgressState` (Task 7); `isModuleComplete` (Task 6); `Training` (Task 14).
- Produces:
  - `ModuleList` — props `{ onPick: (moduleId: string) => void }`; lists modules with `mastered/total` concept counts from `loadProgress`.
  - `ModuleSummary` — props `{ moduleId: string; onBack: () => void }`; shows concepts sorted by `errorCount` desc (hardest first).
  - `App` — holds `screen` state (`'list' | 'training' | 'summary'`) and `currentModuleId`, switching between the three.

- [ ] **Step 1: Write the failing test**

`src/App.test.tsx`:
```tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => localStorage.clear());

describe('App', () => {
  it('shows the module list on start', () => {
    render(<App />);
    expect(screen.getByText(/Present Perfect/)).toBeInTheDocument();
    expect(screen.getByText(/Слова A2: повседневное/)).toBeInTheDocument();
  });

  it('navigates into training when a module is picked', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /Present Perfect/ }));
    expect(screen.getByText(/Опыт: ever\/never/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- App`
Expected: FAIL — `ModuleList`/updated `App` not found.

- [ ] **Step 3: Implement `ModuleList.tsx`**

```tsx
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
```

- [ ] **Step 4: Implement `ModuleSummary.tsx`**

```tsx
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
```

- [ ] **Step 5: Rewrite `App.tsx`**

```tsx
import { useState } from 'react';
import { ModuleList } from './components/ModuleList';
import { Training } from './components/Training';
import { ModuleSummary } from './components/ModuleSummary';

type Screen = 'list' | 'training' | 'summary';

export default function App() {
  const [screen, setScreen] = useState<Screen>('list');
  const [moduleId, setModuleId] = useState<string | null>(null);

  if (screen === 'training' && moduleId) {
    return <Training moduleId={moduleId} onComplete={() => setScreen('summary')} />;
  }
  if (screen === 'summary' && moduleId) {
    return <ModuleSummary moduleId={moduleId} onBack={() => setScreen('list')} />;
  }
  return (
    <ModuleList
      onPick={(id) => {
        setModuleId(id);
        setScreen('training');
      }}
    />
  );
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npm test -- App`
Expected: PASS (2 tests). Then run the full suite: `npm test`.

- [ ] **Step 7: Manual smoke check**

Run: `npm run dev`, open the printed URL. Verify: module list → pick a module → answer items (each item advances with "Дальше") → score increments → finishing a module shows the summary.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: module list, summary, and app navigation"
```

---

## Self-Review Notes

**Spec coverage check (each spec section → task):**
- Стек React+TS+Vite+localStorage → Task 1, 7.
- Модель данных Module→Concept→Exercise(pool) → Task 2, 9.
- 7 типов заданий → Task 9 (content), Tasks 10–13 (renderers), Task 5 (checking dispatch).
- Поток тренировки (выбор концепта/задания, антиповтор) → Task 8, 14.
- Механика скора (+points / −1 / порог / модуль завершён) → Task 6, 14.
- Проверка-гибрид (точное/близкое+diff+самооценка/далёкое) → Task 3, 4, 5, 10.
- Экраны (список / тренировка / итоги) → Task 14, 15.
- Прогресс привязан к версии контента → Task 7.
- Вне рамок v1 (LLM-генерация, анализ слабых мест отдельным режимом, аккаунты, редактор) → намеренно НЕ реализуются; «Итоги» по errorCount (Task 15) — частичный задел под анализ слабых мест.

No placeholders remain; all steps contain runnable code and exact commands. Type names are consistent across tasks (`Verdict`, `ConceptProgress`, `ProgressState`, `ExerciseProps`, `getRenderer`, `applyAnswer`, `pickNextConcept`, `pickNextExercise`, `pushRecent`).
