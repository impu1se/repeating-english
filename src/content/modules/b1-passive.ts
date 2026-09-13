import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'b1-passive',
  title: 'Пассивный залог: настоящее и прошедшее время',
  level: 'B1',
  masteryThreshold: 20,
  conceptIds: ['b1-passive-present', 'b1-passive-past'],
};

export const concepts: Concept[] = [
  {
    id: 'b1-passive-present',
    moduleId: 'b1-passive',
    title: 'Passive Voice: am/is/are + V3',
    kind: 'grammar',
    theory:
      "Passive Voice (present) — когда важнее действие или объект, а не тот, кто его совершает (или это неизвестно/неважно).\nОбразование: am/is/are + V3 (третья форма / причастие прошедшего времени).\n• This car is made in Germany. — Эта машина производится в Германии.\nАктивный → пассивный: объект действия становится подлежащим.\n• Active: The company makes these phones. → Passive: These phones are made by the company.\nby + agent — указываем, кем выполняется действие, только если это важно:\n• The book is written by a famous author.\nВопросы: am/is/are выходит перед подлежащим: Where is it made? Is this bread baked here every day?\nОтрицание: is not (isn't) / are not (aren't) + V3.\n• This coffee isn't grown in England — it's imported.",
    exerciseIds: [
      'b1pv-e1', 'b1pv-e2', 'b1pv-e3', 'b1pv-e4', 'b1pv-e5',
      'b1pv-e6', 'b1pv-e7', 'b1pv-e8', 'b1pv-e9', 'b1pv-e10',
      'b1pv-e11', 'b1pv-e12', 'b1pv-e13', 'b1pv-e14', 'b1pv-e15',
      'b1pv-e16', 'b1pv-e17', 'b1pv-e18', 'b1pv-e19', 'b1pv-e20',
      'b1pv-e21', 'b1pv-e22', 'b1pv-e23', 'b1pv-e24', 'b1pv-e25', 'b1pv-e26', 'b1pv-e27', 'b1pv-e28', 'b1pv-e29', 'b1pv-e30',
    ],
  },
  {
    id: 'b1-passive-past',
    moduleId: 'b1-passive',
    title: 'Passive Voice: was/were + V3',
    kind: 'grammar',
    theory:
      "Passive Voice (past) — was/were + V3; используется для фактов и событий в прошлом, когда важен результат, а не исполнитель.\nОбразование: was/were + V3.\n• This bridge was built in 1889. — Этот мост был построен в 1889 году.\n• These pyramids were built thousands of years ago.\nИзвестные факты часто звучат в пассиве:\n• The telephone was invented by Alexander Graham Bell. 'Romeo and Juliet' was written by Shakespeare.\nby + agent — если важно указать, кто это сделал: Penicillin was discovered by Alexander Fleming.\nОтрицание: wasn't/weren't + V3. Вопрос: was/were выходит перед подлежащим.\n• This house wasn't built last year — it's much older.\n• When was this castle built? Were these letters written by hand?",
    exerciseIds: [
      'b1pw-e1', 'b1pw-e2', 'b1pw-e3', 'b1pw-e4', 'b1pw-e5',
      'b1pw-e6', 'b1pw-e7', 'b1pw-e8', 'b1pw-e9', 'b1pw-e10',
      'b1pw-e11', 'b1pw-e12', 'b1pw-e13', 'b1pw-e14', 'b1pw-e15',
      'b1pw-e16', 'b1pw-e17', 'b1pw-e18', 'b1pw-e19', 'b1pw-e20',
      'b1pw-e21', 'b1pw-e22', 'b1pw-e23', 'b1pw-e24', 'b1pw-e25', 'b1pw-e26', 'b1pw-e27', 'b1pw-e28', 'b1pw-e29', 'b1pw-e30',
    ],
  },
];

export const exercises: Exercise[] = [
  // ============ b1-passive-present ============
  // --- translate_ru_en ---
  { id: 'b1pv-e1', conceptId: 'b1-passive-present', type: 'translate_ru_en', prompt: 'Эта машина производится в Германии.', points: 2, accepted: ['This car is made in Germany', "This car's made in Germany", 'This car is manufactured in Germany'] },
  { id: 'b1pv-e2', conceptId: 'b1-passive-present', type: 'translate_ru_en', prompt: 'Эти телефоны продаются по всему миру.', points: 2, accepted: ['These phones are sold all over the world', 'These phones are sold around the world', 'These phones are sold worldwide'] },
  { id: 'b1pv-e3', conceptId: 'b1-passive-present', type: 'translate_ru_en', prompt: 'Эта книга написана известным автором.', points: 2, accepted: ['This book is written by a famous author', "This book's written by a famous author", 'This book is written by a well-known author'] },
  { id: 'b1pv-e4', conceptId: 'b1-passive-present', type: 'translate_ru_en', prompt: 'Этот кофе не выращивают в Англии — его импортируют.', points: 2, accepted: ["This coffee isn't grown in England — it's imported", 'This coffee is not grown in England — it is imported', "This coffee isn't grown in England — it comes from abroad"] },
  // --- fill_gap ---
  { id: 'b1pv-e5', conceptId: 'b1-passive-present', type: 'fill_gap', prompt: 'This bread ___ baked here every day.', points: 1, accepted: ['is'] },
  { id: 'b1pv-e6', conceptId: 'b1-passive-present', type: 'fill_gap', prompt: 'These cars ___ made in Japan.', points: 1, accepted: ['are'] },
  { id: 'b1pv-e7', conceptId: 'b1-passive-present', type: 'fill_gap', prompt: '___ this cheese produced in France?', points: 1, accepted: ['is'] },
  // --- verb_form ---
  { id: 'b1pv-e8', conceptId: 'b1-passive-present', type: 'verb_form', prompt: 'This tea (grow) ___ in China.', points: 1, accepted: ['is grown'] },
  { id: 'b1pv-e9', conceptId: 'b1-passive-present', type: 'verb_form', prompt: 'These shoes (make) ___ by hand.', points: 1, accepted: ['are made'] },
  { id: 'b1pv-e10', conceptId: 'b1-passive-present', type: 'verb_form', prompt: "This song (not sing) ___ in English — it's in French.", points: 1, accepted: ["isn't sung", 'is not sung'] },
  // --- choose_word ---
  { id: 'b1pv-e11', conceptId: 'b1-passive-present', type: 'choose_word', prompt: 'This wine ___ in Italy.', points: 1, options: ['is produced', 'produces', 'produce'], accepted: ['is produced'] },
  { id: 'b1pv-e12', conceptId: 'b1-passive-present', type: 'choose_word', prompt: 'These bikes ___ in a small factory near here.', points: 1, options: ['are built', 'build', 'builds'], accepted: ['are built'] },
  { id: 'b1pv-e13', conceptId: 'b1-passive-present', type: 'choose_word', prompt: 'This cheese is made ___ local farmers.', points: 1, options: ['by', 'from', 'with'], accepted: ['by'] },
  { id: 'b1pv-e14', conceptId: 'b1-passive-present', type: 'choose_word', prompt: '___ these cars made in Germany?', points: 1, options: ['Are', 'Do', 'Is'], accepted: ['Are'] },
  // --- word_order ---
  { id: 'b1pv-e15', conceptId: 'b1-passive-present', type: 'word_order', prompt: 'Соберите: «Этот сыр производят во Франции»', points: 1, bank: ['this', 'cheese', 'is', 'produced', 'in', 'France'], accepted: ['this cheese is produced in France'] },
  { id: 'b1pv-e16', conceptId: 'b1-passive-present', type: 'word_order', prompt: 'Соберите: «Эти велосипеды собирают вручную»', points: 1, bank: ['these', 'bikes', 'are', 'made', 'by', 'hand'], accepted: ['these bikes are made by hand'] },
  { id: 'b1pv-e17', conceptId: 'b1-passive-present', type: 'word_order', prompt: 'Соберите: «Как это делают?»', points: 1, bank: ['how', 'is', 'this', 'made'], accepted: ['how is this made'] },
  // --- multi_gap ---
  { id: 'b1pv-e18', conceptId: 'b1-passive-present', type: 'multi_gap', prompt: 'This car ___ (make) in Germany, and these engines ___ (produce) in Japan.', points: 1, gaps: [{ accepted: ['is made'] }, { accepted: ['are produced'] }] },
  { id: 'b1pv-e19', conceptId: 'b1-passive-present', type: 'multi_gap', prompt: '___ this bread baked here, or ___ it brought from another bakery?', points: 1, gaps: [{ accepted: ['is'] }, { accepted: ['is'] }] },
  { id: 'b1pv-e20', conceptId: 'b1-passive-present', type: 'multi_gap', prompt: 'This cheese ___ (not produce) locally — it ___ (import) from France.', points: 1, gaps: [{ accepted: ["isn't produced", 'is not produced'] }, { accepted: ['is imported'] }] },

  // ============ b1-passive-past ============
  // --- translate_ru_en ---
  { id: 'b1pw-e1', conceptId: 'b1-passive-past', type: 'translate_ru_en', prompt: 'Этот мост был построен в 1889 году.', points: 2, accepted: ['This bridge was built in 1889', 'This bridge was constructed in 1889', 'In 1889, this bridge was built'] },
  { id: 'b1pw-e2', conceptId: 'b1-passive-past', type: 'translate_ru_en', prompt: 'Пенициллин был открыт Александром Флемингом.', points: 2, accepted: ['Penicillin was discovered by Alexander Fleming', 'Penicillin was discovered by Fleming', 'Penicillin was discovered by Sir Alexander Fleming'] },
  { id: 'b1pw-e3', conceptId: 'b1-passive-past', type: 'translate_ru_en', prompt: 'Эти письма не были написаны от руки — их напечатали.', points: 2, accepted: ["These letters weren't written by hand — they were typed", 'These letters were not written by hand — they were typed', "These letters weren't handwritten — they were typed"] },
  { id: 'b1pw-e4', conceptId: 'b1-passive-past', type: 'translate_ru_en', prompt: 'Когда был построен этот замок?', points: 2, accepted: ['When was this castle built', 'When was this castle constructed', 'When was the castle built'] },
  // --- fill_gap ---
  { id: 'b1pw-e5', conceptId: 'b1-passive-past', type: 'fill_gap', prompt: 'This house ___ built in 1920.', points: 1, accepted: ['was'] },
  { id: 'b1pw-e6', conceptId: 'b1-passive-past', type: 'fill_gap', prompt: 'These roads ___ built by the Romans.', points: 1, accepted: ['were'] },
  { id: 'b1pw-e7', conceptId: 'b1-passive-past', type: 'fill_gap', prompt: '___ this song written in the 1980s?', points: 1, accepted: ['was'] },
  // --- verb_form ---
  { id: 'b1pw-e8', conceptId: 'b1-passive-past', type: 'verb_form', prompt: 'This castle (build) ___ in the 15th century.', points: 1, accepted: ['was built'] },
  { id: 'b1pw-e9', conceptId: 'b1-passive-past', type: 'verb_form', prompt: 'These paintings (create) ___ by a local artist.', points: 1, accepted: ['were created'] },
  { id: 'b1pw-e10', conceptId: 'b1-passive-past', type: 'verb_form', prompt: "This bridge (not build) ___ last year — it's much older than that.", points: 1, accepted: ["wasn't built", 'was not built'] },
  // --- choose_word ---
  { id: 'b1pw-e11', conceptId: 'b1-passive-past', type: 'choose_word', prompt: 'This novel ___ in 1865.', points: 1, options: ['was written', 'wrote', 'writes'], accepted: ['was written'] },
  { id: 'b1pw-e12', conceptId: 'b1-passive-past', type: 'choose_word', prompt: 'These bridges ___ during the war.', points: 1, options: ['were destroyed', 'destroyed', 'destroys'], accepted: ['were destroyed'] },
  { id: 'b1pw-e13', conceptId: 'b1-passive-past', type: 'choose_word', prompt: 'This song was written ___ a famous composer.', points: 1, options: ['by', 'from', 'with'], accepted: ['by'] },
  { id: 'b1pw-e14', conceptId: 'b1-passive-past', type: 'choose_word', prompt: '___ this house built before or after the war?', points: 1, options: ['Was', 'Did', 'Is'], accepted: ['Was'] },
  // --- word_order ---
  { id: 'b1pw-e15', conceptId: 'b1-passive-past', type: 'word_order', prompt: 'Соберите: «Эта картина была написана известным художником»', points: 1, bank: ['this', 'painting', 'was', 'painted', 'by', 'a', 'famous', 'artist'], accepted: ['this painting was painted by a famous artist'] },
  { id: 'b1pw-e16', conceptId: 'b1-passive-past', type: 'word_order', prompt: 'Соберите: «Пенициллин был открыт в 1928 году»', points: 1, bank: ['penicillin', 'was', 'discovered', 'in', '1928'], accepted: ['penicillin was discovered in 1928'] },
  { id: 'b1pw-e17', conceptId: 'b1-passive-past', type: 'word_order', prompt: 'Соберите: «Где был построен этот дом?»', points: 1, bank: ['where', 'was', 'this', 'house', 'built'], accepted: ['where was this house built'] },
  // --- multi_gap ---
  { id: 'b1pw-e18', conceptId: 'b1-passive-past', type: 'multi_gap', prompt: 'This bridge ___ (build) in 1889, and these roads ___ (build) by the Romans.', points: 1, gaps: [{ accepted: ['was built'] }, { accepted: ['were built'] }] },
  { id: 'b1pw-e19', conceptId: 'b1-passive-past', type: 'multi_gap', prompt: '___ this castle built in the 15th century, or ___ it built later?', points: 1, gaps: [{ accepted: ['was'] }, { accepted: ['was'] }] },
  { id: 'b1pw-e20', conceptId: 'b1-passive-past', type: 'multi_gap', prompt: 'This house ___ (not build) last year — it ___ (build) a hundred years ago.', points: 1, gaps: [{ accepted: ["wasn't built", 'was not built'] }, { accepted: ['was built'] }] },
  // ---- добор: b1-passive-present ----
  { id: 'b1pv-e21', conceptId: 'b1-passive-present', type: 'translate_ru_en', prompt: 'Английский используют во всём мире.', points: 2, accepted: ['English is used all over the world', 'English is used around the world'] },
  { id: 'b1pv-e22', conceptId: 'b1-passive-present', type: 'translate_ru_en', prompt: 'Эту проблему можно решить легко.', points: 2, accepted: ['This problem can be solved easily', 'This problem can easily be solved'] },
  { id: 'b1pv-e23', conceptId: 'b1-passive-present', type: 'fill_gap', prompt: 'The room ___ cleaned every morning by the staff.', points: 1, accepted: ['is'] },
  { id: 'b1pv-e24', conceptId: 'b1-passive-present', type: 'fill_gap', prompt: 'The soup is made ___ fresh vegetables.', points: 1, accepted: ['with', 'from', 'of'] },
  { id: 'b1pv-e25', conceptId: 'b1-passive-present', type: 'verb_form', prompt: 'These reports (check) ___ by the manager every week.', points: 1, accepted: ['are checked'] },
  { id: 'b1pv-e26', conceptId: 'b1-passive-present', type: 'choose_word', prompt: 'The letters ___ delivered every morning at eight.', points: 1, options: ['are', 'is', 'have'], accepted: ['are'] },
  { id: 'b1pv-e27', conceptId: 'b1-passive-present', type: 'choose_word', prompt: 'This machine ___ be repaired — it is too old.', points: 1, options: ["can't", 'not can', 'is not can'], accepted: ["can't"] },
  { id: 'b1pv-e28', conceptId: 'b1-passive-present', type: 'word_order', prompt: 'Соберите: «Английский используют во всём мире»', points: 1, bank: ['English', 'is', 'used', 'all', 'over', 'the', 'world'], accepted: ['English is used all over the world'] },
  { id: 'b1pv-e29', conceptId: 'b1-passive-present', type: 'word_order', prompt: 'Соберите: «Комнату убирают каждое утро»', points: 1, bank: ['the', 'room', 'is', 'cleaned', 'every', 'morning'], accepted: ['the room is cleaned every morning'] },
  { id: 'b1pv-e30', conceptId: 'b1-passive-present', type: 'multi_gap', prompt: 'The office ___ (clean) every evening, and the windows ___ (wash) once a month.', points: 1, gaps: [{ accepted: ['is cleaned'] }, { accepted: ['are washed'] }] },

  // ---- добор: b1-passive-past ----
  { id: 'b1pw-e21', conceptId: 'b1-passive-past', type: 'translate_ru_en', prompt: 'Мой велосипед украли на прошлой неделе.', points: 2, accepted: ['My bike was stolen last week', 'My bicycle was stolen last week'] },
  { id: 'b1pw-e22', conceptId: 'b1-passive-past', type: 'translate_ru_en', prompt: 'Кем была написана эта книга?', points: 2, accepted: ['Who was this book written by?', 'By whom was this book written?'] },
  { id: 'b1pw-e23', conceptId: 'b1-passive-past', type: 'fill_gap', prompt: 'The windows ___ broken during the storm.', points: 1, accepted: ['were'] },
  { id: 'b1pw-e24', conceptId: 'b1-passive-past', type: 'fill_gap', prompt: 'The letter was sent ___ my colleague, not by me.', points: 1, accepted: ['by'] },
  { id: 'b1pw-e25', conceptId: 'b1-passive-past', type: 'verb_form', prompt: 'The city (destroy) ___ by an earthquake in 1906.', points: 1, accepted: ['was destroyed'] },
  { id: 'b1pw-e26', conceptId: 'b1-passive-past', type: 'choose_word', prompt: 'The keys ___ found in the garden yesterday.', points: 1, options: ['were', 'was', 'are'], accepted: ['were'] },
  { id: 'b1pw-e27', conceptId: 'b1-passive-past', type: 'choose_word', prompt: 'The museum ___ opened until last year.', points: 1, options: ["wasn't", 'not was', 'was not be'], accepted: ["wasn't"] },
  { id: 'b1pw-e28', conceptId: 'b1-passive-past', type: 'word_order', prompt: 'Соберите: «Мой велосипед украли на прошлой неделе»', points: 1, bank: ['my', 'bike', 'was', 'stolen', 'last', 'week'], accepted: ['my bike was stolen last week'] },
  { id: 'b1pw-e29', conceptId: 'b1-passive-past', type: 'word_order', prompt: 'Соберите: «Кем была написана эта книга?»', points: 1, bank: ['who', 'was', 'this', 'book', 'written', 'by'], accepted: ['who was this book written by'] },
  { id: 'b1pw-e30', conceptId: 'b1-passive-past', type: 'multi_gap', prompt: 'The letter ___ (send) yesterday, and the parcels ___ (deliver) this morning.', points: 1, gaps: [{ accepted: ['was sent'] }, { accepted: ['were delivered'] }] },
];
