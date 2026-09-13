import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'b2-past-modals',
  title: 'Модальные глаголы в прошлом: must have, should have',
  level: 'B2',
  masteryThreshold: 20,
  conceptIds: ['b2-deduction-past', 'b2-should-have'],
};

export const concepts: Concept[] = [
  {
    id: 'b2-deduction-past',
    moduleId: 'b2-past-modals',
    title: 'Дедукция о прошлом: must have / can\'t have / might have + V3',
    kind: 'grammar',
    theory:
      "Модальный глагол + have + V3 — вывод о прошлом по имеющимся уликам.\nmust have + V3 — уверенный вывод «наверняка»: The ground is wet — it must have rained. — Наверняка шёл дождь.\ncan't / couldn't have + V3 — уверенность, что этого НЕ могло быть (оба варианта верны): He can't have taken the car — he doesn't have the keys.\nmay / might / could have + V3 — «возможно, было», но точно не знаем: She might have missed the train.\n• may have / might have / could have в этом значении взаимозаменяемы.\nОтрицание неуверенности: may not have / might not have + V3 (НЕ could not have — это «не мог»): He might not have seen the message.\nПосле have — всегда третья форма: must have gone (не must have went).\nmustn't have для дедукции не используется — говорите can't have / couldn't have.",
    exerciseIds: [
      'b2dp-e1', 'b2dp-e2', 'b2dp-e3', 'b2dp-e4', 'b2dp-e5',
      'b2dp-e6', 'b2dp-e7', 'b2dp-e8', 'b2dp-e9', 'b2dp-e10',
      'b2dp-e11', 'b2dp-e12', 'b2dp-e13', 'b2dp-e14', 'b2dp-e15',
      'b2dp-e16', 'b2dp-e17', 'b2dp-e18', 'b2dp-e19', 'b2dp-e20',
      'b2dp-e21', 'b2dp-e22', 'b2dp-e23', 'b2dp-e24', 'b2dp-e25', 'b2dp-e26', 'b2dp-e27', 'b2dp-e28', 'b2dp-e29', 'b2dp-e30',
    ],
  },
  {
    id: 'b2-should-have',
    moduleId: 'b2-past-modals',
    title: 'Сожаление и упрёк: should have / shouldn\'t have / could have + V3',
    kind: 'grammar',
    theory:
      "should have + V3 — упрёк или сожаление: надо было сделать, но не сделали.\n• You should have called me. — Тебе надо было позвонить мне (а ты не позвонил).\nshouldn't have + V3 — не надо было делать, но сделали: I shouldn't have eaten so much. — Зря я столько съел.\nought to have + V3 — синоним should have, чуть формальнее: You ought to have told the truth.\ncould have + V3 — упущенная возможность: мог сделать, но не сделал: We could have won the game. — Мы могли выиграть (но не выиграли).\ncould have / might have звучат и в упрёках: You could have warned me! — Мог бы и предупредить!\nПосле have — всегда V3: should have gone (не should have go / should have went).\nСокращения в речи: should've, shouldn't have, could've.",
    exerciseIds: [
      'b2sh-e1', 'b2sh-e2', 'b2sh-e3', 'b2sh-e4', 'b2sh-e5',
      'b2sh-e6', 'b2sh-e7', 'b2sh-e8', 'b2sh-e9', 'b2sh-e10',
      'b2sh-e11', 'b2sh-e12', 'b2sh-e13', 'b2sh-e14', 'b2sh-e15',
      'b2sh-e16', 'b2sh-e17', 'b2sh-e18', 'b2sh-e19', 'b2sh-e20',
      'b2sh-e21', 'b2sh-e22', 'b2sh-e23', 'b2sh-e24', 'b2sh-e25', 'b2sh-e26', 'b2sh-e27', 'b2sh-e28', 'b2sh-e29', 'b2sh-e30',
    ],
  },
];

export const exercises: Exercise[] = [
  // ============ b2-deduction-past ============
  // --- translate_ru_en ---
  { id: 'b2dp-e1', conceptId: 'b2-deduction-past', type: 'translate_ru_en', prompt: 'Земля мокрая — наверняка шёл дождь.', points: 2, accepted: ['The ground is wet — it must have rained', 'The ground is wet, so it must have rained', 'The ground is wet — it must have been raining', 'The ground is wet, so it must have been raining', 'It must have rained — the ground is wet', 'It must have been raining — the ground is wet'] },
  { id: 'b2dp-e2', conceptId: 'b2-deduction-past', type: 'translate_ru_en', prompt: 'Он не мог взять твои ключи — его здесь не было.', points: 2, accepted: ["He can't have taken your keys — he wasn't here", "He couldn't have taken your keys — he wasn't here", "He cannot have taken your keys — he wasn't here", "He can't have taken your keys — he was not here"] },
  { id: 'b2dp-e3', conceptId: 'b2-deduction-past', type: 'translate_ru_en', prompt: 'Возможно, она опоздала на поезд.', points: 2, accepted: ['She might have missed the train', 'She may have missed the train', 'She could have missed the train', 'Maybe she missed the train', 'Perhaps she missed the train'] },
  { id: 'b2dp-e4', conceptId: 'b2-deduction-past', type: 'translate_ru_en', prompt: 'Ты, наверное, очень устал после вчерашнего перелёта.', points: 2, accepted: ['You must have been very tired after the flight yesterday', "You must have been very tired after yesterday's flight", 'You must have been really tired after the flight yesterday', "You must have been really tired after yesterday's flight", 'You must have been so tired after the flight yesterday', "You must have been so tired after yesterday's flight", 'You must have been exhausted after the flight yesterday', "You must have been exhausted after yesterday's flight", "You must be very tired after yesterday's flight", "You must be really tired after yesterday's flight"] },
  // --- fill_gap ---
  { id: 'b2dp-e5', conceptId: 'b2-deduction-past', type: 'fill_gap', prompt: "I'm sure they ___ have gone to bed — the lights are off.", points: 1, accepted: ['must', 'will'] },
  { id: 'b2dp-e6', conceptId: 'b2-deduction-past', type: 'fill_gap', prompt: "She ___ have forgotten the meeting — she's never missed one in ten years.", points: 1, accepted: ["can't", "couldn't", 'cannot', 'could not', "wouldn't", 'would not'] },
  { id: 'b2dp-e7', conceptId: 'b2-deduction-past', type: 'fill_gap', prompt: "I'm not sure where he is — he ___ have left early.", points: 1, accepted: ['might', 'may', 'could'] },
  // --- verb_form ---
  { id: 'b2dp-e8', conceptId: 'b2-deduction-past', type: 'verb_form', prompt: 'The streets are wet — it must (rain) ___ last night.', points: 1, accepted: ['have rained', 'have been raining'] },
  { id: 'b2dp-e9', conceptId: 'b2-deduction-past', type: 'verb_form', prompt: "His phone was off all day, so he can't (see) ___ your message.", points: 1, accepted: ['have seen'] },
  { id: 'b2dp-e10', conceptId: 'b2-deduction-past', type: 'verb_form', prompt: "She might (leave) ___ her umbrella on the bus — she's always losing things.", points: 1, accepted: ['have left'] },
  // --- choose_word ---
  { id: 'b2dp-e11', conceptId: 'b2-deduction-past', type: 'choose_word', prompt: 'Everyone passed with top marks — the test ___ have been very difficult.', points: 1, options: ["can't", "mustn't", 'must'], accepted: ["can't"] },
  { id: 'b2dp-e12', conceptId: 'b2-deduction-past', type: 'choose_word', prompt: 'She got top marks in every subject — she ___ have studied really hard.', points: 1, options: ['must', "can't", 'should'], accepted: ['must'] },
  { id: 'b2dp-e13', conceptId: 'b2-deduction-past', type: 'choose_word', prompt: 'I ___ my wallet at the restaurant — I remember putting it on the table there.', points: 1, options: ['must have left', 'must have leave', 'must had left'], accepted: ['must have left'] },
  { id: 'b2dp-e14', conceptId: 'b2-deduction-past', type: 'choose_word', prompt: "Don't jump to conclusions — she ___ have simply forgotten to charge her phone.", points: 1, options: ['might', 'must', "can't"], accepted: ['might'] },
  // --- word_order ---
  { id: 'b2dp-e15', conceptId: 'b2-deduction-past', type: 'word_order', prompt: 'Соберите: «Наверняка он забыл о встрече»', points: 1, bank: ['he', 'must', 'have', 'forgotten', 'about', 'the', 'meeting'], accepted: ['he must have forgotten about the meeting'] },
  { id: 'b2dp-e16', conceptId: 'b2-deduction-past', type: 'word_order', prompt: 'Соберите: «Она не могла уйти без нас»', points: 1, bank: ['she', "can't", 'have', 'left', 'without', 'us'], accepted: ["she can't have left without us"] },
  { id: 'b2dp-e17', conceptId: 'b2-deduction-past', type: 'word_order', prompt: 'Соберите: «Возможно, они заблудились»', points: 1, bank: ['they', 'might', 'have', 'got', 'lost'], accepted: ['they might have got lost'] },
  // --- multi_gap ---
  { id: 'b2dp-e18', conceptId: 'b2-deduction-past', type: 'multi_gap', prompt: 'The kitchen smells amazing — someone must ___ (bake) a cake. But the plate is empty, so they must ___ (take) it with them.', points: 1, gaps: [{ accepted: ['have baked'] }, { accepted: ['have taken'] }] },
  { id: 'b2dp-e19', conceptId: 'b2-deduction-past', type: 'multi_gap', prompt: "He ___ (pass) the test — he didn't study at all! Well, he ___ (get) lucky, I suppose.", points: 1, gaps: [{ accepted: ["can't have passed", "couldn't have passed", 'cannot have passed'] }, { accepted: ['might have got', 'may have got', 'could have got', 'might have gotten', 'may have gotten', 'could have gotten'] }] },
  { id: 'b2dp-e20', conceptId: 'b2-deduction-past', type: 'multi_gap', prompt: "I can't find my glasses. I ___ (leave) them at work, or I ___ (drop) them in the car.", points: 1, gaps: [{ accepted: ['might have left', 'may have left', 'could have left'] }, { accepted: ['might have dropped', 'may have dropped', 'could have dropped'] }] },

  // ============ b2-should-have ============
  // --- translate_ru_en ---
  { id: 'b2sh-e1', conceptId: 'b2-should-have', type: 'translate_ru_en', prompt: 'Тебе надо было позвонить мне.', points: 2, accepted: ['You should have called me', "You should've called me", 'You ought to have called me', 'You should have phoned me', "You should've phoned me"] },
  { id: 'b2sh-e2', conceptId: 'b2-should-have', type: 'translate_ru_en', prompt: 'Зря я столько съел.', points: 2, accepted: ["I shouldn't have eaten so much", 'I should not have eaten so much', "I shouldn't have eaten that much", 'I ought not to have eaten so much'] },
  { id: 'b2sh-e3', conceptId: 'b2-should-have', type: 'translate_ru_en', prompt: 'Мы могли бы выиграть матч, но проиграли.', points: 2, accepted: ['We could have won the match, but we lost', "We could've won the match, but we lost", 'We could have won the game, but we lost', "We could've won the game, but we lost"] },
  { id: 'b2sh-e4', conceptId: 'b2-should-have', type: 'translate_ru_en', prompt: 'Ей не следовало так с тобой разговаривать.', points: 2, accepted: ["She shouldn't have talked to you like that", "She shouldn't have spoken to you like that", 'She should not have talked to you like that', 'She should not have spoken to you like that', "She shouldn't have talked to you that way", "She shouldn't have spoken to you that way", 'She ought not to have spoken to you like that'] },
  // --- fill_gap ---
  { id: 'b2sh-e5', conceptId: 'b2-should-have', type: 'fill_gap', prompt: 'I feel sick — I ___ have eaten that much cake.', points: 1, accepted: ["shouldn't", 'should not', 'ought not to'] },
  { id: 'b2sh-e6', conceptId: 'b2-should-have', type: 'fill_gap', prompt: 'You knew I was waiting! You ___ have told me you were running late!', points: 1, accepted: ['should', 'could', 'might', 'ought to'] },
  { id: 'b2sh-e7', conceptId: 'b2-should-have', type: 'fill_gap', prompt: 'She ___ have become a professional pianist — she had the talent — but she chose medicine.', points: 1, accepted: ['could', 'should', 'might', 'would'] },
  // --- verb_form ---
  { id: 'b2sh-e8', conceptId: 'b2-should-have', type: 'verb_form', prompt: "I feel terrible — I shouldn't (eat) ___ so much cake at the party.", points: 1, accepted: ['have eaten'] },
  { id: 'b2sh-e9', conceptId: 'b2-should-have', type: 'verb_form', prompt: 'You should (tell) ___ me earlier — I would have helped you.', points: 1, accepted: ['have told'] },
  { id: 'b2sh-e10', conceptId: 'b2-should-have', type: 'verb_form', prompt: 'We could (win) ___ the game, but our best player was injured.', points: 1, accepted: ['have won'] },
  // --- choose_word ---
  { id: 'b2sh-e11', conceptId: 'b2-should-have', type: 'choose_word', prompt: 'She ___ travelled the world after university — she had saved enough money — but she took a job instead and she has no regrets.', points: 1, options: ['could have', 'should have', 'must have'], accepted: ['could have'] },
  { id: 'b2sh-e12', conceptId: 'b2-should-have', type: 'choose_word', prompt: 'I ___ so rude to her yesterday — I feel awful now.', points: 1, options: ["shouldn't have been", "shouldn't be", "mustn't have been"], accepted: ["shouldn't have been"] },
  { id: 'b2sh-e13', conceptId: 'b2-should-have', type: 'choose_word', prompt: 'We ___ the flight, but the taxi got stuck in traffic.', points: 1, options: ['could have caught', 'could catch', 'can have caught'], accepted: ['could have caught'] },
  { id: 'b2sh-e14', conceptId: 'b2-should-have', type: 'choose_word', prompt: "Why didn't you ask me? I ___ have lent you the money — I had plenty.", points: 1, options: ['could', 'must', "can't"], accepted: ['could'] },
  // --- word_order ---
  { id: 'b2sh-e15', conceptId: 'b2-should-have', type: 'word_order', prompt: 'Соберите: «Тебе надо было послушать её совет»', points: 1, bank: ['you', 'should', 'have', 'listened', 'to', 'her', 'advice'], accepted: ['you should have listened to her advice'] },
  { id: 'b2sh-e16', conceptId: 'b2-should-have', type: 'word_order', prompt: 'Соберите: «Зря ты купил эту машину»', points: 1, bank: ['you', "shouldn't", 'have', 'bought', 'that', 'car'], accepted: ["you shouldn't have bought that car"] },
  { id: 'b2sh-e17', conceptId: 'b2-should-have', type: 'word_order', prompt: 'Соберите: «Мы могли бы приехать раньше»', points: 1, bank: ['we', 'could', 'have', 'arrived', 'earlier'], accepted: ['we could have arrived earlier'] },
  // --- multi_gap ---
  { id: 'b2sh-e18', conceptId: 'b2-should-have', type: 'multi_gap', prompt: "I regret it now — I should ___ (listen) to you, and I shouldn't ___ (ignore) your warnings.", points: 1, gaps: [{ accepted: ['have listened'] }, { accepted: ['have ignored'] }] },
  { id: 'b2sh-e19', conceptId: 'b2-should-have', type: 'multi_gap', prompt: 'You could ___ (become) a doctor — you were the best student — but you should ___ (apply) to university back then.', points: 1, gaps: [{ accepted: ['have become'] }, { accepted: ['have applied'] }] },
  { id: 'b2sh-e20', conceptId: 'b2-should-have', type: 'multi_gap', prompt: "We shouldn't ___ (leave) so late, and we should ___ (check) the traffic before setting off.", points: 1, gaps: [{ accepted: ['have left'] }, { accepted: ['have checked'] }] },
  // ---- добор: b2-deduction-past ----
  { id: 'b2dp-e21', conceptId: 'b2-deduction-past', type: 'translate_ru_en', prompt: 'Он, должно быть, ждал нас всё утро.', points: 2, accepted: ['He must have been waiting for us all morning'] },
  { id: 'b2dp-e22', conceptId: 'b2-deduction-past', type: 'translate_ru_en', prompt: 'Возможно, она не получила сообщение.', points: 2, accepted: ['She may not have received the message', 'She might not have received the message', 'She might not have got the message'] },
  { id: 'b2dp-e23', conceptId: 'b2-deduction-past', type: 'fill_gap', prompt: 'The floor is muddy — someone ___ have walked in with dirty shoes.', points: 1, accepted: ['must'] },
  { id: 'b2dp-e24', conceptId: 'b2-deduction-past', type: 'fill_gap', prompt: 'He ___ have seen us — he was looking the other way.', points: 1, accepted: ["can't", 'cannot', 'can not'] },
  { id: 'b2dp-e25', conceptId: 'b2-deduction-past', type: 'verb_form', prompt: 'She looks exhausted — she (work) ___ all night.', points: 1, accepted: ['must have been working', 'must have worked'] },
  { id: 'b2dp-e26', conceptId: 'b2-deduction-past', type: 'choose_word', prompt: 'They are not here yet — they ___ have missed the train.', points: 1, options: ['might', 'must not', 'should'], accepted: ['might'] },
  { id: 'b2dp-e27', conceptId: 'b2-deduction-past', type: 'choose_word', prompt: 'She ___ have written this — her handwriting is completely different.', points: 1, options: ["can't", 'must', 'may'], accepted: ["can't"] },
  { id: 'b2dp-e28', conceptId: 'b2-deduction-past', type: 'word_order', prompt: 'Соберите: «Должно быть, он ждал нас всё утро»', points: 1, bank: ['he', 'must', 'have', 'been', 'waiting', 'for', 'us', 'all', 'morning'], accepted: ['he must have been waiting for us all morning'] },
  { id: 'b2dp-e29', conceptId: 'b2-deduction-past', type: 'word_order', prompt: 'Соберите: «Она не могла этого сказать»', points: 1, bank: ['she', "can't", 'have', 'said', 'that'], accepted: ["she can't have said that"] },
  { id: 'b2dp-e30', conceptId: 'b2-deduction-past', type: 'multi_gap', prompt: 'Nobody is answering — they ___ have gone out, or they ___ have forgotten about our meeting.', points: 1, gaps: [{ accepted: ['must', 'might', 'may'] }, { accepted: ['might', 'may', 'could'] }] },

  // ---- добор: b2-should-have ----
  { id: 'b2sh-e21', conceptId: 'b2-should-have', type: 'translate_ru_en', prompt: 'Не нужно было покупать столько еды.', points: 2, accepted: ["You needn't have bought so much food", 'You did not need to buy so much food'] },
  { id: 'b2sh-e22', conceptId: 'b2-should-have', type: 'translate_ru_en', prompt: 'Ему следовало бы извиниться.', points: 2, accepted: ['He ought to have apologised', 'He should have apologised', 'He ought to have apologized'] },
  { id: 'b2sh-e23', conceptId: 'b2-should-have', type: 'fill_gap', prompt: 'You ___ have bought a ticket — the entry was free.', points: 1, accepted: ["needn't", 'need not'] },
  { id: 'b2sh-e24', conceptId: 'b2-should-have', type: 'fill_gap', prompt: 'I would have helped you, but you ___ ask me.', points: 1, accepted: ["didn't", 'did not'] },
  { id: 'b2sh-e25', conceptId: 'b2-should-have', type: 'verb_form', prompt: 'She ought to (apologise) ___ for what she said yesterday.', points: 1, accepted: ['have apologised', 'have apologized'] },
  { id: 'b2sh-e26', conceptId: 'b2-should-have', type: 'choose_word', prompt: 'We ___ have hurried — the train was delayed by an hour.', points: 1, options: ["needn't", 'should', "mustn't"], accepted: ["needn't"] },
  { id: 'b2sh-e27', conceptId: 'b2-should-have', type: 'choose_word', prompt: 'You ___ have told me — I would have come with you.', points: 1, options: ['should', 'need', 'might not'], accepted: ['should'] },
  { id: 'b2sh-e28', conceptId: 'b2-should-have', type: 'word_order', prompt: 'Соберите: «Не нужно было так спешить»', points: 1, bank: ['you', "needn't", 'have', 'hurried'], accepted: ["you needn't have hurried"] },
  { id: 'b2sh-e29', conceptId: 'b2-should-have', type: 'word_order', prompt: 'Соберите: «Ему следовало извиниться»', points: 1, bank: ['he', 'ought', 'to', 'have', 'apologised'], accepted: ['he ought to have apologised'] },
  { id: 'b2sh-e30', conceptId: 'b2-should-have', type: 'multi_gap', prompt: 'You ___ have hurried — there was plenty of time; but you ___ have called to warn me.', points: 1, gaps: [{ accepted: ["needn't", 'need not'] }, { accepted: ['should', 'ought to'] }] },
];
