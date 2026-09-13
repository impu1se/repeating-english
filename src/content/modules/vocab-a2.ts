import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'vocab-a2',
  title: 'Слова A2: повседневное',
  level: 'A2',
  masteryThreshold: 20,
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
      'va2-e14', 'va2-e15', 'va2-e16', 'va2-e17', 'va2-e18', 'va2-e19', 'va2-e20', 'va2-e21', 'va2-e22', 'va2-e23',
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
  // ---- добор: va2-daily ----
  { id: 'va2-e14', conceptId: 'va2-daily', type: 'match_pairs', prompt: 'Сопоставьте слова и переводы', points: 1, pairs: [{ en: 'library', ru: 'библиотека' }, { en: 'market', ru: 'рынок' }, { en: 'bridge', ru: 'мост' }, { en: 'church', ru: 'церковь' }, { en: 'square', ru: 'площадь' }] },
  { id: 'va2-e15', conceptId: 'va2-daily', type: 'match_pairs', prompt: 'Сопоставьте одежду и переводы', points: 1, pairs: [{ en: 'shirt', ru: 'рубашка' }, { en: 'shoes', ru: 'туфли' }, { en: 'coat', ru: 'пальто' }, { en: 'gloves', ru: 'перчатки' }, { en: 'scarf', ru: 'шарф' }] },
  { id: 'va2-e16', conceptId: 'va2-daily', type: 'match_pairs', prompt: 'Сопоставьте посуду и переводы', points: 1, pairs: [{ en: 'spoon', ru: 'ложка' }, { en: 'fork', ru: 'вилка' }, { en: 'knife', ru: 'нож' }, { en: 'plate', ru: 'тарелка' }, { en: 'cup', ru: 'чашка' }] },
  { id: 'va2-e17', conceptId: 'va2-daily', type: 'choose_word', prompt: 'Turn left at the ___ and you will see the station.', points: 1, options: ['corner', 'ceiling', 'shelf'], accepted: ['corner'] },
  { id: 'va2-e18', conceptId: 'va2-daily', type: 'fill_gap', prompt: 'It is cold outside — put on your ___ and gloves.', points: 1, accepted: ['coat', 'jacket', 'scarf'] },
  { id: 'va2-e19', conceptId: 'va2-daily', type: 'translate_ru_en', prompt: 'Как пройти к вокзалу?', points: 2, accepted: ['How do I get to the station?', 'How can I get to the station?'] },
  { id: 'va2-e20', conceptId: 'va2-daily', type: 'translate_ru_en', prompt: 'Я обычно хожу за покупками по субботам.', points: 2, accepted: ['I usually go shopping on Saturdays'] },
  { id: 'va2-e21', conceptId: 'va2-daily', type: 'multi_gap', prompt: 'I eat soup with a ___ and I cut the meat with a ___.', points: 1, gaps: [{ accepted: ['spoon'] }, { accepted: ['knife'] }] },
  { id: 'va2-e22', conceptId: 'va2-daily', type: 'word_order', prompt: 'Соберите: «Магазин находится напротив банка»', points: 1, bank: ['the', 'shop', 'is', 'opposite', 'the', 'bank'], accepted: ['the shop is opposite the bank'] },
  { id: 'va2-e23', conceptId: 'va2-daily', type: 'word_order', prompt: 'Соберите: «Я забыл зонт дома»', points: 1, bank: ['I', 'left', 'my', 'umbrella', 'at', 'home'], accepted: ['I left my umbrella at home'] },
];
