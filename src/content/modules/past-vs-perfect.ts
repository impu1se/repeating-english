import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'past-vs-perfect',
  title: 'Past Simple vs Present Perfect',
  level: 'B1',
  masteryThreshold: 20,
  conceptIds: ['psp-past-simple', 'psp-contrast'],
};

export const concepts: Concept[] = [
  {
    id: 'psp-past-simple',
    moduleId: 'past-vs-perfect',
    title: 'Past Simple: законченное время',
    kind: 'grammar',
    theory: 'Past Simple — законченное действие в законченном времени: V2 (или did + V1).\nМаркеры: yesterday, last week, two days ago, in 2019, when?\n• She moved to London in 2019.\n• I didn\'t watch TV last night. / Did you see him?\nОтрицание и вопрос — через did, глагол возвращается в базовую форму.',
    exerciseIds: [
      'psp-e1', 'psp-e2', 'psp-e3', 'psp-e4', 'psp-e5', 'psp-e6', 'psp-e7',
      'psp-e8', 'psp-e9', 'psp-e10', 'psp-e11', 'psp-e12', 'psp-e13', 'psp-e14',
      'psp-e15', 'psp-e16', 'psp-e17', 'psp-e18', 'psp-e19', 'psp-e20',
      'psp-e21', 'psp-e22', 'psp-e23', 'psp-e24', 'psp-e25', 'psp-e26', 'psp-e27', 'psp-e28', 'psp-e29', 'psp-e30',
    ],
  },
  {
    id: 'psp-contrast',
    moduleId: 'past-vs-perfect',
    title: 'Контраст: Past Simple или Present Perfect',
    kind: 'grammar',
    theory: 'Выбор между Past Simple и Present Perfect:\n• Время названо (in 2020, yesterday, ago) → Past Simple: I saw it in 2020.\n• Опыт или результат «к настоящему», время не названо → Present Perfect: I have seen it three times.\n• already / just / yet / ever / never → Present Perfect.\n• ago / last / when? → Past Simple.\n• Незаконченный период (today, this week, this month), если он ещё не закончился → Present Perfect: I have called him three times today.',
    exerciseIds: [
      'psc-e1', 'psc-e2', 'psc-e3', 'psc-e4', 'psc-e5', 'psc-e6', 'psc-e7',
      'psc-e8', 'psc-e9', 'psc-e10', 'psc-e11', 'psc-e12', 'psc-e13', 'psc-e14',
      'psc-e15', 'psc-e16', 'psc-e17', 'psc-e18', 'psc-e19', 'psc-e20',
      'psc-e21', 'psc-e22', 'psc-e23', 'psc-e24', 'psc-e25', 'psc-e26', 'psc-e27', 'psc-e28', 'psc-e29', 'psc-e30',
    ],
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
  // --- Past Simple: extension (new scenarios, same rules) ---
  { id: 'psp-e8', conceptId: 'psp-past-simple', type: 'translate_ru_en', prompt: 'Мы поужинали в новом ресторане в субботу.', points: 2, accepted: ['We had dinner at a new restaurant on Saturday', 'We had dinner in a new restaurant on Saturday', 'On Saturday, we had dinner at a new restaurant'] },
  { id: 'psp-e9', conceptId: 'psp-past-simple', type: 'translate_ru_en', prompt: 'Он позвонил мне два часа назад.', points: 2, accepted: ['He called me two hours ago', 'He phoned me two hours ago', 'Two hours ago, he called me'] },
  { id: 'psp-e10', conceptId: 'psp-past-simple', type: 'translate_ru_en', prompt: 'Они поженились в 2015 году.', points: 2, accepted: ['They got married in 2015', 'They married in 2015', 'In 2015, they got married'] },
  { id: 'psp-e11', conceptId: 'psp-past-simple', type: 'fill_gap', prompt: 'We ___ a great time at the party last night.', points: 1, accepted: ['had'] },
  { id: 'psp-e12', conceptId: 'psp-past-simple', type: 'fill_gap', prompt: 'I ___ my umbrella at home yesterday, so I got wet.', points: 1, accepted: ['left', 'forgot'] },
  { id: 'psp-e13', conceptId: 'psp-past-simple', type: 'verb_form', prompt: 'They (buy) ___ a new car last month.', points: 1, accepted: ['bought'] },
  { id: 'psp-e14', conceptId: 'psp-past-simple', type: 'verb_form', prompt: 'I (not sleep) ___ well last night.', points: 1, accepted: ["didn't sleep", 'did not sleep'] },
  { id: 'psp-e15', conceptId: 'psp-past-simple', type: 'choose_word', prompt: 'She ___ to the gym three times last week.', points: 1, options: ['went', 'has gone', 'goes'], accepted: ['went'] },
  { id: 'psp-e16', conceptId: 'psp-past-simple', type: 'choose_word', prompt: '___ they arrive on time yesterday?', points: 1, options: ['Did', 'Have', 'Were'], accepted: ['Did'] },
  { id: 'psp-e17', conceptId: 'psp-past-simple', type: 'word_order', prompt: 'Соберите: «Вчера вечером я приготовил ужин»', points: 1, bank: ['i', 'cooked', 'dinner', 'last', 'night'], accepted: ['i cooked dinner last night', 'last night i cooked dinner'] },
  { id: 'psp-e18', conceptId: 'psp-past-simple', type: 'word_order', prompt: 'Соберите: «Она не пришла на встречу вчера»', points: 1, bank: ['she', 'did', 'not', 'come', 'to', 'the', 'meeting', 'yesterday'], accepted: ['she did not come to the meeting yesterday', 'yesterday she did not come to the meeting'] },
  { id: 'psp-e19', conceptId: 'psp-past-simple', type: 'multi_gap', prompt: 'Yesterday she ___ (wake) up late and ___ (miss) her train.', points: 1, gaps: [{ accepted: ['woke'] }, { accepted: ['missed'] }] },
  { id: 'psp-e20', conceptId: 'psp-past-simple', type: 'multi_gap', prompt: 'We ___ (not go) to the beach last weekend because it ___ (rain) all day.', points: 1, gaps: [{ accepted: ["didn't go", 'did not go'] }, { accepted: ['rained'] }] },

  // --- Contrast: experience/result vs finished time ---
  { id: 'psc-e1', conceptId: 'psp-contrast', type: 'choose_word', prompt: 'I ___ this film three times.', points: 1, options: ['have seen', 'saw', 'see'], accepted: ['have seen'] },
  { id: 'psc-e2', conceptId: 'psp-contrast', type: 'choose_word', prompt: 'I ___ it in 2020.', points: 1, options: ['watched', 'have watched', 'watch'], accepted: ['watched'] },
  { id: 'psc-e3', conceptId: 'psp-contrast', type: 'translate_ru_en', prompt: 'Я уже закончил работу.', points: 2, accepted: ['I have already finished the work', "I've already finished the work", 'I have already finished my work', "I've already finished my work", 'I have already finished work'] },
  { id: 'psc-e4', conceptId: 'psp-contrast', type: 'verb_form', prompt: 'Look! Somebody (break) ___ the window.', points: 1, accepted: ['has broken'] },
  { id: 'psc-e5', conceptId: 'psp-contrast', type: 'fill_gap', prompt: "She hasn't ___ me back yet.", points: 1, accepted: ['called', 'phoned'] },
  { id: 'psc-e6', conceptId: 'psp-contrast', type: 'multi_gap', prompt: 'I ___ (live) here since 2020, but before that I ___ (live) in Kazan.', points: 1, gaps: [{ accepted: ['have lived', 'have been living'] }, { accepted: ['lived'] }] },
  { id: 'psc-e7', conceptId: 'psp-contrast', type: 'word_order', prompt: 'Соберите: «Я никогда не пробовал устрицы»', points: 1, bank: ['I', 'have', 'never', 'tried', 'oysters'], accepted: ['I have never tried oysters'] },
  // --- Contrast: extension (this week / today — unfinished period → Present Perfect) ---
  { id: 'psc-e8', conceptId: 'psp-contrast', type: 'translate_ru_en', prompt: 'Я звонил ему три раза сегодня.', points: 2, accepted: ['I have called him three times today', "I've called him three times today", 'I have phoned him three times today', "I've phoned him three times today"] },
  { id: 'psc-e9', conceptId: 'psp-contrast', type: 'translate_ru_en', prompt: 'Мы не виделись на этой неделе.', points: 2, accepted: ["We haven't seen each other this week", 'We have not seen each other this week', "We haven't seen one another this week"] },
  { id: 'psc-e10', conceptId: 'psp-contrast', type: 'translate_ru_en', prompt: 'Вчера она купила новую сумку.', points: 2, accepted: ['She bought a new bag yesterday', 'Yesterday she bought a new bag', 'She bought a new handbag yesterday'] },
  { id: 'psc-e11', conceptId: 'psp-contrast', type: 'fill_gap', prompt: 'I have already ___ three cups of coffee this morning.', points: 1, accepted: ['had', 'drunk'] },
  { id: 'psc-e12', conceptId: 'psp-contrast', type: 'fill_gap', prompt: "We haven't finished the project ___, even though it's due today.", points: 1, accepted: ['yet'] },
  { id: 'psc-e13', conceptId: 'psp-contrast', type: 'verb_form', prompt: "I (see) ___ him twice this week, and the week isn't over yet.", points: 1, accepted: ['have seen', "'ve seen"] },
  { id: 'psc-e14', conceptId: 'psp-contrast', type: 'verb_form', prompt: 'Yesterday, she (finish) ___ the report before lunch.', points: 1, accepted: ['finished'] },
  { id: 'psc-e15', conceptId: 'psp-contrast', type: 'choose_word', prompt: "I ___ two emails already today, and it's still early.", points: 1, options: ['have written', 'wrote', 'write'], accepted: ['have written'] },
  { id: 'psc-e16', conceptId: 'psp-contrast', type: 'choose_word', prompt: '___ you seen the new episode yet, or should I avoid spoilers?', points: 1, options: ['Have', 'Did', 'Were'], accepted: ['Have'] },
  { id: 'psc-e17', conceptId: 'psp-contrast', type: 'word_order', prompt: 'Соберите: «Я уже написал два письма сегодня»', points: 1, bank: ['i', 'have', 'already', 'written', 'two', 'letters', 'today'], accepted: ['i have already written two letters today'] },
  { id: 'psc-e18', conceptId: 'psp-contrast', type: 'word_order', prompt: 'Соберите: «Она купила новый телефон вчера»', points: 1, bank: ['she', 'bought', 'a', 'new', 'phone', 'yesterday'], accepted: ['she bought a new phone yesterday'] },
  { id: 'psc-e19', conceptId: 'psp-contrast', type: 'multi_gap', prompt: 'I ___ (call) him twice today, but he ___ (not answer) yet.', points: 1, gaps: [{ accepted: ['have called', "'ve called"] }, { accepted: ["hasn't answered", 'has not answered'] }] },
  { id: 'psc-e20', conceptId: 'psp-contrast', type: 'multi_gap', prompt: 'Yesterday I ___ (see) three films, but this week I ___ (see) only one.', points: 1, gaps: [{ accepted: ['saw'] }, { accepted: ['have seen', "'ve seen"] }] },
  // ---- добор: psp-past-simple ----
  { id: 'psp-e21', conceptId: 'psp-past-simple', type: 'translate_ru_en', prompt: 'Я закончил школу в 2010 году.', points: 2, accepted: ['I finished school in 2010', 'I left school in 2010'] },
  { id: 'psp-e22', conceptId: 'psp-past-simple', type: 'translate_ru_en', prompt: 'Вчера утром она опоздала на автобус.', points: 2, accepted: ['She missed the bus yesterday morning', 'Yesterday morning she missed the bus'] },
  { id: 'psp-e23', conceptId: 'psp-past-simple', type: 'fill_gap', prompt: 'Shakespeare ___ many famous plays.', points: 1, accepted: ['wrote'] },
  { id: 'psp-e24', conceptId: 'psp-past-simple', type: 'fill_gap', prompt: 'When ___ you last see her?', points: 1, accepted: ['did'] },
  { id: 'psp-e25', conceptId: 'psp-past-simple', type: 'verb_form', prompt: 'They (leave) ___ the party at midnight.', points: 1, accepted: ['left'] },
  { id: 'psp-e26', conceptId: 'psp-past-simple', type: 'choose_word', prompt: 'I ___ my homework two hours ago.', points: 1, options: ['did', 'have done', 'do'], accepted: ['did'] },
  { id: 'psp-e27', conceptId: 'psp-past-simple', type: 'choose_word', prompt: 'She ___ in this company from 2015 to 2019.', points: 1, options: ['worked', 'has worked', 'works'], accepted: ['worked'] },
  { id: 'psp-e28', conceptId: 'psp-past-simple', type: 'word_order', prompt: 'Соберите: «Он ушёл с работы в прошлом году»', points: 1, bank: ['he', 'left', 'his', 'job', 'last', 'year'], accepted: ['he left his job last year'] },
  { id: 'psp-e29', conceptId: 'psp-past-simple', type: 'word_order', prompt: 'Соберите: «Когда ты видел её в последний раз?»', points: 1, bank: ['when', 'did', 'you', 'last', 'see', 'her'], accepted: ['when did you last see her'] },
  { id: 'psp-e30', conceptId: 'psp-past-simple', type: 'multi_gap', prompt: 'She ___ (leave) at six and ___ (arrive) home at eight.', points: 1, gaps: [{ accepted: ['left'] }, { accepted: ['arrived'] }] },

  // ---- добор: psp-contrast ----
  { id: 'psc-e21', conceptId: 'psp-contrast', type: 'translate_ru_en', prompt: 'Сегодня я прочитал две книги.', points: 2, accepted: ['I have read two books today', "I've read two books today"] },
  { id: 'psc-e22', conceptId: 'psp-contrast', type: 'translate_ru_en', prompt: 'Вчера я прочитал две книги.', points: 2, accepted: ['I read two books yesterday', 'Yesterday I read two books'] },
  { id: 'psc-e23', conceptId: 'psp-contrast', type: 'fill_gap', prompt: 'I ___ lost my keys — I cannot open the door.', points: 1, accepted: ['have', "'ve"] },
  { id: 'psc-e24', conceptId: 'psp-contrast', type: 'fill_gap', prompt: 'We ___ this film last night and loved it.', points: 1, accepted: ['watched', 'saw'] },
  { id: 'psc-e25', conceptId: 'psp-contrast', type: 'verb_form', prompt: 'He (live) ___ in Berlin since 2018.', points: 1, accepted: ['has lived'] },
  { id: 'psc-e26', conceptId: 'psp-contrast', type: 'choose_word', prompt: 'I ___ him at the conference last March.', points: 1, options: ['met', 'have met', 'meet'], accepted: ['met'] },
  { id: 'psc-e27', conceptId: 'psp-contrast', type: 'choose_word', prompt: 'She ___ her homework — she can go out now.', points: 1, options: ['has finished', 'finished', 'finishes'], accepted: ['has finished'] },
  { id: 'psc-e28', conceptId: 'psp-contrast', type: 'word_order', prompt: 'Соберите: «Я потерял паспорт»', points: 1, bank: ['I', 'have', 'lost', 'my', 'passport'], accepted: ['I have lost my passport'] },
  { id: 'psc-e29', conceptId: 'psp-contrast', type: 'word_order', prompt: 'Соберите: «Она купила эту машину в 2020 году»', points: 1, bank: ['she', 'bought', 'this', 'car', 'in', '2020'], accepted: ['she bought this car in 2020'] },
  { id: 'psc-e30', conceptId: 'psp-contrast', type: 'multi_gap', prompt: 'I ___ (see) that film last week, but I ___ (not see) the new one yet.', points: 1, gaps: [{ accepted: ['saw'] }, { accepted: ["haven't seen", 'have not seen'] }] },
];
