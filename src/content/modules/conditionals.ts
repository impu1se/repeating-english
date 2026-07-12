import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'conditionals',
  title: 'Conditionals: First & Second',
  level: 'B1-B2',
  masteryThreshold: 50,
  conceptIds: ['cond-first', 'cond-second'],
};

export const concepts: Concept[] = [
  {
    id: 'cond-first',
    moduleId: 'conditionals',
    title: 'First Conditional: if + Present, will',
    kind: 'grammar',
    theory: 'First Conditional — реальное условие в будущем: if + Present Simple, will + V1.\n• If it rains, we will stay at home.\nПосле if / when / unless / as soon as НЕ ставим will: If she studies (не will study)…\nunless = if not: You won\'t pass unless you study.\nas soon as = «как только» — тоже без will в этой части: As soon as I arrive, I will call you.',
    exerciseIds: [
      'cf-e1', 'cf-e2', 'cf-e3', 'cf-e4', 'cf-e5', 'cf-e6', 'cf-e7',
      'cf-e8', 'cf-e9', 'cf-e10', 'cf-e11', 'cf-e12', 'cf-e13', 'cf-e14',
      'cf-e15', 'cf-e16', 'cf-e17', 'cf-e18', 'cf-e19', 'cf-e20',
    ],
  },
  {
    id: 'cond-second',
    moduleId: 'conditionals',
    title: 'Second Conditional: if + Past, would',
    kind: 'grammar',
    theory: 'Second Conditional — воображаемая ситуация сейчас/в будущем: if + Past Simple, would + V1.\n• If I were rich, I would buy a house by the sea.\nwere — для всех лиц: If I were you, I would take the job.\nIf I were you — «на твоём месте» — устойчивая фраза для советов: If I were you, I would apologise.\nОтличие от First: ситуация маловероятна или нереальна.',
    exerciseIds: [
      'cs-e1', 'cs-e2', 'cs-e3', 'cs-e4', 'cs-e5', 'cs-e6', 'cs-e7',
      'cs-e8', 'cs-e9', 'cs-e10', 'cs-e11', 'cs-e12', 'cs-e13', 'cs-e14',
      'cs-e15', 'cs-e16', 'cs-e17', 'cs-e18', 'cs-e19', 'cs-e20',
    ],
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
  // --- First Conditional: extension (when/as soon as, unless) ---
  { id: 'cf-e8', conceptId: 'cond-first', type: 'translate_ru_en', prompt: 'Как только я приеду, я тебе позвоню.', points: 2, accepted: ['As soon as I arrive, I will call you', "As soon as I arrive, I'll call you", 'I will call you as soon as I arrive', "I'll call you as soon as I arrive"] },
  { id: 'cf-e9', conceptId: 'cond-first', type: 'translate_ru_en', prompt: 'Если ты не поторопишься, мы опоздаем.', points: 2, accepted: ["If you don't hurry, we will be late", "If you don't hurry, we'll be late", 'If you do not hurry, we will be late', "We will be late if you don't hurry", "We'll be late if you don't hurry"] },
  { id: 'cf-e10', conceptId: 'cond-first', type: 'translate_ru_en', prompt: 'Когда я закончу университет, я найду работу.', points: 2, accepted: ['When I finish university, I will find a job', "When I finish university, I'll find a job", 'I will find a job when I finish university', "I'll find a job when I finish university"] },
  { id: 'cf-e11', conceptId: 'cond-first', type: 'fill_gap', prompt: 'As soon as it stops raining, we ___ go for a walk.', points: 1, accepted: ['will', "'ll"] },
  { id: 'cf-e12', conceptId: 'cond-first', type: 'fill_gap', prompt: "Unless you ___ me the truth, I won't be able to help you.", points: 1, accepted: ['tell'] },
  { id: 'cf-e13', conceptId: 'cond-first', type: 'verb_form', prompt: 'As soon as she (arrive) ___, we will start the meeting.', points: 1, accepted: ['arrives'] },
  { id: 'cf-e14', conceptId: 'cond-first', type: 'verb_form', prompt: 'If it (not rain) ___ tomorrow, we will have a picnic.', points: 1, accepted: ["doesn't rain", 'does not rain'] },
  { id: 'cf-e15', conceptId: 'cond-first', type: 'choose_word', prompt: 'As soon as I ___ home, I will feed the cat.', points: 1, options: ['get', 'will get', 'got'], accepted: ['get'] },
  { id: 'cf-e16', conceptId: 'cond-first', type: 'choose_word', prompt: 'We will miss the train ___ we hurry.', points: 1, options: ['unless', 'if', 'when'], accepted: ['unless'] },
  { id: 'cf-e17', conceptId: 'cond-first', type: 'word_order', prompt: 'Соберите: «Как только дождь закончится, мы пойдём гулять»', points: 1, bank: ['as', 'soon', 'as', 'the', 'rain', 'stops', 'we', 'will', 'go', 'for', 'a', 'walk'], accepted: ['as soon as the rain stops we will go for a walk'] },
  { id: 'cf-e18', conceptId: 'cond-first', type: 'word_order', prompt: 'Соберите: «Если у нас будет время, мы посетим музей»', points: 1, bank: ['if', 'we', 'have', 'time', 'we', 'will', 'visit', 'the', 'museum'], accepted: ['if we have time we will visit the museum'] },
  { id: 'cf-e19', conceptId: 'cond-first', type: 'multi_gap', prompt: 'As soon as he ___ (finish) work, he ___ (call) you.', points: 1, gaps: [{ accepted: ['finishes'] }, { accepted: ['will call', "'ll call"] }] },
  { id: 'cf-e20', conceptId: 'cond-first', type: 'multi_gap', prompt: 'If they ___ (not hurry), they ___ (miss) the flight.', points: 1, gaps: [{ accepted: ["don't hurry", 'do not hurry'] }, { accepted: ['will miss', "'ll miss"] }] },

  // --- Second Conditional ---
  { id: 'cs-e1', conceptId: 'cond-second', type: 'translate_ru_en', prompt: 'Если бы я был богат, я бы купил дом у моря.', points: 2, accepted: ['If I were rich, I would buy a house by the sea', 'If I was rich, I would buy a house by the sea', "If I were rich, I'd buy a house by the sea", "If I was rich, I'd buy a house by the sea", 'If I were rich, I would buy a house near the sea'] },
  { id: 'cs-e2', conceptId: 'cond-second', type: 'choose_word', prompt: 'If I ___ you, I would take the job.', points: 1, options: ['were', 'am', 'would be'], accepted: ['were'] },
  { id: 'cs-e3', conceptId: 'cond-second', type: 'verb_form', prompt: 'If she (have) ___ more time, she would travel.', points: 1, accepted: ['had'] },
  { id: 'cs-e4', conceptId: 'cond-second', type: 'fill_gap', prompt: 'What would you do if you ___ a million dollars?', points: 1, accepted: ['won', 'had', 'got', 'found'] },
  { id: 'cs-e5', conceptId: 'cond-second', type: 'word_order', prompt: 'Соберите: «Если бы я знал ответ, я бы сказал тебе»', points: 1, bank: ['if', 'I', 'knew', 'the', 'answer', 'I', 'would', 'tell', 'you'], accepted: ['if I knew the answer I would tell you'] },
  { id: 'cs-e6', conceptId: 'cond-second', type: 'multi_gap', prompt: 'If we ___ (live) closer, we ___ (see) each other more often.', points: 1, gaps: [{ accepted: ['lived'] }, { accepted: ['would see', "'d see"] }] },
  { id: 'cs-e7', conceptId: 'cond-second', type: 'choose_word', prompt: 'I would help you if I ___.', points: 1, options: ['could', 'can', 'will'], accepted: ['could'] },
  // --- Second Conditional: extension (If I were you — advice) ---
  { id: 'cs-e8', conceptId: 'cond-second', type: 'translate_ru_en', prompt: 'На твоём месте я бы извинился.', points: 2, accepted: ['If I were you, I would apologise', "If I were you, I'd apologise", 'If I were you, I would apologize', "If I were you, I'd apologize"] },
  { id: 'cs-e9', conceptId: 'cond-second', type: 'translate_ru_en', prompt: 'Если бы у меня было больше денег, я бы путешествовал по всему миру.', points: 2, accepted: ['If I had more money, I would travel around the world', "If I had more money, I'd travel around the world", 'If I had more money I would travel the world', "If I had more money I'd travel the world"] },
  { id: 'cs-e10', conceptId: 'cond-second', type: 'translate_ru_en', prompt: 'Что бы ты сделал, если бы увидел призрака?', points: 2, accepted: ['What would you do if you saw a ghost?', 'If you saw a ghost, what would you do?'] },
  { id: 'cs-e11', conceptId: 'cond-second', type: 'fill_gap', prompt: 'If I were you, I ___ accept that offer.', points: 1, accepted: ['would', "'d"] },
  { id: 'cs-e12', conceptId: 'cond-second', type: 'fill_gap', prompt: 'If she knew the answer, she ___ tell us.', points: 1, accepted: ['would', "'d"] },
  { id: 'cs-e13', conceptId: 'cond-second', type: 'verb_form', prompt: 'If I (be) ___ you, I would talk to him.', points: 1, accepted: ['were', 'was'] },
  { id: 'cs-e14', conceptId: 'cond-second', type: 'verb_form', prompt: 'If they (have) ___ more time, they would finish the project properly.', points: 1, accepted: ['had'] },
  { id: 'cs-e15', conceptId: 'cond-second', type: 'choose_word', prompt: "If I ___ you, I wouldn't say that.", points: 1, options: ['were', 'is', 'would be'], accepted: ['were'] },
  { id: 'cs-e16', conceptId: 'cond-second', type: 'choose_word', prompt: 'If you ___ him, what would you say?', points: 1, options: ['met', 'meet', 'would meet'], accepted: ['met'] },
  { id: 'cs-e17', conceptId: 'cond-second', type: 'word_order', prompt: 'Соберите: «На твоём месте я бы позвонил ей»', points: 1, bank: ['if', 'i', 'were', 'you', 'i', 'would', 'call', 'her'], accepted: ['if i were you i would call her'] },
  { id: 'cs-e18', conceptId: 'cond-second', type: 'word_order', prompt: 'Соберите: «Если бы я умел готовить, я бы приготовил ужин»', points: 1, bank: ['if', 'i', 'could', 'cook', 'i', 'would', 'make', 'dinner'], accepted: ['if i could cook i would make dinner'] },
  { id: 'cs-e19', conceptId: 'cond-second', type: 'multi_gap', prompt: 'If I ___ (be) you, I ___ (not wait) any longer.', points: 1, gaps: [{ accepted: ['were', 'was'] }, { accepted: ["wouldn't wait", 'would not wait'] }] },
  { id: 'cs-e20', conceptId: 'cond-second', type: 'multi_gap', prompt: 'If we ___ (know) the way, we ___ (not get) lost.', points: 1, gaps: [{ accepted: ['knew'] }, { accepted: ["wouldn't get", 'would not get'] }] },
];
