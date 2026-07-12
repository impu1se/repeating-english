import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'a2-quantity',
  title: 'Количество: исчисляемость, much/many/few/little',
  level: 'A2',
  masteryThreshold: 50,
  conceptIds: ['a2-countability', 'a2-much-many'],
};

export const concepts: Concept[] = [
  {
    id: 'a2-countability',
    moduleId: 'a2-quantity',
    title: 'Исчисляемые и неисчисляемые существительные',
    kind: 'grammar',
    theory:
      'Исчисляемые существительные (countable) — можно посчитать, есть множественное число: one apple — two apples, a book — books.\nНеисчисляемые (uncountable) — нельзя посчитать, только единственное число, без a/an: money, advice, news, information, furniture, water, bread, luggage.\n• I need some advice. (не an advice, не advices) There is a lot of furniture here.\nПеред исчисляемыми в единственном числе — a/an: I bought a book.\nПеред неисчисляемыми и множественным числом — some (утверждение) / any (вопрос, отрицание), но не a/an:\n• I need some money. Do you have any information?\nНекоторые слова, исчисляемые в русском, в английском неисчисляемые: advice (совет/советы), news (новость/новости), information (информация) — всегда в единственном числе: The news is good today. (не The news are)',
    exerciseIds: [
      'a2ct-e1', 'a2ct-e2', 'a2ct-e3', 'a2ct-e4', 'a2ct-e5',
      'a2ct-e6', 'a2ct-e7', 'a2ct-e8', 'a2ct-e9', 'a2ct-e10',
      'a2ct-e11', 'a2ct-e12', 'a2ct-e13', 'a2ct-e14', 'a2ct-e15',
      'a2ct-e16', 'a2ct-e17', 'a2ct-e18', 'a2ct-e19', 'a2ct-e20',
    ],
  },
  {
    id: 'a2-much-many',
    moduleId: 'a2-quantity',
    title: 'much / many / a lot of, (a) few, (a) little',
    kind: 'grammar',
    theory:
      "much — с неисчисляемыми (money, time, water); many — с исчисляемыми во множественном числе (books, people). a lot of — с обоими, более нейтрально и употребительно в утверждениях.\n• I don't have much time. She has many friends. We have a lot of homework / a lot of books.\nВопрос о количестве: How much...? (неисчисляемые), How many...? (исчисляемые):\n• How much money do you need? How many people are coming?\na few / few — немного/мало (с исчисляемыми, few — почти нет, негативный оттенок):\n• I have a few friends here. (немного, это хорошо) Few people came. (почти никто, это плохо)\na little / little — немного/мало (с неисчисляемыми, little — почти нет):\n• We have a little time before the train. There is little hope left.",
    exerciseIds: [
      'a2mm-e1', 'a2mm-e2', 'a2mm-e3', 'a2mm-e4', 'a2mm-e5',
      'a2mm-e6', 'a2mm-e7', 'a2mm-e8', 'a2mm-e9', 'a2mm-e10',
      'a2mm-e11', 'a2mm-e12', 'a2mm-e13', 'a2mm-e14', 'a2mm-e15',
      'a2mm-e16', 'a2mm-e17', 'a2mm-e18', 'a2mm-e19', 'a2mm-e20',
    ],
  },
];

export const exercises: Exercise[] = [
  // ============ a2-countability ============
  // --- translate_ru_en ---
  { id: 'a2ct-e1', conceptId: 'a2-countability', type: 'translate_ru_en', prompt: 'Мне нужен совет.', points: 2, accepted: ['I need some advice', 'I need advice'] },
  { id: 'a2ct-e2', conceptId: 'a2-countability', type: 'translate_ru_en', prompt: 'У меня есть немного денег.', points: 2, accepted: ['I have some money'] },
  { id: 'a2ct-e3', conceptId: 'a2-countability', type: 'translate_ru_en', prompt: 'Это хорошая новость.', points: 2, accepted: ['This is good news', 'That is good news'] },
  { id: 'a2ct-e4', conceptId: 'a2-countability', type: 'translate_ru_en', prompt: 'У нас нет мебели в этой комнате.', points: 2, accepted: ["We don't have any furniture in this room", 'We do not have any furniture in this room'] },
  // --- fill_gap ---
  { id: 'a2ct-e5', conceptId: 'a2-countability', type: 'fill_gap', prompt: 'She gave me some good ___ about my career.', points: 1, accepted: ['advice'] },
  { id: 'a2ct-e6', conceptId: 'a2-countability', type: 'fill_gap', prompt: "There isn't much ___ in the newspaper today — just the weather report.", points: 1, accepted: ['news'] },
  { id: 'a2ct-e7', conceptId: 'a2-countability', type: 'fill_gap', prompt: "We don't have enough ___ in the living room — we need another chair.", points: 1, accepted: ['furniture'] },
  // --- verb_form ---
  { id: 'a2ct-e8', conceptId: 'a2-countability', type: 'verb_form', prompt: 'The news (be) ___ very good today.', points: 1, accepted: ['is'] },
  { id: 'a2ct-e9', conceptId: 'a2-countability', type: 'verb_form', prompt: 'My luggage (be) ___ too heavy.', points: 1, accepted: ['is'] },
  { id: 'a2ct-e10', conceptId: 'a2-countability', type: 'verb_form', prompt: 'These apples (be) ___ fresh.', points: 1, accepted: ['are'] },
  // --- choose_word ---
  { id: 'a2ct-e11', conceptId: 'a2-countability', type: 'choose_word', prompt: "Can you give me some ___? I don't know what to choose.", points: 1, options: ['advice', 'advices', 'an advice'], accepted: ['advice'] },
  { id: 'a2ct-e12', conceptId: 'a2-countability', type: 'choose_word', prompt: "I don't have much ___ this month.", points: 1, options: ['money', 'moneys', 'a money'], accepted: ['money'] },
  { id: 'a2ct-e13', conceptId: 'a2-countability', type: 'choose_word', prompt: 'We need ___ information about the hotel.', points: 1, options: ['some', 'a', 'many'], accepted: ['some'] },
  { id: 'a2ct-e14', conceptId: 'a2-countability', type: 'choose_word', prompt: 'She bought ___ new chairs for the kitchen.', points: 1, options: ['some', 'much', 'a'], accepted: ['some'] },
  // --- word_order ---
  { id: 'a2ct-e15', conceptId: 'a2-countability', type: 'word_order', prompt: 'Соберите: «Мне нужен твой совет»', points: 1, bank: ['I', 'need', 'your', 'advice'], accepted: ['I need your advice'] },
  { id: 'a2ct-e16', conceptId: 'a2-countability', type: 'word_order', prompt: 'Соберите: «У нас не так много мебели»', points: 1, bank: ['we', 'do', 'not', 'have', 'much', 'furniture'], accepted: ['we do not have much furniture'] },
  { id: 'a2ct-e17', conceptId: 'a2-countability', type: 'word_order', prompt: 'Соберите: «Это отличная новость!»', points: 1, bank: ['this', 'is', 'great', 'news'], accepted: ['this is great news'] },
  // --- multi_gap ---
  { id: 'a2ct-e18', conceptId: 'a2-countability', type: 'multi_gap', prompt: "Can you give me ___ advice about the exam? I'll also need ___ information about the syllabus.", points: 1, gaps: [{ accepted: ['some'] }, { accepted: ['some'] }] },
  { id: 'a2ct-e19', conceptId: 'a2-countability', type: 'multi_gap', prompt: "We don't have ___ money left, and we don't have ___ chairs either.", points: 1, gaps: [{ accepted: ['much'] }, { accepted: ['many'] }] },
  { id: 'a2ct-e20', conceptId: 'a2-countability', type: 'multi_gap', prompt: 'I bought ___ book and ___ furniture for my new flat.', points: 1, gaps: [{ accepted: ['a'] }, { accepted: ['some'] }] },

  // ============ a2-much-many ============
  // --- translate_ru_en ---
  { id: 'a2mm-e1', conceptId: 'a2-much-many', type: 'translate_ru_en', prompt: 'У меня не так много времени.', points: 2, accepted: ["I don't have much time", 'I do not have much time'] },
  { id: 'a2mm-e2', conceptId: 'a2-much-many', type: 'translate_ru_en', prompt: 'Сколько у тебя друзей?', points: 2, accepted: ['How many friends do you have?'] },
  { id: 'a2mm-e3', conceptId: 'a2-much-many', type: 'translate_ru_en', prompt: 'У нас есть немного времени до поезда.', points: 2, accepted: ['We have a little time before the train'] },
  { id: 'a2mm-e4', conceptId: 'a2-much-many', type: 'translate_ru_en', prompt: 'У неё много домашней работы.', points: 2, accepted: ['She has a lot of homework'] },
  // --- fill_gap ---
  { id: 'a2mm-e5', conceptId: 'a2-much-many', type: 'fill_gap', prompt: 'How ___ sugar do you want in your coffee?', points: 1, accepted: ['much'] },
  { id: 'a2mm-e6', conceptId: 'a2-much-many', type: 'fill_gap', prompt: 'How ___ books did you read last year?', points: 1, accepted: ['many'] },
  { id: 'a2mm-e7', conceptId: 'a2-much-many', type: 'fill_gap', prompt: "We have very ___ time, so let's hurry.", points: 1, accepted: ['little'] },
  // --- verb_form ---
  { id: 'a2mm-e8', conceptId: 'a2-much-many', type: 'verb_form', prompt: 'How ___ milk is left in the bottle?', points: 1, accepted: ['much'] },
  { id: 'a2mm-e9', conceptId: 'a2-much-many', type: 'verb_form', prompt: 'How ___ students are in your group?', points: 1, accepted: ['many'] },
  { id: 'a2mm-e10', conceptId: 'a2-much-many', type: 'verb_form', prompt: "We have very ___ time before the train leaves — let's run!", points: 1, accepted: ['little'] },
  // --- choose_word ---
  { id: 'a2mm-e11', conceptId: 'a2-much-many', type: 'choose_word', prompt: "I don't have ___ money for a taxi.", points: 1, options: ['much', 'many', 'a lot'], accepted: ['much'] },
  { id: 'a2mm-e12', conceptId: 'a2-much-many', type: 'choose_word', prompt: 'How ___ children do you have?', points: 1, options: ['many', 'much', 'few'], accepted: ['many'] },
  { id: 'a2mm-e13', conceptId: 'a2-much-many', type: 'choose_word', prompt: "Don't worry, we have ___ time — no need to rush.", points: 1, options: ['a little', 'little', 'a few'], accepted: ['a little'] },
  { id: 'a2mm-e14', conceptId: 'a2-much-many', type: 'choose_word', prompt: 'Unfortunately, ___ people came to the concert — it was almost empty.', points: 1, options: ['few', 'a few', 'a little'], accepted: ['few'] },
  // --- word_order ---
  { id: 'a2mm-e15', conceptId: 'a2-much-many', type: 'word_order', prompt: 'Соберите: «Сколько у тебя денег?»', points: 1, bank: ['how', 'much', 'money', 'do', 'you', 'have'], accepted: ['how much money do you have'] },
  { id: 'a2mm-e16', conceptId: 'a2-much-many', type: 'word_order', prompt: 'Соберите: «У нас мало времени»', points: 1, bank: ['we', 'have', 'little', 'time'], accepted: ['we have little time'] },
  { id: 'a2mm-e17', conceptId: 'a2-much-many', type: 'word_order', prompt: 'Соберите: «У неё есть несколько друзей здесь»', points: 1, bank: ['she', 'has', 'a', 'few', 'friends', 'here'], accepted: ['she has a few friends here'] },
  // --- multi_gap ---
  { id: 'a2mm-e18', conceptId: 'a2-much-many', type: 'multi_gap', prompt: 'How ___ time do we have, and how ___ people are coming?', points: 1, gaps: [{ accepted: ['much'] }, { accepted: ['many'] }] },
  { id: 'a2mm-e19', conceptId: 'a2-much-many', type: 'multi_gap', prompt: "We have ___ money, so we're okay, but very ___ time, so let's hurry.", points: 1, gaps: [{ accepted: ['a little'] }, { accepted: ['little'] }] },
  { id: 'a2mm-e20', conceptId: 'a2-much-many', type: 'multi_gap', prompt: '___ friends showed up, which was nice, but ___ snacks were left — the table was almost empty.', points: 1, gaps: [{ accepted: ['a few'] }, { accepted: ['few'] }] },
];
