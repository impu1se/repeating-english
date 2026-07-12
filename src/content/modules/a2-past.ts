import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'a2-past',
  title: 'Прошедшее время: to be, Past Simple, вопросы',
  level: 'A2',
  masteryThreshold: 50,
  conceptIds: ['a2-was-were', 'a2-past-simple', 'a2-past-questions'],
};

export const concepts: Concept[] = [
  {
    id: 'a2-was-were',
    moduleId: 'a2-past',
    title: 'was / were',
    kind: 'grammar',
    theory:
      "was/were — прошедшее время глагола to be (был/была/было/были).\n• I/he/she/it + was: I was tired. He was at work.\n• we/you/they + were: We were at home. They were late.\nОтрицание: wasn't (was not) / weren't (were not).\n• She wasn't ready. We weren't hungry.\nВопрос — was/were выходят на первое место: Was he at school yesterday? Were they busy last week?\nКраткие ответы: Yes, I was. / No, she wasn't.\nthere was / there were — было, находилось (прошедшее от there is/are):\n• There was a shop on this street. There were three chairs in the room.\nОтрицание и вопрос: There wasn't any bread. Was there a meeting yesterday?",
    exerciseIds: [
      'a2ww-e1', 'a2ww-e2', 'a2ww-e3', 'a2ww-e4', 'a2ww-e5',
      'a2ww-e6', 'a2ww-e7', 'a2ww-e8', 'a2ww-e9', 'a2ww-e10',
      'a2ww-e11', 'a2ww-e12', 'a2ww-e13', 'a2ww-e14', 'a2ww-e15',
      'a2ww-e16', 'a2ww-e17', 'a2ww-e18', 'a2ww-e19', 'a2ww-e20',
    ],
  },
  {
    id: 'a2-past-simple',
    moduleId: 'a2-past',
    title: 'Past Simple: правильные и неправильные глаголы',
    kind: 'grammar',
    theory:
      "Past Simple — законченное действие в прошлом, которое уже закончилось.\nПравильные глаголы: + -ed.\n• work → worked, play → played, want → wanted.\nОрфография: -e → +d (like → liked); согласная+y → -ied (study → studied); гласная+согласная на конце — согласная удваивается (stop → stopped).\nНеправильные глаголы имеют особую форму — их нужно запомнить.\n• go → went, see → saw, have → had, take → took, make → made.\nОтрицание одинаково и для правильных, и для неправильных глаголов: didn't + базовая форма (went/saw — только в утверждении!).\n• I didn't go to the party. She didn't see the film.\nВремя обычно уточняется словами: yesterday, last week, two days ago, in 2020.",
    exerciseIds: [
      'a2pt-e1', 'a2pt-e2', 'a2pt-e3', 'a2pt-e4', 'a2pt-e5',
      'a2pt-e6', 'a2pt-e7', 'a2pt-e8', 'a2pt-e9', 'a2pt-e10',
      'a2pt-e11', 'a2pt-e12', 'a2pt-e13', 'a2pt-e14', 'a2pt-e15',
      'a2pt-e16', 'a2pt-e17', 'a2pt-e18', 'a2pt-e19', 'a2pt-e20',
    ],
  },
  {
    id: 'a2-past-questions',
    moduleId: 'a2-past',
    title: 'Past Simple: вопросы с did',
    kind: 'grammar',
    theory:
      "Вопросы и отрицания в Past Simple образуются с помощью did (для всех лиц), смысловой глагол — в базовой форме (went, не went-ed).\n• Did you go to the party? — Ты ходил на вечеринку? (не Did you went)\nОтрицание: didn't (did not) + базовая форма:\n• I didn't go. She didn't see him. (went/saw — только в утверждении!)\nКраткие ответы: Yes, I did. / No, she didn't.\nВопросительные слова (Wh-) стоят перед did:\n• What did you do yesterday? Where did she go? Why didn't you call me?\nГлагол to be (was/were) вопросы образует без did — сам выходит вперёд: Were you at home? (не Did you were)",
    exerciseIds: [
      'a2pd-e1', 'a2pd-e2', 'a2pd-e3', 'a2pd-e4', 'a2pd-e5',
      'a2pd-e6', 'a2pd-e7', 'a2pd-e8', 'a2pd-e9', 'a2pd-e10',
      'a2pd-e11', 'a2pd-e12', 'a2pd-e13', 'a2pd-e14', 'a2pd-e15',
      'a2pd-e16', 'a2pd-e17', 'a2pd-e18', 'a2pd-e19', 'a2pd-e20',
    ],
  },
];

export const exercises: Exercise[] = [
  // ============ a2-was-were ============
  // --- translate_ru_en ---
  { id: 'a2ww-e1', conceptId: 'a2-was-were', type: 'translate_ru_en', prompt: 'Я был очень занят вчера.', points: 2, accepted: ['I was very busy yesterday'] },
  { id: 'a2ww-e2', conceptId: 'a2-was-were', type: 'translate_ru_en', prompt: 'Она не была дома вчера вечером.', points: 2, accepted: ["She wasn't at home last night", 'She was not at home last night'] },
  { id: 'a2ww-e3', conceptId: 'a2-was-were', type: 'translate_ru_en', prompt: 'Вы были на вечеринке в субботу?', points: 2, accepted: ['Were you at the party on Saturday?'] },
  { id: 'a2ww-e4', conceptId: 'a2-was-were', type: 'translate_ru_en', prompt: 'В комнате было три стула.', points: 2, accepted: ['There were three chairs in the room'] },
  // --- fill_gap ---
  { id: 'a2ww-e5', conceptId: 'a2-was-were', type: 'fill_gap', prompt: 'The weather ___ terrible yesterday, so we stayed at home.', points: 1, accepted: ['was'] },
  { id: 'a2ww-e6', conceptId: 'a2-was-were', type: 'fill_gap', prompt: 'There ___ no milk in the fridge, so I had my coffee black.', points: 1, accepted: ['was'] },
  { id: 'a2ww-e7', conceptId: 'a2-was-were', type: 'fill_gap', prompt: '___ your parents at home when you called?', points: 1, accepted: ['were'] },
  // --- verb_form ---
  { id: 'a2ww-e8', conceptId: 'a2-was-were', type: 'verb_form', prompt: 'I (be) ___ at the cinema last night.', points: 1, accepted: ['was'] },
  { id: 'a2ww-e9', conceptId: 'a2-was-were', type: 'verb_form', prompt: 'Yesterday, they (be) ___ late for the bus.', points: 1, accepted: ['were'] },
  { id: 'a2ww-e10', conceptId: 'a2-was-were', type: 'verb_form', prompt: 'It (be) ___ very cold yesterday.', points: 1, accepted: ['was'] },
  // --- choose_word ---
  { id: 'a2ww-e11', conceptId: 'a2-was-were', type: 'choose_word', prompt: 'She ___ tired after work yesterday.', points: 1, options: ['was', 'were', 'is'], accepted: ['was'] },
  { id: 'a2ww-e12', conceptId: 'a2-was-were', type: 'choose_word', prompt: 'We ___ at the cinema last Friday.', points: 1, options: ['were', 'was', 'are'], accepted: ['were'] },
  { id: 'a2ww-e13', conceptId: 'a2-was-were', type: 'choose_word', prompt: '___ you at home yesterday?', points: 1, options: ['Were', 'Was', 'Did'], accepted: ['Were'] },
  { id: 'a2ww-e14', conceptId: 'a2-was-were', type: 'choose_word', prompt: 'There ___ many guests at the wedding last weekend.', points: 1, options: ['were', 'was', 'are'], accepted: ['were'] },
  // --- word_order ---
  { id: 'a2ww-e15', conceptId: 'a2-was-were', type: 'word_order', prompt: 'Соберите: «Мы были на пляже»', points: 1, bank: ['we', 'were', 'at', 'the', 'beach'], accepted: ['we were at the beach'] },
  { id: 'a2ww-e16', conceptId: 'a2-was-were', type: 'word_order', prompt: 'Соберите: «Она не была готова»', points: 1, bank: ['she', 'was', 'not', 'ready'], accepted: ['she was not ready'] },
  { id: 'a2ww-e17', conceptId: 'a2-was-were', type: 'word_order', prompt: 'Соберите: «Была ли встреча вчера?»', points: 1, bank: ['was', 'there', 'a', 'meeting', 'yesterday'], accepted: ['was there a meeting yesterday'] },
  // --- multi_gap ---
  { id: 'a2ww-e18', conceptId: 'a2-was-were', type: 'multi_gap', prompt: 'I ___ hungry, but they ___ not hungry.', points: 1, gaps: [{ accepted: ['was'] }, { accepted: ['were'] }] },
  { id: 'a2ww-e19', conceptId: 'a2-was-were', type: 'multi_gap', prompt: '___ she at home yesterday? No, she ___ at work.', points: 1, gaps: [{ accepted: ['was'] }, { accepted: ['was'] }] },
  { id: 'a2ww-e20', conceptId: 'a2-was-were', type: 'multi_gap', prompt: 'There ___ a car outside, but there ___ no bikes.', points: 1, gaps: [{ accepted: ['was'] }, { accepted: ['were'] }] },

  // ============ a2-past-simple ============
  // --- translate_ru_en ---
  { id: 'a2pt-e1', conceptId: 'a2-past-simple', type: 'translate_ru_en', prompt: 'Вчера я работал допоздна.', points: 2, accepted: ['I worked late yesterday'] },
  { id: 'a2pt-e2', conceptId: 'a2-past-simple', type: 'translate_ru_en', prompt: 'Она посмотрела хороший фильм на прошлой неделе.', points: 2, accepted: ['She watched a good film last week', 'She watched a good movie last week'] },
  { id: 'a2pt-e3', conceptId: 'a2-past-simple', type: 'translate_ru_en', prompt: 'Мы поехали в Италию два года назад.', points: 2, accepted: ['We went to Italy two years ago'] },
  { id: 'a2pt-e4', conceptId: 'a2-past-simple', type: 'translate_ru_en', prompt: 'Я не видел его вчера.', points: 2, accepted: ["I didn't see him yesterday", 'I did not see him yesterday'] },
  // --- fill_gap ---
  { id: 'a2pt-e5', conceptId: 'a2-past-simple', type: 'fill_gap', prompt: 'I was hungry, so I ___ a sandwich.', points: 1, accepted: ['made', 'had', 'ate'] },
  { id: 'a2pt-e6', conceptId: 'a2-past-simple', type: 'fill_gap', prompt: 'There was a loud noise, so everybody ___ outside.', points: 1, accepted: ['ran', 'went'] },
  { id: 'a2pt-e7', conceptId: 'a2-past-simple', type: 'fill_gap', prompt: 'She ___ her homework before dinner yesterday.', points: 1, accepted: ['finished', 'did'] },
  // --- verb_form ---
  { id: 'a2pt-e8', conceptId: 'a2-past-simple', type: 'verb_form', prompt: 'Yesterday, she (watch) ___ a documentary.', points: 1, accepted: ['watched'] },
  { id: 'a2pt-e9', conceptId: 'a2-past-simple', type: 'verb_form', prompt: 'Last year, we (go) ___ to Spain.', points: 1, accepted: ['went'] },
  { id: 'a2pt-e10', conceptId: 'a2-past-simple', type: 'verb_form', prompt: 'Two days ago, I (take) ___ a taxi to the airport.', points: 1, accepted: ['took'] },
  // --- choose_word ---
  { id: 'a2pt-e11', conceptId: 'a2-past-simple', type: 'choose_word', prompt: 'She ___ to London last summer.', points: 1, options: ['went', 'goed', 'go'], accepted: ['went'] },
  { id: 'a2pt-e12', conceptId: 'a2-past-simple', type: 'choose_word', prompt: 'I ___ a big pizza yesterday.', points: 1, options: ['ate', 'eated', 'eat'], accepted: ['ate'] },
  { id: 'a2pt-e13', conceptId: 'a2-past-simple', type: 'choose_word', prompt: 'He ___ the door and left.', points: 1, options: ['closed', 'closeed', 'close'], accepted: ['closed'] },
  { id: 'a2pt-e14', conceptId: 'a2-past-simple', type: 'choose_word', prompt: 'We ___ our new neighbours at the party last night.', points: 1, options: ['met', 'meeted', 'meet'], accepted: ['met'] },
  // --- word_order ---
  { id: 'a2pt-e15', conceptId: 'a2-past-simple', type: 'word_order', prompt: 'Соберите: «Я купил новую машину в прошлом году»', points: 1, bank: ['I', 'bought', 'a', 'new', 'car', 'last', 'year'], accepted: ['I bought a new car last year', 'last year I bought a new car'] },
  { id: 'a2pt-e16', conceptId: 'a2-past-simple', type: 'word_order', prompt: 'Соберите: «Она увидела своего друга в парке»', points: 1, bank: ['she', 'saw', 'her', 'friend', 'in', 'the', 'park'], accepted: ['she saw her friend in the park', 'in the park she saw her friend'] },
  { id: 'a2pt-e17', conceptId: 'a2-past-simple', type: 'word_order', prompt: 'Соберите: «Мы не поехали на пляж вчера»', points: 1, bank: ['we', 'did', 'not', 'go', 'to', 'the', 'beach', 'yesterday'], accepted: ['we did not go to the beach yesterday', 'yesterday we did not go to the beach'] },
  // --- multi_gap ---
  { id: 'a2pt-e18', conceptId: 'a2-past-simple', type: 'multi_gap', prompt: 'Yesterday I ___ (go) to the shop and ___ (buy) some bread.', points: 1, gaps: [{ accepted: ['went'] }, { accepted: ['bought'] }] },
  { id: 'a2pt-e19', conceptId: 'a2-past-simple', type: 'multi_gap', prompt: "She didn't ___ (see) him yesterday, but she ___ (call) him in the evening.", points: 1, gaps: [{ accepted: ['see'] }, { accepted: ['called'] }] },
  { id: 'a2pt-e20', conceptId: 'a2-past-simple', type: 'multi_gap', prompt: 'Last month we ___ (visit) Paris, and we ___ (eat) a lot of croissants.', points: 1, gaps: [{ accepted: ['visited'] }, { accepted: ['ate'] }] },

  // ============ a2-past-questions ============
  // --- translate_ru_en ---
  { id: 'a2pd-e1', conceptId: 'a2-past-questions', type: 'translate_ru_en', prompt: 'Ты ходил на вечеринку в субботу?', points: 2, accepted: ['Did you go to the party on Saturday?'] },
  { id: 'a2pd-e2', conceptId: 'a2-past-questions', type: 'translate_ru_en', prompt: 'Она не звонила мне вчера.', points: 2, accepted: ["She didn't call me yesterday", 'She did not call me yesterday'] },
  { id: 'a2pd-e3', conceptId: 'a2-past-questions', type: 'translate_ru_en', prompt: 'Что ты делал вчера вечером?', points: 2, accepted: ['What did you do last night?', 'What did you do yesterday evening?'] },
  { id: 'a2pd-e4', conceptId: 'a2-past-questions', type: 'translate_ru_en', prompt: 'Почему он не пришёл на встречу?', points: 2, accepted: ["Why didn't he come to the meeting?", 'Why did he not come to the meeting?'] },
  // --- fill_gap ---
  { id: 'a2pd-e5', conceptId: 'a2-past-questions', type: 'fill_gap', prompt: '___ you finish the report yesterday?', points: 1, accepted: ['did'] },
  { id: 'a2pd-e6', conceptId: 'a2-past-questions', type: 'fill_gap', prompt: 'I ___ understand the question, so I asked again.', points: 1, accepted: ["didn't", 'did not'] },
  { id: 'a2pd-e7', conceptId: 'a2-past-questions', type: 'fill_gap', prompt: 'Where ___ you buy those shoes?', points: 1, accepted: ['did'] },
  // --- verb_form ---
  { id: 'a2pd-e8', conceptId: 'a2-past-questions', type: 'verb_form', prompt: 'Did she (go) ___ to the concert?', points: 1, accepted: ['go'] },
  { id: 'a2pd-e9', conceptId: 'a2-past-questions', type: 'verb_form', prompt: "They didn't (have) ___ time to visit us.", points: 1, accepted: ['have'] },
  { id: 'a2pd-e10', conceptId: 'a2-past-questions', type: 'verb_form', prompt: 'What did he (say) ___ about the plan?', points: 1, accepted: ['say'] },
  // --- choose_word ---
  { id: 'a2pd-e11', conceptId: 'a2-past-questions', type: 'choose_word', prompt: '___ you see that movie last week?', points: 1, options: ['Did', 'Were', 'Do'], accepted: ['Did'] },
  { id: 'a2pd-e12', conceptId: 'a2-past-questions', type: 'choose_word', prompt: 'She ___ like the food at the restaurant last night.', points: 1, options: ["didn't", "wasn't", "doesn't"], accepted: ["didn't"] },
  { id: 'a2pd-e13', conceptId: 'a2-past-questions', type: 'choose_word', prompt: 'Did he ___ his homework?', points: 1, options: ['finish', 'finished', 'finishes'], accepted: ['finish'] },
  { id: 'a2pd-e14', conceptId: 'a2-past-questions', type: 'choose_word', prompt: '___ did you buy at the shop?', points: 1, options: ['What', 'Where', 'Who'], accepted: ['What'] },
  // --- word_order ---
  { id: 'a2pd-e15', conceptId: 'a2-past-questions', type: 'word_order', prompt: 'Соберите: «Ты видел этот фильм?»', points: 1, bank: ['did', 'you', 'see', 'that', 'film'], accepted: ['did you see that film'] },
  { id: 'a2pd-e16', conceptId: 'a2-past-questions', type: 'word_order', prompt: 'Соберите: «Я не ходил в школу вчера»', points: 1, bank: ['I', 'did', 'not', 'go', 'to', 'school', 'yesterday'], accepted: ['I did not go to school yesterday', 'yesterday I did not go to school'] },
  { id: 'a2pd-e17', conceptId: 'a2-past-questions', type: 'word_order', prompt: 'Соберите: «Где ты купил эту куртку?»', points: 1, bank: ['where', 'did', 'you', 'buy', 'that', 'jacket'], accepted: ['where did you buy that jacket'] },
  // --- multi_gap ---
  { id: 'a2pd-e18', conceptId: 'a2-past-questions', type: 'multi_gap', prompt: '___ you call her yesterday? No, I ___.', points: 1, gaps: [{ accepted: ['did'] }, { accepted: ["didn't", 'did not'] }] },
  { id: 'a2pd-e19', conceptId: 'a2-past-questions', type: 'multi_gap', prompt: 'What ___ you buy, and where ___ she go after?', points: 1, gaps: [{ accepted: ['did'] }, { accepted: ['did'] }] },
  { id: 'a2pd-e20', conceptId: 'a2-past-questions', type: 'multi_gap', prompt: "___ didn't he call? Because he ___ his phone at home.", points: 1, gaps: [{ accepted: ['why'] }, { accepted: ['left', 'forgot'] }] },
];
