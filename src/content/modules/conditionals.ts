import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'conditionals',
  title: 'Conditionals: First & Second',
  level: 'B1-B2',
  masteryThreshold: 5,
  conceptIds: ['cond-first', 'cond-second'],
};

export const concepts: Concept[] = [
  {
    id: 'cond-first',
    moduleId: 'conditionals',
    title: 'First Conditional: if + Present, will',
    kind: 'grammar',
    exerciseIds: ['cf-e1', 'cf-e2', 'cf-e3', 'cf-e4', 'cf-e5', 'cf-e6', 'cf-e7'],
  },
  {
    id: 'cond-second',
    moduleId: 'conditionals',
    title: 'Second Conditional: if + Past, would',
    kind: 'grammar',
    exerciseIds: ['cs-e1', 'cs-e2', 'cs-e3', 'cs-e4', 'cs-e5', 'cs-e6', 'cs-e7'],
  },
];

export const exercises: Exercise[] = [
  // --- First Conditional ---
  { id: 'cf-e1', conceptId: 'cond-first', type: 'translate_ru_en', prompt: 'Если пойдёт дождь, мы останемся дома.', points: 2, accepted: ['If it rains, we will stay at home', "If it rains, we'll stay at home", 'If it rains, we will stay home', "If it rains, we'll stay home", 'We will stay at home if it rains'] },
  { id: 'cf-e2', conceptId: 'cond-first', type: 'choose_word', prompt: 'If she ___ hard, she will pass the exam.', points: 1, options: ['studies', 'will study', 'study'], accepted: ['studies'] },
  { id: 'cf-e3', conceptId: 'cond-first', type: 'verb_form', prompt: 'If we (be) ___ late, they will start without us.', points: 1, accepted: ['are'] },
  { id: 'cf-e4', conceptId: 'cond-first', type: 'fill_gap', prompt: "I'll call you when I ___ home.", points: 1, accepted: ['get', 'arrive', 'come'] },
  { id: 'cf-e5', conceptId: 'cond-first', type: 'word_order', prompt: 'Соберите: «Если ты устанешь, мы сделаем перерыв»', points: 1, bank: ['if', 'you', 'get', 'tired', 'we', 'will', 'take', 'a', 'break'], accepted: ['if you get tired we will take a break'] },
  { id: 'cf-e6', conceptId: 'cond-first', type: 'multi_gap', prompt: 'If he ___ (miss) the bus, he ___ (be) late.', points: 1, gaps: [{ accepted: ['misses'] }, { accepted: ['will be', "'ll be"] }] },
  { id: 'cf-e7', conceptId: 'cond-first', type: 'choose_word', prompt: "You won't pass the exam ___ you study.", points: 1, options: ['unless', 'if', 'when'], accepted: ['unless'] },

  // --- Second Conditional ---
  { id: 'cs-e1', conceptId: 'cond-second', type: 'translate_ru_en', prompt: 'Если бы я был богат, я бы купил дом у моря.', points: 2, accepted: ['If I were rich, I would buy a house by the sea', 'If I was rich, I would buy a house by the sea', "If I were rich, I'd buy a house by the sea", "If I was rich, I'd buy a house by the sea", 'If I were rich, I would buy a house near the sea'] },
  { id: 'cs-e2', conceptId: 'cond-second', type: 'choose_word', prompt: 'If I ___ you, I would take the job.', points: 1, options: ['were', 'am', 'would be'], accepted: ['were'] },
  { id: 'cs-e3', conceptId: 'cond-second', type: 'verb_form', prompt: 'If she (have) ___ more time, she would travel.', points: 1, accepted: ['had'] },
  { id: 'cs-e4', conceptId: 'cond-second', type: 'fill_gap', prompt: 'What would you do if you ___ a million dollars?', points: 1, accepted: ['won', 'had', 'got', 'found'] },
  { id: 'cs-e5', conceptId: 'cond-second', type: 'word_order', prompt: 'Соберите: «Если бы я знал ответ, я бы сказал тебе»', points: 1, bank: ['if', 'I', 'knew', 'the', 'answer', 'I', 'would', 'tell', 'you'], accepted: ['if I knew the answer I would tell you'] },
  { id: 'cs-e6', conceptId: 'cond-second', type: 'multi_gap', prompt: 'If we ___ (live) closer, we ___ (see) each other more often.', points: 1, gaps: [{ accepted: ['lived'] }, { accepted: ['would see', "'d see"] }] },
  { id: 'cs-e7', conceptId: 'cond-second', type: 'choose_word', prompt: 'I would help you if I ___.', points: 1, options: ['could', 'can', 'will'], accepted: ['could'] },
];
