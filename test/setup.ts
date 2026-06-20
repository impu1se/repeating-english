import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Polyfill localStorage if not available or clear is missing
if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
  if (!globalThis.localStorage.clear) {
    const store = new Map<string, string>();
    globalThis.localStorage = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => store.set(key, value),
      removeItem: (key: string) => store.delete(key),
      clear: () => store.clear(),
      length: 0,
      key: (index: number) => Array.from(store.keys())[index] ?? null,
    } as any;
  }
}
