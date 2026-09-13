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
