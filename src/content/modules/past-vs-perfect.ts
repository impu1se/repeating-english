import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'past-vs-perfect',
  title: 'Past Simple vs Present Perfect',
  level: 'B1',
  masteryThreshold: 5,
  conceptIds: ['psp-past-simple', 'psp-contrast'],
};

export const concepts: Concept[] = [
  {
    id: 'psp-past-simple',
    moduleId: 'past-vs-perfect',
    title: 'Past Simple: законченное время',
    kind: 'grammar',
    exerciseIds: ['psp-e1', 'psp-e2', 'psp-e3', 'psp-e4', 'psp-e5', 'psp-e6', 'psp-e7'],
  },
  {
    id: 'psp-contrast',
    moduleId: 'past-vs-perfect',
    title: 'Контраст: Past Simple или Present Perfect',
    kind: 'grammar',
    exerciseIds: ['psc-e1', 'psc-e2', 'psc-e3', 'psc-e4', 'psc-e5', 'psc-e6', 'psc-e7'],
  },
];

export const exercises: Exercise[] = [
  // --- Past Simple: finished time markers (yesterday, last week, ago, in 2019) ---
  { id: 'psp-e1', conceptId: 'psp-past-simple', type: 'translate_ru_en', prompt: 'Я видел этот фильм на прошлой неделе.', points: 2, accepted: ['I saw this film last week', 'I saw this movie last week', 'I watched this film last week', 'I watched this movie last week'] },
  { id: 'psp-e2', conceptId: 'psp-past-simple', type: 'verb_form', prompt: 'She (go) ___ to Spain last summer.', points: 1, accepted: ['went'] },
  { id: 'psp-e3', conceptId: 'psp-past-simple', type: 'choose_word', prompt: 'I ___ my keys yesterday.', points: 1, options: ['lost', 'have lost', 'lose'], accepted: ['lost'] },
  { id: 'psp-e4', conceptId: 'psp-past-simple', type: 'fill_gap', prompt: "I didn't ___ TV last night.", points: 1, accepted: ['watch'] },
  { id: 'psp-e5', conceptId: 'psp-past-simple', type: 'word_order', prompt: 'Соберите: «Она переехала в Лондон в 2019 году»', points: 1, bank: ['she', 'moved', 'to', 'London', 'in', '2019'], accepted: ['she moved to London in 2019'] },
  { id: 'psp-e6', conceptId: 'psp-past-simple', type: 'multi_gap', prompt: 'I ___ (meet) him at the party, but we ___ (not talk) much.', points: 1, gaps: [{ accepted: ['met'] }, { accepted: ["didn't talk", 'did not talk'] }] },
  { id: 'psp-e7', conceptId: 'psp-past-simple', type: 'choose_word', prompt: 'When ___ you arrive?', points: 1, options: ['did', 'have', 'do'], accepted: ['did'] },

  // --- Contrast: experience/result vs finished time ---
  { id: 'psc-e1', conceptId: 'psp-contrast', type: 'choose_word', prompt: 'I ___ this film three times.', points: 1, options: ['have seen', 'saw', 'see'], accepted: ['have seen'] },
  { id: 'psc-e2', conceptId: 'psp-contrast', type: 'choose_word', prompt: 'I ___ it in 2020.', points: 1, options: ['watched', 'have watched', 'watch'], accepted: ['watched'] },
  { id: 'psc-e3', conceptId: 'psp-contrast', type: 'translate_ru_en', prompt: 'Я уже закончил работу.', points: 2, accepted: ['I have already finished the work', "I've already finished the work", 'I have already finished my work', "I've already finished my work", 'I have already finished work'] },
  { id: 'psc-e4', conceptId: 'psp-contrast', type: 'verb_form', prompt: 'Look! Somebody (break) ___ the window.', points: 1, accepted: ['has broken'] },
  { id: 'psc-e5', conceptId: 'psp-contrast', type: 'fill_gap', prompt: "She hasn't ___ me back yet.", points: 1, accepted: ['called', 'phoned'] },
  { id: 'psc-e6', conceptId: 'psp-contrast', type: 'multi_gap', prompt: 'I ___ (live) here since 2020, but before that I ___ (live) in Kazan.', points: 1, gaps: [{ accepted: ['have lived', 'have been living'] }, { accepted: ['lived'] }] },
  { id: 'psc-e7', conceptId: 'psp-contrast', type: 'word_order', prompt: 'Соберите: «Я никогда не пробовал устрицы»', points: 1, bank: ['I', 'have', 'never', 'tried', 'oysters'], accepted: ['I have never tried oysters'] },
];
