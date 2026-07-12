import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'a1-be-present-simple',
  title: 'Present Simple: to be и обычные глаголы',
  level: 'A1',
  masteryThreshold: 50,
  conceptIds: ['a1-be', 'a1-present-simple', 'a1-ps-questions'],
};

export const concepts: Concept[] = [
  {
    id: 'a1-be',
    moduleId: 'a1-be-present-simple',
    title: 'Глагол to be: am/is/are',
    kind: 'grammar',
    theory:
      "Глагол to be (быть/являться) в Present Simple: am / is / are.\n• I am a student. — Я студент. (сокращение: I'm)\n• He/She/It is at home. — Он/она/оно дома. (He's/She's/It's)\n• We/You/They are ready. — Мы/вы/они готовы. (We're/You're/They're)\nОтрицание: am not (без сокращения), isn't/is not, aren't/are not.\nВопрос — глагол выходит на первое место: Is she tired? Are you ready?\nКраткие ответы: Yes, I am. / No, she isn't. / No, they aren't. (в утвердительном кратком ответе 'am/is/are' не сокращают)",
    exerciseIds: [
      'a1be-e1', 'a1be-e2', 'a1be-e3', 'a1be-e4', 'a1be-e5',
      'a1be-e6', 'a1be-e7', 'a1be-e8', 'a1be-e9', 'a1be-e10',
      'a1be-e11', 'a1be-e12', 'a1be-e13', 'a1be-e14', 'a1be-e15',
      'a1be-e16', 'a1be-e17', 'a1be-e18', 'a1be-e19', 'a1be-e20',
    ],
  },
  {
    id: 'a1-present-simple',
    moduleId: 'a1-be-present-simple',
    title: 'Present Simple: утверждения и наречия частоты',
    kind: 'grammar',
    theory:
      'Present Simple — обычные, регулярные действия и факты.\n• I live in Moscow. — Я живу в Москве.\n• She works in a bank. — Она работает в банке. (he/she/it + глагол-s)\nОкончания 3-го лица: обычно -s (works, lives); после -s/-sh/-ch/-x/-o добавляем -es (watches, goes); согласная + y → -ies (study → studies).\nНаречия частоты (always, usually, often, sometimes, never) стоят ПЕРЕД смысловым глаголом, но ПОСЛЕ am/is/are:\n• She always drinks tea. — Она всегда пьёт чай.\n• I am never late. — Я никогда не опаздываю.',
    exerciseIds: [
      'a1ps-e1', 'a1ps-e2', 'a1ps-e3', 'a1ps-e4', 'a1ps-e5',
      'a1ps-e6', 'a1ps-e7', 'a1ps-e8', 'a1ps-e9', 'a1ps-e10',
      'a1ps-e11', 'a1ps-e12', 'a1ps-e13', 'a1ps-e14', 'a1ps-e15',
      'a1ps-e16', 'a1ps-e17', 'a1ps-e18', 'a1ps-e19', 'a1ps-e20',
    ],
  },
  {
    id: 'a1-ps-questions',
    moduleId: 'a1-be-present-simple',
    title: 'Present Simple: вопросы с do/does',
    kind: 'grammar',
    theory:
      "Вопросы и отрицания в Present Simple образуются с помощью do/does (сам смысловой глагол остаётся в базовой форме).\n• Do you like tea? — Ты любишь чай? (I/you/we/they → do)\n• Does she like tea? — Она любит чай? (he/she/it → does)\nОтрицание: don't (do not) / doesn't (does not) + базовая форма глагола.\n• I don't like coffee. She doesn't like coffee.\nВопросительные слова (Wh-) стоят перед do/does: What do you do? Where does he live? Why don't you call her?",
    exerciseIds: [
      'a1pq-e1', 'a1pq-e2', 'a1pq-e3', 'a1pq-e4', 'a1pq-e5',
      'a1pq-e6', 'a1pq-e7', 'a1pq-e8', 'a1pq-e9', 'a1pq-e10',
      'a1pq-e11', 'a1pq-e12', 'a1pq-e13', 'a1pq-e14', 'a1pq-e15',
      'a1pq-e16', 'a1pq-e17', 'a1pq-e18', 'a1pq-e19', 'a1pq-e20',
    ],
  },
];

export const exercises: Exercise[] = [
  // ============ a1-be: am/is/are ============
  // --- translate_ru_en ---
  { id: 'a1be-e1', conceptId: 'a1-be', type: 'translate_ru_en', prompt: 'Она врач.', points: 2, accepted: ['She is a doctor', "She's a doctor"] },
  { id: 'a1be-e7', conceptId: 'a1-be', type: 'translate_ru_en', prompt: 'Мы не готовы.', points: 2, accepted: ['We are not ready', "We aren't ready", "We're not ready"] },
  { id: 'a1be-e8', conceptId: 'a1-be', type: 'translate_ru_en', prompt: 'Ты голоден?', points: 2, accepted: ['Are you hungry?'] },
  { id: 'a1be-e9', conceptId: 'a1-be', type: 'translate_ru_en', prompt: 'Я не устал.', points: 2, accepted: ['I am not tired', "I'm not tired"] },
  // --- fill_gap ---
  { id: 'a1be-e2', conceptId: 'a1-be', type: 'fill_gap', prompt: 'They ___ from Spain.', points: 1, accepted: ['are', "aren't", 'are not'] },
  { id: 'a1be-e10', conceptId: 'a1-be', type: 'fill_gap', prompt: 'This ___ my brother.', points: 1, accepted: ['is', "isn't", 'is not'] },
  { id: 'a1be-e11', conceptId: 'a1-be', type: 'fill_gap', prompt: 'I ___ ready yet, wait a minute.', points: 1, accepted: ['am not', "'m not"] },
  // --- verb_form ---
  { id: 'a1be-e3', conceptId: 'a1-be', type: 'verb_form', prompt: 'My brother (be) ___ ten years old.', points: 1, accepted: ['is'] },
  { id: 'a1be-e12', conceptId: 'a1-be', type: 'verb_form', prompt: 'Our teacher (be) ___ very strict.', points: 1, accepted: ['is'] },
  { id: 'a1be-e13', conceptId: 'a1-be', type: 'verb_form', prompt: 'You and I (be) ___ good friends.', points: 1, accepted: ['are'] },
  // --- choose_word ---
  { id: 'a1be-e4', conceptId: 'a1-be', type: 'choose_word', prompt: '___ you tired?', points: 1, options: ['Are', 'Is', 'Am'], accepted: ['Are'] },
  { id: 'a1be-e14', conceptId: 'a1-be', type: 'choose_word', prompt: 'She ___ a nurse.', points: 1, options: ['is', 'are', 'am'], accepted: ['is'] },
  { id: 'a1be-e15', conceptId: 'a1-be', type: 'choose_word', prompt: 'Is he ready? No, he ___.', points: 1, options: ["isn't", "don't", "doesn't"], accepted: ["isn't"] },
  { id: 'a1be-e16', conceptId: 'a1-be', type: 'choose_word', prompt: 'We ___ from Russia.', points: 1, options: ['are', 'is', 'am'], accepted: ['are'] },
  // --- word_order ---
  { id: 'a1be-e5', conceptId: 'a1-be', type: 'word_order', prompt: 'Соберите: «Мы дома»', points: 1, bank: ['we', 'are', 'at', 'home'], accepted: ['we are at home'] },
  { id: 'a1be-e17', conceptId: 'a1-be', type: 'word_order', prompt: 'Соберите: «Он не готов»', points: 1, bank: ['he', 'is', 'not', 'ready'], accepted: ['he is not ready'] },
  { id: 'a1be-e18', conceptId: 'a1-be', type: 'word_order', prompt: 'Соберите: «Вы голодны?»', points: 1, bank: ['are', 'you', 'hungry'], accepted: ['are you hungry'] },
  // --- multi_gap ---
  { id: 'a1be-e6', conceptId: 'a1-be', type: 'multi_gap', prompt: 'I ___ hungry, but he ___ not.', points: 1, gaps: [{ accepted: ['am', "'m"] }, { accepted: ['is'] }] },
  { id: 'a1be-e19', conceptId: 'a1-be', type: 'multi_gap', prompt: 'She ___ a doctor, and they ___ nurses.', points: 1, gaps: [{ accepted: ['is', "isn't", 'is not'] }, { accepted: ['are', "aren't", 'are not'] }] },
  { id: 'a1be-e20', conceptId: 'a1-be', type: 'multi_gap', prompt: 'It ___ Monday today, but it ___ Tuesday.', points: 1, gaps: [{ accepted: ["isn't", 'is not'] }, { accepted: ['is', "'s"] }] },

  // ============ a1-present-simple: statements & frequency adverbs ============
  // --- translate_ru_en ---
  { id: 'a1ps-e1', conceptId: 'a1-present-simple', type: 'translate_ru_en', prompt: 'Она работает в банке.', points: 2, accepted: ['She works in a bank', 'She works at a bank'] },
  { id: 'a1ps-e2', conceptId: 'a1-present-simple', type: 'translate_ru_en', prompt: 'Я всегда пью кофе утром.', points: 2, accepted: ['I always drink coffee in the morning', 'In the morning, I always drink coffee'] },
  { id: 'a1ps-e3', conceptId: 'a1-present-simple', type: 'translate_ru_en', prompt: 'Мой отец никогда не смотрит телевизор.', points: 2, accepted: ['My father never watches TV', 'My father never watches television'] },
  { id: 'a1ps-e4', conceptId: 'a1-present-simple', type: 'translate_ru_en', prompt: 'Мы живём в маленькой квартире.', points: 2, accepted: ['We live in a small flat', 'We live in a small apartment', 'We live in a little flat', 'We live in a little apartment'] },
  // --- fill_gap ---
  { id: 'a1ps-e5', conceptId: 'a1-present-simple', type: 'fill_gap', prompt: 'My brother is a chef. He ___ delicious food every day.', points: 1, accepted: ['cooks', 'makes'] },
  { id: 'a1ps-e6', conceptId: 'a1-present-simple', type: 'fill_gap', prompt: 'The sun ___ in the east.', points: 1, accepted: ['rises', 'comes up'] },
  { id: 'a1ps-e7', conceptId: 'a1-present-simple', type: 'fill_gap', prompt: 'My father ___ works late.', points: 1, accepted: ['always', 'usually', 'often', 'sometimes', 'never'] },
  // --- verb_form ---
  { id: 'a1ps-e8', conceptId: 'a1-present-simple', type: 'verb_form', prompt: 'She (study) ___ English every day.', points: 1, accepted: ['studies'] },
  { id: 'a1ps-e9', conceptId: 'a1-present-simple', type: 'verb_form', prompt: 'He (watch) ___ the news every evening.', points: 1, accepted: ['watches'] },
  { id: 'a1ps-e10', conceptId: 'a1-present-simple', type: 'verb_form', prompt: 'My mother (go) ___ to the market on Saturdays.', points: 1, accepted: ['goes'] },
  // --- choose_word ---
  { id: 'a1ps-e11', conceptId: 'a1-present-simple', type: 'choose_word', prompt: 'My sister ___ in a hospital.', points: 1, options: ['works', 'work', 'working'], accepted: ['works'] },
  { id: 'a1ps-e12', conceptId: 'a1-present-simple', type: 'choose_word', prompt: 'I ___ tea every morning.', points: 1, options: ['drink', 'drinks', 'drinking'], accepted: ['drink'] },
  { id: 'a1ps-e13', conceptId: 'a1-present-simple', type: 'choose_word', prompt: 'We ___ have breakfast together.', points: 1, options: ['always', 'ever', 'yet'], accepted: ['always'] },
  { id: 'a1ps-e14', conceptId: 'a1-present-simple', type: 'choose_word', prompt: 'He ___ his teeth twice a day.', points: 1, options: ['brushes', 'brush', 'brushing'], accepted: ['brushes'] },
  // --- word_order ---
  { id: 'a1ps-e15', conceptId: 'a1-present-simple', type: 'word_order', prompt: 'Соберите: «Она всегда пьёт чай утром»', points: 1, bank: ['she', 'always', 'drinks', 'tea', 'in', 'the', 'morning'], accepted: ['she always drinks tea in the morning'] },
  { id: 'a1ps-e16', conceptId: 'a1-present-simple', type: 'word_order', prompt: 'Соберите: «Мой брат работает в офисе»', points: 1, bank: ['my', 'brother', 'works', 'in', 'an', 'office'], accepted: ['my brother works in an office'] },
  { id: 'a1ps-e17', conceptId: 'a1-present-simple', type: 'word_order', prompt: 'Соберите: «Я никогда не пью кофе вечером»', points: 1, bank: ['I', 'never', 'drink', 'coffee', 'in', 'the', 'evening'], accepted: ['I never drink coffee in the evening'] },
  // --- multi_gap ---
  { id: 'a1ps-e18', conceptId: 'a1-present-simple', type: 'multi_gap', prompt: 'My sister ___ (work) in a shop, and she ___ (like) her job.', points: 1, gaps: [{ accepted: ['works'] }, { accepted: ['likes'] }] },
  { id: 'a1ps-e19', conceptId: 'a1-present-simple', type: 'multi_gap', prompt: 'My grandmother ___ (cook) dinner every day, but she ___ (wash) the dishes only sometimes.', points: 1, gaps: [{ accepted: ['cooks'] }, { accepted: ['washes'] }] },
  { id: 'a1ps-e20', conceptId: 'a1-present-simple', type: 'multi_gap', prompt: 'Coffee keeps me awake at night, so I ___ drink it in the evening. But tea is relaxing, so I ___ drink it before bed.', points: 1, gaps: [{ accepted: ['never', 'rarely'] }, { accepted: ['always', 'usually', 'often'] }] },

  // ============ a1-ps-questions: do/does, don't/doesn't, Wh- ============
  // --- translate_ru_en ---
  { id: 'a1pq-e1', conceptId: 'a1-ps-questions', type: 'translate_ru_en', prompt: 'Ты любишь чай?', points: 2, accepted: ['Do you like tea?'] },
  { id: 'a1pq-e2', conceptId: 'a1-ps-questions', type: 'translate_ru_en', prompt: 'Она не любит кофе.', points: 2, accepted: ["She doesn't like coffee", 'She does not like coffee'] },
  { id: 'a1pq-e3', conceptId: 'a1-ps-questions', type: 'translate_ru_en', prompt: 'Где ты живёшь?', points: 2, accepted: ['Where do you live?'] },
  { id: 'a1pq-e4', conceptId: 'a1-ps-questions', type: 'translate_ru_en', prompt: 'Почему он не звонит тебе?', points: 2, accepted: ["Why doesn't he call you?", 'Why does he not call you?', "Why doesn't he phone you?"] },
  // --- fill_gap ---
  { id: 'a1pq-e5', conceptId: 'a1-ps-questions', type: 'fill_gap', prompt: '___ she like pizza?', points: 1, accepted: ['does'] },
  { id: 'a1pq-e6', conceptId: 'a1-ps-questions', type: 'fill_gap', prompt: 'I ___ understand this word.', points: 1, accepted: ["don't", 'do not'] },
  { id: 'a1pq-e7', conceptId: 'a1-ps-questions', type: 'fill_gap', prompt: 'Where ___ your parents live?', points: 1, accepted: ['do'] },
  // --- verb_form ---
  { id: 'a1pq-e8', conceptId: 'a1-ps-questions', type: 'verb_form', prompt: 'Does she (like) ___ coffee?', points: 1, accepted: ['like'] },
  { id: 'a1pq-e9', conceptId: 'a1-ps-questions', type: 'verb_form', prompt: 'Where does he (work) ___?', points: 1, accepted: ['work'] },
  { id: 'a1pq-e10', conceptId: 'a1-ps-questions', type: 'verb_form', prompt: "They don't (want) ___ to go.", points: 1, accepted: ['want'] },
  // --- choose_word ---
  { id: 'a1pq-e11', conceptId: 'a1-ps-questions', type: 'choose_word', prompt: '___ you like tea?', points: 1, options: ['Do', 'Does', 'Are'], accepted: ['Do'] },
  { id: 'a1pq-e12', conceptId: 'a1-ps-questions', type: 'choose_word', prompt: '___ she work on Sundays?', points: 1, options: ['Does', 'Do', 'Is'], accepted: ['Does'] },
  { id: 'a1pq-e13', conceptId: 'a1-ps-questions', type: 'choose_word', prompt: 'He ___ like spicy food.', points: 1, options: ["doesn't", "don't", "isn't"], accepted: ["doesn't"] },
  { id: 'a1pq-e14', conceptId: 'a1-ps-questions', type: 'choose_word', prompt: '___ do you live?', points: 1, options: ['Where', 'What', 'Who'], accepted: ['Where'] },
  // --- word_order ---
  { id: 'a1pq-e15', conceptId: 'a1-ps-questions', type: 'word_order', prompt: 'Соберите: «Ты говоришь по-английски?»', points: 1, bank: ['do', 'you', 'speak', 'English'], accepted: ['do you speak English'] },
  { id: 'a1pq-e16', conceptId: 'a1-ps-questions', type: 'word_order', prompt: 'Соберите: «Она не смотрит фильмы»', points: 1, bank: ['she', 'does', 'not', 'watch', 'movies'], accepted: ['she does not watch movies'] },
  { id: 'a1pq-e17', conceptId: 'a1-ps-questions', type: 'word_order', prompt: 'Соберите: «Где вы работаете?»', points: 1, bank: ['where', 'do', 'you', 'work'], accepted: ['where do you work'] },
  // --- multi_gap ---
  { id: 'a1pq-e18', conceptId: 'a1-ps-questions', type: 'multi_gap', prompt: '___ you like tea, and ___ she like coffee?', points: 1, gaps: [{ accepted: ['do'] }, { accepted: ['does'] }] },
  { id: 'a1pq-e19', conceptId: 'a1-ps-questions', type: 'multi_gap', prompt: 'He ___ (not like) spicy food, but he ___ (love) sweet food.', points: 1, gaps: [{ accepted: ["doesn't like", 'does not like'] }, { accepted: ['loves'] }] },
  { id: 'a1pq-e20', conceptId: 'a1-ps-questions', type: 'multi_gap', prompt: 'Where ___ you live, and where ___ your husband work?', points: 1, gaps: [{ accepted: ['do'] }, { accepted: ['does'] }] },
];
