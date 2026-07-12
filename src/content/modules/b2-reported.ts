import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'b2-reported',
  title: 'Косвенная речь: утверждения, вопросы и просьбы',
  level: 'B2',
  masteryThreshold: 50,
  conceptIds: ['b2-reported-statements', 'b2-reported-questions'],
};

export const concepts: Concept[] = [
  {
    id: 'b2-reported-statements',
    moduleId: 'b2-reported',
    title: 'Reported statements: сдвиг времён, said vs told',
    kind: 'grammar',
    theory:
      "Косвенная речь (reported speech) — передаём чужие слова своими: He said (that) he was tired. Союз that можно опускать.\nСдвиг времён (backshift): Present Simple → Past Simple, Past Simple / Present Perfect → Past Perfect, will → would, can → could, am/is/are → was/were.\n• 'I work in a bank' → She said she worked in a bank.\n• 'I have lost my keys' → He said he had lost his keys.\n• 'I'll help you' → He said he would help me.\nsaid или told: say — без адресата, tell — всегда с адресатом: He said (that) he was busy. He told me he was busy. НЕ 'He said me'!\nМестоимения и наречия меняются вместе с точкой зрения: I → he/she, today → that day, tomorrow → the next day, yesterday → the day before, here → there, this → that.\nЕсли факт всё ещё верен, время можно не сдвигать: He said he lives / lived in Moscow — оба варианта правильны.",
    exerciseIds: [
      'b2rs-e1', 'b2rs-e2', 'b2rs-e3', 'b2rs-e4', 'b2rs-e5',
      'b2rs-e6', 'b2rs-e7', 'b2rs-e8', 'b2rs-e9', 'b2rs-e10',
      'b2rs-e11', 'b2rs-e12', 'b2rs-e13', 'b2rs-e14', 'b2rs-e15',
      'b2rs-e16', 'b2rs-e17', 'b2rs-e18', 'b2rs-e19', 'b2rs-e20',
    ],
  },
  {
    id: 'b2-reported-questions',
    moduleId: 'b2-reported',
    title: 'Reported questions и просьбы: asked if/whether, asked/told + to-инфинитив',
    kind: 'grammar',
    theory:
      "Косвенные вопросы (reported questions) — прямой порядок слов, как в утверждении: без do/does/did и без инверсии.\nОбщий вопрос (yes/no) → asked if или asked whether — оба варианта верны: 'Do you like coffee?' → She asked if / whether I liked coffee.\nWh-вопрос → вопросительное слово + прямой порядок слов: 'Where do you live?' → He asked (me) where I lived. НЕ 'where did I live'!\n• 'What time is it?' → She asked what time it was. НЕ 'what time was it'.\nВремена сдвигаются как в утверждениях: like → liked, will → would, can → could.\nПросьбы: asked + кого + to-инфинитив: 'Please wait.' → She asked me to wait.\nПриказы и указания: told + кого + to-инфинитив: 'Open your books.' → The teacher told us to open our books.\nОтрицание в просьбах — not to: 'Don't be late!' → He told us not to be late.",
    exerciseIds: [
      'b2rq-e1', 'b2rq-e2', 'b2rq-e3', 'b2rq-e4', 'b2rq-e5',
      'b2rq-e6', 'b2rq-e7', 'b2rq-e8', 'b2rq-e9', 'b2rq-e10',
      'b2rq-e11', 'b2rq-e12', 'b2rq-e13', 'b2rq-e14', 'b2rq-e15',
      'b2rq-e16', 'b2rq-e17', 'b2rq-e18', 'b2rq-e19', 'b2rq-e20',
    ],
  },
];

export const exercises: Exercise[] = [
  // ============ b2-reported-statements ============
  // --- translate_ru_en ---
  { id: 'b2rs-e1', conceptId: 'b2-reported-statements', type: 'translate_ru_en', prompt: 'Он сказал мне, что занят.', points: 2, accepted: ['He told me that he was busy', 'He told me he was busy', 'He told me that he is busy', 'He told me he is busy', 'He said to me that he was busy', 'He said to me he was busy', "He told me that he's busy", "He told me he's busy"] },
  { id: 'b2rs-e2', conceptId: 'b2-reported-statements', type: 'translate_ru_en', prompt: 'Она сказала, что потеряла свои ключи.', points: 2, accepted: ['She said that she had lost her keys', 'She said she had lost her keys', "She said she'd lost her keys", 'She said she lost her keys', 'She said that she lost her keys'] },
  { id: 'b2rs-e3', conceptId: 'b2-reported-statements', type: 'translate_ru_en', prompt: 'Он сказал, что позвонит мне на следующий день.', points: 2, accepted: ['He said that he would call me the next day', 'He said he would call me the next day', "He said he'd call me the next day", 'He said he would call me the following day', "He said he'd call me the following day", 'He said he would phone me the next day'] },
  { id: 'b2rs-e4', conceptId: 'b2-reported-statements', type: 'translate_ru_en', prompt: 'Она сказала нам, что не может прийти на встречу.', points: 2, accepted: ["She told us that she couldn't come to the meeting", "She told us she couldn't come to the meeting", 'She told us that she could not come to the meeting', "She told us she can't come to the meeting", "She said to us that she couldn't come to the meeting", "She told us that she can't come to the meeting"] },
  // --- fill_gap ---
  { id: 'b2rs-e5', conceptId: 'b2-reported-statements', type: 'fill_gap', prompt: "'I'll be back tomorrow,' he said. → He said he ___ be back the next day.", points: 1, accepted: ['would', "'d"] },
  { id: 'b2rs-e6', conceptId: 'b2-reported-statements', type: 'fill_gap', prompt: "He didn't say a word to the others, but he ___ me the truth.", points: 1, accepted: ['told'] },
  { id: 'b2rs-e7', conceptId: 'b2-reported-statements', type: 'fill_gap', prompt: "'I saw her here yesterday,' he said. → He said he had seen her ___ the day before.", points: 1, accepted: ['there'] },
  // --- verb_form ---
  { id: 'b2rs-e8', conceptId: 'b2-reported-statements', type: 'verb_form', prompt: 'She told me she (work) ___ in a bank, but she quit last year.', points: 1, accepted: ['worked', 'had worked'] },
  { id: 'b2rs-e9', conceptId: 'b2-reported-statements', type: 'verb_form', prompt: 'Last year he told us he (never try) ___ sushi before.', points: 1, accepted: ['had never tried'] },
  { id: 'b2rs-e10', conceptId: 'b2-reported-statements', type: 'verb_form', prompt: 'She said she (not can) ___ swim, but then she took lessons and now she swims every day.', points: 1, accepted: ["couldn't", 'could not'] },
  // --- choose_word ---
  { id: 'b2rs-e11', conceptId: 'b2-reported-statements', type: 'choose_word', prompt: 'She ___ me that she was tired.', points: 1, options: ['told', 'said', 'spoke'], accepted: ['told'] },
  { id: 'b2rs-e12', conceptId: 'b2-reported-statements', type: 'choose_word', prompt: 'He ___ that the train was late.', points: 1, options: ['said', 'told', 'spoke'], accepted: ['said'] },
  { id: 'b2rs-e13', conceptId: 'b2-reported-statements', type: 'choose_word', prompt: 'He said he ___ call me back, but he never did.', points: 1, options: ['would', 'will', 'can'], accepted: ['would'] },
  { id: 'b2rs-e14', conceptId: 'b2-reported-statements', type: 'choose_word', prompt: "'I'll see you tomorrow,' she said last week. → She said she would see me ___.", points: 1, options: ['the next day', 'tomorrow', 'the day before'], accepted: ['the next day'] },
  // --- word_order ---
  { id: 'b2rs-e15', conceptId: 'b2-reported-statements', type: 'word_order', prompt: 'Соберите: «Он сказал мне, что забыл свой пароль»', points: 1, bank: ['he', 'told', 'me', 'he', 'had', 'forgotten', 'his', 'password'], accepted: ['he told me he had forgotten his password'] },
  { id: 'b2rs-e16', conceptId: 'b2-reported-statements', type: 'word_order', prompt: 'Соберите: «Она сказала, что не может нам помочь»', points: 1, bank: ['she', 'said', 'she', "couldn't", 'help', 'us'], accepted: ["she said she couldn't help us"] },
  { id: 'b2rs-e17', conceptId: 'b2-reported-statements', type: 'word_order', prompt: 'Соберите: «Он сказал, что позвонит мне на следующий день»', points: 1, bank: ['he', 'said', 'he', 'would', 'call', 'me', 'the', 'next', 'day'], accepted: ['he said he would call me the next day'] },
  // --- multi_gap ---
  { id: 'b2rs-e18', conceptId: 'b2-reported-statements', type: 'multi_gap', prompt: "'I am happy here,' she said. → She said she ___ happy ___.", points: 1, gaps: [{ accepted: ['was'] }, { accepted: ['there'] }] },
  { id: 'b2rs-e19', conceptId: 'b2-reported-statements', type: 'multi_gap', prompt: "'We can meet tomorrow,' she said. → She said they ___ meet ___.", points: 1, gaps: [{ accepted: ['could'] }, { accepted: ['the next day', 'the following day'] }] },
  { id: 'b2rs-e20', conceptId: 'b2-reported-statements', type: 'multi_gap', prompt: 'He ___ (say/tell) us that he was moving abroad, and later he ___ (say/tell) that he needed a change.', points: 1, gaps: [{ accepted: ['told'] }, { accepted: ['said'] }] },

  // ============ b2-reported-questions ============
  // --- translate_ru_en ---
  { id: 'b2rq-e1', conceptId: 'b2-reported-questions', type: 'translate_ru_en', prompt: 'Она спросила, где я живу.', points: 2, accepted: ['She asked where I lived', 'She asked me where I lived', 'She asked where I live', 'She asked me where I live'] },
  { id: 'b2rq-e2', conceptId: 'b2-reported-questions', type: 'translate_ru_en', prompt: 'Он спросил, нравится ли мне кофе.', points: 2, accepted: ['He asked if I liked coffee', 'He asked whether I liked coffee', 'He asked me if I liked coffee', 'He asked me whether I liked coffee', 'He asked if I like coffee', 'He asked whether I like coffee', 'He asked me if I like coffee', 'He asked me whether I like coffee'] },
  { id: 'b2rq-e3', conceptId: 'b2-reported-questions', type: 'translate_ru_en', prompt: 'Он попросил меня перезвонить позже.', points: 2, accepted: ['He asked me to call back later', 'He asked me to call him back later', 'He asked me to phone back later', 'He asked me to phone him back later', 'He asked me to ring back later', 'He asked me to ring him back later'] },
  { id: 'b2rq-e4', conceptId: 'b2-reported-questions', type: 'translate_ru_en', prompt: 'Я спросил её, придёт ли она на вечеринку.', points: 2, accepted: ['I asked her if she would come to the party', 'I asked her whether she would come to the party', "I asked her if she'd come to the party", "I asked her whether she'd come to the party", 'I asked her if she was coming to the party', 'I asked her whether she was coming to the party'] },
  // --- fill_gap ---
  { id: 'b2rq-e5', conceptId: 'b2-reported-questions', type: 'fill_gap', prompt: "'Are you hungry?' → She asked me ___ I was hungry.", points: 1, accepted: ['if', 'whether'] },
  { id: 'b2rq-e6', conceptId: 'b2-reported-questions', type: 'fill_gap', prompt: "'Please don't tell anyone.' → She asked me ___ to tell anyone.", points: 1, accepted: ['not', 'never'] },
  { id: 'b2rq-e7', conceptId: 'b2-reported-questions', type: 'fill_gap', prompt: "'What time is it?' → She asked me what time it ___.", points: 1, accepted: ['was'] },
  // --- verb_form ---
  { id: 'b2rq-e8', conceptId: 'b2-reported-questions', type: 'verb_form', prompt: 'The interviewer asked me why I (want) ___ to leave my previous job.', points: 1, accepted: ['wanted', 'had wanted'] },
  { id: 'b2rq-e9', conceptId: 'b2-reported-questions', type: 'verb_form', prompt: 'She asked me if I (can) ___ help her with the boxes, but I was too busy that day.', points: 1, accepted: ['could'] },
  { id: 'b2rq-e10', conceptId: 'b2-reported-questions', type: 'verb_form', prompt: "'Please open the window.' → She asked me (open) ___ the window.", points: 1, accepted: ['to open'] },
  // --- choose_word ---
  { id: 'b2rq-e11', conceptId: 'b2-reported-questions', type: 'choose_word', prompt: 'He asked me where ___.', points: 1, options: ['I lived', 'did I live', 'do I live'], accepted: ['I lived'] },
  { id: 'b2rq-e12', conceptId: 'b2-reported-questions', type: 'choose_word', prompt: 'She asked me ___ or not I was going to apply.', points: 1, options: ['whether', 'if', 'that'], accepted: ['whether'] },
  { id: 'b2rq-e13', conceptId: 'b2-reported-questions', type: 'choose_word', prompt: 'The teacher ___ us to open our books.', points: 1, options: ['told', 'said', 'spoke'], accepted: ['told'] },
  { id: 'b2rq-e14', conceptId: 'b2-reported-questions', type: 'choose_word', prompt: 'She told me ___ be late again.', points: 1, options: ['not to', "don't", "to don't"], accepted: ['not to'] },
  // --- word_order ---
  { id: 'b2rq-e15', conceptId: 'b2-reported-questions', type: 'word_order', prompt: 'Соберите: «Она спросила, где я работаю»', points: 1, bank: ['she', 'asked', 'where', 'i', 'worked'], accepted: ['she asked where i worked'] },
  { id: 'b2rq-e16', conceptId: 'b2-reported-questions', type: 'word_order', prompt: 'Соберите: «Он спросил, могу ли я ему помочь»', points: 1, bank: ['he', 'asked', 'if', 'i', 'could', 'help', 'him'], accepted: ['he asked if i could help him'] },
  { id: 'b2rq-e17', conceptId: 'b2-reported-questions', type: 'word_order', prompt: 'Соберите: «Учитель велел нам не разговаривать»', points: 1, bank: ['the', 'teacher', 'told', 'us', 'not', 'to', 'talk'], accepted: ['the teacher told us not to talk', 'the teacher told us to not talk'] },
  // --- multi_gap ---
  { id: 'b2rq-e18', conceptId: 'b2-reported-questions', type: 'multi_gap', prompt: "'Do you speak French?' → He asked me ___ I ___ French.", points: 1, gaps: [{ accepted: ['if', 'whether'] }, { accepted: ['spoke', 'speak'] }] },
  { id: 'b2rq-e19', conceptId: 'b2-reported-questions', type: 'multi_gap', prompt: "'Where are you going?' → She asked me where I ___ going and told me ___ be careful.", points: 1, gaps: [{ accepted: ['was'] }, { accepted: ['to'] }] },
  { id: 'b2rq-e20', conceptId: 'b2-reported-questions', type: 'multi_gap', prompt: "'Can you wait here?' → He asked us ___ we could wait ___.", points: 1, gaps: [{ accepted: ['if', 'whether'] }, { accepted: ['there'] }] },
];
