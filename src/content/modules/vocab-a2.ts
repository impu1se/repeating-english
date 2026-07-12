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
    exerciseIds: [
      'va2-e1', 'va2-e2', 'va2-e3', 'va2-e4', 'va2-e5', 'va2-e6',
      'va2-e7', 'va2-e8', 'va2-e9', 'va2-e10', 'va2-e11', 'va2-e12', 'va2-e13',
    ],
  },
];

export const exercises: Exercise[] = [
  { id: 'va2-e1', conceptId: 'va2-daily', type: 'match_pairs', prompt: 'Сопоставьте слова и переводы', points: 1, pairs: [{ en: 'breakfast', ru: 'завтрак' }, { en: 'evening', ru: 'вечер' }, { en: 'street', ru: 'улица' }, { en: 'weather', ru: 'погода' }] },
  { id: 'va2-e2', conceptId: 'va2-daily', type: 'match_pairs', prompt: 'Сопоставьте слова и переводы', points: 1, pairs: [{ en: 'kitchen', ru: 'кухня' }, { en: 'window', ru: 'окно' }, { en: 'bus', ru: 'автобус' }, { en: 'money', ru: 'деньги' }] },
  { id: 'va2-e3', conceptId: 'va2-daily', type: 'multi_gap', prompt: 'I have ___ in the morning and ___ in the evening.', points: 1, gaps: [{ accepted: ['breakfast'] }, { accepted: ['dinner', 'supper'] }] },
  { id: 'va2-e4', conceptId: 'va2-daily', type: 'translate_ru_en', prompt: 'Какая сегодня погода?', points: 2, accepted: ["What's the weather like today?", 'What is the weather like today?', 'How is the weather today?'] },
  { id: 'va2-e5', conceptId: 'va2-daily', type: 'choose_word', prompt: 'I take the ___ to work.', points: 1, options: ['bus', 'breakfast', 'weather'], accepted: ['bus'] },
  { id: 'va2-e6', conceptId: 'va2-daily', type: 'fill_gap', prompt: 'I have no ___ to buy it.', points: 1, accepted: ['money'] },
  { id: 'va2-e7', conceptId: 'va2-daily', type: 'match_pairs', prompt: 'Сопоставьте слова и переводы', points: 1, pairs: [{ en: 'neighbor', ru: 'сосед' }, { en: 'hospital', ru: 'больница' }, { en: 'medicine', ru: 'лекарство' }, { en: 'headache', ru: 'головная боль' }, { en: 'tired', ru: 'усталый' }] },
  { id: 'va2-e8', conceptId: 'va2-daily', type: 'match_pairs', prompt: 'Сопоставьте слова и переводы', points: 1, pairs: [{ en: 'suitcase', ru: 'чемодан' }, { en: 'ticket', ru: 'билет' }, { en: 'umbrella', ru: 'зонт' }, { en: 'holiday', ru: 'отпуск' }, { en: 'passport', ru: 'паспорт' }] },
  { id: 'va2-e9', conceptId: 'va2-daily', type: 'choose_word', prompt: 'I have a terrible ___, so I need some medicine.', points: 1, options: ['headache', 'weather', 'money'], accepted: ['headache'] },
  { id: 'va2-e10', conceptId: 'va2-daily', type: 'fill_gap', prompt: 'You need a valid ___ to cross the border.', points: 1, accepted: ['passport', 'visa'] },
  { id: 'va2-e11', conceptId: 'va2-daily', type: 'translate_ru_en', prompt: 'У меня болит голова.', points: 2, accepted: ['I have a headache', "I've got a headache", 'My head hurts'] },
  { id: 'va2-e12', conceptId: 'va2-daily', type: 'multi_gap', prompt: 'After the long flight, she was so ___ that she left her ___ at the airport.', points: 1, gaps: [{ accepted: ['tired', 'exhausted'] }, { accepted: ['suitcase', 'bag', 'luggage', 'passport', 'purse'] }] },
  { id: 'va2-e13', conceptId: 'va2-daily', type: 'word_order', prompt: 'Соберите: «Дети играют в саду»', points: 1, bank: ['the', 'children', 'are', 'playing', 'in', 'the', 'garden'], accepted: ['the children are playing in the garden', 'in the garden the children are playing'] },
];
