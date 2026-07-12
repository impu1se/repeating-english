import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'b1-verb-patterns',
  title: 'Герундий и инфинитив: глагольные конструкции',
  level: 'B1',
  masteryThreshold: 50,
  conceptIds: ['b1-gerund-infinitive', 'b1-verb-prepositions'],
};

export const concepts: Concept[] = [
  {
    id: 'b1-gerund-infinitive',
    moduleId: 'b1-verb-patterns',
    title: 'Gerund vs Infinitive: -ing или to + verb',
    kind: 'grammar',
    theory:
      "После некоторых глаголов следующий глагол всегда стоит в форме герундия (-ing): enjoy, avoid, finish, mind, keep...\n• I enjoy reading in the evening. She avoids eating late at night. He finished writing the report.\nПосле других глаголов — только инфинитив с to: want, decide, hope, plan, promise, agree...\n• I want to see that film. We decided to leave early. She promised to call me.\nlike / love / hate — работают оба варианта, ошибки здесь нет:\n• I like swimming. = I like to swim. — оба верны.\nstop + -ing и stop + to + инфинитив — РАЗНЫЙ смысл! Главная ловушка темы:\n• I stopped smoking. — Я бросил курить (прекратил привычку).\n• I stopped to smoke. — Я остановился, чтобы покурить (остановился с целью).\nЗапоминайте не отдельные глаголы, а типичные словосочетания целиком.",
    exerciseIds: [
      'b1gi-e1', 'b1gi-e2', 'b1gi-e3', 'b1gi-e4', 'b1gi-e5',
      'b1gi-e6', 'b1gi-e7', 'b1gi-e8', 'b1gi-e9', 'b1gi-e10',
      'b1gi-e11', 'b1gi-e12', 'b1gi-e13', 'b1gi-e14', 'b1gi-e15',
      'b1gi-e16', 'b1gi-e17', 'b1gi-e18', 'b1gi-e19', 'b1gi-e20',
    ],
  },
  {
    id: 'b1-verb-prepositions',
    moduleId: 'b1-verb-patterns',
    title: 'Verb / adjective + preposition + -ing',
    kind: 'grammar',
    theory:
      "После прилагательных и глаголов с предлогом (at, in, of, to...) следующий глагол всегда в форме герундия (-ing), а не в инфинитиве:\n• be good at doing — хорошо получаться: She's good at cooking.\n• be interested in doing — интересоваться: I'm interested in learning French.\n• be afraid of doing / be tired of doing — бояться / устать от: He's afraid of flying. I'm tired of waiting.\nlook forward to doing — предвкушать, ждать с нетерпением. Здесь to — предлог, а не частица инфинитива!\n• I look forward to seeing you soon. (не to see!)\nbefore / after + -ing — когда это предлоги перед действием:\n• Wash your hands before eating. He checked his phone after waking up.\nОбщее правило: после любого предлога глагол всегда в форме -ing, никогда просто to + verb.",
    exerciseIds: [
      'b1vp-e1', 'b1vp-e2', 'b1vp-e3', 'b1vp-e4', 'b1vp-e5',
      'b1vp-e6', 'b1vp-e7', 'b1vp-e8', 'b1vp-e9', 'b1vp-e10',
      'b1vp-e11', 'b1vp-e12', 'b1vp-e13', 'b1vp-e14', 'b1vp-e15',
      'b1vp-e16', 'b1vp-e17', 'b1vp-e18', 'b1vp-e19', 'b1vp-e20',
    ],
  },
];

export const exercises: Exercise[] = [
  // ============ b1-gerund-infinitive ============
  // --- translate_ru_en ---
  { id: 'b1gi-e1', conceptId: 'b1-gerund-infinitive', type: 'translate_ru_en', prompt: 'Ей нравится готовить по выходным.', points: 2, accepted: ['She likes cooking at the weekends', 'She likes to cook at the weekends', 'She loves cooking at the weekends', 'She likes cooking on weekends', 'She likes to cook on weekends', 'She loves cooking on weekends'] },
  { id: 'b1gi-e2', conceptId: 'b1-gerund-infinitive', type: 'translate_ru_en', prompt: 'Мы планируем переехать в другой город в следующем году.', points: 2, accepted: ['We plan to move to another city next year', "We're planning to move to another city next year", 'Next year we plan to move to another city'] },
  { id: 'b1gi-e3', conceptId: 'b1-gerund-infinitive', type: 'translate_ru_en', prompt: 'Он бросил пить кофе, потому что плохо спал.', points: 2, accepted: ["He stopped drinking coffee because he wasn't sleeping well", "He stopped drinking coffee because he didn't sleep well", "He gave up drinking coffee because he wasn't sleeping well"] },
  { id: 'b1gi-e4', conceptId: 'b1-gerund-infinitive', type: 'translate_ru_en', prompt: 'По дороге домой мы остановились, чтобы купить хлеб.', points: 2, accepted: ['On the way home, we stopped to buy some bread', 'On the way home we stopped to buy bread', 'We stopped to buy some bread on the way home'] },
  // --- fill_gap ---
  { id: 'b1gi-e5', conceptId: 'b1-gerund-infinitive', type: 'fill_gap', prompt: 'She promised ___ call me as soon as she landed.', points: 1, accepted: ['to'] },
  { id: 'b1gi-e6', conceptId: 'b1-gerund-infinitive', type: 'fill_gap', prompt: 'We decided ___ sell the old car instead of repairing it.', points: 1, accepted: ['to'] },
  { id: 'b1gi-e7', conceptId: 'b1-gerund-infinitive', type: 'fill_gap', prompt: "Would you mind ___ the window? It's getting cold in here.", points: 1, accepted: ['closing', 'shutting'] },
  // --- verb_form ---
  { id: 'b1gi-e8', conceptId: 'b1-gerund-infinitive', type: 'verb_form', prompt: 'I enjoy (do) ___ sport at the weekends.', points: 1, accepted: ['doing'] },
  { id: 'b1gi-e9', conceptId: 'b1-gerund-infinitive', type: 'verb_form', prompt: "He (stop) ___ eating so much sugar — it's part of his new diet.", points: 1, accepted: ['stopped'] },
  { id: 'b1gi-e10', conceptId: 'b1-gerund-infinitive', type: 'verb_form', prompt: 'On the way home, he (stop) ___ buy some milk.', points: 1, accepted: ['stopped to'] },
  // --- choose_word ---
  { id: 'b1gi-e11', conceptId: 'b1-gerund-infinitive', type: 'choose_word', prompt: 'I want ___ a new laptop before the term starts.', points: 1, options: ['to buy', 'buying', 'buy'], accepted: ['to buy'] },
  { id: 'b1gi-e12', conceptId: 'b1-gerund-infinitive', type: 'choose_word', prompt: 'She finished ___ her homework before dinner.', points: 1, options: ['doing', 'to do', 'do'], accepted: ['doing'] },
  { id: 'b1gi-e13', conceptId: 'b1-gerund-infinitive', type: 'choose_word', prompt: 'We stopped ___ a photo of the mountains — it was such a beautiful view.', points: 1, options: ['to take', 'taking', 'take'], accepted: ['to take'] },
  { id: 'b1gi-e14', conceptId: 'b1-gerund-infinitive', type: 'choose_word', prompt: 'He avoids ___ to loud music late at night because of the neighbours.', points: 1, options: ['listening', 'to listen', 'listen'], accepted: ['listening'] },
  // --- word_order ---
  { id: 'b1gi-e15', conceptId: 'b1-gerund-infinitive', type: 'word_order', prompt: 'Соберите: «Я планирую поступить в университет в следующем году»', points: 1, bank: ['I', 'plan', 'to', 'go', 'to', 'university', 'next', 'year'], accepted: ['I plan to go to university next year', 'Next year I plan to go to university'] },
  { id: 'b1gi-e16', conceptId: 'b1-gerund-infinitive', type: 'word_order', prompt: 'Соберите: «Он не против подождать несколько минут»', points: 1, bank: ['he', "doesn't", 'mind', 'waiting', 'a', 'few', 'minutes'], accepted: ["he doesn't mind waiting a few minutes"] },
  { id: 'b1gi-e17', conceptId: 'b1-gerund-infinitive', type: 'word_order', prompt: 'Соберите: «Он ненавидит вставать рано утром»', points: 1, bank: ['he', 'hates', 'getting', 'up', 'early', 'in', 'the', 'morning'], accepted: ['he hates getting up early in the morning'] },
  // --- multi_gap ---
  { id: 'b1gi-e18', conceptId: 'b1-gerund-infinitive', type: 'multi_gap', prompt: 'She ___ (stop) eating fast food last month, but on her way home yesterday she ___ (stop) buy a bottle of water.', points: 1, gaps: [{ accepted: ['stopped'] }, { accepted: ['stopped to'] }] },
  { id: 'b1gi-e19', conceptId: 'b1-gerund-infinitive', type: 'multi_gap', prompt: 'I ___ (want) visit Japan someday, and my sister ___ (hope) join me on the trip.', points: 1, gaps: [{ accepted: ['want to'] }, { accepted: ['hopes to'] }] },
  { id: 'b1gi-e20', conceptId: 'b1-gerund-infinitive', type: 'multi_gap', prompt: 'He enjoys ___ (play) chess online, but he wants ___ (improve) his skills by taking lessons.', points: 1, gaps: [{ accepted: ['playing'] }, { accepted: ['to improve'] }] },

  // ============ b1-verb-prepositions ============
  // --- translate_ru_en ---
  { id: 'b1vp-e1', conceptId: 'b1-verb-prepositions', type: 'translate_ru_en', prompt: 'У неё хорошо получается готовить.', points: 2, accepted: ["She's good at cooking", 'She is good at cooking', "She's really good at cooking"] },
  { id: 'b1vp-e2', conceptId: 'b1-verb-prepositions', type: 'translate_ru_en', prompt: 'Я боюсь летать на самолётах.', points: 2, accepted: ["I'm afraid of flying", 'I am afraid of flying', "I'm scared of flying"] },
  { id: 'b1vp-e3', conceptId: 'b1-verb-prepositions', type: 'translate_ru_en', prompt: 'Я жду не дождусь встречи с тобой.', points: 2, accepted: ["I'm looking forward to seeing you", 'I am looking forward to seeing you', 'I look forward to seeing you'] },
  { id: 'b1vp-e4', conceptId: 'b1-verb-prepositions', type: 'translate_ru_en', prompt: 'Помой руки перед едой.', points: 2, accepted: ['Wash your hands before eating', 'Please wash your hands before eating', 'Wash your hands before eating, please'] },
  // --- fill_gap ---
  { id: 'b1vp-e5', conceptId: 'b1-verb-prepositions', type: 'fill_gap', prompt: "I'm interested ___ learning French this year.", points: 1, accepted: ['in'] },
  { id: 'b1vp-e6', conceptId: 'b1-verb-prepositions', type: 'fill_gap', prompt: "She's really good ___ solving difficult problems.", points: 1, accepted: ['at'] },
  { id: 'b1vp-e7', conceptId: 'b1-verb-prepositions', type: 'fill_gap', prompt: "He's tired ___ waiting in this queue — he's ready to complain to someone.", points: 1, accepted: ['of'] },
  // --- verb_form ---
  { id: 'b1vp-e8', conceptId: 'b1-verb-prepositions', type: 'verb_form', prompt: "I'm really looking forward to (see) ___ you again.", points: 1, accepted: ['seeing'] },
  { id: 'b1vp-e9', conceptId: 'b1-verb-prepositions', type: 'verb_form', prompt: "She's afraid of (fly) ___, so she always travels by train.", points: 1, accepted: ['flying'] },
  { id: 'b1vp-e10', conceptId: 'b1-verb-prepositions', type: 'verb_form', prompt: 'He checked his phone after (wake) ___ up this morning.', points: 1, accepted: ['waking'] },
  // --- choose_word ---
  { id: 'b1vp-e11', conceptId: 'b1-verb-prepositions', type: 'choose_word', prompt: "I'm interested in ___ a new language.", points: 1, options: ['learning', 'to learn', 'learn'], accepted: ['learning'] },
  { id: 'b1vp-e12', conceptId: 'b1-verb-prepositions', type: 'choose_word', prompt: "She's good at ___ people feel comfortable.", points: 1, options: ['making', 'to make', 'make'], accepted: ['making'] },
  { id: 'b1vp-e13', conceptId: 'b1-verb-prepositions', type: 'choose_word', prompt: "We're looking forward to ___ from you soon.", points: 1, options: ['hearing', 'to hear', 'hear'], accepted: ['hearing'] },
  { id: 'b1vp-e14', conceptId: 'b1-verb-prepositions', type: 'choose_word', prompt: 'Turn off the lights before ___ the house.', points: 1, options: ['leaving', 'to leave', 'leave'], accepted: ['leaving'] },
  // --- word_order ---
  { id: 'b1vp-e15', conceptId: 'b1-verb-prepositions', type: 'word_order', prompt: 'Соберите: «Он боится летать»', points: 1, bank: ['he', 'is', 'afraid', 'of', 'flying'], accepted: ['he is afraid of flying'] },
  { id: 'b1vp-e16', conceptId: 'b1-verb-prepositions', type: 'word_order', prompt: 'Соберите: «Она хорошо готовит»', points: 1, bank: ['she', 'is', 'good', 'at', 'cooking'], accepted: ['she is good at cooking'] },
  { id: 'b1vp-e17', conceptId: 'b1-verb-prepositions', type: 'word_order', prompt: 'Соберите: «Помой руки перед едой»', points: 1, bank: ['wash', 'your', 'hands', 'before', 'eating'], accepted: ['wash your hands before eating', 'before eating wash your hands'] },
  // --- multi_gap ---
  { id: 'b1vp-e18', conceptId: 'b1-verb-prepositions', type: 'multi_gap', prompt: "I'm interested ___ learning French, but I'm not very good ___ speaking it yet.", points: 1, gaps: [{ accepted: ['in'] }, { accepted: ['at'] }] },
  { id: 'b1vp-e19', conceptId: 'b1-verb-prepositions', type: 'multi_gap', prompt: "We're really looking forward ___ seeing you, and we're also interested ___ visiting the new museum while we're there.", points: 1, gaps: [{ accepted: ['to'] }, { accepted: ['in'] }] },
  { id: 'b1vp-e20', conceptId: 'b1-verb-prepositions', type: 'multi_gap', prompt: 'Before ___ (leave) the office, please turn off your computer, and after ___ (lock) the door, drop the key at reception.', points: 1, gaps: [{ accepted: ['leaving'] }, { accepted: ['locking'] }] },
];
