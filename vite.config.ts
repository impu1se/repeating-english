import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// GitHub Pages отдаёт проектный сайт по подпути /repeating-english/.
// Capacitor позже потребует корень, поэтому база задаётся окружением,
// а не хардкодом: APP_BASE=/ npm run build.
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
