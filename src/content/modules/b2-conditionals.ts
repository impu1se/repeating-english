import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'b2-conditionals',
  title: 'Условные предложения: третий тип, смешанный, wish',
  level: 'B2',
  masteryThreshold: 20,
  conceptIds: ['b2-third-conditional', 'b2-mixed-conditional', 'b2-wish'],
};

export const concepts: Concept[] = [
  {
    id: 'b2-third-conditional',
    moduleId: 'b2-conditionals',
    title: 'Third Conditional: if + Past Perfect, would have + V3',
    kind: 'grammar',
    theory:
      "Third Conditional — нереальное условие в прошлом: то, что не произошло, и его нереальный результат тоже в прошлом (сожаление, упущенная возможность).\nОбразование: if + Past Perfect, would have + V3.\n• If I had studied harder, I would have passed the exam. — Если бы я занимался усерднее (а я не занимался), я бы сдал экзамен (а я не сдал).\nОтрицание в if-части — hadn't (had not): If she hadn't missed the bus, she would have arrived on time.\nСокращение 'd have = would have — обычное дело в речи: I'd have called you if I'd known your number.\nwouldn't have — отрицание результата: If we had left earlier, we wouldn't have missed the flight.\nIf-часть может стоять и в начале, и в конце предложения — запятая нужна только когда if-часть первая.\ncould have / might have вместо would have — если результат был лишь возможен, а не гарантирован: If he had trained harder, he might have won.",
    exerciseIds: [
      'b2tc-e1', 'b2tc-e2', 'b2tc-e3', 'b2tc-e4', 'b2tc-e5',
      'b2tc-e6', 'b2tc-e7', 'b2tc-e8', 'b2tc-e9', 'b2tc-e10',
      'b2tc-e11', 'b2tc-e12', 'b2tc-e13', 'b2tc-e14', 'b2tc-e15',
      'b2tc-e16', 'b2tc-e17', 'b2tc-e18', 'b2tc-e19', 'b2tc-e20',
      'b2tc-e21', 'b2tc-e22', 'b2tc-e23', 'b2tc-e24', 'b2tc-e25', 'b2tc-e26', 'b2tc-e27', 'b2tc-e28', 'b2tc-e29', 'b2tc-e30',
    ],
  },
  {
    id: 'b2-mixed-conditional',
    moduleId: 'b2-conditionals',
    title: 'Mixed Conditional: смешанные времена',
    kind: 'grammar',
    theory:
      "Mixed Conditional — «смешанное» условие: условие и результат относятся к разным временам.\nТип 1 — прошлая причина → результат сейчас: if + Past Perfect, would + V1 (без have!).\n• If I had studied medicine, I would be a doctor now. — Если бы я (тогда) изучал медицину, я был бы (сейчас) врачом.\nТип 2 — обычная/настоящая причина → результат в прошлом: if + Past Simple/were, would have + V3.\n• If I were braver, I would have asked her out yesterday. — Если бы я (по характеру) был смелее, я бы (вчера) пригласил её на свидание.\nСлова-подсказки помогают определить тип: now, currently — результат в настоящем (тип 1); yesterday, last night — результат в прошлом (тип 2).\nОтличие от Third Conditional: в mixed либо результат НЕ в прошлом (тип 1), либо условие НЕ в прошлом, а постоянное/настоящее (тип 2).\nОтрицание и сокращения — как обычно: hadn't, wouldn't, weren't.",
    exerciseIds: [
      'b2mc-e1', 'b2mc-e2', 'b2mc-e3', 'b2mc-e4', 'b2mc-e5',
      'b2mc-e6', 'b2mc-e7', 'b2mc-e8', 'b2mc-e9', 'b2mc-e10',
      'b2mc-e11', 'b2mc-e12', 'b2mc-e13', 'b2mc-e14', 'b2mc-e15',
      'b2mc-e16', 'b2mc-e17', 'b2mc-e18', 'b2mc-e19', 'b2mc-e20',
      'b2mc-e21', 'b2mc-e22', 'b2mc-e23', 'b2mc-e24', 'b2mc-e25', 'b2mc-e26', 'b2mc-e27', 'b2mc-e28', 'b2mc-e29', 'b2mc-e30',
    ],
  },
  {
    id: 'b2-wish',
    moduleId: 'b2-conditionals',
    title: 'wish / if only: сожаление и раздражение',
    kind: 'grammar',
    theory:
      "wish — сожаление о том, что что-то не так, как хотелось бы.\nwish + Past Simple — сожаление о настоящем: I wish I had more free time. — Жаль, что у меня сейчас мало свободного времени.\n• I wish I was/were taller. — оба варианта, was и were, допустимы (were — более формально, was — разговорный).\nwish + Past Perfect — сожаление о прошлом: I wish I hadn't said that. — Жаль, что я это сказал.\nif only — синоним wish, звучит эмоциональнее: If only I had listened to you!\nwish + would — раздражение чужим поведением, которое хочется изменить (не о себе!): I wish you would stop interrupting me.\nwish + would не используется про себя: неправильно I wish I would be taller — нужно I wish I were taller.",
    exerciseIds: [
      'b2wi-e1', 'b2wi-e2', 'b2wi-e3', 'b2wi-e4', 'b2wi-e5',
      'b2wi-e6', 'b2wi-e7', 'b2wi-e8', 'b2wi-e9', 'b2wi-e10',
      'b2wi-e11', 'b2wi-e12', 'b2wi-e13', 'b2wi-e14', 'b2wi-e15',
      'b2wi-e16', 'b2wi-e17', 'b2wi-e18', 'b2wi-e19', 'b2wi-e20',
      'b2wi-e21', 'b2wi-e22', 'b2wi-e23', 'b2wi-e24', 'b2wi-e25', 'b2wi-e26', 'b2wi-e27', 'b2wi-e28', 'b2wi-e29', 'b2wi-e30',
    ],
  },
];

export const exercises: Exercise[] = [
  // ============ b2-third-conditional ============
  // --- translate_ru_en ---
  { id: 'b2tc-e1', conceptId: 'b2-third-conditional', type: 'translate_ru_en', prompt: 'Если бы я занимался усерднее, я бы сдал экзамен.', points: 2, accepted: ['If I had studied harder, I would have passed the exam', "If I had studied harder, I'd have passed the exam", "If I'd studied harder, I would have passed the exam", 'I would have passed the exam if I had studied harder'] },
  { id: 'b2tc-e2', conceptId: 'b2-third-conditional', type: 'translate_ru_en', prompt: 'Если бы она не опоздала на автобус, она бы приехала вовремя.', points: 2, accepted: ["If she hadn't missed the bus, she would have arrived on time", 'If she had not missed the bus, she would have arrived on time', "If she hadn't missed the bus, she'd have arrived on time", "She would have arrived on time if she hadn't missed the bus"] },
  { id: 'b2tc-e3', conceptId: 'b2-third-conditional', type: 'translate_ru_en', prompt: 'Мы бы не опоздали на самолёт, если бы выехали раньше.', points: 2, accepted: ["We wouldn't have missed the flight if we had left earlier", 'We would not have missed the flight if we had left earlier', "If we had left earlier, we wouldn't have missed the flight", "We wouldn't have missed the flight if we'd left earlier"] },
  { id: 'b2tc-e4', conceptId: 'b2-third-conditional', type: 'translate_ru_en', prompt: 'Я бы тебе позвонил, если бы знал твой номер.', points: 2, accepted: ['I would have called you if I had known your number', "I'd have called you if I'd known your number", "I would have called you if I'd known your number", 'If I had known your number, I would have called you'] },
  // --- fill_gap ---
  { id: 'b2tc-e5', conceptId: 'b2-third-conditional', type: 'fill_gap', prompt: 'If I had known you were coming, I ___ have baked a cake.', points: 1, accepted: ['would', "'d"] },
  { id: 'b2tc-e6', conceptId: 'b2-third-conditional', type: 'fill_gap', prompt: 'If she ___ studied harder, she would have passed the exam.', points: 1, accepted: ['had', "'d"] },
  { id: 'b2tc-e7', conceptId: 'b2-third-conditional', type: 'fill_gap', prompt: 'If we had left on time, we ___ have missed the train.', points: 1, accepted: ["wouldn't", 'would not'] },
  // --- verb_form ---
  { id: 'b2tc-e8', conceptId: 'b2-third-conditional', type: 'verb_form', prompt: 'If they (know) ___ about the traffic, they would have left earlier.', points: 1, accepted: ['had known'] },
  { id: 'b2tc-e9', conceptId: 'b2-third-conditional', type: 'verb_form', prompt: 'If she had saved more money, she (buy) ___ a new car.', points: 1, accepted: ['would have bought'] },
  { id: 'b2tc-e10', conceptId: 'b2-third-conditional', type: 'verb_form', prompt: 'We would have arrived on time if we (not miss) ___ the bus.', points: 1, accepted: ["hadn't missed", 'had not missed'] },
  // --- choose_word ---
  { id: 'b2tc-e11', conceptId: 'b2-third-conditional', type: 'choose_word', prompt: "If I ___ earlier, I wouldn't have missed the train.", points: 1, options: ['had left', 'left', 'would leave'], accepted: ['had left'] },
  { id: 'b2tc-e12', conceptId: 'b2-third-conditional', type: 'choose_word', prompt: 'She would have passed the test if she ___ harder.', points: 1, options: ['had studied', 'studied', 'has studied'], accepted: ['had studied'] },
  { id: 'b2tc-e13', conceptId: 'b2-third-conditional', type: 'choose_word', prompt: 'If he had asked me, I ___ him the truth.', points: 1, options: ['would have told', 'would tell', 'told'], accepted: ['would have told'] },
  { id: 'b2tc-e14', conceptId: 'b2-third-conditional', type: 'choose_word', prompt: "If we hadn't stopped for petrol, we ___ late.", points: 1, options: ["wouldn't have been", "wouldn't be", "weren't"], accepted: ["wouldn't have been"] },
  // --- word_order ---
  { id: 'b2tc-e15', conceptId: 'b2-third-conditional', type: 'word_order', prompt: 'Соберите: «Если бы я знал, я бы тебе сказал»', points: 1, bank: ['if', 'i', 'had', 'known', 'i', 'would', 'have', 'told', 'you'], accepted: ['if i had known i would have told you', 'i would have told you if i had known'] },
  { id: 'b2tc-e16', conceptId: 'b2-third-conditional', type: 'word_order', prompt: 'Соберите: «Она бы не опоздала, если бы не проспала»', points: 1, bank: ['she', "wouldn't", 'have', 'been', 'late', 'if', 'she', "hadn't", 'overslept'], accepted: ["she wouldn't have been late if she hadn't overslept", "if she hadn't overslept she wouldn't have been late"] },
  { id: 'b2tc-e17', conceptId: 'b2-third-conditional', type: 'word_order', prompt: 'Соберите: «Если бы мы скопили больше денег, мы бы купили дом»', points: 1, bank: ['if', 'we', 'had', 'saved', 'more', 'money', 'we', 'would', 'have', 'bought', 'a', 'house'], accepted: ['if we had saved more money we would have bought a house', 'we would have bought a house if we had saved more money'] },
  // --- multi_gap ---
  { id: 'b2tc-e18', conceptId: 'b2-third-conditional', type: 'multi_gap', prompt: 'If she ___ (study) harder, she ___ (pass) the exam.', points: 1, gaps: [{ accepted: ['had studied'] }, { accepted: ['would have passed'] }] },
  { id: 'b2tc-e19', conceptId: 'b2-third-conditional', type: 'multi_gap', prompt: 'If we ___ (not leave) late, we ___ (not miss) the flight.', points: 1, gaps: [{ accepted: ["hadn't left", 'had not left'] }, { accepted: ["wouldn't have missed", 'would not have missed'] }] },
  { id: 'b2tc-e20', conceptId: 'b2-third-conditional', type: 'multi_gap', prompt: 'If he ___ (ask) for help, they ___ (help) him.', points: 1, gaps: [{ accepted: ['had asked'] }, { accepted: ['would have helped'] }] },

  // ============ b2-mixed-conditional ============
  // --- translate_ru_en ---
  { id: 'b2mc-e1', conceptId: 'b2-mixed-conditional', type: 'translate_ru_en', prompt: 'Если бы я изучал медицину, я был бы сейчас врачом.', points: 2, accepted: ['If I had studied medicine, I would be a doctor now', "If I'd studied medicine, I would be a doctor now", "If I had studied medicine, I'd be a doctor now", "If I'd studied medicine, I'd be a doctor now"] },
  { id: 'b2mc-e2', conceptId: 'b2-mixed-conditional', type: 'translate_ru_en', prompt: 'Если бы он не потратил все деньги, у него сейчас были бы сбережения.', points: 2, accepted: ["If he hadn't spent all his money, he would have savings now", 'If he had not spent all his money, he would have savings now', "If he hadn't spent all his money, he'd have savings now", "He would have savings now if he hadn't spent all his money"] },
  { id: 'b2mc-e3', conceptId: 'b2-mixed-conditional', type: 'translate_ru_en', prompt: 'Если бы я был смелее, я бы вчера пригласил её на свидание.', points: 2, accepted: ['If I were braver, I would have asked her out yesterday', "If I were braver, I'd have asked her out yesterday", 'If I was braver, I would have asked her out yesterday', "If I was braver, I'd have asked her out yesterday"] },
  { id: 'b2mc-e4', conceptId: 'b2-mixed-conditional', type: 'translate_ru_en', prompt: 'Если бы она не боялась высоты, она бы поднялась на гору вчера.', points: 2, accepted: ["If she weren't afraid of heights, she would have climbed the mountain yesterday", "If she wasn't afraid of heights, she would have climbed the mountain yesterday", "If she weren't afraid of heights, she'd have climbed the mountain yesterday", "If she wasn't afraid of heights, she'd have climbed the mountain yesterday"] },
  // --- fill_gap ---
  { id: 'b2mc-e5', conceptId: 'b2-mixed-conditional', type: 'fill_gap', prompt: 'If I had taken that job, I ___ rich now.', points: 1, accepted: ['would be', "'d be"] },
  { id: 'b2mc-e6', conceptId: 'b2-mixed-conditional', type: 'fill_gap', prompt: "She's always so careless. If she ___ more careful, she wouldn't have crashed the car yesterday.", points: 1, accepted: ['were', 'was'] },
  { id: 'b2mc-e7', conceptId: 'b2-mixed-conditional', type: 'fill_gap', prompt: 'If I were more organised, I ___ have forgotten the tickets yesterday.', points: 1, accepted: ["wouldn't", 'would not'] },
  // --- verb_form ---
  { id: 'b2mc-e8', conceptId: 'b2-mixed-conditional', type: 'verb_form', prompt: 'If they (finish) ___ the project last year, they would be running their own company now.', points: 1, accepted: ['had finished'] },
  { id: 'b2mc-e9', conceptId: 'b2-mixed-conditional', type: 'verb_form', prompt: 'If I (be) ___ taller, I would have joined the basketball team last season.', points: 1, accepted: ['were', 'was'] },
  { id: 'b2mc-e10', conceptId: 'b2-mixed-conditional', type: 'verb_form', prompt: "If she hadn't lost her passport, she (be) ___ in Paris right now.", points: 1, accepted: ['would be'] },
  // --- choose_word ---
  { id: 'b2mc-e11', conceptId: 'b2-mixed-conditional', type: 'choose_word', prompt: 'If I had learned to swim as a kid, I ___ nervous around water now.', points: 1, options: ["wouldn't be", "wouldn't have been", "don't be"], accepted: ["wouldn't be"] },
  { id: 'b2mc-e12', conceptId: 'b2-mixed-conditional', type: 'choose_word', prompt: "He's always so impatient. If he ___ more patient, he wouldn't have shouted at his brother yesterday.", points: 1, options: ['were', 'had been', 'is'], accepted: ['were'] },
  { id: 'b2mc-e13', conceptId: 'b2-mixed-conditional', type: 'choose_word', prompt: "If we hadn't taken that wrong turn, we ___ lost right now.", points: 1, options: ["wouldn't be", "wouldn't have been", "aren't"], accepted: ["wouldn't be"] },
  { id: 'b2mc-e14', conceptId: 'b2-mixed-conditional', type: 'choose_word', prompt: "If she weren't so stubborn, she ___ her mistake yesterday.", points: 1, options: ['would have admitted', 'would admit', 'admitted'], accepted: ['would have admitted'] },
  // --- word_order ---
  { id: 'b2mc-e15', conceptId: 'b2-mixed-conditional', type: 'word_order', prompt: 'Соберите: «Если бы я изучал медицину, я был бы сейчас врачом»', points: 1, bank: ['if', 'i', 'had', 'studied', 'medicine', 'i', 'would', 'be', 'a', 'doctor', 'now'], accepted: ['if i had studied medicine i would be a doctor now', 'i would be a doctor now if i had studied medicine'] },
  { id: 'b2mc-e16', conceptId: 'b2-mixed-conditional', type: 'word_order', prompt: 'Соберите: «Если бы он был смелее, он бы вчера попросил повышение»', points: 1, bank: ['if', 'he', 'were', 'braver', 'he', 'would', 'have', 'asked', 'for', 'a', 'raise', 'yesterday'], accepted: ['if he were braver he would have asked for a raise yesterday', 'he would have asked for a raise yesterday if he were braver'] },
  { id: 'b2mc-e17', conceptId: 'b2-mixed-conditional', type: 'word_order', prompt: 'Соберите: «Если бы мы не потерялись, мы были бы сейчас дома»', points: 1, bank: ['if', 'we', "hadn't", 'got', 'lost', 'we', 'would', 'be', 'at', 'home', 'now'], accepted: ["if we hadn't got lost we would be at home now", "we would be at home now if we hadn't got lost"] },
  // --- multi_gap ---
  { id: 'b2mc-e18', conceptId: 'b2-mixed-conditional', type: 'multi_gap', prompt: 'If I ___ (study) harder at university, I ___ (have) a better job now.', points: 1, gaps: [{ accepted: ['had studied'] }, { accepted: ['would have'] }] },
  { id: 'b2mc-e19', conceptId: 'b2-mixed-conditional', type: 'multi_gap', prompt: "She's always so shy. If she ___ (be) more confident, she ___ (apply) for the promotion last month.", points: 1, gaps: [{ accepted: ['were', 'was'] }, { accepted: ['would have applied'] }] },
  { id: 'b2mc-e20', conceptId: 'b2-mixed-conditional', type: 'multi_gap', prompt: 'If we ___ (not miss) the earlier train, we ___ (be) home by now.', points: 1, gaps: [{ accepted: ["hadn't missed", 'had not missed'] }, { accepted: ['would be'] }] },

  // ============ b2-wish ============
  // --- translate_ru_en ---
  { id: 'b2wi-e1', conceptId: 'b2-wish', type: 'translate_ru_en', prompt: 'Жаль, что я сейчас не в отпуске.', points: 2, accepted: ['I wish I was on holiday now', 'I wish I were on holiday now', 'I wish I was on vacation now', 'I wish I were on vacation now'] },
  { id: 'b2wi-e2', conceptId: 'b2-wish', type: 'translate_ru_en', prompt: 'Жаль, что я не сказал ей правду.', points: 2, accepted: ['I wish I had told her the truth', "I wish I'd told her the truth", 'I really wish I had told her the truth', 'If only I had told her the truth'] },
  { id: 'b2wi-e3', conceptId: 'b2-wish', type: 'translate_ru_en', prompt: 'Хотелось бы, чтобы ты перестал опаздывать.', points: 2, accepted: ['I wish you would stop being late', "I wish you'd stop being late", 'I wish you would stop coming late', "I wish you'd stop coming late"] },
  { id: 'b2wi-e4', conceptId: 'b2-wish', type: 'translate_ru_en', prompt: 'Если бы только я послушал тебя!', points: 2, accepted: ['If only I had listened to you', "If only I'd listened to you", 'I wish I had listened to you', "I wish I'd listened to you"] },
  // --- fill_gap ---
  { id: 'b2wi-e5', conceptId: 'b2-wish', type: 'fill_gap', prompt: 'I wish I ___ taller.', points: 1, accepted: ['was', 'were'] },
  { id: 'b2wi-e6', conceptId: 'b2-wish', type: 'fill_gap', prompt: 'I wish I ___ eaten so much at dinner — I feel sick now.', points: 1, accepted: ["hadn't", 'had not'] },
  { id: 'b2wi-e7', conceptId: 'b2-wish', type: 'fill_gap', prompt: 'I wish you ___ stop leaving your dishes in the sink.', points: 1, accepted: ['would', "'d"] },
  // --- verb_form ---
  { id: 'b2wi-e8', conceptId: 'b2-wish', type: 'verb_form', prompt: 'I wish I (know) ___ the answer right now.', points: 1, accepted: ['knew'] },
  { id: 'b2wi-e9', conceptId: 'b2-wish', type: 'verb_form', prompt: 'I wish I (not spend) ___ all my money last month.', points: 1, accepted: ["hadn't spent", 'had not spent'] },
  { id: 'b2wi-e10', conceptId: 'b2-wish', type: 'verb_form', prompt: "I wish it (stop) ___ raining — we can't go outside.", points: 1, accepted: ['would stop'] },
  // --- choose_word ---
  { id: 'b2wi-e11', conceptId: 'b2-wish', type: 'choose_word', prompt: 'I wish I ___ more time to relax these days.', points: 1, options: ['had', 'have', 'would have'], accepted: ['had'] },
  { id: 'b2wi-e12', conceptId: 'b2-wish', type: 'choose_word', prompt: 'I wish I ___ so rude to him last week — I regret it now.', points: 1, options: ["hadn't been", "wasn't", "haven't been"], accepted: ["hadn't been"] },
  { id: 'b2wi-e13', conceptId: 'b2-wish', type: 'choose_word', prompt: "I wish she ___ texting me at midnight — it's so annoying.", points: 1, options: ['would stop', 'stopped', 'stops'], accepted: ['would stop'] },
  { id: 'b2wi-e14', conceptId: 'b2-wish', type: 'choose_word', prompt: 'I wish I ___ speak French fluently.', points: 1, options: ['could', 'would', 'can'], accepted: ['could'] },
  // --- word_order ---
  { id: 'b2wi-e15', conceptId: 'b2-wish', type: 'word_order', prompt: 'Соберите: «Жаль, что я не знаю ответа»', points: 1, bank: ['i', 'wish', 'i', 'knew', 'the', 'answer'], accepted: ['i wish i knew the answer'] },
  { id: 'b2wi-e16', conceptId: 'b2-wish', type: 'word_order', prompt: 'Соберите: «Жаль, что я не купил билеты заранее»', points: 1, bank: ['i', 'wish', 'i', 'had', 'bought', 'the', 'tickets', 'in', 'advance'], accepted: ['i wish i had bought the tickets in advance'] },
  { id: 'b2wi-e17', conceptId: 'b2-wish', type: 'word_order', prompt: 'Соберите: «Хоть бы он перестал жаловаться»', points: 1, bank: ['if', 'only', 'he', 'would', 'stop', 'complaining'], accepted: ['if only he would stop complaining'] },
  // --- multi_gap ---
  { id: 'b2wi-e18', conceptId: 'b2-wish', type: 'multi_gap', prompt: 'I wish I ___ (have) more free time, and I wish my job ___ (be) less stressful.', points: 1, gaps: [{ accepted: ['had'] }, { accepted: ['was', 'were'] }] },
  { id: 'b2wi-e19', conceptId: 'b2-wish', type: 'multi_gap', prompt: 'I wish I ___ (not say) that, and I wish she ___ (not hear) it.', points: 1, gaps: [{ accepted: ["hadn't said", 'had not said'] }, { accepted: ["hadn't heard", 'had not heard'] }] },
  { id: 'b2wi-e20', conceptId: 'b2-wish', type: 'multi_gap', prompt: 'I wish you ___ (stop) shouting, and I wish the neighbours ___ (turn) down the music.', points: 1, gaps: [{ accepted: ['would stop'] }, { accepted: ['would turn'] }] },
  // ---- добор: b2-third-conditional ----
  { id: 'b2tc-e21', conceptId: 'b2-third-conditional', type: 'translate_ru_en', prompt: 'Знай я об этом раньше, я бы помог.', points: 2, accepted: ['Had I known about it earlier, I would have helped', 'If I had known about it earlier, I would have helped'] },
  { id: 'b2tc-e22', conceptId: 'b2-third-conditional', type: 'translate_ru_en', prompt: 'Если бы не твоя помощь, я бы не справился.', points: 2, accepted: ["If it hadn't been for your help, I wouldn't have managed", 'If it had not been for your help, I would not have managed'] },
  { id: 'b2tc-e23', conceptId: 'b2-third-conditional', type: 'fill_gap', prompt: '___ I known you were ill, I would have visited you.', points: 1, accepted: ['had'] },
  { id: 'b2tc-e24', conceptId: 'b2-third-conditional', type: 'fill_gap', prompt: "If it hadn't been ___ the rain, the picnic would have been perfect.", points: 1, accepted: ['for'] },
  { id: 'b2tc-e25', conceptId: 'b2-third-conditional', type: 'verb_form', prompt: 'If she had left earlier, she (not miss) ___ the flight.', points: 1, accepted: ["wouldn't have missed", 'would not have missed'] },
  { id: 'b2tc-e26', conceptId: 'b2-third-conditional', type: 'choose_word', prompt: '___ we booked earlier, the tickets would have been cheaper.', points: 1, options: ['Had', 'If', 'Would'], accepted: ['Had'] },
  { id: 'b2tc-e27', conceptId: 'b2-third-conditional', type: 'choose_word', prompt: 'They would have won if the goalkeeper ___ injured.', points: 1, options: ["hadn't been", 'was not', "wouldn't be"], accepted: ["hadn't been"] },
  { id: 'b2tc-e28', conceptId: 'b2-third-conditional', type: 'word_order', prompt: 'Соберите: «Знай я об этом, я бы тебе помог»', points: 1, bank: ['had', 'I', 'known', 'about', 'it', 'I', 'would', 'have', 'helped', 'you'], accepted: ['had I known about it I would have helped you'] },
  { id: 'b2tc-e29', conceptId: 'b2-third-conditional', type: 'word_order', prompt: 'Соберите: «Если бы не дождь, мы бы поехали»', points: 1, bank: ['if', 'it', "hadn't", 'been', 'for', 'the', 'rain', 'we', 'would', 'have', 'gone'], accepted: ["if it hadn't been for the rain we would have gone"] },
  { id: 'b2tc-e30', conceptId: 'b2-third-conditional', type: 'multi_gap', prompt: 'If they ___ (leave) earlier, they ___ (not get) stuck in traffic.', points: 1, gaps: [{ accepted: ['had left'] }, { accepted: ["wouldn't have got", "wouldn't have gotten", 'would not have got', 'would not have gotten'] }] },

  // ---- добор: b2-mixed-conditional ----
  { id: 'b2mc-e21', conceptId: 'b2-mixed-conditional', type: 'translate_ru_en', prompt: 'Если бы я не забыл паспорт, я был бы сейчас в Париже.', points: 2, accepted: ["If I hadn't forgotten my passport, I would be in Paris now", 'If I had not forgotten my passport, I would be in Paris now'] },
  { id: 'b2mc-e22', conceptId: 'b2-mixed-conditional', type: 'translate_ru_en', prompt: 'Если бы она не была такой упрямой, она бы вчера согласилась.', points: 2, accepted: ["If she weren't so stubborn, she would have agreed yesterday", 'If she was not so stubborn, she would have agreed yesterday'] },
  { id: 'b2mc-e23', conceptId: 'b2-mixed-conditional', type: 'fill_gap', prompt: 'If I had accepted that offer, I ___ working in London now.', points: 1, accepted: ['would be', "'d be"] },
  { id: 'b2mc-e24', conceptId: 'b2-mixed-conditional', type: 'fill_gap', prompt: 'If he were more careful, he ___ have broken the vase.', points: 1, accepted: ["wouldn't", 'would not'] },
  { id: 'b2mc-e25', conceptId: 'b2-mixed-conditional', type: 'verb_form', prompt: 'If we had bought that flat, we (not pay) ___ rent now.', points: 1, accepted: ["wouldn't be paying", 'would not be paying', "wouldn't pay", 'would not pay'] },
  { id: 'b2mc-e26', conceptId: 'b2-mixed-conditional', type: 'choose_word', prompt: 'If I had studied medicine, I ___ a doctor now.', points: 1, options: ['would be', 'would have been', 'will be'], accepted: ['would be'] },
  { id: 'b2mc-e27', conceptId: 'b2-mixed-conditional', type: 'choose_word', prompt: 'If she ___ afraid of flying, she would have come with us last year.', points: 1, options: ["weren't", "hadn't been", "wouldn't be"], accepted: ["weren't"] },
  { id: 'b2mc-e28', conceptId: 'b2-mixed-conditional', type: 'word_order', prompt: 'Соберите: «Если бы я выучил язык, я бы сейчас работал за границей»', points: 1, bank: ['if', 'I', 'had', 'learned', 'the', 'language', 'I', 'would', 'be', 'working', 'abroad', 'now'], accepted: ['if I had learned the language I would be working abroad now'] },
  { id: 'b2mc-e29', conceptId: 'b2-mixed-conditional', type: 'word_order', prompt: 'Соберите: «Если бы он не был занят, он бы пришёл вчера»', points: 1, bank: ['if', 'he', "weren't", 'busy', 'he', 'would', 'have', 'come', 'yesterday'], accepted: ["if he weren't busy he would have come yesterday"] },
  { id: 'b2mc-e30', conceptId: 'b2-mixed-conditional', type: 'multi_gap', prompt: 'If I ___ (not spend) all my money last year, I ___ (be) able to travel now.', points: 1, gaps: [{ accepted: ["hadn't spent", 'had not spent'] }, { accepted: ['would be'] }] },

  // ---- добор: b2-wish ----
  { id: 'b2wi-e21', conceptId: 'b2-wish', type: 'translate_ru_en', prompt: 'Хотел бы я уметь играть на пианино.', points: 2, accepted: ['I wish I could play the piano'] },
  { id: 'b2wi-e22', conceptId: 'b2-wish', type: 'translate_ru_en', prompt: 'Если бы только я не потерял её номер.', points: 2, accepted: ["If only I hadn't lost her number", 'If only I had not lost her number'] },
  { id: 'b2wi-e23', conceptId: 'b2-wish', type: 'fill_gap', prompt: 'If only I ___ listened to your advice!', points: 1, accepted: ['had', "'d"] },
  { id: 'b2wi-e24', conceptId: 'b2-wish', type: 'fill_gap', prompt: 'I wish he ___ stop interrupting me all the time.', points: 1, accepted: ['would', "'d"] },
  { id: 'b2wi-e25', conceptId: 'b2-wish', type: 'verb_form', prompt: 'I wish I (can) ___ speak Chinese fluently.', points: 1, accepted: ['could'] },
  { id: 'b2wi-e26', conceptId: 'b2-wish', type: 'choose_word', prompt: 'I wish it ___ raining — I want to go out.', points: 1, options: ['would stop', 'stops', 'stopped'], accepted: ['would stop'] },
  { id: 'b2wi-e27', conceptId: 'b2-wish', type: 'choose_word', prompt: 'I would rather you ___ tell anyone about this.', points: 1, options: ["didn't", 'not', 'will not'], accepted: ["didn't"] },
  { id: 'b2wi-e28', conceptId: 'b2-wish', type: 'word_order', prompt: 'Соберите: «Хотел бы я уметь играть на гитаре»', points: 1, bank: ['I', 'wish', 'I', 'could', 'play', 'the', 'guitar'], accepted: ['I wish I could play the guitar'] },
  { id: 'b2wi-e29', conceptId: 'b2-wish', type: 'word_order', prompt: 'Соберите: «Если бы только я знал раньше»', points: 1, bank: ['if', 'only', 'I', 'had', 'known', 'earlier'], accepted: ['if only I had known earlier'] },
  { id: 'b2wi-e30', conceptId: 'b2-wish', type: 'multi_gap', prompt: 'I wish I ___ (can) help you now, and I wish I ___ (not promise) so much yesterday.', points: 1, gaps: [{ accepted: ['could'] }, { accepted: ["hadn't promised", 'had not promised'] }] },
];
