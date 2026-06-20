import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'present-perfect',
  title: 'Present Perfect',
  level: 'B1',
  masteryThreshold: 5,
  conceptIds: ['pp-experience'],
};

export const concepts: Concept[] = [
  { id: 'pp-experience', moduleId: 'present-perfect', title: 'Опыт: ever/never', kind: 'grammar', exerciseIds: ['pp-e1'] },
];

export const exercises: Exercise[] = [
  {
    id: 'pp-e1',
    conceptId: 'pp-experience',
    type: 'translate_ru_en',
    prompt: 'Ты когда-нибудь был в Лондоне?',
    points: 2,
    accepted: ['Have you ever been to London?', 'Have you ever been in London?'],
  },
];
