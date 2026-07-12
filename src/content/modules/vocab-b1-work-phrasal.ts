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
    exerciseIds: [
      'vw-e1', 'vw-e2', 'vw-e3', 'vw-e4', 'vw-e5', 'vw-e6', 'vw-e7',
      'vw-e8', 'vw-e9', 'vw-e10', 'vw-e11', 'vw-e12', 'vw-e13', 'vw-e14',
    ],
  },
  {
    id: 'vb1-phrasal',
    moduleId: 'vocab-b1-work-phrasal',
    title: 'Фразовые глаголы: повседневные',
    kind: 'vocab',
    exerciseIds: [
      'vp-e1', 'vp-e2', 'vp-e3', 'vp-e4', 'vp-e5', 'vp-e6', 'vp-e7',
      'vp-e8', 'vp-e9', 'vp-e10', 'vp-e11', 'vp-e12', 'vp-e13', 'vp-e14',
    ],
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
  { id: 'vw-e8', conceptId: 'vb1-work', type: 'match_pairs', prompt: 'Сопоставьте слова и переводы', points: 1, pairs: [{ en: 'colleague', ru: 'коллега' }, { en: 'boss', ru: 'начальник' }, { en: 'meeting', ru: 'встреча' }, { en: 'contract', ru: 'контракт' }, { en: 'client', ru: 'клиент' }] },
  { id: 'vw-e9', conceptId: 'vb1-work', type: 'match_pairs', prompt: 'Сопоставьте слова и переводы', points: 1, pairs: [{ en: 'task', ru: 'задача' }, { en: 'project', ru: 'проект' }, { en: 'experience', ru: 'опыт' }, { en: 'teamwork', ru: 'командная работа' }, { en: 'to retire', ru: 'выходить на пенсию' }] },
  { id: 'vw-e10', conceptId: 'vb1-work', type: 'choose_word', prompt: 'I have a ___ with my boss at 3 PM to discuss my performance.', points: 1, options: ['meeting', 'salary', 'skill'], accepted: ['meeting'] },
  { id: 'vw-e11', conceptId: 'vb1-work', type: 'fill_gap', prompt: 'She has five years of ___ in marketing.', points: 1, accepted: ['experience'] },
  { id: 'vw-e12', conceptId: 'vb1-work', type: 'translate_ru_en', prompt: 'У меня много задач на этой неделе.', points: 2, accepted: ['I have a lot of tasks this week', "I've got a lot of tasks this week", 'I have many tasks this week'] },
  { id: 'vw-e13', conceptId: 'vb1-work', type: 'multi_gap', prompt: 'Our weekly ___ with the client starts at nine, and every ___ must attend.', points: 1, gaps: [{ accepted: ['meeting'] }, { accepted: ['colleague', 'employee'] }] },
  { id: 'vw-e14', conceptId: 'vb1-work', type: 'word_order', prompt: 'Соберите: «Вчера наша команда закончила проект»', points: 1, bank: ['yesterday', 'our', 'team', 'finished', 'the', 'project'], accepted: ['yesterday our team finished the project', 'our team finished the project yesterday'] },

  // --- Everyday phrasal verbs ---
  { id: 'vp-e1', conceptId: 'vb1-phrasal', type: 'match_pairs', prompt: 'Сопоставьте фразовые глаголы и переводы', points: 1, pairs: [{ en: 'give up', ru: 'сдаваться' }, { en: 'look for', ru: 'искать' }, { en: 'find out', ru: 'выяснять' }, { en: 'put off', ru: 'откладывать' }, { en: 'carry on', ru: 'продолжать' }] },
  { id: 'vp-e2', conceptId: 'vb1-phrasal', type: 'choose_word', prompt: "Don't ___ — you're almost there!", points: 1, options: ['give up', 'look for', 'put off'], accepted: ['give up'] },
  { id: 'vp-e3', conceptId: 'vb1-phrasal', type: 'fill_gap', prompt: 'I need to ___ up early tomorrow.', points: 1, accepted: ['get', 'wake'] },
  { id: 'vp-e4', conceptId: 'vb1-phrasal', type: 'choose_word', prompt: "Can you ___ the music? It's too loud.", points: 1, options: ['turn down', 'turn on', 'look up'], accepted: ['turn down'] },
  { id: 'vp-e5', conceptId: 'vb1-phrasal', type: 'translate_ru_en', prompt: 'Я ищу свои ключи.', points: 2, accepted: ['I am looking for my keys', "I'm looking for my keys"] },
  { id: 'vp-e6', conceptId: 'vb1-phrasal', type: 'multi_gap', prompt: "I'll find ___ the details and call you ___.", points: 1, gaps: [{ accepted: ['out'] }, { accepted: ['back'] }] },
  { id: 'vp-e7', conceptId: 'vb1-phrasal', type: 'word_order', prompt: 'Соберите: «Она отменила встречу»', points: 1, bank: ['she', 'called', 'off', 'the', 'meeting'], accepted: ['she called off the meeting'] },
  { id: 'vp-e8', conceptId: 'vb1-phrasal', type: 'match_pairs', prompt: 'Сопоставьте фразовые глаголы и переводы', points: 1, pairs: [{ en: 'pick up', ru: 'забирать' }, { en: 'drop off', ru: 'высаживать' }, { en: 'take off', ru: 'взлетать' }, { en: 'put on', ru: 'надевать' }, { en: 'get on', ru: 'садиться' }] },
  { id: 'vp-e9', conceptId: 'vb1-phrasal', type: 'match_pairs', prompt: 'Сопоставьте фразовые глаголы и переводы', points: 1, pairs: [{ en: 'work out', ru: 'тренироваться' }, { en: 'figure out', ru: 'разобраться' }, { en: 'show up', ru: 'появляться' }, { en: 'calm down', ru: 'успокаиваться' }, { en: 'run out', ru: 'заканчиваться' }] },
  { id: 'vp-e10', conceptId: 'vb1-phrasal', type: 'choose_word', prompt: 'The plane is about to ___ — please fasten your seatbelt.', points: 1, options: ['take off', 'put on', 'get on'], accepted: ['take off'] },
  { id: 'vp-e11', conceptId: 'vb1-phrasal', type: 'fill_gap', prompt: 'Can you ___ me up from the airport tomorrow?', points: 1, accepted: ['pick'] },
  { id: 'vp-e12', conceptId: 'vb1-phrasal', type: 'translate_ru_en', prompt: 'Не забудь надеть куртку, на улице холодно.', points: 2, accepted: ["Don't forget to put on your jacket — it's cold outside", "Don't forget to put on your jacket — it is cold outside", "Don't forget to put your jacket on — it's cold outside"] },
  { id: 'vp-e13', conceptId: 'vb1-phrasal', type: 'multi_gap', prompt: 'We always ___ of milk by Friday, so please ___ some up from the shop.', points: 1, gaps: [{ accepted: ['run out'] }, { accepted: ['pick'] }] },
  { id: 'vp-e14', conceptId: 'vb1-phrasal', type: 'word_order', prompt: 'Соберите: «Она успокоилась после разговора»', points: 1, bank: ['she', 'calmed', 'down', 'after', 'the', 'conversation'], accepted: ['she calmed down after the conversation', 'after the conversation she calmed down'] },
];
