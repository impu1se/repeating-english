import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'b2-passive',
  title: 'Пассивный залог (продвинутый) и каузативная конструкция',
  level: 'B2',
  masteryThreshold: 50,
  conceptIds: ['b2-passive-advanced', 'b2-causative'],
};

export const concepts: Concept[] = [
  {
    id: 'b2-passive-advanced',
    moduleId: 'b2-passive',
    title: 'Passive Voice (продвинутый уровень): перфект, будущее, модальные глаголы',
    kind: 'grammar',
    theory:
      "Passive Voice — продвинутые времена и конструкции: перфект, будущее, модальные глаголы, продолженное время.\nPresent Perfect Passive: have/has been + V3 — действие завершилось, важен результат сейчас: The report has been finished.\nFuture Passive: will be + V3 — то, что будет сделано: The results will be announced tomorrow.\nModal + be + V3 — с модальными глаголами: This form must be signed by both parties. The problem can be solved easily.\nPresent Continuous Passive: is/are being + V3 — действие происходит прямо сейчас: The road is being repaired this week.\nСравните: The road has been repaired (уже готово) — The road is being repaired (ремонт идёт прямо сейчас).\nОтрицание: has/have + not + been; won't be; modal + not + be; is/are + not + being.\n• The bridge hasn't been finished yet. The car can't be fixed today. The kitchen isn't being used right now.",
    exerciseIds: [
      'b2pa-e1', 'b2pa-e2', 'b2pa-e3', 'b2pa-e4', 'b2pa-e5',
      'b2pa-e6', 'b2pa-e7', 'b2pa-e8', 'b2pa-e9', 'b2pa-e10',
      'b2pa-e11', 'b2pa-e12', 'b2pa-e13', 'b2pa-e14', 'b2pa-e15',
      'b2pa-e16', 'b2pa-e17', 'b2pa-e18', 'b2pa-e19', 'b2pa-e20',
    ],
  },
  {
    id: 'b2-causative',
    moduleId: 'b2-passive',
    title: 'Causative: have/get something done',
    kind: 'grammar',
    theory:
      "Causative (have/get something done) — говорим, что действие для нас выполняет кто-то другой (не мы сами).\nОбразование: have/get + object + V3 (третья форма глагола).\n• I had my hair cut. — Мне подстригли волосы (это сделал парикмахер, не я сам).\n• She's getting her car repaired. — Ей ремонтируют машину.\nhave и get взаимозаменяемы по смыслу, get — более разговорный вариант: I got my phone fixed. = I had my phone fixed.\nПорядок слов — ключевая ловушка: have/get + ОБЪЕКТ + V3, а не V3 + object!\nПравильно: I had my hair cut. Неправильно: I had cut my hair (это значило бы, что вы сами кого-то постригли).\nВремена меняются как у обычного have/get: had my hair cut → will have my hair cut → have had my hair cut.\nВопросы и отрицания — как у обычного глагола: Did you have your car serviced? I haven't had my hair cut yet.",
    exerciseIds: [
      'b2cs-e1', 'b2cs-e2', 'b2cs-e3', 'b2cs-e4', 'b2cs-e5',
      'b2cs-e6', 'b2cs-e7', 'b2cs-e8', 'b2cs-e9', 'b2cs-e10',
      'b2cs-e11', 'b2cs-e12', 'b2cs-e13', 'b2cs-e14', 'b2cs-e15',
      'b2cs-e16', 'b2cs-e17', 'b2cs-e18', 'b2cs-e19', 'b2cs-e20',
    ],
  },
];

export const exercises: Exercise[] = [
  // ============ b2-passive-advanced ============
  // --- translate_ru_en ---
  { id: 'b2pa-e1', conceptId: 'b2-passive-advanced', type: 'translate_ru_en', prompt: 'Отчёт уже закончен.', points: 2, accepted: ['The report has been finished', "The report's been finished", 'The report has already been finished', 'The report has been completed'] },
  { id: 'b2pa-e2', conceptId: 'b2-passive-advanced', type: 'translate_ru_en', prompt: 'Результаты будут объявлены завтра.', points: 2, accepted: ['The results will be announced tomorrow', "The results'll be announced tomorrow", 'Tomorrow the results will be announced', "Tomorrow the results'll be announced"] },
  { id: 'b2pa-e3', conceptId: 'b2-passive-advanced', type: 'translate_ru_en', prompt: 'Эта форма должна быть подписана обеими сторонами.', points: 2, accepted: ['This form must be signed by both parties', 'This form has to be signed by both parties', 'This form needs to be signed by both parties', 'This form must be signed by both sides'] },
  { id: 'b2pa-e4', conceptId: 'b2-passive-advanced', type: 'translate_ru_en', prompt: 'Дорогу сейчас ремонтируют.', points: 2, accepted: ['The road is being repaired right now', "The road's being repaired right now", 'The road is being repaired now', 'The road is being repaired at the moment'] },
  // --- fill_gap ---
  { id: 'b2pa-e5', conceptId: 'b2-passive-advanced', type: 'fill_gap', prompt: "The new bridge ___ been finished yet — it's still under construction.", points: 1, accepted: ["hasn't", 'has not'] },
  { id: 'b2pa-e6', conceptId: 'b2-passive-advanced', type: 'fill_gap', prompt: 'This letter ___ be sent by post tomorrow.', points: 1, accepted: ['will', "'ll"] },
  { id: 'b2pa-e7', conceptId: 'b2-passive-advanced', type: 'fill_gap', prompt: 'The kitchen is ___ used right now, so please wait.', points: 1, accepted: ['being'] },
  // --- verb_form ---
  { id: 'b2pa-e8', conceptId: 'b2-passive-advanced', type: 'verb_form', prompt: 'All the tickets (sell) ___ already.', points: 1, accepted: ['have been sold'] },
  { id: 'b2pa-e9', conceptId: 'b2-passive-advanced', type: 'verb_form', prompt: 'The new policy (announce) ___ next month.', points: 1, accepted: ['will be announced'] },
  { id: 'b2pa-e10', conceptId: 'b2-passive-advanced', type: 'verb_form', prompt: 'This machine is broken, but it can (repair) ___ quickly by a technician.', points: 1, accepted: ['be repaired'] },
  // --- choose_word ---
  { id: 'b2pa-e11', conceptId: 'b2-passive-advanced', type: 'choose_word', prompt: 'The results ___ announced tomorrow.', points: 1, options: ['will be', 'will', 'are'], accepted: ['will be'] },
  { id: 'b2pa-e12', conceptId: 'b2-passive-advanced', type: 'choose_word', prompt: 'The kitchen ___ cleaned already — you can use it now.', points: 1, options: ['has been', 'is', 'was'], accepted: ['has been'] },
  { id: 'b2pa-e13', conceptId: 'b2-passive-advanced', type: 'choose_word', prompt: 'This exercise ___ completed before the deadline.', points: 1, options: ['must be', 'must', 'is'], accepted: ['must be'] },
  { id: 'b2pa-e14', conceptId: 'b2-passive-advanced', type: 'choose_word', prompt: 'Look! The house next door ___ painted.', points: 1, options: ['is being', 'has been', 'is'], accepted: ['is being'] },
  // --- word_order ---
  { id: 'b2pa-e15', conceptId: 'b2-passive-advanced', type: 'word_order', prompt: 'Соберите: «Отчёт уже был закончен»', points: 1, bank: ['the', 'report', 'has', 'already', 'been', 'finished'], accepted: ['the report has already been finished', 'the report has been finished already'] },
  { id: 'b2pa-e16', conceptId: 'b2-passive-advanced', type: 'word_order', prompt: 'Соберите: «Результаты будут объявлены завтра»', points: 1, bank: ['the', 'results', 'will', 'be', 'announced', 'tomorrow'], accepted: ['the results will be announced tomorrow', 'tomorrow the results will be announced'] },
  { id: 'b2pa-e17', conceptId: 'b2-passive-advanced', type: 'word_order', prompt: 'Соберите: «Дорогу сейчас ремонтируют»', points: 1, bank: ['the', 'road', 'is', 'being', 'repaired', 'right', 'now'], accepted: ['the road is being repaired right now', 'right now the road is being repaired'] },
  // --- multi_gap ---
  { id: 'b2pa-e18', conceptId: 'b2-passive-advanced', type: 'multi_gap', prompt: 'The letter ___ (write) already, and it ___ (send) tomorrow.', points: 1, gaps: [{ accepted: ['has been written'] }, { accepted: ['will be sent'] }] },
  { id: 'b2pa-e19', conceptId: 'b2-passive-advanced', type: 'multi_gap', prompt: 'This machine is dangerous — it must ___ (switch) off, and the power must ___ (disconnect) before cleaning.', points: 1, gaps: [{ accepted: ['be switched'] }, { accepted: ['be disconnected'] }] },
  { id: 'b2pa-e20', conceptId: 'b2-passive-advanced', type: 'multi_gap', prompt: 'Look! The house ___ (paint), and the garden ___ (redesign) at the same time.', points: 1, gaps: [{ accepted: ['is being painted'] }, { accepted: ['is being redesigned'] }] },

  // ============ b2-causative ============
  // --- translate_ru_en ---
  { id: 'b2cs-e1', conceptId: 'b2-causative', type: 'translate_ru_en', prompt: 'Мне подстригли волосы.', points: 2, accepted: ['I had my hair cut', "I've had my hair cut", 'I got my hair cut', 'I have had my hair cut'] },
  { id: 'b2cs-e2', conceptId: 'b2-causative', type: 'translate_ru_en', prompt: 'Ей сейчас ремонтируют машину.', points: 2, accepted: ["She's having her car repaired now", 'She is having her car repaired now', "She's getting her car repaired now", 'She is getting her car repaired now'] },
  { id: 'b2cs-e3', conceptId: 'b2-causative', type: 'translate_ru_en', prompt: 'Нам ещё не установили сигнализацию.', points: 2, accepted: ["We haven't had the alarm installed yet", 'We have not had the alarm installed yet', "We haven't got the alarm installed yet", "We haven't had our alarm installed yet"] },
  { id: 'b2cs-e4', conceptId: 'b2-causative', type: 'translate_ru_en', prompt: 'Тебе уже почистили зубы?', points: 2, accepted: ['Have you had your teeth cleaned yet', 'Did you have your teeth cleaned', 'Have you got your teeth cleaned yet', 'Have you had your teeth cleaned'] },
  // --- fill_gap ---
  { id: 'b2cs-e5', conceptId: 'b2-causative', type: 'fill_gap', prompt: 'I need to ___ my car serviced next week.', points: 1, accepted: ['have', 'get'] },
  { id: 'b2cs-e6', conceptId: 'b2-causative', type: 'fill_gap', prompt: 'She had her hair ___ yesterday.', points: 1, accepted: ['cut'] },
  { id: 'b2cs-e7', conceptId: 'b2-causative', type: 'fill_gap', prompt: 'We ___ our house painted last month.', points: 1, accepted: ['had', 'got'] },
  // --- verb_form ---
  { id: 'b2cs-e8', conceptId: 'b2-causative', type: 'verb_form', prompt: 'I had my phone (repair) ___ yesterday.', points: 1, accepted: ['repaired'] },
  { id: 'b2cs-e9', conceptId: 'b2-causative', type: 'verb_form', prompt: "She's getting her nails (do) ___ this afternoon.", points: 1, accepted: ['done'] },
  { id: 'b2cs-e10', conceptId: 'b2-causative', type: 'verb_form', prompt: 'We will have the roof (fix) ___ before winter.', points: 1, accepted: ['fixed'] },
  // --- choose_word ---
  { id: 'b2cs-e11', conceptId: 'b2-causative', type: 'choose_word', prompt: 'I ___ my hair cut every month.', points: 1, options: ['have', 'has', 'having'], accepted: ['have'] },
  { id: 'b2cs-e12', conceptId: 'b2-causative', type: 'choose_word', prompt: 'Yesterday, she ___ her car washed by a mechanic.', points: 1, options: ['had', 'has', 'was'], accepted: ['had'] },
  { id: 'b2cs-e13', conceptId: 'b2-causative', type: 'choose_word', prompt: 'He needs to ___ his suit dry-cleaned before the interview.', points: 1, options: ['have', 'has', 'do'], accepted: ['have'] },
  { id: 'b2cs-e14', conceptId: 'b2-causative', type: 'choose_word', prompt: 'I ___ my photo taken for the new passport.', points: 1, options: ['got', 'made', 'did'], accepted: ['got'] },
  // --- word_order ---
  { id: 'b2cs-e15', conceptId: 'b2-causative', type: 'word_order', prompt: 'Соберите: «Мне подстригли волосы»', points: 1, bank: ['i', 'had', 'my', 'hair', 'cut'], accepted: ['i had my hair cut'] },
  { id: 'b2cs-e16', conceptId: 'b2-causative', type: 'word_order', prompt: 'Соберите: «Она ремонтирует машину (у мастера)»', points: 1, bank: ["she's", 'getting', 'her', 'car', 'repaired'], accepted: ["she's getting her car repaired"] },
  { id: 'b2cs-e17', conceptId: 'b2-causative', type: 'word_order', prompt: 'Соберите: «Мы ещё не установили сигнализацию»', points: 1, bank: ['we', "haven't", 'had', 'the', 'alarm', 'installed', 'yet'], accepted: ["we haven't had the alarm installed yet"] },
  // --- multi_gap ---
  { id: 'b2cs-e18', conceptId: 'b2-causative', type: 'multi_gap', prompt: 'I ___ (have) my hair cut yesterday, and tomorrow I ___ (have) my teeth checked.', points: 1, gaps: [{ accepted: ['had'] }, { accepted: ['will have', "'ll have"] }] },
  { id: 'b2cs-e19', conceptId: 'b2-causative', type: 'multi_gap', prompt: "She got her nails ___ (do) yesterday, and now she's getting her hair ___ (colour) too.", points: 1, gaps: [{ accepted: ['done'] }, { accepted: ['coloured', 'colored'] }] },
  { id: 'b2cs-e20', conceptId: 'b2-causative', type: 'multi_gap', prompt: "We haven't ___ (have) the roof fixed yet, but we've already ___ (have) the windows replaced.", points: 1, gaps: [{ accepted: ['had'] }, { accepted: ['had'] }] },
];
