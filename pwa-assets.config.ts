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
