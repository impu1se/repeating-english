import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'b1-modals',
  title: 'Модальные глаголы: обязанность и вероятность',
  level: 'B1',
  masteryThreshold: 50,
  conceptIds: ['b1-modals-obligation', 'b1-modals-possibility'],
};

export const concepts: Concept[] = [
  {
    id: 'b1-modals-obligation',
    moduleId: 'b1-modals',
    title: 'must / have to / should: обязанность и совет',
    kind: 'grammar',
    theory:
      "must / have to — обязанность, необходимость.\n• must — говорящий сам считает это важным (личное мнение): I must call my mother today.\n• have to — обязанность извне (правило, закон, другой человек): I have to wear a uniform at work.\nОтрицание — ключевая ловушка:\n• mustn't — ЗАПРЕЩЕНО: You mustn't smoke here. (правило запрещает)\n• don't have to — НЕ обязательно, но можно: You don't have to come if you don't want to.\nmustn't ≠ don't have to! mustn't = запрет, don't have to = отсутствие обязанности (действие разрешено).\nshould / shouldn't — совет, а не обязанность: You should see a doctor. You shouldn't eat so much sugar.\nhave to меняется по временам (had to, will have to), must — не меняется:\n• I had to work late yesterday. (не must have to)",
    exerciseIds: [
      'b1mo-e1', 'b1mo-e2', 'b1mo-e3', 'b1mo-e4', 'b1mo-e5',
      'b1mo-e6', 'b1mo-e7', 'b1mo-e8', 'b1mo-e9', 'b1mo-e10',
      'b1mo-e11', 'b1mo-e12', 'b1mo-e13', 'b1mo-e14', 'b1mo-e15',
      'b1mo-e16', 'b1mo-e17', 'b1mo-e18', 'b1mo-e19', 'b1mo-e20',
    ],
  },
  {
    id: 'b1-modals-possibility',
    moduleId: 'b1-modals',
    title: 'may / might / could: вероятность',
    kind: 'grammar',
    theory:
      "may / might / could — вероятность, предположение (что-то, возможно, происходит или произойдёт).\n• It may rain later. / It might rain later. / It could rain later. — все три варианта близки по смыслу.\nОтрицание: may not / might not (сокращений mayn't/mightn't в современном английском нет!).\n• She might not come to the party. (не mightn't)\ncan't — уверенное ОТРИЦАНИЕ вероятности (противоположность must для утверждений):\n• He can't be at home — I just saw him at the office. (я уверен, что это не так)\nНе путайте maybe (наречие, отдельное слово, «возможно», в начале предложения) и may be (глагол + be):\n• Maybe she is at work. — Возможно, она на работе. (Maybe + отдельное предложение)\n• She may be at work. (may be — часть сказуемого)",
    exerciseIds: [
      'b1mp-e1', 'b1mp-e2', 'b1mp-e3', 'b1mp-e4', 'b1mp-e5',
      'b1mp-e6', 'b1mp-e7', 'b1mp-e8', 'b1mp-e9', 'b1mp-e10',
      'b1mp-e11', 'b1mp-e12', 'b1mp-e13', 'b1mp-e14', 'b1mp-e15',
      'b1mp-e16', 'b1mp-e17', 'b1mp-e18', 'b1mp-e19', 'b1mp-e20',
    ],
  },
];

export const exercises: Exercise[] = [
  // ============ b1-modals-obligation ============
  // --- translate_ru_en ---
  { id: 'b1mo-e1', conceptId: 'b1-modals-obligation', type: 'translate_ru_en', prompt: 'Тебе нельзя курить здесь.', points: 2, accepted: ["You mustn't smoke here", 'You must not smoke here', "You can't smoke here"] },
  { id: 'b1mo-e2', conceptId: 'b1-modals-obligation', type: 'translate_ru_en', prompt: 'Тебе не обязательно приходить, если не хочешь.', points: 2, accepted: ["You don't have to come if you don't want to", 'You do not have to come if you do not want to', "You don't need to come if you don't want to"] },
  { id: 'b1mo-e3', conceptId: 'b1-modals-obligation', type: 'translate_ru_en', prompt: 'Тебе стоит обратиться к врачу.', points: 2, accepted: ['You should see a doctor', 'You should go to the doctor', 'You should visit a doctor'] },
  { id: 'b1mo-e4', conceptId: 'b1-modals-obligation', type: 'translate_ru_en', prompt: 'Мне пришлось вчера задержаться на работе допоздна.', points: 2, accepted: ['I had to work late yesterday', 'I had to stay late at work yesterday', 'Yesterday I had to work late'] },
  // --- fill_gap ---
  { id: 'b1mo-e5', conceptId: 'b1-modals-obligation', type: 'fill_gap', prompt: 'This road is closed for repairs — you ___ drive here today.', points: 1, accepted: ["mustn't", 'must not'] },
  { id: 'b1mo-e6', conceptId: 'b1-modals-obligation', type: 'fill_gap', prompt: 'The tickets are free today, so you ___ pay anything.', points: 1, accepted: ["don't have to", 'do not have to'] },
  { id: 'b1mo-e7', conceptId: 'b1-modals-obligation', type: 'fill_gap', prompt: "You ___ see a dentist regularly — it's good for your teeth.", points: 1, accepted: ['should'] },
  // --- verb_form ---
  { id: 'b1mo-e8', conceptId: 'b1-modals-obligation', type: 'verb_form', prompt: 'Yesterday, I (have to) ___ finish the report before 6 pm.', points: 1, accepted: ['had to'] },
  { id: 'b1mo-e9', conceptId: 'b1-modals-obligation', type: 'verb_form', prompt: 'Next year, she (have to) ___ take a new exam because the rules are changing.', points: 1, accepted: ['will have to'] },
  { id: 'b1mo-e10', conceptId: 'b1-modals-obligation', type: 'verb_form', prompt: 'You (not have to) ___ bring anything — we have everything ready.', points: 1, accepted: ["don't have to", 'do not have to'] },
  // --- choose_word ---
  { id: 'b1mo-e11', conceptId: 'b1-modals-obligation', type: 'choose_word', prompt: 'This road is closed. You ___ drive here.', points: 1, options: ["mustn't", "don't have to", 'should'], accepted: ["mustn't"] },
  { id: 'b1mo-e12', conceptId: 'b1-modals-obligation', type: 'choose_word', prompt: "It's a public holiday tomorrow, so you ___ go to work.", points: 1, options: ["don't have to", "mustn't", 'should'], accepted: ["don't have to"] },
  { id: 'b1mo-e13', conceptId: 'b1-modals-obligation', type: 'choose_word', prompt: 'In my opinion, you ___ call her and say sorry — it would be the right thing to do.', points: 1, options: ['should', 'may', "mustn't"], accepted: ['should'] },
  { id: 'b1mo-e14', conceptId: 'b1-modals-obligation', type: 'choose_word', prompt: "You ___ eat so much junk food — it's bad for your health.", points: 1, options: ["shouldn't", "don't have to", "mustn't"], accepted: ["shouldn't"] },
  // --- word_order ---
  { id: 'b1mo-e15', conceptId: 'b1-modals-obligation', type: 'word_order', prompt: 'Соберите: «В самолёте нельзя пользоваться телефоном»', points: 1, bank: ['you', "mustn't", 'use', 'your', 'phone', 'on', 'the', 'plane'], accepted: ["you mustn't use your phone on the plane"] },
  { id: 'b1mo-e16', conceptId: 'b1-modals-obligation', type: 'word_order', prompt: 'Соберите: «Тебе не обязательно готовить ужин сегодня»', points: 1, bank: ['you', "don't", 'have', 'to', 'cook', 'dinner', 'today'], accepted: ["you don't have to cook dinner today", "today you don't have to cook dinner"] },
  { id: 'b1mo-e17', conceptId: 'b1-modals-obligation', type: 'word_order', prompt: 'Соберите: «Тебе стоит больше отдыхать»', points: 1, bank: ['you', 'should', 'rest', 'more'], accepted: ['you should rest more'] },
  // --- multi_gap ---
  { id: 'b1mo-e18', conceptId: 'b1-modals-obligation', type: 'multi_gap', prompt: "You ___ park here on weekdays — it's forbidden, but on Sundays you ___ pay for parking.", points: 1, gaps: [{ accepted: ["mustn't", 'must not'] }, { accepted: ["don't have to", 'do not have to'] }] },
  { id: 'b1mo-e19', conceptId: 'b1-modals-obligation', type: 'multi_gap', prompt: 'Yesterday I ___ (have to) finish the report, but tomorrow I ___ (not have to) come to the office at all.', points: 1, gaps: [{ accepted: ['had to'] }, { accepted: ["won't have to", 'will not have to'] }] },
  { id: 'b1mo-e20', conceptId: 'b1-modals-obligation', type: 'multi_gap', prompt: "You ___ drink more water every day, and you ___ skip meals — it's bad for you.", points: 1, gaps: [{ accepted: ['should'] }, { accepted: ["shouldn't", 'should not'] }] },

  // ============ b1-modals-possibility ============
  // --- translate_ru_en ---
  { id: 'b1mp-e1', conceptId: 'b1-modals-possibility', type: 'translate_ru_en', prompt: 'Возможно, позже пойдёт дождь.', points: 2, accepted: ['It may rain later', 'It might rain later', 'It could rain later'] },
  { id: 'b1mp-e2', conceptId: 'b1-modals-possibility', type: 'translate_ru_en', prompt: 'Она, возможно, не придёт на вечеринку.', points: 2, accepted: ['She might not come to the party', 'She may not come to the party', "Maybe she won't come to the party"] },
  { id: 'b1mp-e3', conceptId: 'b1-modals-possibility', type: 'translate_ru_en', prompt: 'Он не может быть дома — я только что видел его в офисе.', points: 2, accepted: ["He can't be at home — I just saw him at the office", 'He cannot be at home — I just saw him at the office', "He can't be at home — I just saw him in the office"] },
  { id: 'b1mp-e4', conceptId: 'b1-modals-possibility', type: 'translate_ru_en', prompt: 'Возможно, она сейчас на работе.', points: 2, accepted: ['Maybe she is at work', 'She may be at work', "Maybe she's at work"] },
  // --- fill_gap ---
  { id: 'b1mp-e5', conceptId: 'b1-modals-possibility', type: 'fill_gap', prompt: "I'm not sure, but it ___ rain later — take an umbrella just in case.", points: 1, accepted: ['may', 'might', 'could'] },
  { id: 'b1mp-e6', conceptId: 'b1-modals-possibility', type: 'fill_gap', prompt: 'He ___ be at home right now — I saw his car at the office ten minutes ago.', points: 1, accepted: ["can't", 'cannot', 'can not'] },
  { id: 'b1mp-e7', conceptId: 'b1-modals-possibility', type: 'fill_gap', prompt: "___, she is still at the meeting — that would explain why she isn't answering.", points: 1, accepted: ['maybe', 'perhaps'] },
  // --- verb_form ---
  { id: 'b1mp-e8', conceptId: 'b1-modals-possibility', type: 'verb_form', prompt: "I'm not sure where he is. He (be) ___ at the gym — I'm just guessing.", points: 1, accepted: ['may be', 'might be', 'could be'] },
  { id: 'b1mp-e9', conceptId: 'b1-modals-possibility', type: 'verb_form', prompt: 'Look at those clouds — it (rain) ___ soon.', points: 1, accepted: ['may rain', 'might rain', 'could rain'] },
  { id: 'b1mp-e10', conceptId: 'b1-modals-possibility', type: 'verb_form', prompt: 'I just saw Tom at the office, so he (not be) ___ at home now.', points: 1, accepted: ["can't be", 'cannot be', 'can not be'] },
  // --- choose_word ---
  { id: 'b1mp-e11', conceptId: 'b1-modals-possibility', type: 'choose_word', prompt: "I'm not 100% sure, but she ___ be running late — traffic is bad today.", points: 1, options: ['might', 'must', "can't"], accepted: ['might'] },
  { id: 'b1mp-e12', conceptId: 'b1-modals-possibility', type: 'choose_word', prompt: "He ___ be the manager — I just saw the real manager walk in, and it's not him.", points: 1, options: ["can't", 'may', 'might'], accepted: ["can't"] },
  { id: 'b1mp-e13', conceptId: 'b1-modals-possibility', type: 'choose_word', prompt: "___ we should call her first, just to check she's home.", points: 1, options: ['Maybe', 'May be', 'Might be'], accepted: ['Maybe'] },
  { id: 'b1mp-e14', conceptId: 'b1-modals-possibility', type: 'choose_word', prompt: "She ___ at work — her car isn't in the car park, so she probably didn't come in today.", points: 1, options: ['may not be', "mayn't be", 'may not to be'], accepted: ['may not be'] },
  // --- word_order ---
  { id: 'b1mp-e15', conceptId: 'b1-modals-possibility', type: 'word_order', prompt: 'Соберите: «Возможно, она опоздает»', points: 1, bank: ['she', 'might', 'be', 'late'], accepted: ['she might be late'] },
  { id: 'b1mp-e16', conceptId: 'b1-modals-possibility', type: 'word_order', prompt: 'Соберите: «Возможно, у него нет времени»', points: 1, bank: ['he', 'might', 'not', 'have', 'time'], accepted: ['he might not have time'] },
  { id: 'b1mp-e17', conceptId: 'b1-modals-possibility', type: 'word_order', prompt: 'Соберите: «Возможно, я ошибаюсь»', points: 1, bank: ['I', 'may', 'be', 'wrong'], accepted: ['I may be wrong'] },
  // --- multi_gap ---
  { id: 'b1mp-e18', conceptId: 'b1-modals-possibility', type: 'multi_gap', prompt: 'It ___ rain later, so take an umbrella, but it ___ be sunny too — who knows.', points: 1, gaps: [{ accepted: ['may', 'might', 'could'] }, { accepted: ['may', 'might', 'could'] }] },
  { id: 'b1mp-e19', conceptId: 'b1-modals-possibility', type: 'multi_gap', prompt: "He ___ be at home — I just saw him at work, but she ___ be there, I'm not sure.", points: 1, gaps: [{ accepted: ["can't", 'cannot', 'can not'] }, { accepted: ['may', 'might', 'could'] }] },
  { id: 'b1mp-e20', conceptId: 'b1-modals-possibility', type: 'multi_gap', prompt: '___, she forgot about the meeting, or she ___ be stuck in traffic.', points: 1, gaps: [{ accepted: ['maybe'] }, { accepted: ['may', 'might', 'could'] }] },
];
