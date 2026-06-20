import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'present-perfect',
  title: 'Present Perfect',
  level: 'B1',
  masteryThreshold: 5,
  conceptIds: ['pp-experience'],
};

export const concepts: Concept[] = [
  {
    id: 'pp-experience',
    moduleId: 'present-perfect',
    title: 'Опыт: ever/never',
    kind: 'grammar',
    exerciseIds: ['pp-e1', 'pp-e2', 'pp-e3', 'pp-e4', 'pp-e5', 'pp-e6'],
  },
];

export const exercises: Exercise[] = [
  { id: 'pp-e1', conceptId: 'pp-experience', type: 'translate_ru_en', prompt: 'Ты когда-нибудь был в Лондоне?', points: 2, accepted: ['Have you ever been to London?', 'Have you ever been in London?'] },
  { id: 'pp-e2', conceptId: 'pp-experience', type: 'translate_ru_en', prompt: 'Я никогда не видел этот фильм.', points: 2, accepted: ['I have never seen this film', "I haven't seen this film", 'I have never watched this movie'] },
  { id: 'pp-e3', conceptId: 'pp-experience', type: 'fill_gap', prompt: 'Have you ever ___ sushi?', points: 1, accepted: ['eaten', 'had'] },
  { id: 'pp-e4', conceptId: 'pp-experience', type: 'verb_form', prompt: 'She has never (be) ___ abroad.', points: 1, accepted: ['been'] },
  { id: 'pp-e5', conceptId: 'pp-experience', type: 'choose_word', prompt: 'I have ___ been to Paris.', points: 1, options: ['ever', 'never', 'yet'], accepted: ['never'] },
  { id: 'pp-e6', conceptId: 'pp-experience', type: 'word_order', prompt: 'Соберите: «Ты когда-нибудь пробовал суши?»', points: 1, bank: ['have', 'you', 'ever', 'tried', 'sushi'], accepted: ['have you ever tried sushi'] },
];
