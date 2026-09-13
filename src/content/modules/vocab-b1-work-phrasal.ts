import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'vocab-b1-work-phrasal',
  title: 'Слова B1-B2: работа и фразовые глаголы',
  level: 'B1-B2',
  masteryThreshold: 20,
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
      'vw-e15', 'vw-e16', 'vw-e17', 'vw-e18', 'vw-e19', 'vw-e20', 'vw-e21', 'vw-e22', 'vw-e23', 'vw-e24',
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
      'vp-e15', 'vp-e16', 'vp-e17', 'vp-e18', 'vp-e19', 'vp-e20', 'vp-e21', 'vp-e22', 'vp-e23', 'vp-e24',
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
  { id: 'vw-e9', conceptId: 'vb1-work', type: 'match_pairs', prompt: 'Сопоставьте слова и переводы', points: 1, pairs: [{ en: 'task', ru: 'задача' }, { en: 'project', ru: 'проект' }, { en: 'experience', ru: 'опыт' }, { en: 'teamwork', ru: 'командная работа' }, { en: 'retire', ru: 'выходить на пенсию' }] },
  { id: 'vw-e10', conceptId: 'vb1-work', type: 'choose_word', prompt: 'I have a ___ with my boss at 3 PM to discuss my performance.', points: 1, options: ['meeting', 'salary', 'skill'], accepted: ['meeting'] },
  { id: 'vw-e11', conceptId: 'vb1-work', type: 'fill_gap', prompt: 'She has five years of ___ in marketing.', points: 1, accepted: ['experience'] },
  { id: 'vw-e12', conceptId: 'vb1-work', type: 'translate_ru_en', prompt: 'У меня много задач на этой неделе.', points: 2, accepted: ['I have a lot of tasks this week', "I've got a lot of tasks this week", 'I have many tasks this week'] },
  { id: 'vw-e13', conceptId: 'vb1-work', type: 'multi_gap', prompt: 'Our weekly ___ with the client starts at nine, and every ___ must attend.', points: 1, gaps: [{ accepted: ['meeting', 'call'] }, { accepted: ['colleague', 'employee'] }] },
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
  // ---- добор: vb1-work ----
  { id: 'vw-e15', conceptId: 'vb1-work', type: 'match_pairs', prompt: 'Сопоставьте глаголы и переводы', points: 1, pairs: [{ en: 'to apply', ru: 'подавать заявку' }, { en: 'to resign', ru: 'уходить с должности' }, { en: 'to promote', ru: 'повышать' }, { en: 'to train', ru: 'обучать' }, { en: 'to negotiate', ru: 'вести переговоры' }] },
  { id: 'vw-e16', conceptId: 'vb1-work', type: 'match_pairs', prompt: 'Сопоставьте слова и переводы', points: 1, pairs: [{ en: 'pay rise', ru: 'повышение зарплаты' }, { en: 'workload', ru: 'нагрузка' }, { en: 'overtime', ru: 'сверхурочные' }, { en: 'staff', ru: 'персонал' }, { en: 'department', ru: 'отдел' }] },
  { id: 'vw-e17', conceptId: 'vb1-work', type: 'choose_word', prompt: 'He handed in his ___ after ten years in the company.', points: 1, options: ['resignation', 'promotion', 'application'], accepted: ['resignation'] },
  { id: 'vw-e18', conceptId: 'vb1-work', type: 'choose_word', prompt: 'We need to ___ a new developer for the team.', points: 1, options: ['recruit', 'resign', 'retire'], accepted: ['recruit'] },
  { id: 'vw-e19', conceptId: 'vb1-work', type: 'fill_gap', prompt: 'She is responsible ___ the marketing budget.', points: 1, accepted: ['for'] },
  { id: 'vw-e20', conceptId: 'vb1-work', type: 'fill_gap', prompt: 'I have to work ___ this week to finish the project on time.', points: 1, accepted: ['overtime', 'late'] },
  { id: 'vw-e21', conceptId: 'vb1-work', type: 'translate_ru_en', prompt: 'Он подал заявление об уходе на прошлой неделе.', points: 2, accepted: ['He handed in his resignation last week', 'He resigned last week'] },
  { id: 'vw-e22', conceptId: 'vb1-work', type: 'translate_ru_en', prompt: 'Моя нагрузка сейчас слишком большая.', points: 2, accepted: ['My workload is too heavy at the moment', 'My workload is too big at the moment'] },
  { id: 'vw-e23', conceptId: 'vb1-work', type: 'multi_gap', prompt: 'She is responsible ___ the team, and she reports ___ the director.', points: 1, gaps: [{ accepted: ['for'] }, { accepted: ['to'] }] },
  { id: 'vw-e24', conceptId: 'vb1-work', type: 'word_order', prompt: 'Соберите: «Ей повысили зарплату в прошлом месяце»', points: 1, bank: ['she', 'got', 'a', 'pay', 'rise', 'last', 'month'], accepted: ['she got a pay rise last month'] },

  // ---- добор: vb1-phrasal ----
  { id: 'vp-e15', conceptId: 'vb1-phrasal', type: 'match_pairs', prompt: 'Сопоставьте фразовые глаголы и переводы', points: 1, pairs: [{ en: 'come across', ru: 'наткнуться' }, { en: 'get over', ru: 'оправиться' }, { en: 'look after', ru: 'заботиться' }, { en: 'bring up', ru: 'воспитывать' }, { en: 'take up', ru: 'начать заниматься' }] },
  { id: 'vp-e16', conceptId: 'vb1-phrasal', type: 'match_pairs', prompt: 'Сопоставьте фразовые глаголы и переводы', points: 1, pairs: [{ en: 'put up with', ru: 'мириться с' }, { en: 'look forward to', ru: 'ждать с нетерпением' }, { en: 'run into', ru: 'случайно встретить' }, { en: 'set off', ru: 'отправляться в путь' }, { en: 'turn up', ru: 'появляться' }] },
  { id: 'vp-e17', conceptId: 'vb1-phrasal', type: 'choose_word', prompt: 'I ___ an old photo while cleaning the attic.', points: 1, options: ['came across', 'came over', 'came up'], accepted: ['came across'] },
  { id: 'vp-e18', conceptId: 'vb1-phrasal', type: 'choose_word', prompt: 'She ___ her grandmother whenever she is ill.', points: 1, options: ['looks after', 'looks for', 'looks up'], accepted: ['looks after'] },
  { id: 'vp-e19', conceptId: 'vb1-phrasal', type: 'fill_gap', prompt: 'It took him months to get ___ the flu.', points: 1, accepted: ['over'] },
  { id: 'vp-e20', conceptId: 'vb1-phrasal', type: 'fill_gap', prompt: 'We set ___ at six in the morning to avoid the traffic.', points: 1, accepted: ['off', 'out'] },
  { id: 'vp-e21', conceptId: 'vb1-phrasal', type: 'translate_ru_en', prompt: 'Я случайно встретил старого друга вчера.', points: 2, accepted: ['I ran into an old friend yesterday', 'I bumped into an old friend yesterday'] },
  { id: 'vp-e22', conceptId: 'vb1-phrasal', type: 'translate_ru_en', prompt: 'Она начала заниматься йогой в прошлом году.', points: 2, accepted: ['She took up yoga last year'] },
  { id: 'vp-e23', conceptId: 'vb1-phrasal', type: 'multi_gap', prompt: 'I came ___ this book by chance, and now I cannot put it ___.', points: 1, gaps: [{ accepted: ['across'] }, { accepted: ['down'] }] },
  { id: 'vp-e24', conceptId: 'vb1-phrasal', type: 'word_order', prompt: 'Соберите: «Я не могу мириться с этим шумом»', points: 1, bank: ['I', "can't", 'put', 'up', 'with', 'this', 'noise'], accepted: ["I can't put up with this noise"] },
];
