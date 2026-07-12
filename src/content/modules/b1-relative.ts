import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'b1-relative',
  title: 'Относительные придаточные: who / which / where / whose',
  level: 'B1',
  masteryThreshold: 50,
  conceptIds: ['b1-relative-who-which', 'b1-relative-where-whose'],
};

export const concepts: Concept[] = [
  {
    id: 'b1-relative-who-which',
    moduleId: 'b1-relative',
    title: 'who / which / that: относительные придаточные',
    kind: 'grammar',
    theory:
      "Относительные придаточные уточняют, о ком или о чём идёт речь.\n• who — для людей: The man who called you is my brother.\n• which — для вещей и животных: The book which is on the table is mine.\nthat — универсальный вариант, годится и для людей, и для вещей, но ТОЛЬКО в определительных (defining) придаточных без запятых:\n• The man that called you is my brother. The book that is on the table is mine.\nВ придаточных с запятыми (доп. информация, не ограничивает смысл) that не используется — только who/which:\n• My brother, who lives in London, is a doctor. (не that)\nЕсли who/which/that — дополнение (object) придаточного, его можно вообще опустить:\n• The book (that/which) I read last week was great.\nЕсли это подлежащее (subject) придаточного — опускать нельзя: The man who called you... (who убрать нельзя).",
    exerciseIds: [
      'b1rw-e1', 'b1rw-e2', 'b1rw-e3', 'b1rw-e4', 'b1rw-e5',
      'b1rw-e6', 'b1rw-e7', 'b1rw-e8', 'b1rw-e9', 'b1rw-e10',
      'b1rw-e11', 'b1rw-e12', 'b1rw-e13', 'b1rw-e14', 'b1rw-e15',
      'b1rw-e16', 'b1rw-e17', 'b1rw-e18', 'b1rw-e19', 'b1rw-e20',
    ],
  },
  {
    id: 'b1-relative-where-whose',
    moduleId: 'b1-relative',
    title: 'where / whose: место и принадлежность',
    kind: 'grammar',
    theory:
      "where — вводит придаточное о МЕСТЕ, заменяет «in/at which»:\n• This is the hotel where we stayed. (= in which we stayed)\n• I remember the town where I was born.\nwhose — показывает ПРИНАДЛЕЖНОСТЬ (чей/чья/чьё), используется и для людей, и для вещей:\n• That's the woman whose car was stolen. (её машина)\n• This is the company whose products are famous worldwide.\nwhose стоит перед существительным, как обычное притяжательное — не путайте с who's (= who is / who has):\n• whose bag is this? (чья это сумка) ≠ who's coming? (кто идёт?)\nwhere нельзя опустить и нельзя заменить на who/which/that в этой роли: только where.",
    exerciseIds: [
      'b1rx-e1', 'b1rx-e2', 'b1rx-e3', 'b1rx-e4', 'b1rx-e5',
      'b1rx-e6', 'b1rx-e7', 'b1rx-e8', 'b1rx-e9', 'b1rx-e10',
      'b1rx-e11', 'b1rx-e12', 'b1rx-e13', 'b1rx-e14', 'b1rx-e15',
      'b1rx-e16', 'b1rx-e17', 'b1rx-e18', 'b1rx-e19', 'b1rx-e20',
    ],
  },
];

export const exercises: Exercise[] = [
  // ============ b1-relative-who-which ============
  // --- translate_ru_en ---
  { id: 'b1rw-e1', conceptId: 'b1-relative-who-which', type: 'translate_ru_en', prompt: 'Человек, который позвонил тебе, — мой брат.', points: 2, accepted: ['The man who called you is my brother', 'The man that called you is my brother', 'The man who phoned you is my brother'] },
  { id: 'b1rw-e2', conceptId: 'b1-relative-who-which', type: 'translate_ru_en', prompt: 'Книга, которая лежит на столе, — моя.', points: 2, accepted: ['The book which is on the table is mine', 'The book that is on the table is mine', "The book that's on the table is mine"] },
  { id: 'b1rw-e3', conceptId: 'b1-relative-who-which', type: 'translate_ru_en', prompt: 'Мой брат, который живёт в Лондоне, — врач.', points: 2, accepted: ['My brother, who lives in London, is a doctor', 'My brother, who lives in London, works as a doctor', 'My brother — who lives in London — is a doctor'] },
  { id: 'b1rw-e4', conceptId: 'b1-relative-who-which', type: 'translate_ru_en', prompt: 'Дом, который они купили, был очень старым.', points: 2, accepted: ['The house which they bought was very old', 'The house that they bought was very old', 'The house they bought was very old'] },
  // --- fill_gap ---
  { id: 'b1rw-e5', conceptId: 'b1-relative-who-which', type: 'fill_gap', prompt: 'The woman ___ is standing by the door is our new manager.', points: 1, accepted: ['who', 'that'] },
  { id: 'b1rw-e6', conceptId: 'b1-relative-who-which', type: 'fill_gap', prompt: 'My car, ___ is quite old now, still runs perfectly.', points: 1, accepted: ['which'] },
  { id: 'b1rw-e7', conceptId: 'b1-relative-who-which', type: 'fill_gap', prompt: 'This is the company ___ makes electric cars.', points: 1, accepted: ['which', 'that'] },
  // --- verb_form ---
  { id: 'b1rw-e8', conceptId: 'b1-relative-who-which', type: 'verb_form', prompt: 'The man who (live) ___ next door is a teacher.', points: 1, accepted: ['lives'] },
  { id: 'b1rw-e9', conceptId: 'b1-relative-who-which', type: 'verb_form', prompt: 'The people who (work) ___ in this office are all very friendly.', points: 1, accepted: ['work'] },
  { id: 'b1rw-e10', conceptId: 'b1-relative-who-which', type: 'verb_form', prompt: 'This is the restaurant which (serve) ___ the best pizza in town.', points: 1, accepted: ['serves'] },
  // --- choose_word ---
  { id: 'b1rw-e11', conceptId: 'b1-relative-who-which', type: 'choose_word', prompt: 'The scientist ___ discovered this vaccine won a Nobel Prize.', points: 1, options: ['who', 'which', 'whose'], accepted: ['who'] },
  { id: 'b1rw-e12', conceptId: 'b1-relative-who-which', type: 'choose_word', prompt: 'The laptop ___ I bought last year has already stopped working.', points: 1, options: ['which', 'who', 'whose'], accepted: ['which'] },
  { id: 'b1rw-e13', conceptId: 'b1-relative-who-which', type: 'choose_word', prompt: 'This is the same phone ___ my sister has.', points: 1, options: ['that', 'who', 'whose'], accepted: ['that'] },
  { id: 'b1rw-e14', conceptId: 'b1-relative-who-which', type: 'choose_word', prompt: 'The dog ___ lives next door barks all night.', points: 1, options: ['which', 'who', 'whose'], accepted: ['which'] },
  // --- word_order ---
  { id: 'b1rw-e15', conceptId: 'b1-relative-who-which', type: 'word_order', prompt: 'Соберите: «Человек, который позвонил, — мой сосед»', points: 1, bank: ['the', 'man', 'who', 'called', 'is', 'my', 'neighbour'], accepted: ['the man who called is my neighbour'] },
  { id: 'b1rw-e16', conceptId: 'b1-relative-who-which', type: 'word_order', prompt: 'Соберите: «Книга, которую я купил, была интересной»', points: 1, bank: ['the', 'book', 'I', 'bought', 'was', 'interesting'], accepted: ['the book I bought was interesting'] },
  { id: 'b1rw-e17', conceptId: 'b1-relative-who-which', type: 'word_order', prompt: 'Соберите: «Моя сестра, которая живёт в Париже, — художница»', points: 1, bank: ['my', 'sister', 'who', 'lives', 'in', 'Paris', 'is', 'an', 'artist'], accepted: ['my sister who lives in Paris is an artist'] },
  // --- multi_gap ---
  { id: 'b1rw-e18', conceptId: 'b1-relative-who-which', type: 'multi_gap', prompt: 'The man ___ called you is my brother, and the woman ___ answered the phone is his wife.', points: 1, gaps: [{ accepted: ['who', 'that'] }, { accepted: ['who', 'that'] }] },
  { id: 'b1rw-e19', conceptId: 'b1-relative-who-which', type: 'multi_gap', prompt: "My car, ___ is quite old now, still runs well, but my brother's car, ___ is brand new, breaks down all the time.", points: 1, gaps: [{ accepted: ['which'] }, { accepted: ['which'] }] },
  { id: 'b1rw-e20', conceptId: 'b1-relative-who-which', type: 'multi_gap', prompt: 'The engineer ___ designed this bridge also wrote a book ___ became a bestseller.', points: 1, gaps: [{ accepted: ['who', 'that'] }, { accepted: ['which', 'that'] }] },

  // ============ b1-relative-where-whose ============
  // --- translate_ru_en ---
  { id: 'b1rx-e1', conceptId: 'b1-relative-where-whose', type: 'translate_ru_en', prompt: 'Это отель, где мы останавливались.', points: 2, accepted: ['This is the hotel where we stayed', "That's the hotel where we stayed", 'This is the hotel we stayed in'] },
  { id: 'b1rx-e2', conceptId: 'b1-relative-where-whose', type: 'translate_ru_en', prompt: 'Я помню город, где я родился.', points: 2, accepted: ['I remember the town where I was born', 'I remember the city where I was born', 'I still remember the town where I was born'] },
  { id: 'b1rx-e3', conceptId: 'b1-relative-where-whose', type: 'translate_ru_en', prompt: 'Это женщина, чья машина была украдена.', points: 2, accepted: ["That's the woman whose car was stolen", 'This is the woman whose car was stolen', "That's the woman whose car got stolen"] },
  { id: 'b1rx-e4', conceptId: 'b1-relative-where-whose', type: 'translate_ru_en', prompt: 'Это компания, чьи продукты известны по всему миру.', points: 2, accepted: ['This is the company whose products are famous worldwide', 'This is the company whose products are famous all over the world', "That's the company whose products are famous worldwide"] },
  // --- fill_gap ---
  { id: 'b1rx-e5', conceptId: 'b1-relative-where-whose', type: 'fill_gap', prompt: 'This is the street ___ I grew up.', points: 1, accepted: ['where'] },
  { id: 'b1rx-e6', conceptId: 'b1-relative-where-whose', type: 'fill_gap', prompt: "That's the man ___ dog barks all night.", points: 1, accepted: ['whose'] },
  { id: 'b1rx-e7', conceptId: 'b1-relative-where-whose', type: 'fill_gap', prompt: 'This is the restaurant ___ we had our first date.', points: 1, accepted: ['where'] },
  // --- verb_form ---
  { id: 'b1rx-e8', conceptId: 'b1-relative-where-whose', type: 'verb_form', prompt: 'This is the town where I (grow) ___ up.', points: 1, accepted: ['grew'] },
  { id: 'b1rx-e9', conceptId: 'b1-relative-where-whose', type: 'verb_form', prompt: "That's the man whose dog (bark) ___ all night — it's really annoying.", points: 1, accepted: ['barks'] },
  { id: 'b1rx-e10', conceptId: 'b1-relative-where-whose', type: 'verb_form', prompt: 'This is the school where I (study) ___ when I was a child.', points: 1, accepted: ['studied'] },
  // --- choose_word ---
  { id: 'b1rx-e11', conceptId: 'b1-relative-where-whose', type: 'choose_word', prompt: 'This is the house ___ I grew up.', points: 1, options: ['where', 'which', 'who'], accepted: ['where'] },
  { id: 'b1rx-e12', conceptId: 'b1-relative-where-whose', type: 'choose_word', prompt: "That's the girl ___ mother is a famous singer.", points: 1, options: ['whose', 'who', 'which'], accepted: ['whose'] },
  { id: 'b1rx-e13', conceptId: 'b1-relative-where-whose', type: 'choose_word', prompt: 'This is the café ___ we first met.', points: 1, options: ['where', 'whose', 'which'], accepted: ['where'] },
  { id: 'b1rx-e14', conceptId: 'b1-relative-where-whose', type: 'choose_word', prompt: "He works for a company ___ name I can't remember.", points: 1, options: ['whose', 'who', 'where'], accepted: ['whose'] },
  // --- word_order ---
  { id: 'b1rx-e15', conceptId: 'b1-relative-where-whose', type: 'word_order', prompt: 'Соберите: «Это дом, где я родился»', points: 1, bank: ['this', 'is', 'the', 'house', 'where', 'I', 'was', 'born'], accepted: ['this is the house where I was born'] },
  { id: 'b1rx-e16', conceptId: 'b1-relative-where-whose', type: 'word_order', prompt: 'Соберите: «Это девушка, чья сумка пропала»', points: 1, bank: ['this', 'is', 'the', 'girl', 'whose', 'bag', 'is', 'missing'], accepted: ['this is the girl whose bag is missing'] },
  { id: 'b1rx-e17', conceptId: 'b1-relative-where-whose', type: 'word_order', prompt: 'Соберите: «Я помню школу, где я учился»', points: 1, bank: ['I', 'remember', 'the', 'school', 'where', 'I', 'studied'], accepted: ['I remember the school where I studied'] },
  // --- multi_gap ---
  { id: 'b1rx-e18', conceptId: 'b1-relative-where-whose', type: 'multi_gap', prompt: "This is the town ___ I was born, and that's the school ___ I studied as a child.", points: 1, gaps: [{ accepted: ['where'] }, { accepted: ['where'] }] },
  { id: 'b1rx-e19', conceptId: 'b1-relative-where-whose', type: 'multi_gap', prompt: "That's the man ___ car was stolen, and this is the woman ___ house was robbed.", points: 1, gaps: [{ accepted: ['whose'] }, { accepted: ['whose'] }] },
  { id: 'b1rx-e20', conceptId: 'b1-relative-where-whose', type: 'multi_gap', prompt: "This is the café ___ we first met, and that's the waiter ___ name I always forget.", points: 1, gaps: [{ accepted: ['where'] }, { accepted: ['whose'] }] },
];
