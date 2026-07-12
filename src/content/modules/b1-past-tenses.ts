import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'b1-past-tenses',
  title: 'Прошедшие времена 2: Past Continuous, used to, Past Perfect',
  level: 'B1',
  masteryThreshold: 50,
  conceptIds: ['b1-past-continuous', 'b1-used-to', 'b1-past-perfect'],
};

export const concepts: Concept[] = [
  {
    id: 'b1-past-continuous',
    moduleId: 'b1-past-tenses',
    title: 'Past Continuous: was/were + V-ing',
    kind: 'grammar',
    theory:
      "Past Continuous — действие в процессе в определённый момент прошлого; часто это фон для другого, более короткого действия.\nОбразование: was/were + V-ing (I/he/she/it + was; we/you/they + were).\n• She was reading a book. They were watching a film.\nФон + прерывание: длинное действие (Past Continuous) прерывается коротким (Past Simple).\n• I was cooking dinner when he called. — Я готовил ужин, когда он позвонил.\nwhen обычно вводит короткое действие (Past Simple), while — длинное фоновое (Past Continuous):\n• The phone rang while I was cooking. / While I was cooking, the phone rang.\nДва одновременных длинных действия — оба в Past Continuous: While she was reading, he was cooking dinner.\nОтрицание: wasn't/weren't + V-ing. Вопрос: was/were выходит перед подлежащим.\n• What were you doing at 8 pm yesterday? I wasn't sleeping — I was working.",
    exerciseIds: [
      'b1pc-e1', 'b1pc-e2', 'b1pc-e3', 'b1pc-e4', 'b1pc-e5',
      'b1pc-e6', 'b1pc-e7', 'b1pc-e8', 'b1pc-e9', 'b1pc-e10',
      'b1pc-e11', 'b1pc-e12', 'b1pc-e13', 'b1pc-e14', 'b1pc-e15',
      'b1pc-e16', 'b1pc-e17', 'b1pc-e18', 'b1pc-e19', 'b1pc-e20',
    ],
  },
  {
    id: 'b1-used-to',
    moduleId: 'b1-past-tenses',
    title: 'used to: привычки в прошлом',
    kind: 'grammar',
    theory:
      "used to + V1 — привычки и состояния в прошлом, которых больше нет (сейчас всё иначе).\n• I used to play football every weekend. — Раньше я играл в футбол каждые выходные.\n• She used to live in Paris. (used to — и для состояний тоже)\nОтрицание: didn't use to + V1 (без -d в use!).\n• He didn't use to like coffee, but now he loves it.\nВопрос: Did you use to + V1?\n• Did you use to smoke?\nwould — тоже для повторяющихся действий в прошлом, но НЕ для состояний (нельзя would live, would like):\n• When I was a child, I would visit my grandmother every summer. = I used to visit her every summer.\nНе путайте used to (привычка) с be used to + V-ing (привык к чему-либо) — это другая структура.",
    exerciseIds: [
      'b1ut-e1', 'b1ut-e2', 'b1ut-e3', 'b1ut-e4', 'b1ut-e5',
      'b1ut-e6', 'b1ut-e7', 'b1ut-e8', 'b1ut-e9', 'b1ut-e10',
      'b1ut-e11', 'b1ut-e12', 'b1ut-e13', 'b1ut-e14', 'b1ut-e15',
      'b1ut-e16', 'b1ut-e17', 'b1ut-e18', 'b1ut-e19', 'b1ut-e20',
    ],
  },
  {
    id: 'b1-past-perfect',
    moduleId: 'b1-past-tenses',
    title: 'Past Perfect: had + V3',
    kind: 'grammar',
    theory:
      "Past Perfect (had + V3) — действие, которое произошло раньше другого прошедшего действия («прошлое в прошлом»).\n• When I arrived, the film had already started. — Когда я пришёл, фильм уже начался.\nОбразование: had + причастие прошедшего времени (V3): had gone, had seen, had finished.\nОтрицание: hadn't (had not) + V3. Вопрос: had выходит перед подлежащим: Had you finished before I called?\nСлова-маркеры: after, before, by the time, already, just, never.\n• By the time we arrived, they had already left.\nПосле after/before Past Perfect необязателен — подойдёт и Past Simple: After he finished work, he went home.\nНо если нужно подчеркнуть порядок без after/before — Past Perfect обязателен:\n• When I got home, my brother had already eaten dinner.",
    exerciseIds: [
      'b1pp-e1', 'b1pp-e2', 'b1pp-e3', 'b1pp-e4', 'b1pp-e5',
      'b1pp-e6', 'b1pp-e7', 'b1pp-e8', 'b1pp-e9', 'b1pp-e10',
      'b1pp-e11', 'b1pp-e12', 'b1pp-e13', 'b1pp-e14', 'b1pp-e15',
      'b1pp-e16', 'b1pp-e17', 'b1pp-e18', 'b1pp-e19', 'b1pp-e20',
    ],
  },
];

export const exercises: Exercise[] = [
  // ============ b1-past-continuous ============
  // --- translate_ru_en ---
  { id: 'b1pc-e1', conceptId: 'b1-past-continuous', type: 'translate_ru_en', prompt: 'Я готовил ужин, когда он позвонил.', points: 2, accepted: ['I was cooking dinner when he called', 'I was cooking dinner when he phoned', 'When he called, I was cooking dinner'] },
  { id: 'b1pc-e2', conceptId: 'b1-past-continuous', type: 'translate_ru_en', prompt: 'Она не спала, когда я пришёл домой.', points: 2, accepted: ["She wasn't sleeping when I got home", 'She was not sleeping when I got home', "She wasn't sleeping when I came home"] },
  { id: 'b1pc-e3', conceptId: 'b1-past-continuous', type: 'translate_ru_en', prompt: 'Мы гуляли в парке, когда начался дождь.', points: 2, accepted: ['We were walking in the park when it started to rain', 'We were walking in the park when it began to rain', 'When it started to rain, we were walking in the park'] },
  { id: 'b1pc-e4', conceptId: 'b1-past-continuous', type: 'translate_ru_en', prompt: 'Пока я готовил ужин, зазвонил телефон.', points: 2, accepted: ['While I was cooking dinner, the phone rang', 'The phone rang while I was cooking dinner', 'While I was cooking dinner, my phone rang'] },
  // --- fill_gap ---
  { id: 'b1pc-e5', conceptId: 'b1-past-continuous', type: 'fill_gap', prompt: 'She ___ cooking dinner when the doorbell rang.', points: 1, accepted: ['was'] },
  { id: 'b1pc-e6', conceptId: 'b1-past-continuous', type: 'fill_gap', prompt: 'They ___ playing tennis when it started to rain.', points: 1, accepted: ['were'] },
  { id: 'b1pc-e7', conceptId: 'b1-past-continuous', type: 'fill_gap', prompt: '___ you sleeping when I called you last night?', points: 1, accepted: ['were'] },
  // --- verb_form ---
  { id: 'b1pc-e8', conceptId: 'b1-past-continuous', type: 'verb_form', prompt: 'At 9 pm, I (watch) ___ a film when the power went out.', points: 1, accepted: ['was watching'] },
  { id: 'b1pc-e9', conceptId: 'b1-past-continuous', type: 'verb_form', prompt: 'They (play) ___ football when it began to rain.', points: 1, accepted: ['were playing'] },
  { id: 'b1pc-e10', conceptId: 'b1-past-continuous', type: 'verb_form', prompt: 'He (not work) ___ when I arrived — he was having lunch.', points: 1, accepted: ["wasn't working", 'was not working'] },
  // --- choose_word ---
  { id: 'b1pc-e11', conceptId: 'b1-past-continuous', type: 'choose_word', prompt: 'We ___ having dinner when you called.', points: 1, options: ['were', 'was', 'are'], accepted: ['were'] },
  { id: 'b1pc-e12', conceptId: 'b1-past-continuous', type: 'choose_word', prompt: '___ she called, I was cleaning the kitchen.', points: 1, options: ['When', 'While', 'During'], accepted: ['When'] },
  { id: 'b1pc-e13', conceptId: 'b1-past-continuous', type: 'choose_word', prompt: 'I ___ when the lights went out.', points: 1, options: ['was reading', 'have read', 'am reading'], accepted: ['was reading'] },
  { id: 'b1pc-e14', conceptId: 'b1-past-continuous', type: 'choose_word', prompt: '___ was he doing when the accident happened?', points: 1, options: ['What', 'Which', 'Whose'], accepted: ['What'] },
  // --- word_order ---
  { id: 'b1pc-e15', conceptId: 'b1-past-continuous', type: 'word_order', prompt: 'Соберите: «Он читал книгу, когда зазвонил телефон»', points: 1, bank: ['he', 'was', 'reading', 'a', 'book', 'when', 'the', 'phone', 'rang'], accepted: ['he was reading a book when the phone rang', 'when the phone rang he was reading a book'] },
  { id: 'b1pc-e16', conceptId: 'b1-past-continuous', type: 'word_order', prompt: 'Соберите: «Пока мы ужинали, пришли гости»', points: 1, bank: ['while', 'we', 'were', 'having', 'dinner', 'the', 'guests', 'arrived'], accepted: ['while we were having dinner the guests arrived', 'the guests arrived while we were having dinner'] },
  { id: 'b1pc-e17', conceptId: 'b1-past-continuous', type: 'word_order', prompt: 'Соберите: «Что она делала, когда ты позвонил?»', points: 1, bank: ['what', 'was', 'she', 'doing', 'when', 'you', 'called'], accepted: ['what was she doing when you called'] },
  // --- multi_gap ---
  { id: 'b1pc-e18', conceptId: 'b1-past-continuous', type: 'multi_gap', prompt: 'I ___ (cook) dinner when the phone ___ (ring).', points: 1, gaps: [{ accepted: ['was cooking'] }, { accepted: ['rang'] }] },
  { id: 'b1pc-e19', conceptId: 'b1-past-continuous', type: 'multi_gap', prompt: 'What ___ you ___ (do) at 8 pm yesterday?', points: 1, gaps: [{ accepted: ['were'] }, { accepted: ['doing'] }] },
  { id: 'b1pc-e20', conceptId: 'b1-past-continuous', type: 'multi_gap', prompt: 'While she ___ (read) a book, he ___ (cook) dinner.', points: 1, gaps: [{ accepted: ['was reading'] }, { accepted: ['was cooking'] }] },

  // ============ b1-used-to ============
  // --- translate_ru_en ---
  { id: 'b1ut-e1', conceptId: 'b1-used-to', type: 'translate_ru_en', prompt: 'Раньше я играл в футбол каждые выходные.', points: 2, accepted: ['I used to play football every weekend', 'I used to play soccer every weekend', 'Every weekend I used to play football', 'I would play football every weekend', 'I would play soccer every weekend', 'Every weekend I would play football'] },
  { id: 'b1ut-e2', conceptId: 'b1-used-to', type: 'translate_ru_en', prompt: 'Он раньше не любил кофе.', points: 2, accepted: ["He didn't use to like coffee", 'He did not use to like coffee', 'He never used to like coffee'] },
  { id: 'b1ut-e3', conceptId: 'b1-used-to', type: 'translate_ru_en', prompt: 'Мы раньше ходили в этот ресторан каждую пятницу.', points: 2, accepted: ['We used to go to this restaurant every Friday', 'We used to eat at this restaurant every Friday', 'Every Friday we used to go to this restaurant', 'We would go to this restaurant every Friday', 'We would eat at this restaurant every Friday', 'Every Friday we would go to this restaurant'] },
  { id: 'b1ut-e4', conceptId: 'b1-used-to', type: 'translate_ru_en', prompt: 'Дети раньше боялись собак.', points: 2, accepted: ['The children used to be afraid of dogs', 'The kids used to be afraid of dogs', 'The children used to be scared of dogs'] },
  // --- fill_gap ---
  { id: 'b1ut-e5', conceptId: 'b1-used-to', type: 'fill_gap', prompt: 'I ___ to smoke, but I stopped five years ago.', points: 1, accepted: ['used'] },
  { id: 'b1ut-e6', conceptId: 'b1-used-to', type: 'fill_gap', prompt: "She didn't ___ to eat vegetables when she was a child.", points: 1, accepted: ['use'] },
  { id: 'b1ut-e7', conceptId: 'b1-used-to', type: 'fill_gap', prompt: '___ you use to play the piano when you were young?', points: 1, accepted: ['did'] },
  // --- verb_form ---
  { id: 'b1ut-e8', conceptId: 'b1-used-to', type: 'verb_form', prompt: 'When I was young, I (visit) ___ my grandmother every summer.', points: 1, accepted: ['used to visit', 'would visit'] },
  { id: 'b1ut-e9', conceptId: 'b1-used-to', type: 'verb_form', prompt: 'She (not like) ___ spicy food, but now she loves it.', points: 1, accepted: ["didn't use to like", 'did not use to like'] },
  { id: 'b1ut-e10', conceptId: 'b1-used-to', type: 'verb_form', prompt: 'They (play) ___ football together every Sunday when they were kids.', points: 1, accepted: ['used to play', 'would play'] },
  // --- choose_word ---
  { id: 'b1ut-e11', conceptId: 'b1-used-to', type: 'choose_word', prompt: 'I ___ to play tennis when I was at school.', points: 1, options: ['used', 'use', 'was using'], accepted: ['used'] },
  { id: 'b1ut-e12', conceptId: 'b1-used-to', type: 'choose_word', prompt: "She didn't ___ to drink coffee.", points: 1, options: ['use', 'used', 'uses'], accepted: ['use'] },
  { id: 'b1ut-e13', conceptId: 'b1-used-to', type: 'choose_word', prompt: '___ you use to live in Moscow?', points: 1, options: ['Did', 'Were', 'Have'], accepted: ['Did'] },
  { id: 'b1ut-e14', conceptId: 'b1-used-to', type: 'choose_word', prompt: 'When we were children, we ___ climb trees every day after school.', points: 1, options: ['would', 'were', 'used'], accepted: ['would'] },
  // --- word_order ---
  { id: 'b1ut-e15', conceptId: 'b1-used-to', type: 'word_order', prompt: 'Соберите: «Мы раньше катались на велосипеде по выходным»', points: 1, bank: ['we', 'used', 'to', 'ride', 'a', 'bike', 'on', 'weekends'], accepted: ['we used to ride a bike on weekends'] },
  { id: 'b1ut-e16', conceptId: 'b1-used-to', type: 'word_order', prompt: 'Соберите: «Раньше он не пил кофе»', points: 1, bank: ['he', "didn't", 'use', 'to', 'drink', 'coffee'], accepted: ["he didn't use to drink coffee"] },
  { id: 'b1ut-e17', conceptId: 'b1-used-to', type: 'word_order', prompt: 'Соберите: «Ты раньше играл на гитаре?»', points: 1, bank: ['did', 'you', 'use', 'to', 'play', 'the', 'guitar'], accepted: ['did you use to play the guitar'] },
  // --- multi_gap ---
  { id: 'b1ut-e18', conceptId: 'b1-used-to', type: 'multi_gap', prompt: 'When I was a child, I ___ (visit) my grandparents every summer, but I ___ (not like) long car journeys.', points: 1, gaps: [{ accepted: ['used to visit', 'would visit'] }, { accepted: ["didn't use to like", 'did not use to like'] }] },
  { id: 'b1ut-e19', conceptId: 'b1-used-to', type: 'multi_gap', prompt: '___ you use to play sports at school? No, I ___.', points: 1, gaps: [{ accepted: ['did'] }, { accepted: ["didn't", 'did not'] }] },
  { id: 'b1ut-e20', conceptId: 'b1-used-to', type: 'multi_gap', prompt: 'She ___ (not eat) meat, but now she ___ (eat) it every day.', points: 1, gaps: [{ accepted: ["didn't use to eat", 'did not use to eat'] }, { accepted: ['eats'] }] },

  // ============ b1-past-perfect ============
  // --- translate_ru_en ---
  { id: 'b1pp-e1', conceptId: 'b1-past-perfect', type: 'translate_ru_en', prompt: 'Когда я пришёл, фильм уже начался.', points: 2, accepted: ['When I arrived, the film had already started', 'The film had already started when I arrived', 'When I arrived, the film had already begun'] },
  { id: 'b1pp-e2', conceptId: 'b1-past-perfect', type: 'translate_ru_en', prompt: 'Она не закончила домашнюю работу, когда позвонила её мама.', points: 2, accepted: ["She hadn't finished her homework when her mother called", 'She had not finished her homework when her mother called', "She hadn't finished her homework when her mum called"] },
  { id: 'b1pp-e3', conceptId: 'b1-past-perfect', type: 'translate_ru_en', prompt: 'К тому времени, как мы приехали, они уже ушли.', points: 2, accepted: ['By the time we arrived, they had already left', 'They had already left by the time we arrived', 'By the time we got there, they had already left'] },
  { id: 'b1pp-e4', conceptId: 'b1-past-perfect', type: 'translate_ru_en', prompt: 'После того как он закончил работу, он пошёл домой.', points: 2, accepted: ['After he had finished work, he went home', 'After he finished work, he went home', 'He went home after he had finished work'] },
  // --- fill_gap ---
  { id: 'b1pp-e5', conceptId: 'b1-past-perfect', type: 'fill_gap', prompt: 'When we arrived at the station, the train ___ already left.', points: 1, accepted: ['had'] },
  { id: 'b1pp-e6', conceptId: 'b1-past-perfect', type: 'fill_gap', prompt: 'She ___ never seen snow before she moved to Canada.', points: 1, accepted: ['had'] },
  { id: 'b1pp-e7', conceptId: 'b1-past-perfect', type: 'fill_gap', prompt: '___ you finished the report by the time the boss arrived?', points: 1, accepted: ['had'] },
  // --- verb_form ---
  { id: 'b1pp-e8', conceptId: 'b1-past-perfect', type: 'verb_form', prompt: 'By the time I got home, my brother (eat) ___ all the pizza.', points: 1, accepted: ['had eaten'] },
  { id: 'b1pp-e9', conceptId: 'b1-past-perfect', type: 'verb_form', prompt: 'She (never be) ___ to Japan before that trip.', points: 1, accepted: ['had never been'] },
  { id: 'b1pp-e10', conceptId: 'b1-past-perfect', type: 'verb_form', prompt: 'They (not finish) ___ the project when the deadline came.', points: 1, accepted: ["hadn't finished", 'had not finished'] },
  // --- choose_word ---
  { id: 'b1pp-e11', conceptId: 'b1-past-perfect', type: 'choose_word', prompt: 'When I arrived, she ___ already left.', points: 1, options: ['had', 'has', 'was'], accepted: ['had'] },
  { id: 'b1pp-e12', conceptId: 'b1-past-perfect', type: 'choose_word', prompt: '___ the time we got to the cinema, the film had started.', points: 1, options: ['By', 'Until', 'Since'], accepted: ['By'] },
  { id: 'b1pp-e13', conceptId: 'b1-past-perfect', type: 'choose_word', prompt: 'I was tired because I ___ well the night before.', points: 1, options: ["hadn't slept", "don't sleep", "haven't slept"], accepted: ["hadn't slept"] },
  { id: 'b1pp-e14', conceptId: 'b1-past-perfect', type: 'choose_word', prompt: 'By the time she was 20, she ___ three languages.', points: 1, options: ['had learned', 'has learned', 'learns'], accepted: ['had learned'] },
  // --- word_order ---
  { id: 'b1pp-e15', conceptId: 'b1-past-perfect', type: 'word_order', prompt: 'Соберите: «Когда мы приехали на вокзал, поезд уже ушёл»', points: 1, bank: ['when', 'we', 'arrived', 'at', 'the', 'station', 'the', 'train', 'had', 'already', 'left'], accepted: ['when we arrived at the station the train had already left', 'the train had already left when we arrived at the station'] },
  { id: 'b1pp-e16', conceptId: 'b1-past-perfect', type: 'word_order', prompt: 'Соберите: «Она никогда не видела снег до переезда в Канаду»', points: 1, bank: ['she', 'had', 'never', 'seen', 'snow', 'before', 'she', 'moved', 'to', 'Canada'], accepted: ['she had never seen snow before she moved to Canada', 'before she moved to Canada she had never seen snow'] },
  { id: 'b1pp-e17', conceptId: 'b1-past-perfect', type: 'word_order', prompt: 'Соберите: «Ты закончил отчёт к тому времени, как пришёл начальник?»', points: 1, bank: ['had', 'you', 'finished', 'the', 'report', 'by', 'the', 'time', 'the', 'boss', 'arrived'], accepted: ['had you finished the report by the time the boss arrived', 'by the time the boss arrived had you finished the report'] },
  // --- multi_gap ---
  { id: 'b1pp-e18', conceptId: 'b1-past-perfect', type: 'multi_gap', prompt: 'When we ___ (arrive), the train had already ___ (leave).', points: 1, gaps: [{ accepted: ['arrived'] }, { accepted: ['left'] }] },
  { id: 'b1pp-e19', conceptId: 'b1-past-perfect', type: 'multi_gap', prompt: 'By the time she ___ (call) me, I had already ___ (leave) the office.', points: 1, gaps: [{ accepted: ['called'] }, { accepted: ['left'] }] },
  { id: 'b1pp-e20', conceptId: 'b1-past-perfect', type: 'multi_gap', prompt: 'He was upset because he ___ (not pass) the exam, even though he ___ (study) hard.', points: 1, gaps: [{ accepted: ["hadn't passed", 'had not passed'] }, { accepted: ['had studied'] }] },
];
