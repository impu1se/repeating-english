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
