import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'vocab-a2',
  title: 'Слова A2: повседневное',
  level: 'A2',
  masteryThreshold: 50,
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
