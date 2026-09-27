// Каталог грамматических концептов для разбора речи в чате.
// Запуск: npm run catalog
import { writeFileSync, mkdirSync } from 'node:fs';
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
let content;
try {
  ({ content } = await server.ssrLoadModule('/src/content/index.ts'));
} finally {
  await server.close();
}

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
