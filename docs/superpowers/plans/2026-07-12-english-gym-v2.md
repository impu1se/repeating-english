# English Gym v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Превратить repeating-english в «English Gym»: бесконечный счёт с вехой 50, свёрнутая справка по правилу у каждого грамм-концепта, «модуль завершён, но тренируемся дальше», полный грамматический контент A1–B2 (~850 заданий).

**Architecture:** Спека — `docs/superpowers/specs/2026-07-12-english-gym-design.md`. Движок — чистые функции (`src/engine/*`), контент — TS-модули (`src/content/modules/*`) c валидатором (`src/content/schema.ts`), экраны — `src/components/*`. Wave 0 меняет механику и UI, Waves 1–5 доливают контент модулями-темами.

**Tech Stack:** React 18 + TypeScript strict + Vite 5, Vitest + @testing-library/react (jsdom), ESLint flat config. Никаких новых зависимостей.

## Global Constraints

- `masteryThreshold: 50` у **всех** модулей; `content.version: '2'` (ставится в Task 3 и больше не меняется).
- Счёт без капа; `mastered` липкий: `prev.mastered || score >= threshold`.
- Перед КАЖДЫМ коммитом: `npm test` (все зелёные), `npm run build` (чисто), `npm run lint` (чисто).
- Каждый коммит заканчивается строкой `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
- id упражнений уникальны сквозь весь контент; префикс на концепт указан в задаче.
- Существующие id концептов/упражнений не переименовывать (кроме оговорённого в задачах).

### Правила авторинга контента (для Tasks 6–13)

**Шаблон файла модуля** (`src/content/modules/<module-id>.ts`):

```ts
import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: '<module-id>',
  title: '<Название по-русски или EN-термин>',
  level: '<A1|A2|B1|B1-B2|B2>',
  masteryThreshold: 50,
  conceptIds: ['<concept-1>', '<concept-2>'],
};

export const concepts: Concept[] = [
  {
    id: '<concept-1>',
    moduleId: '<module-id>',
    title: '<RU название концепта>',
    kind: 'grammar',
    theory: '<Правило по-русски, 4–10 строк, EN-примеры, переносы \n>',
    exerciseIds: ['<pfx>-e1', /* … все id упражнений концепта … */ '<pfx>-e19'],
  },
];

export const exercises: Exercise[] = [ /* 18–20 на концепт */ ];
```

**Регистрация** в `src/content/index.ts`: добавить `import * as <camelName> from './modules/<module-id>';` и включить `<camelName>.module` / `...<camelName>.concepts` / `...<camelName>.exercises` в соответствующие массивы (порядок в массиве modules не важен — список сортируется по уровню в UI).

**Микс типов на концепт (18–20 заданий):** 4 `translate_ru_en` (points 2) + 3 `fill_gap` + 3 `verb_form` + 4 `choose_word` + 3 `word_order` + 2–3 `multi_gap` (все, кроме translate, points 1). `match_pairs` — только в vocab-концептах.

**Требования полей по типам** (валидатор `src/content/schema.ts` их проверяет):
- `translate_ru_en`/`fill_gap`/`verb_form`: `accepted` непуст. Для translate — **≥3 вариантов**: полные и сокращённые формы (`I have` / `I've`, `do not` / `don't`), UK/US синонимы (film/movie), допустимые перестановки. Для однословных gap/verb_form — все разумные синонимы.
- `choose_word`: `options` ≥2, уникальны, `accepted` ⊆ `options`. Дистракторы — типичные ошибки русскоговорящих.
- `word_order`: `bank` = ровно токены ответа (порядок любой — рендерер перемешивает); каждый `accepted` собираем из bank (валидатор проверит).
- `multi_gap`: число `___` в prompt == числу gaps; каждый gap.accepted непуст.
- `theory`: по-русски, маркеры `•` для примеров, без markdown-разметки.

**Пример-эталон** (концепт `a1-be`, первые 6 заданий — по одному каждого типа; остальные добиваются в том же духе):

```ts
{ id: 'a1be-e1', conceptId: 'a1-be', type: 'translate_ru_en', prompt: 'Она врач.', points: 2, accepted: ['She is a doctor', "She's a doctor"] },
{ id: 'a1be-e2', conceptId: 'a1-be', type: 'fill_gap', prompt: 'They ___ from Spain.', points: 1, accepted: ['are', "aren't", 'are not'] },
{ id: 'a1be-e3', conceptId: 'a1-be', type: 'verb_form', prompt: 'My brother (be) ___ ten years old.', points: 1, accepted: ['is'] },
{ id: 'a1be-e4', conceptId: 'a1-be', type: 'choose_word', prompt: '___ you tired?', points: 1, options: ['Are', 'Is', 'Am'], accepted: ['Are'] },
{ id: 'a1be-e5', conceptId: 'a1-be', type: 'word_order', prompt: 'Соберите: «Мы дома»', points: 1, bank: ['we', 'are', 'at', 'home'], accepted: ['we are at home'] },
{ id: 'a1be-e6', conceptId: 'a1-be', type: 'multi_gap', prompt: 'I ___ hungry, but he ___ not.', points: 1, gaps: [{ accepted: ['am', "'m"] }, { accepted: ['is'] }] },
```

**Шаги каждой контент-задачи одинаковы и обязательны:**
1. Написать файл(ы) модуля по шаблону (полные пулы + theory на каждый концепт).
2. Зарегистрировать в `src/content/index.ts`.
3. Самовычитка: перечитать каждый `accepted` на грамматическую правильность; проверить, что дистракторы choose_word неверны однозначно.
4. `npm test` → все зелёные (валидатор контента = часть тестов).
5. `npm run build && npm run lint` → чисто.
6. Commit (сообщение в задаче).

---

### Task 1: Scoring — бесконечный счёт, липкий mastered

**Files:**
- Modify: `src/engine/scoring.ts` (функция `applyAnswer`)
- Test: `src/engine/scoring.test.ts`

**Interfaces:**
- Consumes: `ConceptProgress { score, mastered, recentExerciseIds, errorCount }` (без изменений).
- Produces: `applyAnswer(prev: ConceptProgress, correct: boolean, points: number, threshold: number): ConceptProgress` — та же сигнатура, новая семантика: score без капа, mastered липкий. `isModuleComplete` не меняется.

- [ ] **Step 1: Обновить тесты (падающие)**

Заменить в `src/engine/scoring.test.ts` блок `describe('applyAnswer', …)` на:

```ts
describe('applyAnswer', () => {
  it('adds points on correct with no cap', () => {
    const p = applyAnswer({ score: 49, mastered: false, recentExerciseIds: [], errorCount: 0 }, true, 2, 50);
    expect(p.score).toBe(51);
    expect(p.mastered).toBe(true);
  });
  it('keeps growing past the threshold', () => {
    const p = applyAnswer({ score: 60, mastered: true, recentExerciseIds: [], errorCount: 0 }, true, 1, 50);
    expect(p.score).toBe(61);
    expect(p.mastered).toBe(true);
  });
  it('subtracts 1 on wrong, never below 0, counts error', () => {
    const p = applyAnswer(emptyConceptProgress(), false, 2, 50);
    expect(p.score).toBe(0);
    expect(p.errorCount).toBe(1);
    expect(p.mastered).toBe(false);
  });
  it('mastered is sticky: a wrong answer below the threshold does not revoke it', () => {
    const p = applyAnswer({ score: 50, mastered: true, recentExerciseIds: [], errorCount: 0 }, false, 1, 50);
    expect(p.score).toBe(49);
    expect(p.mastered).toBe(true);
  });
  it('does not mutate the input', () => {
    const prev = emptyConceptProgress();
    applyAnswer(prev, true, 1, 50);
    expect(prev.score).toBe(0);
  });
});
```

- [ ] **Step 2: Убедиться, что тесты падают**

Run: `npx vitest run src/engine/scoring.test.ts`
Expected: FAIL — «adds points on correct with no cap» (score 50 ≠ 51, кап ещё действует).

- [ ] **Step 3: Реализация**

В `src/engine/scoring.ts` заменить ветку correct в `applyAnswer`:

```ts
export function applyAnswer(
  prev: ConceptProgress,
  correct: boolean,
  points: number,
  threshold: number,
): ConceptProgress {
  if (correct) {
    const score = prev.score + points;
    // no cap: the score is total volume of work, gym-style;
    // mastered is sticky — once earned, never revoked
    return { ...prev, score, mastered: prev.mastered || score >= threshold };
  }
  return { ...prev, score: Math.max(0, prev.score - 1), errorCount: prev.errorCount + 1 };
}
```

- [ ] **Step 4: Тесты зелёные**

Run: `npx vitest run src/engine/scoring.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/engine/scoring.ts src/engine/scoring.test.ts
git commit -m "feat: uncapped gym score with sticky mastered flag"
```

---

### Task 2: Scheduler — освоенные концепты остаются в ротации

**Files:**
- Modify: `src/engine/scheduler.ts` (функция `pickNextConcept`)
- Test: `src/engine/scheduler.test.ts`

**Interfaces:**
- Produces: `pickNextConcept(content, moduleId, progress): string | null` — та же сигнатура; выбирает концепт с минимальным score среди ВСЕХ концептов модуля (mastered не исключаются); `null` только если модуль не найден или у него нет conceptIds. `pickNextExercise` не меняется.

- [ ] **Step 1: Обновить тесты (падающие)**

В `src/engine/scheduler.test.ts` заменить блок `describe('pickNextConcept', …)` на:

```ts
describe('pickNextConcept', () => {
  it('picks the lowest-score concept', () => {
    expect(pickNextConcept(content, 'm', progressWith({ c1: { score: 3 }, c2: { score: 1 } }))).toBe('c2');
  });
  it('keeps mastered concepts in rotation (lowest score still wins)', () => {
    expect(
      pickNextConcept(content, 'm', progressWith({ c1: { score: 55, mastered: true }, c2: { score: 3 } })),
    ).toBe('c2');
  });
  it('picks a mastered concept when it has the lowest score', () => {
    expect(
      pickNextConcept(content, 'm', progressWith({ c1: { score: 50, mastered: true }, c2: { score: 61, mastered: true } })),
    ).toBe('c1');
  });
  it('returns null for an unknown module', () => {
    expect(pickNextConcept(content, 'nope', progressWith({}))).toBeNull();
  });
  it('treats a concept without a progress record as score 0', () => {
    const progress: ProgressState = {
      contentVersion: '1',
      concepts: { c1: { score: 2, mastered: false, recentExerciseIds: [], errorCount: 0 } },
    };
    expect(pickNextConcept(content, 'm', progress)).toBe('c2');
  });
});
```

- [ ] **Step 2: Убедиться, что падают**

Run: `npx vitest run src/engine/scheduler.test.ts`
Expected: FAIL — «picks a mastered concept…» получает `null` (mastered ещё пропускаются).

- [ ] **Step 3: Реализация**

В `src/engine/scheduler.ts`, тело цикла `pickNextConcept`:

```ts
  let chosen: string | null = null;
  let bestScore = Infinity;
  for (const cid of mod.conceptIds) {
    // mastered concepts stay in rotation — the gym never closes;
    // lowest score first keeps the weakest concept trained hardest
    const score = progress.concepts[cid]?.score ?? 0;
    if (score < bestScore) {
      bestScore = score;
      chosen = cid;
    }
  }
  return chosen;
```

- [ ] **Step 4: Тесты зелёные**

Run: `npx vitest run src/engine/scheduler.test.ts`
Expected: PASS (9 tests в файле).

- [ ] **Step 5: Commit**

```bash
git add src/engine/scheduler.ts src/engine/scheduler.test.ts
git commit -m "feat: mastered concepts stay in rotation, weakest-first"
```

---

### Task 3: Типы, theory, порог 50, версия контента '2'

**Files:**
- Modify: `src/types.ts` (поле `theory` у Concept)
- Modify: `src/content/index.ts` (version '2')
- Modify: `src/content/modules/present-perfect.ts`, `past-vs-perfect.ts`, `conditionals.ts`, `vocab-a2.ts`, `vocab-b1-work-phrasal.ts` (masteryThreshold 50; theory у 5 грамм-концептов)
- Test: `src/content/index.test.ts` (новый тест: у всех grammar-концептов есть theory)

**Interfaces:**
- Produces: `Concept.theory?: string` — опциональное поле; Task 4 рендерит его. Все модули с `masteryThreshold: 50`; `content.version === '2'`.

- [ ] **Step 1: Добавить поле в типы**

В `src/types.ts`, интерфейс `Concept`, после `kind`:

```ts
  theory?: string;       // краткое правило по-русски (RU + EN-примеры); только у grammar
```

- [ ] **Step 2: Написать падающий тест**

В `src/content/index.test.ts` добавить:

```ts
  it('every grammar concept ships a theory reference', () => {
    for (const c of content.concepts.filter((c) => c.kind === 'grammar')) {
      expect(c.theory, `concept ${c.id}`).toBeTruthy();
    }
  });
  it('uses version 2 and threshold 50 everywhere', () => {
    expect(content.version).toBe('2');
    for (const m of content.modules) expect(m.masteryThreshold, `module ${m.id}`).toBe(50);
  });
```

Run: `npx vitest run src/content/index.test.ts` → Expected: FAIL.

- [ ] **Step 3: Обновить контент**

Во всех 5 файлах модулей: `masteryThreshold: 5` → `masteryThreshold: 50`. В `src/content/index.ts`: `version: '1'` → `version: '2'` (и поправить комментарий: «bump на breaking-изменения; порог 5→50 — breaking»). Добавить `theory` пяти существующим грамм-концептам (тексты вставить как есть):

`pp-experience`:
```
Present Perfect для опыта: have/has + V3. Факт «когда-либо в жизни», время не названо.
• Have you ever been to London? — Ты когда-нибудь был в Лондоне?
• I have never seen this film. — Я никогда не видел этот фильм.
ever — «когда-нибудь» (вопросы), never — «никогда» (отрицание без not).
Если время названо (yesterday, in 2020) — это уже Past Simple.
```

`psp-past-simple`:
```
Past Simple — законченное действие в законченном времени: V2 (или did + V1).
Маркеры: yesterday, last week, two days ago, in 2019, when?
• She moved to London in 2019.
• I didn't watch TV last night. / Did you see him?
Отрицание и вопрос — через did, глагол возвращается в базовую форму.
```

`psp-contrast`:
```
Выбор между Past Simple и Present Perfect:
• Время названо (in 2020, yesterday, ago) → Past Simple: I saw it in 2020.
• Опыт или результат «к настоящему», время не названо → Present Perfect: I have seen it three times.
• already / just / yet / ever / never → Present Perfect.
• ago / last / when? → Past Simple.
```

`cond-first`:
```
First Conditional — реальное условие в будущем: if + Present Simple, will + V1.
• If it rains, we will stay at home.
После if / when / unless НЕ ставим will: If she studies (не will study)…
unless = if not: You won't pass unless you study.
```

`cond-second`:
```
Second Conditional — воображаемая ситуация сейчас/в будущем: if + Past Simple, would + V1.
• If I were rich, I would buy a house by the sea.
were — для всех лиц: If I were you, I would take the job.
Отличие от First: ситуация маловероятна или нереальна.
```

- [ ] **Step 4: Тесты зелёные + сборка**

Run: `npm test && npm run build` → Expected: PASS / чисто.

- [ ] **Step 5: Commit**

```bash
git add src/types.ts src/content/
git commit -m "feat: concept theory field, threshold 50, content version 2"
```

---

### Task 4: Training — баннер, справка, «Итоги», счёт без тупика

**Files:**
- Modify: `src/components/Training.tsx`
- Modify: `src/App.tsx` (проброс `onSummary`)
- Modify: `src/index.css` (стили `.banner`, `.theory`)
- Test: `src/components/Training.test.tsx`

**Interfaces:**
- Consumes: `applyAnswer` (Task 1), `pickNextConcept` (Task 2), `isModuleComplete(conceptIds, progress.concepts)` из `src/engine/scoring.ts`, `Concept.theory` (Task 3).
- Produces: `TrainingProps` — проп `onComplete` УДАЛЯЕТСЯ (терминального экрана «Модуль пройден!» больше нет), добавляется обязательный `onSummary: () => void`. Итоговый набор: `{ moduleId, onExit, onSummary, content?, rng? }`.

- [ ] **Step 1: Обновить/добавить тесты (падающие)**

В `src/components/Training.test.tsx`: во всех существующих `render(<Training …>)` заменить `onComplete={vi.fn()}` на `onSummary={vi.fn()}` (в новых тестах ниже `onComplete` тоже не передаётся). Добавить:

```ts
  it('shows a banner when the module first becomes complete and keeps training', async () => {
    render(<Training moduleId="m" onExit={vi.fn()} onSummary={vi.fn()} content={multiConcept} rng={first} />);
    // threshold 2, points 1: два верных ответа на концепт
    for (let i = 0; i < 4; i++) {
      const input = screen.getByRole('textbox');
      const prompt = screen.getByText(/(C1|C2) (first|second) ___/).textContent!;
      const answer = prompt.startsWith('C1 first') ? 'a' : prompt.startsWith('C1 second') ? 'b' : prompt.startsWith('C2 first') ? 'c' : 'd';
      await userEvent.type(input, answer);
      await userEvent.click(screen.getByRole('button', { name: 'Проверить' }));
      if (i < 3) {
        expect(screen.queryByText(/Модуль освоен/)).not.toBeInTheDocument();
      }
      await userEvent.click(screen.getByRole('button', { name: 'Дальше' }));
    }
    // после 4-го верного ответа модуль впервые завершён
    expect(screen.getByText(/Модуль освоен/)).toBeInTheDocument();
    // тренировка продолжается: карточка на экране
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('does not show the banner when entering an already-complete module', () => {
    const complete = {
      contentVersion: 'test-multi',
      concepts: {
        c1: { score: 2, mastered: true, recentExerciseIds: [], errorCount: 0 },
        c2: { score: 2, mastered: true, recentExerciseIds: [], errorCount: 0 },
      },
    };
    localStorage.setItem('re:progress', JSON.stringify(complete));
    render(<Training moduleId="m" onExit={vi.fn()} onSummary={vi.fn()} content={multiConcept} rng={first} />);
    expect(screen.queryByText(/Модуль освоен/)).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument(); // и тренировка идёт
  });

  it('renders collapsed theory for grammar concepts that have it', () => {
    render(<Training moduleId="present-perfect" onExit={vi.fn()} onSummary={vi.fn()} rng={first} />);
    expect(screen.getByText('📖 Правило')).toBeInTheDocument();
    expect(screen.getByText(/Present Perfect для опыта/)).not.toBeVisible();
  });

  it('opens the summary from the header', async () => {
    const onSummary = vi.fn();
    render(<Training moduleId="m" onExit={vi.fn()} onSummary={onSummary} content={multiConcept} rng={first} />);
    await userEvent.click(screen.getByRole('button', { name: 'Итоги' }));
    expect(onSummary).toHaveBeenCalled();
  });

  it('shows "score / threshold" before mastery and "score ✓" after', () => {
    localStorage.setItem('re:progress', JSON.stringify({
      contentVersion: 'test-multi',
      concepts: {
        c1: { score: 3, mastered: true, recentExerciseIds: [], errorCount: 0 },
        c2: { score: 1, mastered: false, recentExerciseIds: [], errorCount: 0 },
      },
    }));
    render(<Training moduleId="m" onExit={vi.fn()} onSummary={vi.fn()} content={multiConcept} rng={first} />);
    // c2 слабее (1 < 3) — показан первым: «1 / 2»
    expect(screen.getByText(/— 1 \/ 2$/)).toBeInTheDocument();
  });
```

Примечание: `multiConcept` в этом файле уже существует; тест-хелпер `first = () => 0` тоже. `'Модуль пройден!'`-тестов в файле нет — удалять нечего.

- [ ] **Step 2: Убедиться, что падают**

Run: `npx vitest run src/components/Training.test.tsx`
Expected: FAIL (нет пропа `onSummary`, нет баннера/справки/кнопки «Итоги»).

- [ ] **Step 3: Реализация — полное новое тело Training.tsx**

```tsx
import { useEffect, useMemo, useState } from 'react';
import { content as defaultContent } from '../content';
import { pickNextConcept, pickNextExercise } from '../engine/scheduler';
import { applyAnswer, isModuleComplete } from '../engine/scoring';
import { loadProgress, saveProgress, pushRecent, type ProgressState } from '../store/progress';
import { getRenderer } from './exercises';
import type { Content } from '../types';

export interface TrainingProps {
  moduleId: string;
  onExit: () => void;
  onSummary: () => void;
  content?: Content;
  rng?: () => number;
}

export function Training({ moduleId, onExit, onSummary, content = defaultContent, rng = Math.random }: TrainingProps) {
  const mod = useMemo(() => content.modules.find((m) => m.id === moduleId)!, [moduleId]); // eslint-disable-line react-hooks/exhaustive-deps
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress(content));
  const [answered, setAnswered] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const step = useMemo(
    () => {
      const cid = pickNextConcept(content, moduleId, progress);
      return { conceptId: cid, exercise: cid ? pickNextExercise(content, cid, progress, rng) : null };
    },
    [moduleId, tick], // eslint-disable-line react-hooks/exhaustive-deps
  );
  const conceptId = step.conceptId;
  const exercise = step.exercise;

  if (conceptId === null || exercise === null) {
    return (
      <div>
        <p>В этом модуле нет заданий.</p>
        <button onClick={onExit}>← К списку</button>
      </div>
    );
  }

  const concept = content.concepts.find((c) => c.id === conceptId)!;
  const Renderer = getRenderer(exercise.type);
  const cp = progress.concepts[conceptId];
  const activeConceptId = conceptId;
  const activeExercise = exercise;

  function handleResult(correct: boolean) {
    setAnswered(true);
    const poolSize = content.exercises.filter((e) => e.conceptId === activeConceptId).length;
    const updatedConcept = applyAnswer(progress.concepts[activeConceptId], correct, activeExercise.points, mod.masteryThreshold);
    updatedConcept.recentExerciseIds = pushRecent(progress.concepts[activeConceptId].recentExerciseIds, activeExercise.id, poolSize);
    const next: ProgressState = {
      ...progress,
      concepts: { ...progress.concepts, [activeConceptId]: updatedConcept },
    };
    // banner exactly on the not-complete -> complete transition of this session
    if (!isModuleComplete(mod.conceptIds, progress.concepts) && isModuleComplete(mod.conceptIds, next.concepts)) {
      setShowBanner(true);
    }
    setProgress(next);
  }

  function next() {
    setAnswered(false);
    setTick((t) => t + 1);
  }

  return (
    <div>
      <header>
        <nav>
          <button onClick={onExit}>← К списку</button>
          <button onClick={onSummary}>Итоги</button>
        </nav>
        <h2>{mod.title}</h2>
        <p className="score">
          {concept.title} — {cp.mastered ? `${cp.score} ✓` : `${cp.score} / ${mod.masteryThreshold}`}
        </p>
        {concept.theory && (
          <details key={'theory' + tick} className="theory">
            <summary>📖 Правило</summary>
            <p>{concept.theory}</p>
          </details>
        )}
      </header>
      {showBanner && <p className="banner" role="status">🏆 Модуль освоен — можно продолжать качаться!</p>}
      {/* getRenderer returns a stable reference from a static registry, so the
          component identity is constant per exercise type — state cannot reset. */}
      {/* eslint-disable-next-line react-hooks/static-components */}
      <Renderer key={exercise.id + ':' + tick} exercise={exercise} onResult={handleResult} />
      {answered && <button className="next" onClick={next}>Дальше</button>}
    </div>
  );
}
```

Замечания для реализатора: `handleResult` теперь строит `next` из render-scope `progress` (не через функциональный апдейтер) — это безопасно, т.к. рендерер гарантирует один `onResult` на карточку, и нужно для проверки перехода завершённости. Проп `onComplete` удалён из `TrainingProps` и из вызова в App — экран 'summary' достижим только через `onSummary` (strict TS упадёт на любом забытом `onComplete=`).

В `src/App.tsx` вызов Training заменить на:

```tsx
    return (
      <Training
        moduleId={moduleId}
        onExit={() => setScreen('list')}
        onSummary={() => setScreen('summary')}
      />
    );
```

В `src/index.css` добавить:

```css
.banner {
  padding: 0.6rem 0.9rem;
  border: 1px solid #e0b400;
  border-radius: 0.55rem;
  background: #fff7d6;
}

details.theory {
  margin: 0.5rem 0;
}

details.theory summary {
  cursor: pointer;
  color: #5566ee;
}

details.theory p {
  white-space: pre-line;
  margin: 0.5rem 0 0.25rem;
  padding: 0.6rem 0.8rem;
  border-left: 3px solid #c3c8d4;
  background: #fff;
}
```

- [ ] **Step 4: Тесты зелёные**

Run: `npx vitest run src/components/Training.test.tsx src/App.test.tsx`
Expected: PASS. Затем `npm test && npm run build && npm run lint` → чисто. (`toBeVisible` на закрытом `<details>` работает в jsdom через jest-dom.)

- [ ] **Step 5: Commit**

```bash
git add src/components/Training.tsx src/components/Training.test.tsx src/App.tsx src/index.css
git commit -m "feat: gym training screen — completion banner, theory reference, summary access"
```

---

### Task 5: ModuleList — сортировка по уровню, галочки, переименование в English Gym

**Files:**
- Modify: `src/components/ModuleList.tsx`
- Modify: `index.html` (title)
- Test: `src/components/ModuleList.test.tsx` (создать)

**Interfaces:**
- Consumes: `isModuleComplete` из `src/engine/scoring.ts`.
- Produces: список отсортирован по `LEVEL_ORDER = ['A1','A2','B1','B1-B2','B2']` (неизвестный уровень — в конец), заголовок «English Gym».

- [ ] **Step 1: Написать падающий тест**

Создать `src/components/ModuleList.test.tsx`:

```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ModuleList } from './ModuleList';
import { content } from '../content';
import { saveProgress, loadProgress } from '../store/progress';

beforeEach(() => localStorage.clear());

describe('ModuleList', () => {
  it('is titled English Gym and sorts modules by level', () => {
    render(<ModuleList onPick={vi.fn()} />);
    expect(screen.getByRole('heading', { name: /English Gym/ })).toBeInTheDocument();
    const labels = screen.getAllByRole('button').map((b) => b.textContent ?? '');
    const levelOf = (label: string) => content.modules.find((m) => label.includes(m.title))!.level;
    const order = ['A1', 'A2', 'B1', 'B1-B2', 'B2'];
    const ranks = labels.map((l) => order.indexOf(levelOf(l)));
    expect([...ranks].sort((a, b) => a - b)).toEqual(ranks);
  });

  it('marks a fully mastered module with a check', () => {
    const progress = loadProgress(content);
    const mod = content.modules[0];
    for (const cid of mod.conceptIds) progress.concepts[cid] = { score: 50, mastered: true, recentExerciseIds: [], errorCount: 0 };
    saveProgress(progress);
    render(<ModuleList onPick={vi.fn()} />);
    expect(screen.getByRole('button', { name: new RegExp('✓ ' + mod.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) })).toBeInTheDocument();
  });
});
```

Run: `npx vitest run src/components/ModuleList.test.tsx` → Expected: FAIL.

- [ ] **Step 2: Реализация — полное новое тело ModuleList.tsx**

```tsx
import { useState } from 'react';
import { content } from '../content';
import { loadProgress } from '../store/progress';
import { isModuleComplete } from '../engine/scoring';

const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B1-B2', 'B2'];
const levelRank = (level: string) => {
  const i = LEVEL_ORDER.indexOf(level);
  return i === -1 ? LEVEL_ORDER.length : i;
};

export function ModuleList({ onPick }: { onPick: (moduleId: string) => void }) {
  const [progress] = useState(() => loadProgress(content));
  const modules = [...content.modules].sort((a, b) => levelRank(a.level) - levelRank(b.level));
  return (
    <div>
      <h1>English Gym</h1>
      <p className="score">тренажёрный зал английского</p>
      <ul className="modules">
        {modules.map((m) => {
          const total = m.conceptIds.length;
          const mastered = m.conceptIds.filter((id) => progress.concepts[id]?.mastered).length;
          const complete = isModuleComplete(m.conceptIds, progress.concepts);
          return (
            <li key={m.id}>
              <button onClick={() => onPick(m.id)}>
                {complete ? '✓ ' : ''}{m.title} ({m.level}) — освоено {mastered}/{total}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
```

В `index.html`: `<title>Repeating English</title>` → `<title>English Gym</title>`.
В `src/App.test.tsx` ничего менять не нужно (он ищет кнопки по названию модуля).

- [ ] **Step 3: Тесты зелёные, полный прогон**

Run: `npm test && npm run build && npm run lint`
Expected: всё чисто. Проверить, что тест из Task 5 Step 1 видит «✓ » у замастеренного модуля.

- [ ] **Step 4: Commit**

```bash
git add src/components/ModuleList.tsx src/components/ModuleList.test.tsx index.html
git commit -m "feat: English Gym module list — level sort, completion checks"
```

---

### Task 6 (Wave 1): контент A1 — 3 модуля, 9 концептов

**Files:**
- Create: `src/content/modules/a1-be-present-simple.ts`, `src/content/modules/a1-nouns-articles.ts`, `src/content/modules/a1-basics.ts`
- Modify: `src/content/index.ts`

**Interfaces:** Produces модули `a1-be-present-simple`, `a1-nouns-articles`, `a1-basics` (level 'A1', threshold 50, kind 'grammar', theory у каждого концепта, 18–20 заданий на концепт по правилам Global Constraints).

Состав и покрытие (id концепта → префикс id заданий → что покрывает пул):

| Концепт | Префикс | Покрытие |
|---|---|---|
| `a1-be` | `a1be-` | am/is/are: утверждения, отрицания (isn't/aren't/'m not), вопросы + short answers |
| `a1-present-simple` | `a1ps-` | утверждения, -s/-es 3-го лица, наречия частоты (always/usually/never — позиция) |
| `a1-ps-questions` | `a1pq-` | do/does вопросы, don't/doesn't отрицания, Wh-вопросы |
| `a1-articles` | `a1ar-` | a/an по звуку, a vs the (первое/повторное упоминание), нулевой перед мн. числом |
| `a1-plurals` | `a1pl-` | -s/-es/-ies, неправильные (men, children, feet), this/these, that/those |
| `a1-some-any` | `a1sa-` | some в утверждениях, any в вопросах/отрицаниях, some в просьбах |
| `a1-can` | `a1cn-` | can/can't умения, вопросы-просьбы (Can you…?), short answers |
| `a1-there-is` | `a1th-` | there is/are, отрицания, вопросы, there is + a vs there are + some |
| `a1-possessives` | `a1po-` | my/your/his/her/our/their, mine/yours…, 's и s' |

- [ ] **Step 1:** Написать 3 файла модулей (шаблон и пример-эталон — в Global Constraints; theory на каждый концепт).
- [ ] **Step 2:** Зарегистрировать все три в `src/content/index.ts`.
- [ ] **Step 3:** Самовычитка accepted-вариантов и дистракторов.
- [ ] **Step 4:** Run: `npm test` → Expected: PASS (валидатор доволен, ≥6 на концепт выполнено с запасом).
- [ ] **Step 5:** Run: `npm run build && npm run lint` → чисто.
- [ ] **Step 6: Commit**

```bash
git add src/content/
git commit -m "feat: A1 grammar content — be/present simple, nouns/articles, basics (9 concepts)"
```

---

### Task 7 (Wave 2): контент A2 — 4 модуля, 10 концептов

**Files:**
- Create: `src/content/modules/a2-past.ts`, `a2-continuous-future.ts`, `a2-comparisons.ts`, `a2-quantity.ts`
- Modify: `src/content/index.ts`

**Interfaces:** Produces модули `a2-past`, `a2-continuous-future`, `a2-comparisons`, `a2-quantity` (level 'A2').

| Концепт | Префикс | Покрытие |
|---|---|---|
| `a2-was-were` | `a2ww-` | was/were ±, вопросы, there was/were |
| `a2-past-simple` | `a2pt-` | правильные -ed, топ-неправильные (go/see/have/take/make…), произношение не тестируем — только формы |
| `a2-past-questions` | `a2pd-` | did-вопросы, didn't, Wh-вопросы в прошедшем |
| `a2-present-continuous` | `a2pc-` | be + V-ing сейчас, spelling (running, making), вопросы/отрицания |
| `a2-simple-vs-continuous` | `a2sc-` | контраст: usually vs now, state verbs (know/like/want — не Continuous) |
| `a2-going-to-will` | `a2gw-` | going to планы/предсказания по признакам, will спонтанные решения/обещания |
| `a2-comparative` | `a2cm-` | -er / more, than, as…as, irregular (better/worse) |
| `a2-superlative` | `a2sp-` | the -est / most, in my class/of all, too + adj / adj + enough |
| `a2-countability` | `a2ct-` | countable/uncountable (advice, money, news), a/an vs some |
| `a2-much-many` | `a2mm-` | much/many/a lot of, How much/many, (a) few / (a) little |

- [ ] **Step 1:** Написать 4 файла модулей (theory на каждый концепт).
- [ ] **Step 2:** Зарегистрировать в `src/content/index.ts`.
- [ ] **Step 3:** Самовычитка.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** `npm run build && npm run lint` → чисто.
- [ ] **Step 6: Commit**

```bash
git add src/content/
git commit -m "feat: A2 grammar content — past, continuous/plans, comparisons, quantity (10 concepts)"
```

---

### Task 8 (Wave 3a): расширение существующих B1-модулей до ~20/концепт + новые PP-концепты

**Files:**
- Modify: `src/content/modules/present-perfect.ts` (расширить `pp-experience` до ~20; добавить концепты `pp-just-already-yet` и `pp-for-since`)
- Modify: `src/content/modules/past-vs-perfect.ts` (оба концепта до ~20)
- Modify: `src/content/modules/conditionals.ts` (оба концепта до ~20)

**Interfaces:** id новых заданий продолжают существующие серии: `pp-e7…pp-e20`, `psp-e8…psp-e20`, `psc-e8…psc-e20`, `cf-e8…cf-e20`, `cs-e8…cs-e20`. Новые концепты: `pp-just-already-yet` (префикс `pja-`), `pp-for-since` (префикс `pfs-`) — добавить в `conceptIds` модуля present-perfect, kind 'grammar', theory обязателен.

| Концепт | Покрытие |
|---|---|
| `pp-experience` (расширение) | больше вариантов ever/never, superlative + ever (the best film I've ever seen) |
| `pp-just-already-yet` | just (только что), already в утверждениях, yet в вопросах/отрицаниях, позиция в предложении |
| `pp-for-since` | for + период / since + точка, How long…?, Present Perfect с live/work/know |
| `psp-*` (расширение) | новые сюжеты на те же правила; в contrast добавить this week/today (незакончённый период → PP) |
| `cf-*`, `cs-*` (расширение) | больше вариаций: when/as soon as в First; unless; If I were you в Second |

- [ ] **Step 1:** Расширить пулы и добавить 2 новых концепта (theory для обоих).
- [ ] **Step 2:** exerciseIds концептов и массивы exercises согласованы (валидатор проверит оба направления).
- [ ] **Step 3:** Самовычитка.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** `npm run build && npm run lint` → чисто.
- [ ] **Step 6: Commit**

```bash
git add src/content/
git commit -m "feat: expand present-perfect (+just/already/yet, for/since), past-vs-perfect, conditionals to ~20/concept"
```

---

### Task 9 (Wave 3b): контент B1 — прошедшие времена 2, модальные, пассив

**Files:**
- Create: `src/content/modules/b1-past-tenses.ts`, `b1-modals.ts`, `b1-passive.ts`
- Modify: `src/content/index.ts`

**Interfaces:** Produces модули `b1-past-tenses`, `b1-modals`, `b1-passive` (level 'B1').

| Концепт | Префикс | Покрытие |
|---|---|---|
| `b1-past-continuous` | `b1pc-` | was/were + V-ing, when/while, фон + прерывание (I was cooking when he called) |
| `b1-used-to` | `b1ut-` | used to + V1 (привычки прошлого), didn't use to, Did you use to…?, would для повторяющихся действий |
| `b1-past-perfect` | `b1pp-` | had + V3: действие до другого прошедшего, after/before/by the time |
| `b1-modals-obligation` | `b1mo-` | must/have to (обязанность), mustn't vs don't have to (!), should/shouldn't (совет) |
| `b1-modals-possibility` | `b1mp-` | may/might/could (вероятность), can't (уверенное отрицание), maybe vs may be |
| `b1-passive-present` | `b1pv-` | am/is/are + V3, by + agent, вопросы (Where is it made?) |
| `b1-passive-past` | `b1pw-` | was/were + V3, известные факты (was built/invented/written) |

- [ ] **Step 1:** Написать 3 файла модулей (theory на каждый концепт).
- [ ] **Step 2:** Зарегистрировать в `src/content/index.ts`.
- [ ] **Step 3:** Самовычитка.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** `npm run build && npm run lint` → чисто.
- [ ] **Step 6: Commit**

```bash
git add src/content/
git commit -m "feat: B1 grammar content — past tenses 2, modals, basic passive (7 concepts)"
```

---

### Task 10 (Wave 3c): контент B1 — герундий/инфинитив, относительные придаточные

**Files:**
- Create: `src/content/modules/b1-verb-patterns.ts`, `b1-relative.ts`
- Modify: `src/content/index.ts`

**Interfaces:** Produces модули `b1-verb-patterns`, `b1-relative` (level 'B1').

| Концепт | Префикс | Покрытие |
|---|---|---|
| `b1-gerund-infinitive` | `b1gi-` | enjoy/avoid/finish + -ing; want/decide/hope + to-inf; like both; stop doing vs stop to do |
| `b1-verb-prepositions` | `b1vp-` | good at doing, interested in, look forward to doing, before/after + -ing |
| `b1-relative-who-which` | `b1rw-` | who для людей, which для вещей, that универсальный, опускание в object-позиции |
| `b1-relative-where-whose` | `b1rx-` | where для мест, whose для принадлежности |

- [ ] **Step 1:** Написать 2 файла модулей (theory на каждый концепт).
- [ ] **Step 2:** Зарегистрировать в `src/content/index.ts`.
- [ ] **Step 3:** Самовычитка.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** `npm run build && npm run lint` → чисто.
- [ ] **Step 6: Commit**

```bash
git add src/content/
git commit -m "feat: B1 grammar content — verb patterns, relative clauses (4 concepts)"
```

---

### Task 11 (Wave 4a): контент B2 — conditionals III/mixed/wish, продвинутый пассив

**Files:**
- Create: `src/content/modules/b2-conditionals.ts`, `b2-passive.ts`
- Modify: `src/content/index.ts`

**Interfaces:** Produces модули `b2-conditionals`, `b2-passive` (level 'B2').

| Концепт | Префикс | Покрытие |
|---|---|---|
| `b2-third-conditional` | `b2tc-` | if + Past Perfect, would have + V3; упущенные возможности |
| `b2-mixed-conditional` | `b2mc-` | прошлое условие → настоящий результат (If I had studied, I would be…), и наоборот |
| `b2-wish` | `b2wi-` | wish + Past (о настоящем), wish + Past Perfect (сожаление), if only, wish + would (раздражение) |
| `b2-passive-advanced` | `b2pa-` | have/has been + V3, will be + V3, modal + be + V3, being + V3 |
| `b2-causative` | `b2cs-` | have/get something done (I had my hair cut), get + object + V3 |

- [ ] **Step 1:** Написать 2 файла модулей (theory на каждый концепт).
- [ ] **Step 2:** Зарегистрировать в `src/content/index.ts`.
- [ ] **Step 3:** Самовычитка.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** `npm run build && npm run lint` → чисто.
- [ ] **Step 6: Commit**

```bash
git add src/content/
git commit -m "feat: B2 grammar content — third/mixed conditionals, wish, advanced passive (5 concepts)"
```

---

### Task 12 (Wave 4b): контент B2 — косвенная речь, модальные в прошлом

**Files:**
- Create: `src/content/modules/b2-reported.ts`, `b2-past-modals.ts`
- Modify: `src/content/index.ts`

**Interfaces:** Produces модули `b2-reported`, `b2-past-modals` (level 'B2').

| Концепт | Префикс | Покрытие |
|---|---|---|
| `b2-reported-statements` | `b2rs-` | backshift времён, said vs told, смена местоимений и наречий (today → that day) |
| `b2-reported-questions` | `b2rq-` | asked if/whether, порядок слов (asked where I lived), asked/told + to-inf для просьб/приказов |
| `b2-deduction-past` | `b2dp-` | must have + V3 (уверен), can't have (не мог), might/could have (возможно) |
| `b2-should-have` | `b2sh-` | should have + V3 (упрёк/сожаление), shouldn't have, could have (упущенная возможность) |

- [ ] **Step 1:** Написать 2 файла модулей (theory на каждый концепт).
- [ ] **Step 2:** Зарегистрировать в `src/content/index.ts`.
- [ ] **Step 3:** Самовычитка.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** `npm run build && npm run lint` → чисто.
- [ ] **Step 6: Commit**

```bash
git add src/content/
git commit -m "feat: B2 grammar content — reported speech, past modals (4 concepts)"
```

---

### Task 13 (Wave 5): досыпка vocab-пулов

**Files:**
- Modify: `src/content/modules/vocab-a2.ts` (концепт `va2-daily`: добавить `va2-e7`…`va2-e13`)
- Modify: `src/content/modules/vocab-b1-work-phrasal.ts` (`vb1-work`: `vw-e8`…`vw-e14`; `vb1-phrasal`: `vp-e8`…`vp-e14`)

**Interfaces:** пулы vocab-концептов вырастают до 13–14; типы — прежний vocab-микс (match_pairs, choose_word, fill_gap, translate_ru_en, multi_gap, word_order); theory для vocab не требуется.

- [ ] **Step 1:** Дописать задания в оба файла (новые слова, не дублирующие существующие пары).
- [ ] **Step 2:** Самовычитка.
- [ ] **Step 3:** `npm test` → PASS.
- [ ] **Step 4:** `npm run build && npm run lint` → чисто.
- [ ] **Step 5: Commit**

```bash
git add src/content/
git commit -m "feat: top up vocab pools to 13-14 exercises per concept"
```

---

## Final check (после Task 13)

- [ ] `npm test && npm run build && npm run lint` — всё чисто.
- [ ] Ручная проверка в браузере (`npm run dev`): список отсортирован A1→B2, справка сворачивается, счёт `X / 50`, у vocab справки нет.
- [ ] Число заданий: `grep -c "conceptId: '" src/content/modules/*.ts` — суммарно ≥ 850.
