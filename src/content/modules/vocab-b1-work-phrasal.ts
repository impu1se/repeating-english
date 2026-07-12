import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'vocab-b1-work-phrasal',
  title: 'Слова B1-B2: работа и фразовые глаголы',
  level: 'B1-B2',
  masteryThreshold: 50,
  conceptIds: ['vb1-work', 'vb1-phrasal'],
};

export const concepts: Concept[] = [
  {
    id: 'vb1-work',
    moduleId: 'vocab-b1-work-phrasal',
    title: 'Работа и карьера',
    kind: 'vocab',
    exerciseIds: ['vw-e1', 'vw-e2', 'vw-e3', 'vw-e4', 'vw-e5', 'vw-e6', 'vw-e7'],
  },
  {
    id: 'vb1-phrasal',
    moduleId: 'vocab-b1-work-phrasal',
    title: 'Фразовые глаголы: повседневные',
    kind: 'vocab',
    exerciseIds: ['vp-e1', 'vp-e2', 'vp-e3', 'vp-e4', 'vp-e5', 'vp-e6', 'vp-e7'],
  },
];

export const exercises: Exercise[] = [
  // --- Work & career ---
  { id: 'vw-e1', conceptId: 'vb1-work', type: 'match_pairs', prompt: 'Сопоставьте слова и переводы', points: 1, pairs: [{ en: 'salary', ru: 'зарплата' }, { en: 'employee', ru: 'сотрудник' }, { en: 'interview', ru: 'собеседование' }, { en: 'skill', ru: 'навык' }, { en: 'deadline', ru: 'срок сдачи' }] },
  { id: 'vw-e2', conceptId: 'vb1-work', type: 'match_pairs', prompt: 'Сопоставьте глаголы и переводы', points: 1, pairs: [{ en: 'to hire', ru: 'нанимать' }, { en: 'to quit', ru: 'увольняться' }, { en: 'to manage', ru: 'руководить' }, { en: 'to earn', ru: 'зарабатывать' }] },
  { id: 'vw-e3', conceptId: 'vb1-work', type: 'choose_word', prompt: 'She got a ___ after two years in the company.', points: 1, options: ['promotion', 'salary', 'interview'], accepted: ['promotion'] },
  { id: 'vw-e4', conceptId: 'vb1-work', type: 'fill_gap', prompt: 'He applied ___ a new job.', points: 1, accepted: ['for'] },
  { id: 'vw-e5', conceptId: 'vb1-work', type: 'translate_ru_en', prompt: 'Я работаю удалённо два раза в неделю.', points: 2, accepted: ['I work remotely twice a week', 'I work from home twice a week', 'I work remotely two times a week'] },
  { id: 'vw-e6', conceptId: 'vb1-work', type: 'multi_gap', prompt: 'She ___ a good salary and never misses a ___.', points: 1, gaps: [{ accepted: ['earns', 'makes', 'gets'] }, { accepted: ['deadline'] }] },
  { id: 'vw-e7', conceptId: 'vb1-work', type: 'word_order', prompt: 'Соберите: «Он устроился на новую работу в прошлом месяце»', points: 1, bank: ['he', 'got', 'a', 'new', 'job', 'last', 'month'], accepted: ['he got a new job last month'] },

  // --- Everyday phrasal verbs ---
  { id: 'vp-e1', conceptId: 'vb1-phrasal', type: 'match_pairs', prompt: 'Сопоставьте фразовые глаголы и переводы', points: 1, pairs: [{ en: 'give up', ru: 'сдаваться' }, { en: 'look for', ru: 'искать' }, { en: 'find out', ru: 'выяснять' }, { en: 'put off', ru: 'откладывать' }, { en: 'carry on', ru: 'продолжать' }] },
  { id: 'vp-e2', conceptId: 'vb1-phrasal', type: 'choose_word', prompt: "Don't ___ — you're almost there!", points: 1, options: ['give up', 'look for', 'put off'], accepted: ['give up'] },
  { id: 'vp-e3', conceptId: 'vb1-phrasal', type: 'fill_gap', prompt: 'I need to ___ up early tomorrow.', points: 1, accepted: ['get', 'wake'] },
  { id: 'vp-e4', conceptId: 'vb1-phrasal', type: 'choose_word', prompt: "Can you ___ the music? It's too loud.", points: 1, options: ['turn down', 'turn on', 'look up'], accepted: ['turn down'] },
  { id: 'vp-e5', conceptId: 'vb1-phrasal', type: 'translate_ru_en', prompt: 'Я ищу свои ключи.', points: 2, accepted: ['I am looking for my keys', "I'm looking for my keys"] },
  { id: 'vp-e6', conceptId: 'vb1-phrasal', type: 'multi_gap', prompt: "I'll find ___ the details and call you ___.", points: 1, gaps: [{ accepted: ['out'] }, { accepted: ['back'] }] },
  { id: 'vp-e7', conceptId: 'vb1-phrasal', type: 'word_order', prompt: 'Соберите: «Она отменила встречу»', points: 1, bank: ['she', 'called', 'off', 'the', 'meeting'], accepted: ['she called off the meeting'] },
];
