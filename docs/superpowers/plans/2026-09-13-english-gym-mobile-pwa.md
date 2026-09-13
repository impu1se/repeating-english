# English Gym Mobile (PWA для iPhone) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Превратить статический SPA «English Gym» в устанавливаемое на домашний экран iPhone приложение, которое работает офлайн, не ломается об экранную клавиатуру iOS и умеет выгружать и загружать прогресс.

**Architecture:** Существующий Vite-билд остаётся единственным артефактом. Сверху навешиваются четыре независимых слоя: манифест с иконками (установка), service worker через `vite-plugin-pwa` (офлайн), атрибуты ввода и тач-вёрстка (поведение на устройстве), резервная копия прогресса в JSON (сохранность). Движок, контент и логика проверки не трогаются вообще. Путь `base` выносится в переменную окружения, чтобы тот же `dist/` позже обернул Capacitor.

**Tech Stack:** React 18.3, TypeScript 5.5 (strict), Vite 5.3, Vitest 2.0 + @testing-library/react (jsdom), vite-plugin-pwa 1.3 + Workbox, @vite-pwa/assets-generator 1.0, GitHub Actions + GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-13-english-gym-mobile-pwa.md`

## Global Constraints

- Новых **runtime**-зависимостей нет. `package.json` в секции `dependencies` остаётся `react` + `react-dom`. Разрешённые новые **devDependencies**: `vite-plugin-pwa@^1.3.0`, `@vite-pwa/assets-generator@^1.0.4`. Версия генератора именно первая: `vite-plugin-pwa@1.3.0` объявляет его как peer `^1.0.0`, и npm 11 откажется ставить вторую с ошибкой разрешения зависимостей.
- После каждой задачи `npm test` и `npm run build` зелёные. Базовая линия на старте: 17 файлов, 98 тестов, сборка 492 КБ.
- TypeScript strict, `noUnusedLocals`, `noUnusedParameters` включены — мёртвый код не соберётся.
- Комментарии в коде и весь текст интерфейса — на русском, как в остальном проекте.
- Логику движка (`src/engine/*`), контент (`src/content/*`) и схему прогресса не менять. Исключение — извлечение `mergeConcepts` в задаче 7, поведение при этом не меняется.
- Хостинг: GitHub Pages, публичный репозиторий `impu1se/repeating-english`, проектный сайт по подпути `/repeating-english/`.
- Ориентацию экрана не блокировать: Safari игнорирует `orientation` в манифесте, поле в манифест не писать.
- Целевое устройство — личный iPhone автора, iOS 17+. Всё, что нельзя проверить в jsdom, проверяется руками по чеклисту задачи 8.

## File Structure

**Создаются:**
- `.github/workflows/deploy.yml` — сборка и публикация на GitHub Pages при пуше в `main`.
- `public/.nojekyll` — запрет Jekyll-обработки на Pages.
- `public/icon.svg` — исходник иконки, геометрическая гантеля, без текста и шрифтов.
- `pwa-assets.config.ts` — конфиг генератора растровых иконок.
- `src/store/backup.ts` — сериализация и разбор резервной копии прогресса. Чистые функции, без DOM.
- `src/store/backup.test.ts` — тесты формата копии.
- `src/components/ProgressBackup.tsx` — кнопки «Выгрузить» и «Загрузить» на главном экране.
- `src/components/ProgressBackup.test.tsx` — тесты выгрузки и загрузки.
- `src/components/exercises/iosInput.test.tsx` — тесты атрибутов ввода для iOS.

**Изменяются:**
- `vite.config.ts` — `base` из окружения, подключение `VitePWA`.
- `index.html` — мета-теги iOS, иконка, `viewport-fit`, `theme-color`.
- `src/main.tsx` — регистрация service worker.
- `tsconfig.json` — типы `vite-plugin-pwa/client`.
- `package.json` — devDependencies и скрипт генерации иконок.
- `src/components/exercises/TranslateRuEn.tsx:27` — атрибуты поля ввода.
- `src/components/exercises/MultiGap.tsx:56` — атрибуты полей ввода.
- `src/components/ModuleList.tsx` — блок резервной копии на корневом экране, обновление прогресса после импорта.
- `src/store/progress.ts` — извлечение `mergeConcepts`.
- `src/index.css` — переменные палитры, тёмная тема, тач-вёрстка, `safe-area`.

**Порядок задач и почему он такой:** сначала деплой (иначе проверять на телефоне нечего), затем установка на экран, затем офлайн, затем поведение ввода, затем вёрстка, затем тема, затем данные. Каждая задача оставляет приложение в рабочем состоянии.

---

### Task 1: Путь сборки и публикация на GitHub Pages

**Files:**
- Modify: `vite.config.ts:1-16`
- Create: `.github/workflows/deploy.yml`
- Create: `public/.nojekyll`

**Interfaces:**
- Consumes: ничего.
- Produces: переменная окружения `APP_BASE` управляет полем `base` в конфиге Vite. По умолчанию `/repeating-english/`. Задачи 2 и 3 полагаются на то, что `base` задан в одном месте и не хардкодится в HTML.

**Предусловие.** Рабочее дерево должно быть чистым. Сейчас в нём около 30 незакоммиченных файлов (контент-волна, 819 добавленных строк, тесты и сборка зелёные). Это чужая работа вне этого плана — закоммитить её отдельным коммитом до начала, не смешивая с задачами плана.

- [ ] **Step 1: Убедиться, что подпути сейчас нет**

Run: `npm run build && grep -o 'src="[^"]*"' dist/index.html`
Expected: `src="/assets/index-<hash>.js"` — ведущий слэш без имени репозитория. На GitHub Pages такой путь ведёт в корень домена и отдаёт 404.

- [ ] **Step 2: Вынести base в окружение**

Заменить содержимое `vite.config.ts` целиком:

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// GitHub Pages отдаёт проектный сайт по подпути /repeating-english/.
// Capacitor позже потребует корень, поэтому база задаётся окружением,
// а не хардкодом: APP_BASE=/ npm run build.
const base = process.env.APP_BASE ?? '/repeating-english/';

export default defineConfig({
  base,
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    environmentOptions: {
      jsdom: {
        url: 'http://localhost/',
      },
    },
  },
});
```

- [ ] **Step 3: Проверить, что подпуть появился**

Run: `npm run build && grep -o 'src="[^"]*"' dist/index.html`
Expected: `src="/repeating-english/assets/index-<hash>.js"`

Run: `env APP_BASE=/ npm run build && grep -o 'src="[^"]*"' dist/index.html`

Префикс `env` обязателен: оболочка здесь fish, и синтаксис `ПЕРЕМЕННАЯ=значение команда` в ней не работает.
Expected: `src="/assets/index-<hash>.js"` — путь для будущего Capacitor.

- [ ] **Step 4: Проверить, что тесты не сломались**

Run: `npm test`
Expected: 98 passed.

- [ ] **Step 5: Добавить файл, отключающий Jekyll**

```bash
mkdir -p public && touch public/.nojekyll
```

- [ ] **Step 6: Написать workflow публикации**

Создать `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 7: Закоммитить**

```bash
git add vite.config.ts .github/workflows/deploy.yml public/.nojekyll
git commit -m "build: env-driven base path and GitHub Pages workflow"
```

- [ ] **Step 8: Расширить права токена и создать репозиторий**

Эти команды меняют внешнее состояние и требуют подтверждения автора. Первая интерактивная — её запускает автор сам.

```bash
gh auth refresh -s workflow
gh repo create impu1se/repeating-english --public --source=. --remote=origin --push
gh api -X POST repos/impu1se/repeating-english/pages -f build_type=workflow
```

Без скоупа `workflow` пуш файла из `.github/workflows/` GitHub отклонит с текстом `refusing to allow an OAuth App to create or update workflow`.

- [ ] **Step 9: Дождаться публикации и открыть сайт**

Run: `gh run watch`
Expected: оба задания зелёные.

Run: `gh api repos/impu1se/repeating-english/pages --jq .html_url`
Expected: `https://impu1se.github.io/repeating-english/`

Открыть этот адрес в Safari на iPhone: список уровней рисуется, тренировка запускается. Иконки и офлайна пока нет — это задачи 2 и 3.

---

### Task 2: Иконка, манифест и установка на домашний экран

**Files:**
- Create: `public/icon.svg`
- Create: `pwa-assets.config.ts`
- Modify: `package.json` (devDependencies, скрипт `generate-pwa-assets`)
- Modify: `vite.config.ts` (плагин `VitePWA`, только манифест)
- Modify: `index.html:3-6` (мета-теги и ссылка на иконку)

**Interfaces:**
- Consumes: `base` из задачи 1 — `vite-plugin-pwa` выводит из него `start_url` и `scope` манифеста сам, вручную их не задавать.
- Produces: в `dist/` появляются `manifest.webmanifest`, `pwa-192x192.png`, `pwa-512x512.png`, `maskable-icon-512x512.png`, `apple-touch-icon-180x180.png`, `favicon.ico`. Задача 3 достраивает в тот же плагин service worker.

- [ ] **Step 1: Поставить зависимости**

```bash
npm install -D vite-plugin-pwa@^1.3.0 @vite-pwa/assets-generator@^1.0.4
```

Expected: установка проходит без ошибки `ERESOLVE`. Если она всё же возникла — проверить `npm view vite-plugin-pwa@1.3.0 peerDependencies`: генератор должен попадать в объявленный там диапазон.

- [ ] **Step 2: Нарисовать исходник иконки**

Создать `public/icon.svg`. Гантеля собрана из прямоугольников: никакого текста, поэтому растеризация не зависит от установленных шрифтов. Все элементы лежат в пределах 96–416 из 512, то есть внутри безопасной зоны маскируемой иконки (центральные 80%).

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="#4356d6"/>
  <g fill="#ffffff">
    <rect x="176" y="236" width="160" height="40" rx="20"/>
    <rect x="136" y="196" width="48" height="120" rx="16"/>
    <rect x="328" y="196" width="48" height="120" rx="16"/>
    <rect x="96" y="216" width="40" height="80" rx="14"/>
    <rect x="376" y="216" width="40" height="80" rx="14"/>
  </g>
</svg>
```

- [ ] **Step 3: Настроить генератор растровых иконок**

Создать `pwa-assets.config.ts`:

```ts
import { defineConfig } from '@vite-pwa/assets-generator/config';

// Генератор кладёт результат рядом с исходником, то есть в public/,
// откуда Vite копирует файлы в dist/ как есть.
//
// Готовый minimal2023Preset здесь не годится: он вписывает картинку в белый
// квадрат с отступом, и синяя иконка превратилась бы в мелкую плитку на белом
// поле. Отступ обнулён, подложка совпадает с фоном самого SVG.
export default defineConfig({
  headLinkOptions: { preset: '2023' },
  preset: {
    transparent: {
      sizes: [64, 192, 512],
      favicons: [[48, 'favicon.ico']],
      padding: 0,
    },
    maskable: {
      sizes: [512],
      padding: 0,
      resizeOptions: { background: '#4356d6' },
    },
    apple: {
      sizes: [180],
      padding: 0,
      resizeOptions: { background: '#4356d6' },
    },
  },
  images: ['public/icon.svg'],
});
```

Добавить `pwa-assets.config.ts` в `include` файла `tsconfig.node.json`, чтобы редактор видел типы конфига:

```json
  "include": ["vite.config.ts", "pwa-assets.config.ts"]
```

Добавить в `package.json` в `scripts`:

```json
"generate-pwa-assets": "pwa-assets-generator"
```

- [ ] **Step 4: Сгенерировать иконки и убедиться, что они не пустые**

Run: `npm run generate-pwa-assets && ls -l public/*.png public/favicon.ico`
Expected: шесть файлов — `pwa-64x64.png`, `pwa-192x192.png`, `pwa-512x512.png`, `maskable-icon-512x512.png`, `apple-touch-icon-180x180.png`, `favicon.ico`. Каждый весит больше двух килобайт. Пустой или однобайтовый файл означает, что растеризация провалилась.

Открыть глазами `public/pwa-512x512.png` и, отдельно, `public/apple-touch-icon-180x180.png`: белая гантеля на синем фоне во весь квадрат. Белая рамка вокруг синего квадрата на apple-иконке означает, что пресет из шага 3 не применился — именно её этот пресет и убирает.

- [ ] **Step 5: Подключить манифест**

В `vite.config.ts` добавить импорт и плагин. Service worker на этом шаге не регистрируется — `injectRegister: false`.

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const base = process.env.APP_BASE ?? '/repeating-english/';

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      injectRegister: false,
      devOptions: { enabled: false },
      // start_url и scope плагин выводит из base — руками не задаём,
      // иначе они разойдутся при сборке под Capacitor.
      // orientation не пишем: Safari его игнорирует для веб-приложений.
      manifest: {
        name: 'English Gym',
        short_name: 'English Gym',
        description: 'Тренажёр английского: повторение концептов до освоения',
        lang: 'ru',
        display: 'standalone',
        background_color: '#fafafa',
        theme_color: '#6b7cff',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    environmentOptions: {
      jsdom: {
        url: 'http://localhost/',
      },
    },
  },
});
```

- [ ] **Step 6: Добавить мета-теги iOS**

`vite-plugin-pwa` не ставит `apple-touch-icon` сам — iOS читает именно этот тег, без него на домашнем экране окажется скриншот страницы. Пути пишутся относительными, без ведущего слэша, чтобы работать и на подпути Pages, и в корне под Capacitor.

Заменить `<head>` в `index.html`:

```html
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#fafafa" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-title" content="English Gym" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon-180x180.png" />
    <link rel="icon" href="favicon.ico" sizes="48x48" />
    <link rel="icon" type="image/svg+xml" href="icon.svg" />
    <title>English Gym</title>
  </head>
```

- [ ] **Step 7: Проверить сборку**

Run: `npm run build && cat dist/manifest.webmanifest`
Expected: JSON содержит `"name": "English Gym"`, `"display": "standalone"`, `"start_url": "/repeating-english/"` и три иконки.

Run: `grep -o 'apple-touch-icon[^>]*' dist/index.html && ls dist/apple-touch-icon-180x180.png`
Expected: тег на месте, файл в сборке есть. Если Vite ругнулся на относительный путь — заменить `href` на `/apple-touch-icon-180x180.png`: абсолютные пути из `public/` Vite сам переписывает с учётом `base`, так что под Capacitor это тоже сработает.

Run: `npm test`
Expected: 98 passed.

- [ ] **Step 8: Закоммитить**

```bash
git add public pwa-assets.config.ts vite.config.ts index.html package.json package-lock.json
git commit -m "feat: web app manifest and iOS home screen icons"
git push
```

- [ ] **Step 9: Проверить на телефоне**

Дождаться зелёного `gh run watch`, открыть `https://impu1se.github.io/repeating-english/` в Safari на iPhone, «Поделиться» → «На экран «Домой»».
Expected: в диалоге показана гантеля, а не миниатюра страницы; имя подставлено «English Gym»; запуск с иконки идёт без адресной строки Safari.

---

### Task 3: Офлайн через service worker

**Files:**
- Modify: `vite.config.ts` (опции `registerType` и `workbox` у `VitePWA`)
- Modify: `src/main.tsx:1-10`
- Modify: `tsconfig.json:20` (массив `types`)

**Interfaces:**
- Consumes: плагин `VitePWA`, подключённый в задаче 2.
- Produces: `dist/sw.js`; в приложении вызывается `registerSW` из виртуального модуля `virtual:pwa-register` (отдельного `registerSW.js` при `injectRegister: null` не будет). Дальнейшие задачи на это не опираются.

**Почему `registerType: 'prompt'`, а не `'autoUpdate'`.** Вариант `autoUpdate` вшивает `skipWaiting` и перезагружает открытые вкладки сразу, то есть может оборвать тренировку на середине. Решение спеки — «молча, при следующем холодном запуске»: именно это даёт `'prompt'` без UI-баннера. Новый воркер ждёт, пока все окна приложения закрыты, и активируется на следующем запуске. Побочный эффект: свежая версия иногда видна только со второго запуска.

- [ ] **Step 1: Разрешить типы виртуального модуля**

В `tsconfig.json` заменить строку с `types`:

```json
"types": ["vitest/globals", "@testing-library/jest-dom", "vite-plugin-pwa/client"]
```

- [ ] **Step 2: Убедиться, что без типов сборка падает, а с ними — нет**

Сначала добавить регистрацию в `src/main.tsx`:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import './index.css';

// registerType: 'prompt' без баннера: новый воркер ждёт полного закрытия
// приложения и встаёт на следующем холодном запуске, не обрывая тренировку.
registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

Run: `npm run build`
Expected: PASS. Если TypeScript ругается `Cannot find module 'virtual:pwa-register'` — не применён шаг 1.

- [ ] **Step 3: Настроить Workbox**

В `vite.config.ts` в объект опций `VitePWA` добавить две секции рядом с `manifest` и заменить `injectRegister: false` на `injectRegister: null` — регистрация теперь своя, через `virtual:pwa-register`:

```ts
      registerType: 'prompt',
      injectRegister: null,
      workbox: {
        // Весь контент лежит в одном JS-бандле, поэтому офлайн = precache всего.
        globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest}'],
        // Дефолтный лимит Workbox — 2 МиБ; бандл растёт вместе с контентом.
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
      },
```

- [ ] **Step 4: Проверить, что в precache попал весь бандл**

Run: `npm run build && grep -c 'revision' dist/sw.js`
Expected: непустое число.

Run: `node -e "const s=require('fs').readFileSync('dist/sw.js','utf8'); for (const n of ['index','.css','manifest.webmanifest','pwa-512x512.png']) console.log(n, s.includes(n));"`
Expected: все четыре строки заканчиваются на `true`.

- [ ] **Step 5: Проверить офлайн локально**

Run: `npm run preview`
Открыть выданный адрес (он уже включает `/repeating-english/`) в Chrome, дождаться загрузки, затем в DevTools на вкладке Network включить Offline и перезагрузить страницу.
Expected: приложение поднимается, список уровней на месте, тренировка запускается, задания приходят.

- [ ] **Step 6: Проверить тесты**

Run: `npm test`
Expected: 98 passed. `src/main.tsx` тестами не импортируется, виртуальный модуль в jsdom не резолвится и не должен.

- [ ] **Step 7: Закоммитить**

```bash
git add vite.config.ts src/main.tsx tsconfig.json
git commit -m "feat: offline support via precaching service worker"
git push
```

- [ ] **Step 8: Проверить на телефоне**

После зелёного деплоя открыть приложение с иконки, дать ему загрузиться, включить авиарежим и запустить тренировку.
Expected: приложение работает целиком. Если нет — снести иконку, открыть адрес в Safari заново и переустановить: старая установка могла остаться без воркера.

---

### Task 4: Ввод, устойчивый к автокоррекции iOS

**Files:**
- Create: `src/components/exercises/iosInput.test.tsx`
- Modify: `src/components/exercises/TranslateRuEn.tsx:27-33`
- Modify: `src/components/exercises/MultiGap.tsx:56-62`

**Interfaces:**
- Consumes: `ExerciseProps` из `src/components/exercises/index.tsx` — `{ exercise: Exercise; onResult: (correct: boolean) => void }`.
- Produces: у всех текстовых полей приложения атрибуты `autocapitalize="none"`, `autocorrect="off"`, `autocomplete="off"`, `spellcheck="false"`, `enterkeyhint="go"`. Задача 5 опирается на то, что разметку полей больше менять не нужно, только стили.

**Охват.** Полей ровно два: `TranslateRuEn` (его переиспользуют `fill_gap` и `verb_form` — см. комментарий в `VerbForm.tsx:4`) и `MultiGap`. Больше `<input>` в проекте нет.

- [ ] **Step 1: Написать падающий тест**

Создать `src/components/exercises/iosInput.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TranslateRuEn } from './TranslateRuEn';
import { MultiGap } from './MultiGap';
import type { Exercise } from '../../types';

const translate: Exercise = {
  id: 't1',
  conceptId: 'c1',
  type: 'translate_ru_en',
  prompt: 'Я ещё не ел.',
  points: 2,
  accepted: ["I haven't eaten yet"],
};

const multi: Exercise = {
  id: 'm1',
  conceptId: 'c1',
  type: 'multi_gap',
  prompt: 'I ___ already ___ .',
  points: 1,
  gaps: [{ accepted: ['have'] }, { accepted: ['eaten'] }],
};

// iOS сам дописывает апостроф в dont и поднимает первую букву. Для тренажёра,
// который проверяет сокращения и орфографию, это тихая подмена ответа.
function expectIosSafe(input: HTMLElement) {
  expect(input).toHaveAttribute('autocapitalize', 'none');
  expect(input).toHaveAttribute('autocorrect', 'off');
  expect(input).toHaveAttribute('autocomplete', 'off');
  expect(input).toHaveAttribute('spellcheck', 'false');
  expect(input).toHaveAttribute('enterkeyhint', 'go');
}

describe('текстовые поля не отдают ответ автокоррекции iOS', () => {
  it('поле перевода', () => {
    render(<TranslateRuEn exercise={translate} onResult={() => {}} />);
    expectIosSafe(screen.getByLabelText('answer'));
  });

  it('каждое поле мультипропуска', () => {
    render(<MultiGap exercise={multi} onResult={() => {}} />);
    expectIosSafe(screen.getByLabelText('gap-0'));
    expectIosSafe(screen.getByLabelText('gap-1'));
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npx vitest run src/components/exercises/iosInput.test.tsx`
Expected: FAIL, оба теста, сообщение вида `expected element to have attribute autocapitalize="none"`.

- [ ] **Step 3: Починить поле перевода**

В `src/components/exercises/TranslateRuEn.tsx` заменить элемент `<input>`:

```tsx
        <input
          aria-label="answer"
          value={answer}
          disabled={verdict !== null}
          autoFocus
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="go"
          onChange={(e) => setAnswer(e.target.value)}
        />
```

- [ ] **Step 4: Починить поля мультипропуска**

В `src/components/exercises/MultiGap.tsx` заменить элемент `<input>` внутри `gaps.map`:

```tsx
          <input
            key={i}
            aria-label={`gap-${i}`}
            value={values[i]}
            disabled={phase.kind !== 'input'}
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            enterKeyHint="go"
            onChange={(e) => setAt(i, e.target.value)}
          />
```

- [ ] **Step 5: Убедиться, что тест проходит**

Run: `npx vitest run src/components/exercises/iosInput.test.tsx`
Expected: 2 passed.

Run: `npm test && npm run build`
Expected: 100 passed, сборка чистая.

- [ ] **Step 6: Закоммитить**

```bash
git add src/components/exercises/iosInput.test.tsx src/components/exercises/TranslateRuEn.tsx src/components/exercises/MultiGap.tsx
git commit -m "fix: disable iOS autocorrect on answer inputs"
git push
```

---

### Task 5: Тач-вёрстка и безопасные зоны

**Files:**
- Modify: `index.html:4` и `index.html:9` (viewport и стиль строки состояния)
- Modify: `src/index.css` (блоки `#root`, `button`, `input`, `.columns`, правила наведения)

**Interfaces:**
- Consumes: разметку полей из задачи 4 — менять её не требуется.
- Produces: класс `.sr-only` для визуально скрытых элементов управления; задача 7 использует его для файлового поля.

**Чего здесь намеренно нет.** Липкой кнопки над клавиатурой. На iOS `position: fixed` не отслеживает экранную клавиатуру, и такая кнопка уезжает под неё. Вместо этого кнопка стоит в потоке сразу под полем, а отправка с клавиатуры обеспечена `enterKeyHint="go"` из задачи 4.

- [ ] **Step 1: Разрешить контенту заходить под вырез**

В `index.html` заменить две строки:

```html
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
```

```html
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```

- [ ] **Step 2: Добавить отступы безопасных зон**

В `src/index.css` заменить блок `#root`:

```css
#root {
  max-width: 40rem;
  margin: 0 auto;
  padding:
    calc(1.5rem + env(safe-area-inset-top))
    calc(1.25rem + env(safe-area-inset-right))
    calc(4rem + env(safe-area-inset-bottom))
    calc(1.25rem + env(safe-area-inset-left));
}
```

Без этого при `viewport-fit=cover` заголовок уезжает под «чёлку», а нижняя кнопка — под системную полосу.

- [ ] **Step 3: Запретить масштабирование текста и подсветку тапа**

В `src/index.css` после блока `* { box-sizing: border-box; }` добавить:

```css
html {
  /* iOS в альбомной ориентации самовольно увеличивает шрифт */
  -webkit-text-size-adjust: 100%;
}
```

и в блок `body` добавить две строки:

```css
  -webkit-tap-highlight-color: transparent;
  overscroll-behavior-y: contain;
```

- [ ] **Step 4: Сделать тап-цели крупными**

В `src/index.css` в блок `button` добавить:

```css
  min-height: 2.75rem; /* 44 px — минимальная тап-цель Apple HIG */
  max-width: 100%;
  touch-action: manipulation; /* снимает задержку двойного тапа */
```

и в блок `input` заменить `min-width: 14rem;` на:

```css
  min-width: 0;
  width: 100%;
  max-width: 22rem;
  min-height: 2.75rem;
  touch-action: manipulation;
```

Поля мультипропуска при этом встают в столбик — на экране шириной 390 пикселей это единственный читаемый вариант.

- [ ] **Step 5: Убрать залипающее наведение**

В `src/index.css` обернуть оба правила наведения в запрос о наличии мыши. Заменить блоки `button:hover:not(:disabled)` и `button.next:hover:not(:disabled), button[type='submit']:hover:not(:disabled)` на:

```css
/* На тач-экране :hover залипает после тапа: кнопка остаётся подсвеченной,
   пока не тронешь другую. Наведение существует только там, где есть мышь. */
@media (hover: hover) {
  button:hover:not(:disabled) {
    border-color: #6b7cff;
    background: #f2f4ff;
  }

  button.next:hover:not(:disabled),
  button[type='submit']:hover:not(:disabled) {
    background: #5566ee;
  }
}
```

- [ ] **Step 6: Починить колонки сопоставления пар**

В `src/index.css` заменить блоки `.columns` и `.columns > div`:

```css
.columns {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
}

.columns > div {
  display: flex;
  flex: 1 1 8rem;
  min-width: 0;
  flex-direction: column;
  align-items: stretch;
}
```

Без `min-width: 0` длинные варианты в `match_pairs` распирают колонку и страница едет вбок.

- [ ] **Step 7: Добавить класс визуально скрытого элемента**

В конец `src/index.css` добавить:

```css
/* Элемент остаётся в дереве доступности и кликабелен через <label>,
   но не занимает места. Используется файловым полем импорта прогресса. */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  min-height: 0; /* перебивает тап-цель 44 px из общего правила input */
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
```

- [ ] **Step 8: Проверить в эмуляции узкого экрана**

Run: `npm run build && npm run preview`
Открыть адрес в Chrome, включить эмуляцию устройства iPhone 14 Pro (390×844).
Expected: горизонтальной прокрутки нет ни на одном экране; проверить список уровней, список модулей, `translate_ru_en`, `multi_gap`, `match_pairs`, `word_order`. Повторить в альбомной ориентации 844×390 — вёрстка не ломается, только становится шире.

- [ ] **Step 9: Проверить тесты и закоммитить**

Run: `npm test && npm run build`
Expected: 100 passed, сборка чистая.

```bash
git add index.html src/index.css
git commit -m "feat: touch layout, safe-area insets and 44px tap targets"
git push
```

---

### Task 6: Тёмная тема по системной настройке

**Files:**
- Modify: `src/index.css` (файл заменяется целиком)
- Modify: `index.html` (парные теги `theme-color`)

**Interfaces:**
- Consumes: результат задачи 5 — безопасные зоны, тап-цели, `.sr-only`, колонки. Приведённый ниже файл уже включает их, менять их повторно не нужно.
- Produces: набор переменных палитры на `:root`. Задача 7 использует `--border-soft` и `--muted` для блока резервной копии.

**Почему без переключателя.** Системной настройки достаточно, а переключатель требует хранить выбор, добавляет экран настроек и третье состояние «как в системе».

- [ ] **Step 1: Заменить `src/index.css` целиком**

```css
:root {
  color-scheme: light dark;

  --bg: #fafafa;
  --surface: #ffffff;
  --text: #1f2430;
  --muted: #666677;
  --border: #c3c8d4;
  --border-soft: #dfe3ec;
  --accent: #6b7cff;
  --accent-strong: #5566ee;
  --accent-soft: #f2f4ff;
  --accent-pressed: #e4e9ff;
  --on-accent: #ffffff;
  --track: #e4e7f0;
  --chevron: #99a0aa;
  --banner-bg: #fff7d6;
  --banner-border: #e0b400;
  --err: #c0392b;
  --ok: #1e8e4e;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #12141a;
    --surface: #1b1e26;
    --text: #e7e9f0;
    --muted: #9aa1b5;
    --border: #333a4b;
    --border-soft: #262b38;
    --accent: #8b98ff;
    --accent-strong: #a3adff;
    --accent-soft: #232a44;
    --accent-pressed: #2c3558;
    --on-accent: #12141a;
    --track: #262b38;
    --chevron: #6b7385;
    --banner-bg: #3a3417;
    --banner-border: #8a7412;
    --err: #ff8a7a;
    --ok: #5fd18d;
  }
}

* {
  box-sizing: border-box;
}

html {
  /* iOS в альбомной ориентации самовольно увеличивает шрифт */
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.55;
  color: var(--text);
  background: var(--bg);
  -webkit-tap-highlight-color: transparent;
  overscroll-behavior-y: contain;
}

#root {
  max-width: 40rem;
  margin: 0 auto;
  padding:
    calc(1.5rem + env(safe-area-inset-top))
    calc(1.25rem + env(safe-area-inset-right))
    calc(4rem + env(safe-area-inset-bottom))
    calc(1.25rem + env(safe-area-inset-left));
}

h1,
h2 {
  line-height: 1.2;
}

header nav {
  margin-bottom: 0.5rem;
}

.score,
.subtitle {
  color: var(--muted);
}

.subtitle {
  margin-top: -0.5rem;
}

.level-header {
  margin: 1.6rem 0 0.4rem;
  padding-bottom: 0.25rem;
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  border-bottom: 1px solid var(--border-soft);
}

.prompt {
  font-size: 1.15rem;
}

.built {
  min-height: 1.6em;
  padding: 0.35rem 0.6rem;
  border: 1px dashed var(--border);
  border-radius: 0.5rem;
  background: var(--surface);
}

button {
  font: inherit;
  padding: 0.45rem 0.95rem;
  margin: 0.15rem 0.3rem 0.15rem 0;
  border: 1px solid var(--border);
  border-radius: 0.55rem;
  background: var(--surface);
  color: inherit;
  cursor: pointer;
  min-height: 2.75rem; /* 44 px — минимальная тап-цель Apple HIG */
  max-width: 100%;
  touch-action: manipulation; /* снимает задержку двойного тапа */
}

button:disabled {
  opacity: 0.45;
  cursor: default;
}

button[aria-pressed='true'] {
  border-color: var(--accent);
  background: var(--accent-pressed);
}

button.next,
button[type='submit'] {
  border-color: var(--accent);
  background: var(--accent);
  color: var(--on-accent);
}

/* На тач-экране :hover залипает после тапа: кнопка остаётся подсвеченной,
   пока не тронешь другую. Наведение существует только там, где есть мышь. */
@media (hover: hover) {
  button:hover:not(:disabled) {
    border-color: var(--accent);
    background: var(--accent-soft);
  }

  button.next:hover:not(:disabled),
  button[type='submit']:hover:not(:disabled) {
    background: var(--accent-strong);
  }
}

input {
  font: inherit;
  padding: 0.45rem 0.65rem;
  margin: 0.15rem 0.5rem 0.15rem 0;
  border: 1px solid var(--border);
  border-radius: 0.55rem;
  background: var(--surface);
  color: inherit;
  min-width: 0;
  width: 100%;
  max-width: 22rem;
  min-height: 2.75rem;
  touch-action: manipulation;
}

input:focus {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}

ul.modules {
  list-style: none;
  padding: 0;
}

ul.modules li {
  margin: 0.4rem 0;
}

ul.modules button {
  width: 100%;
  text-align: left;
  padding: 0.8rem 1rem;
}

ul.levels button::after {
  content: '›';
  float: right;
  color: var(--chevron);
}

.columns {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
}

.columns > div {
  display: flex;
  flex: 1 1 8rem;
  min-width: 0;
  flex-direction: column;
  align-items: stretch;
}

.gap-feedback {
  list-style: none;
  padding: 0;
}

[role='status'] {
  margin: 0.7rem 0;
}

[data-status='extra'] {
  color: var(--err);
  text-decoration: line-through;
}

[data-status='missing'] {
  color: var(--ok);
  text-decoration: underline;
}

.banner {
  padding: 0.6rem 0.9rem;
  border: 1px solid var(--banner-border);
  border-radius: 0.55rem;
  background: var(--banner-bg);
}

details.theory {
  margin: 0.5rem 0;
}

details.theory summary {
  cursor: pointer;
  color: var(--accent-strong);
}

details.theory p {
  white-space: pre-line;
  margin: 0.5rem 0 0.25rem;
  padding: 0.6rem 0.8rem;
  border-left: 3px solid var(--border);
  background: var(--surface);
}

.module-score {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0.2rem 0 0.1rem;
  font-weight: 600;
}

.bar {
  flex: 1;
  height: 0.5rem;
  border-radius: 0.25rem;
  background: var(--track);
  overflow: hidden;
}

.bar-fill {
  display: block;
  height: 100%;
  border-radius: 0.25rem;
  background: var(--accent);
  transition: width 0.25s ease;
}

ul.modules .bar {
  display: block;
  margin-top: 0.4rem;
  height: 0.35rem;
}

/* Элемент остаётся в дереве доступности и кликабелен программно,
   но не занимает места. Используется файловым полем импорта прогресса. */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  min-height: 0; /* перебивает тап-цель 44 px из общего правила input */
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
```

- [ ] **Step 2: Развести цвет системной строки по темам**

В `index.html` заменить одиночный тег `theme-color` парой:

```html
    <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fafafa" />
    <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#12141a" />
```

Поле `theme_color` в манифесте оставить как есть: манифест не умеет двух значений, оно используется только в системных списках.

- [ ] **Step 3: Убедиться, что ни один цвет не остался захардкоженным**

Run: `grep -nE '#[0-9a-fA-F]{3,6}' src/index.css | grep -vE '^[0-9]+:[[:space:]]+--'`
Expected: пустой вывод. Любая выведенная строка — цвет, который забыли заменить на переменную. Класс символов `[[:space:]]` вместо `\s` обязателен: grep в macOS его не понимает.

- [ ] **Step 4: Посмотреть обе темы**

Run: `npm run build && npm run preview`
Переключить оформление macOS: Системные настройки → Оформление → Тёмное, и обратно.
Expected: читаются оба варианта. Отдельно проверить экран разбора ошибки в `translate_ru_en`: зачёркнутое лишнее слово и подчёркнутое пропущенное должны различаться на тёмном фоне.

- [ ] **Step 5: Проверить тесты и закоммитить**

Run: `npm test && npm run build`
Expected: 100 passed, сборка чистая.

```bash
git add src/index.css index.html
git commit -m "feat: dark theme driven by system appearance"
git push
```

---

### Task 7: Выгрузка и загрузка прогресса

**Files:**
- Modify: `src/store/progress.ts:26-53` (извлечение `mergeConcepts`)
- Create: `src/store/backup.ts`
- Create: `src/store/backup.test.ts`
- Create: `src/components/ProgressBackup.tsx`
- Create: `src/components/ProgressBackup.test.tsx`
- Modify: `src/components/ModuleList.tsx:1-43`
- Modify: `src/components/ModuleList.test.tsx:14-20`
- Modify: `src/index.css` (блок `.backup`)

**Interfaces:**
- Consumes: `ProgressState` и `saveProgress` из `src/store/progress.ts`, `ConceptProgress` из `src/engine/scoring.ts`, `Content` из `src/types.ts`.
- Produces:
  - `mergeConcepts(content: Content, incoming: Record<string, ConceptProgress>): ProgressState` — экспортируется из `src/store/progress.ts`.
  - `serializeProgress(state: ProgressState, now?: Date): string`
  - `parseBackup(raw: string, content: Content): { ok: true; state: ProgressState; restored: number } | { ok: false; error: string }`
  - `backupFileName(now?: Date): string`
  - `<ProgressBackup onImported={() => void} />`

**Почему выгрузка не ссылкой.** В установленном на домашний экран приложении на iOS `<a download>` работает непредсказуемо: файл либо не сохраняется, либо открывается в новом окне поверх приложения. Системное «Поделиться» с файлом — штатный путь, буфер обмена — запасной.

- [ ] **Step 1: Написать падающий тест формата копии**

Создать `src/store/backup.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { content } from '../content';
import { loadProgress } from './progress';
import { serializeProgress, parseBackup, backupFileName } from './backup';

function stateWithScore(conceptId: string, score: number) {
  const state = loadProgress(content);
  state.concepts[conceptId] = { ...state.concepts[conceptId], score };
  return state;
}

describe('резервная копия прогресса', () => {
  it('переживает круг выгрузка → загрузка', () => {
    const id = content.concepts[0].id;
    const json = serializeProgress(stateWithScore(id, 7));

    const result = parseBackup(json, content);

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.state.concepts[id].score).toBe(7);
    expect(result.restored).toBe(content.concepts.length);
  });

  it('кладёт в файл версию формата и дату', () => {
    const parsed = JSON.parse(serializeProgress(loadProgress(content), new Date('2026-09-13T10:00:00Z')));
    expect(parsed.app).toBe('english-gym');
    expect(parsed.format).toBe(1);
    expect(parsed.exportedAt).toBe('2026-09-13T10:00:00.000Z');
  });

  it('выбрасывает концепты, которых больше нет в контенте', () => {
    const json = JSON.stringify({
      app: 'english-gym',
      format: 1,
      exportedAt: '2026-09-13T10:00:00.000Z',
      contentVersion: content.version,
      concepts: { 'ушедший-концепт': { score: 99, mastered: true, attempts: 3 } },
    });

    const result = parseBackup(json, content);

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.state.concepts['ушедший-концепт']).toBeUndefined();
    expect(result.restored).toBe(0);
  });

  it('пересчитывает освоенность по текущему порогу модуля', () => {
    const module = content.modules[0];
    const id = module.conceptIds[0];
    const json = JSON.stringify({
      app: 'english-gym',
      format: 1,
      exportedAt: '2026-09-13T10:00:00.000Z',
      contentVersion: content.version,
      concepts: { [id]: { score: module.masteryThreshold, mastered: false, attempts: 1 } },
    });

    const result = parseBackup(json, content);

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.state.concepts[id].mastered).toBe(true);
  });

  it('объясняет, что файл не тот', () => {
    expect(parseBackup('не json вовсе', content)).toEqual({ ok: false, error: 'Файл не похож на JSON' });
    expect(parseBackup('{"hello":1}', content)).toEqual({
      ok: false,
      error: 'Файл не похож на выгрузку прогресса',
    });
    expect(parseBackup('{"app":"english-gym","format":99,"concepts":{}}', content)).toEqual({
      ok: false,
      error: 'Файл сделан более новой версией приложения',
    });
  });

  it('называет файл по дате', () => {
    expect(backupFileName(new Date('2026-09-13T10:00:00Z'))).toBe('english-gym-progress-2026-09-13.json');
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npx vitest run src/store/backup.test.ts`
Expected: FAIL, `Failed to resolve import "./backup"`.

- [ ] **Step 3: Извлечь слияние концептов из loadProgress**

В `src/store/progress.ts` добавить экспортируемую функцию и переписать через неё `loadProgress`. Поведение не меняется: это ровно тот код, что уже стоял внутри.

```ts
// Накладывает чужой набор концептов на текущий контент: неизвестные концепты
// отбрасываются, новые остаются нулевыми, освоенность пересчитывается по
// актуальному порогу модуля (порог мог снизиться с прошлого запуска).
export function mergeConcepts(
  content: Content,
  incoming: Record<string, ConceptProgress>,
): ProgressState {
  const merged = freshState(content);
  const thresholds = thresholdByConcept(content);
  for (const id of Object.keys(merged.concepts)) {
    const src = incoming[id];
    if (!src) continue;
    const restored = { ...emptyConceptProgress(), ...src };
    const threshold = thresholds.get(id);
    if (threshold !== undefined && restored.score >= threshold) restored.mastered = true;
    merged.concepts[id] = restored;
  }
  return merged;
}

export function loadProgress(content: Content): ProgressState {
  const raw = localStorage.getItem(KEY);
  if (!raw) return freshState(content);
  try {
    const parsed = JSON.parse(raw) as ProgressState;
    if (parsed.contentVersion !== content.version) return freshState(content);
    return mergeConcepts(content, parsed.concepts);
  } catch {
    return freshState(content);
  }
}
```

- [ ] **Step 4: Написать модуль резервной копии**

Создать `src/store/backup.ts`:

```ts
import type { Content } from '../types';
import type { ConceptProgress } from '../engine/scoring';
import { mergeConcepts, type ProgressState } from './progress';

// Версия формата файла, а не версия контента. Растёт, когда в файл добавится
// что-то несовместимое — например, несколько профилей из бэклога v3.
export const BACKUP_FORMAT = 1;

export interface ProgressBackupFile {
  app: 'english-gym';
  format: number;
  exportedAt: string;
  contentVersion: string;
  concepts: Record<string, ConceptProgress>;
}

export type ParseResult =
  | { ok: true; state: ProgressState; restored: number }
  | { ok: false; error: string };

export function serializeProgress(state: ProgressState, now: Date = new Date()): string {
  const file: ProgressBackupFile = {
    app: 'english-gym',
    format: BACKUP_FORMAT,
    exportedAt: now.toISOString(),
    contentVersion: state.contentVersion,
    concepts: state.concepts,
  };
  return JSON.stringify(file, null, 2);
}

export function backupFileName(now: Date = new Date()): string {
  return `english-gym-progress-${now.toISOString().slice(0, 10)}.json`;
}

// Копия с другой версией контента не отвергается: сливаем по id концептов,
// как это уже делает загрузка из localStorage.
export function parseBackup(raw: string, content: Content): ParseResult {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return { ok: false, error: 'Файл не похож на JSON' };
  }
  if (typeof data !== 'object' || data === null) {
    return { ok: false, error: 'Файл не похож на выгрузку прогресса' };
  }
  const file = data as Partial<ProgressBackupFile>;
  if (file.app !== 'english-gym') {
    return { ok: false, error: 'Файл не похож на выгрузку прогресса' };
  }
  if (typeof file.format !== 'number' || file.format > BACKUP_FORMAT) {
    return { ok: false, error: 'Файл сделан более новой версией приложения' };
  }
  if (typeof file.concepts !== 'object' || file.concepts === null) {
    return { ok: false, error: 'В файле нет прогресса' };
  }
  const incoming = file.concepts as Record<string, ConceptProgress>;
  const state = mergeConcepts(content, incoming);
  const restored = Object.keys(state.concepts).filter((id) => incoming[id] !== undefined).length;
  return { ok: true, state, restored };
}
```

- [ ] **Step 5: Убедиться, что тесты проходят**

Run: `npx vitest run src/store/backup.test.ts src/store/progress.test.ts`
Expected: все зелёные. Тесты `progress.test.ts` не должны были измениться — если упали, `mergeConcepts` извлечён неверно.

- [ ] **Step 6: Написать падающий тест интерфейса**

Создать `src/components/ProgressBackup.test.tsx`:

```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProgressBackup } from './ProgressBackup';
import { content } from '../content';
import { loadProgress } from '../store/progress';
import { serializeProgress } from '../store/backup';

beforeEach(() => localStorage.clear());

function fileWithScore(conceptId: string, score: number): File {
  const state = loadProgress(content);
  state.concepts[conceptId] = { ...state.concepts[conceptId], score };
  return new File([serializeProgress(state)], 'progress.json', { type: 'application/json' });
}

describe('ProgressBackup', () => {
  it('загружает файл и сохраняет прогресс', async () => {
    const id = content.concepts[0].id;
    const onImported = vi.fn();
    render(<ProgressBackup onImported={onImported} />);

    await userEvent.upload(screen.getByLabelText('файл прогресса'), fileWithScore(id, 7));

    expect(await screen.findByRole('status')).toHaveTextContent(/Восстановлено концептов/);
    expect(loadProgress(content).concepts[id].score).toBe(7);
    expect(onImported).toHaveBeenCalled();
  });

  it('объясняет, что файл не тот', async () => {
    render(<ProgressBackup onImported={() => {}} />);
    const junk = new File(['{"hello":1}'], 'progress.json', { type: 'application/json' });

    await userEvent.upload(screen.getByLabelText('файл прогресса'), junk);

    expect(await screen.findByRole('status')).toHaveTextContent('Файл не похож на выгрузку прогресса');
  });

  it('копирует выгрузку в буфер, когда системного «Поделиться» нет', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    render(<ProgressBackup onImported={() => {}} />);

    await userEvent.click(screen.getByRole('button', { name: 'Выгрузить прогресс' }));

    expect(await screen.findByRole('status')).toHaveTextContent('буфер обмена');
    expect(writeText).toHaveBeenCalledOnce();
  });
});
```

- [ ] **Step 7: Убедиться, что тест падает**

Run: `npx vitest run src/components/ProgressBackup.test.tsx`
Expected: FAIL, `Failed to resolve import "./ProgressBackup"`.

- [ ] **Step 8: Написать компонент**

Создать `src/components/ProgressBackup.tsx`:

```tsx
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
        return;
      } catch {
        // шторку закрыли — падаем в буфер обмена
      }
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
```

- [ ] **Step 9: Убедиться, что тесты проходят**

Run: `npx vitest run src/components/ProgressBackup.test.tsx`
Expected: 3 passed.

- [ ] **Step 10: Показать блок на главном экране**

В `src/components/ModuleList.tsx` добавить импорт `import { ProgressBackup } from './ProgressBackup';`, сделать прогресс перечитываемым и отрисовать блок только на корневом экране уровней.

Заменить строку 18:

```tsx
  const [progress, setProgress] = useState(() => loadProgress(content));
```

и в ветке `level === null` вставить блок сразу после закрывающего `</ul>`:

```tsx
        <ProgressBackup onImported={() => setProgress(loadProgress(content))} />
```

Этот блок ломает существующий тест: `ModuleList.test.tsx:17` собирает **все** кнопки корневого экрана и сравнивает их список с перечнем уровней, а кнопок теперь на две больше. Сузить запрос до списка уровней. Добавить `within` в импорт из `@testing-library/react` и заменить строки 17–18:

```tsx
    const rows = within(screen.getByRole('list')).getAllByRole('button').map((b) => b.textContent ?? '');
    expect(rows.map((r) => r.split(' — ')[0])).toEqual(LEVELS);
```

Run: `npx vitest run src/components/ModuleList.test.tsx`
Expected: все тесты файла зелёные. Если список уровней всё ещё не совпал — блок резервной копии случайно оказался внутри `<ul>`.

- [ ] **Step 11: Оформить блок**

В конец `src/index.css` добавить:

```css
.backup {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-soft);
  color: var(--muted);
}
```

- [ ] **Step 12: Проверить всё вместе**

Run: `npm test && npm run build && npm run lint`
Expected: 109 passed, сборка и линт чистые.

- [ ] **Step 13: Закоммитить**

```bash
git add src/store/backup.ts src/store/backup.test.ts src/store/progress.ts src/components/ProgressBackup.tsx src/components/ProgressBackup.test.tsx src/components/ModuleList.tsx src/components/ModuleList.test.tsx src/index.css
git commit -m "feat: export and import progress as a JSON backup"
git push
```

---

### Task 8: Приёмка на устройстве и фиксация результата

**Files:**
- Modify: `docs/superpowers/specs/2026-09-13-english-gym-mobile-pwa.md` (строка статуса)
- Modify: `/Users/sergey.yanykin/.claude/projects/-Users-sergey-yanykin-repos-repeating-english/memory/repeating-english-project.md`

**Interfaces:**
- Consumes: результат задач 1–7, опубликованный на GitHub Pages.
- Produces: ничего для кода.

- [ ] **Step 1: Переустановить приложение начисто**

Удалить иконку с домашнего экрана, открыть `https://impu1se.github.io/repeating-english/` в Safari, «Поделиться» → «На экран «Домой»».

Хранилище Safari и хранилище установленного приложения не общие: прогресс, набранный в браузере до установки, в приложение сам не переедет. Если он нужен — выгрузить его из Safari и загрузить в приложении.

- [ ] **Step 2: Пройти чеклист на iPhone**

- [ ] Иконка — белая гантеля на синем фоне, не миниатюра страницы.
- [ ] Запуск с иконки идёт без адресной строки Safari.
- [ ] Заголовок не заезжает под вырез, нижняя кнопка не уходит под системную полосу.
- [ ] Авиарежим: приложение открывается, тренировка идёт целиком.
- [ ] Ввод в `translate_ru_en`: набрать `dont` — iOS не дописывает апостроф, первая буква не поднимается.
- [ ] Клавиша возврата на клавиатуре отправляет ответ.
- [ ] `multi_gap`: поля стоят в столбик, все попадают под палец.
- [ ] `match_pairs`: колонки не распирают экран, горизонтальной прокрутки нет.
- [ ] Альбомная ориентация: вёрстка не ломается.
- [ ] «Выгрузить прогресс» открывает системную шторку, файл сохраняется в «Файлы».
- [ ] «Загрузить прогресс» принимает этот файл, показывает число восстановленных концептов, и счёт на экране уровней обновляется.
- [ ] Тёмное оформление телефона переключает тему приложения.

- [ ] **Step 3: Отметить спеку выполненной**

В `docs/superpowers/specs/2026-09-13-english-gym-mobile-pwa.md` в строке `**Статус:**` дописать дату приёмки и слово «реализовано».

- [ ] **Step 4: Обновить память проекта**

В файле памяти проекта записать: этап «мобильное PWA» реализован, адрес публикации, что `base` управляется переменной `APP_BASE`, что обновление приезжает на следующем холодном запуске, и что следующий шаг — Capacitor. Заодно поправить устаревшее число заданий: в контенте их 1451, а не 961.

- [ ] **Step 5: Закоммитить**

```bash
git add docs/superpowers/specs/2026-09-13-english-gym-mobile-pwa.md
git commit -m "docs: mark mobile PWA spec as delivered"
git push
```

---

## Self-Review

**Покрытие спеки.** Решения 1 и 2 — архитектура плана и `APP_BASE` в задаче 1. Решение 3 — задача 1. Решение 4 — работы нет по определению. Решение 5 — работ нет, типы заданий не тронуты; проверяется чеклистом задачи 8. Решение 6 — задача 4. Решение 7 — задача 7. Решение 8 — поле `format` в файле копии, задача 7. Решение 9 — задача 3. Решение 10 — задача 5. Решение 11 — задача 6. Решение 12 — задача 2. Решение 13 — задача 8. Обе поправки спеки учтены: ориентация в манифест не пишется (задача 2), выгрузка идёт через «Поделиться» (задача 7).

**Заглушек нет.** Каждый шаг содержит либо готовый код, либо команду с ожидаемым результатом.

**Согласованность имён.** `mergeConcepts` вводится в задаче 7 шаг 3 и используется в задаче 7 шаг 4. `serializeProgress`, `parseBackup`, `backupFileName` объявлены в шаге 4 и вызываются в шагах 1, 6 и 8 с теми же сигнатурами. Класс `.sr-only` вводится в задаче 5 и используется в задаче 7. Переменные `--border-soft` и `--muted` вводятся в задаче 6 и используются в задаче 7.

**Известный риск.** Задача 2 полагается на то, что `@vite-pwa/assets-generator` растеризует SVG на этой машине: системных конвертеров (`rsvg-convert`, `magick`, `inkscape`) здесь нет, генератор несёт свой бинарный растеризатор. Шаг 4 задачи 2 проверяет это явно. Если растеризация не заработает — запасной путь: поставить `@resvg/resvg-js` и написать скрипт на 15 строк, рисующий те же три размера из того же `public/icon.svg`.
