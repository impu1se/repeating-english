import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'a1-basics',
  title: 'Базовые конструкции: some/any, can, there is',
  level: 'A1',
  masteryThreshold: 50,
  conceptIds: ['a1-some-any', 'a1-can', 'a1-there-is'],
};

export const concepts: Concept[] = [
  {
    id: 'a1-some-any',
    moduleId: 'a1-basics',
    title: 'some / any',
    kind: 'grammar',
    theory:
      "some / any — неопределённое количество (с исчисляемыми во множественном числе и неисчисляемыми).\nsome — в утвердительных предложениях:\n• I have some money. There are some apples in the bowl.\nany — в вопросах и отрицаниях:\n• Do you have any money? I don't have any apples.\nНо some — в вопросах-просьбах и предложениях (просьба или предложение чего-либо):\n• Can I have some water? Would you like some tea?\nno = not any: I have no money. = I don't have any money.",
    exerciseIds: [
      'a1sa-e1', 'a1sa-e2', 'a1sa-e3', 'a1sa-e4', 'a1sa-e5',
      'a1sa-e6', 'a1sa-e7', 'a1sa-e8', 'a1sa-e9', 'a1sa-e10',
      'a1sa-e11', 'a1sa-e12', 'a1sa-e13', 'a1sa-e14', 'a1sa-e15',
      'a1sa-e16', 'a1sa-e17', 'a1sa-e18', 'a1sa-e19', 'a1sa-e20',
    ],
  },
  {
    id: 'a1-can',
    moduleId: 'a1-basics',
    title: 'can / can\'t: умения и просьбы',
    kind: 'grammar',
    theory:
      "can — модальный глагол: умение, возможность, просьба. После can — глагол в базовой форме, без to.\n• I can swim. — Я умею плавать.\n• She can't (cannot) drive. — Она не умеет водить.\nВопрос — can выходит на первое место: Can you help me? — просьба (Можешь мне помочь?)\nКраткие ответы: Yes, I can. / No, I can't. (не «No, I don't»)\ncan одинаков для всех лиц — не добавляем -s: he can, не «he cans».",
    exerciseIds: [
      'a1cn-e1', 'a1cn-e2', 'a1cn-e3', 'a1cn-e4', 'a1cn-e5',
      'a1cn-e6', 'a1cn-e7', 'a1cn-e8', 'a1cn-e9', 'a1cn-e10',
      'a1cn-e11', 'a1cn-e12', 'a1cn-e13', 'a1cn-e14', 'a1cn-e15',
      'a1cn-e16', 'a1cn-e17', 'a1cn-e18', 'a1cn-e19', 'a1cn-e20',
    ],
  },
  {
    id: 'a1-there-is',
    moduleId: 'a1-basics',
    title: 'there is / there are',
    kind: 'grammar',
    theory:
      "there is / there are — существование чего-либо (есть, имеется).\nthere is + единственное или неисчисляемое: There is a park near my house. There is some milk.\nthere are + множественное: There are three chairs in the room.\nОтрицание: there isn't (is not) / there aren't (are not).\nВопрос: Is there…? / Are there…?\n• Is there a bank near here? Are there any shops nearby?\nthere is + a (одна вещь), there are + some (несколько вещей).",
    exerciseIds: [
      'a1th-e1', 'a1th-e2', 'a1th-e3', 'a1th-e4', 'a1th-e5',
      'a1th-e6', 'a1th-e7', 'a1th-e8', 'a1th-e9', 'a1th-e10',
      'a1th-e11', 'a1th-e12', 'a1th-e13', 'a1th-e14', 'a1th-e15',
      'a1th-e16', 'a1th-e17', 'a1th-e18', 'a1th-e19', 'a1th-e20',
    ],
  },
];

export const exercises: Exercise[] = [
  // ============ a1-some-any ============
  // --- translate_ru_en ---
  { id: 'a1sa-e1', conceptId: 'a1-some-any', type: 'translate_ru_en', prompt: 'У меня есть немного денег.', points: 2, accepted: ['I have some money', 'I have some cash'] },
  { id: 'a1sa-e2', conceptId: 'a1-some-any', type: 'translate_ru_en', prompt: 'У тебя есть яблоки?', points: 2, accepted: ['Do you have any apples?'] },
  { id: 'a1sa-e3', conceptId: 'a1-some-any', type: 'translate_ru_en', prompt: 'У нас нет молока.', points: 2, accepted: ["We don't have any milk", 'We have no milk', 'We do not have any milk'] },
  { id: 'a1sa-e4', conceptId: 'a1-some-any', type: 'translate_ru_en', prompt: 'Можно мне немного воды?', points: 2, accepted: ['Can I have some water?', 'Could I have some water?'] },
  // --- fill_gap ---
  { id: 'a1sa-e5', conceptId: 'a1-some-any', type: 'fill_gap', prompt: 'There are ___ books on the shelf.', points: 1, accepted: ['some', 'a few'] },
  { id: 'a1sa-e6', conceptId: 'a1-some-any', type: 'fill_gap', prompt: "I don't have ___ time today.", points: 1, accepted: ['any'] },
  { id: 'a1sa-e7', conceptId: 'a1-some-any', type: 'fill_gap', prompt: 'Would you like ___ coffee?', points: 1, accepted: ['some', 'a little'] },
  // --- verb_form ---
  { id: 'a1sa-e8', conceptId: 'a1-some-any', type: 'verb_form', prompt: 'There (be) ___ some eggs in the fridge.', points: 1, accepted: ['are'] },
  { id: 'a1sa-e9', conceptId: 'a1-some-any', type: 'verb_form', prompt: 'There (be) ___ no apples left.', points: 1, accepted: ['are'] },
  { id: 'a1sa-e10', conceptId: 'a1-some-any', type: 'verb_form', prompt: 'There (be) ___ no sugar left, so we need to buy some.', points: 1, accepted: ['is'] },
  // --- choose_word ---
  { id: 'a1sa-e11', conceptId: 'a1-some-any', type: 'choose_word', prompt: 'I have ___ friends in London.', points: 1, options: ['some', 'any', 'a'], accepted: ['some'] },
  { id: 'a1sa-e12', conceptId: 'a1-some-any', type: 'choose_word', prompt: 'Do you have ___ questions?', points: 1, options: ['any', 'some', 'no'], accepted: ['any'] },
  { id: 'a1sa-e13', conceptId: 'a1-some-any', type: 'choose_word', prompt: "She doesn't have ___ brothers.", points: 1, options: ['any', 'some', 'no'], accepted: ['any'] },
  { id: 'a1sa-e14', conceptId: 'a1-some-any', type: 'choose_word', prompt: 'Could I have ___ sugar, please?', points: 1, options: ['some', 'any', 'no'], accepted: ['some'] },
  // --- word_order ---
  { id: 'a1sa-e15', conceptId: 'a1-some-any', type: 'word_order', prompt: 'Соберите: «У меня есть немного времени»', points: 1, bank: ['I', 'have', 'some', 'time'], accepted: ['I have some time'] },
  { id: 'a1sa-e16', conceptId: 'a1-some-any', type: 'word_order', prompt: 'Соберите: «У тебя есть какие-нибудь вопросы?»', points: 1, bank: ['do', 'you', 'have', 'any', 'questions'], accepted: ['do you have any questions'] },
  { id: 'a1sa-e17', conceptId: 'a1-some-any', type: 'word_order', prompt: 'Соберите: «У нас нет яиц»', points: 1, bank: ['we', 'do', 'not', 'have', 'any', 'eggs'], accepted: ['we do not have any eggs'] },
  // --- multi_gap ---
  { id: 'a1sa-e18', conceptId: 'a1-some-any', type: 'multi_gap', prompt: "I have ___ apples, but I don't have ___ bananas.", points: 1, gaps: [{ accepted: ['some'] }, { accepted: ['any'] }] },
  { id: 'a1sa-e19', conceptId: 'a1-some-any', type: 'multi_gap', prompt: 'Is there ___ tea? Yes, there is ___ tea in the pot.', points: 1, gaps: [{ accepted: ['any'] }, { accepted: ['some'] }] },
  { id: 'a1sa-e20', conceptId: 'a1-some-any', type: 'multi_gap', prompt: "Would you like ___ biscuits? We don't have ___ cake, sorry.", points: 1, gaps: [{ accepted: ['some'] }, { accepted: ['any'] }] },

  // ============ a1-can ============
  // --- translate_ru_en ---
  { id: 'a1cn-e1', conceptId: 'a1-can', type: 'translate_ru_en', prompt: 'Я умею плавать.', points: 2, accepted: ['I can swim'] },
  { id: 'a1cn-e2', conceptId: 'a1-can', type: 'translate_ru_en', prompt: 'Она не умеет готовить.', points: 2, accepted: ["She can't cook", 'She cannot cook'] },
  { id: 'a1cn-e3', conceptId: 'a1-can', type: 'translate_ru_en', prompt: 'Ты можешь мне помочь?', points: 2, accepted: ['Can you help me?', 'Could you help me?'] },
  { id: 'a1cn-e4', conceptId: 'a1-can', type: 'translate_ru_en', prompt: 'Мы не можем прийти сегодня.', points: 2, accepted: ["We can't come today", 'We cannot come today'] },
  // --- fill_gap ---
  { id: 'a1cn-e5', conceptId: 'a1-can', type: 'fill_gap', prompt: 'I ___ speak three languages.', points: 1, accepted: ['can', "can't", 'cannot'] },
  { id: 'a1cn-e6', conceptId: 'a1-can', type: 'fill_gap', prompt: 'He ___ ride a bike.', points: 1, accepted: ['can', "can't", 'cannot'] },
  { id: 'a1cn-e7', conceptId: 'a1-can', type: 'fill_gap', prompt: '___ you swim?', points: 1, accepted: ['Can', 'can'] },
  // --- verb_form ---
  { id: 'a1cn-e8', conceptId: 'a1-can', type: 'verb_form', prompt: 'She can (speak) ___ French.', points: 1, accepted: ['speak'] },
  { id: 'a1cn-e9', conceptId: 'a1-can', type: 'verb_form', prompt: 'They can (play) ___ the piano.', points: 1, accepted: ['play'] },
  { id: 'a1cn-e10', conceptId: 'a1-can', type: 'verb_form', prompt: "He can't (drive) ___ a car.", points: 1, accepted: ['drive'] },
  // --- choose_word ---
  { id: 'a1cn-e11', conceptId: 'a1-can', type: 'choose_word', prompt: 'I ___ swim very well.', points: 1, options: ['can', 'cans', 'to can'], accepted: ['can'] },
  { id: 'a1cn-e12', conceptId: 'a1-can', type: 'choose_word', prompt: 'She ___ speak Chinese.', points: 1, options: ["can't", "don't can", "doesn't can"], accepted: ["can't"] },
  { id: 'a1cn-e13', conceptId: 'a1-can', type: 'choose_word', prompt: '___ you help me, please?', points: 1, options: ['Can', 'Do', 'Are'], accepted: ['Can'] },
  { id: 'a1cn-e14', conceptId: 'a1-can', type: 'choose_word', prompt: 'Can he drive? No, he ___.', points: 1, options: ["can't", "doesn't", "isn't"], accepted: ["can't"] },
  // --- word_order ---
  { id: 'a1cn-e15', conceptId: 'a1-can', type: 'word_order', prompt: 'Соберите: «Я умею готовить»', points: 1, bank: ['I', 'can', 'cook'], accepted: ['I can cook'] },
  { id: 'a1cn-e16', conceptId: 'a1-can', type: 'word_order', prompt: 'Соберите: «Она не может прийти»', points: 1, bank: ['she', 'cannot', 'come'], accepted: ['she cannot come'] },
  { id: 'a1cn-e17', conceptId: 'a1-can', type: 'word_order', prompt: 'Соберите: «Можешь передать мне соль?»', points: 1, bank: ['can', 'you', 'pass', 'me', 'the', 'salt'], accepted: ['can you pass me the salt'] },
  // --- multi_gap ---
  { id: 'a1cn-e18', conceptId: 'a1-can', type: 'multi_gap', prompt: 'I ___ (play) tennis, but I ___ (not play) golf.', points: 1, gaps: [{ accepted: ['can play'] }, { accepted: ["can't play", 'cannot play'] }] },
  { id: 'a1cn-e19', conceptId: 'a1-can', type: 'multi_gap', prompt: '___ you drive? Yes, I ___.', points: 1, gaps: [{ accepted: ['Can', 'can'] }, { accepted: ['can'] }] },
  { id: 'a1cn-e20', conceptId: 'a1-can', type: 'multi_gap', prompt: 'He ___ (speak) Spanish, but he ___ (not speak) Italian.', points: 1, gaps: [{ accepted: ['can speak'] }, { accepted: ["can't speak", 'cannot speak'] }] },

  // ============ a1-there-is ============
  // --- translate_ru_en ---
  { id: 'a1th-e1', conceptId: 'a1-there-is', type: 'translate_ru_en', prompt: 'В комнате есть стол.', points: 2, accepted: ['There is a table in the room', "There's a table in the room", 'In the room, there is a table'] },
  { id: 'a1th-e2', conceptId: 'a1-there-is', type: 'translate_ru_en', prompt: 'В парке есть деревья.', points: 2, accepted: ['There are trees in the park', 'In the park, there are trees'] },
  { id: 'a1th-e3', conceptId: 'a1-there-is', type: 'translate_ru_en', prompt: 'Рядом нет банка.', points: 2, accepted: ["There isn't a bank nearby", 'There is no bank nearby', "There's no bank nearby"] },
  { id: 'a1th-e4', conceptId: 'a1-there-is', type: 'translate_ru_en', prompt: 'Здесь есть банкомат?', points: 2, accepted: ['Is there a cash machine here?', 'Is there an ATM here?'] },
  // --- fill_gap ---
  { id: 'a1th-e5', conceptId: 'a1-there-is', type: 'fill_gap', prompt: 'There ___ a shop near my house.', points: 1, accepted: ['is', "isn't", 'is not'] },
  { id: 'a1th-e6', conceptId: 'a1-there-is', type: 'fill_gap', prompt: 'There ___ many people at the party.', points: 1, accepted: ['are', "aren't", 'are not'] },
  { id: 'a1th-e7', conceptId: 'a1-there-is', type: 'fill_gap', prompt: '___ there a problem?', points: 1, accepted: ['Is', 'is'] },
  // --- verb_form ---
  { id: 'a1th-e8', conceptId: 'a1-there-is', type: 'verb_form', prompt: 'There (be) ___ a cat in the garden.', points: 1, accepted: ['is'] },
  { id: 'a1th-e9', conceptId: 'a1-there-is', type: 'verb_form', prompt: 'There (be) ___ some books on the desk.', points: 1, accepted: ['are'] },
  { id: 'a1th-e10', conceptId: 'a1-there-is', type: 'verb_form', prompt: 'There (be) ___ no milk in the fridge.', points: 1, accepted: ['is'] },
  // --- choose_word ---
  { id: 'a1th-e11', conceptId: 'a1-there-is', type: 'choose_word', prompt: 'There ___ a park near here.', points: 1, options: ['is', 'are', 'be'], accepted: ['is'] },
  { id: 'a1th-e12', conceptId: 'a1-there-is', type: 'choose_word', prompt: 'There ___ three windows in this room.', points: 1, options: ['are', 'is', 'be'], accepted: ['are'] },
  { id: 'a1th-e13', conceptId: 'a1-there-is', type: 'choose_word', prompt: '___ there any shops nearby?', points: 1, options: ['Are', 'Is', 'Do'], accepted: ['Are'] },
  { id: 'a1th-e14', conceptId: 'a1-there-is', type: 'choose_word', prompt: 'There is ___ milk in the glass.', points: 1, options: ['some', 'many', 'a'], accepted: ['some'] },
  // --- word_order ---
  { id: 'a1th-e15', conceptId: 'a1-there-is', type: 'word_order', prompt: 'Соберите: «В саду есть дерево»', points: 1, bank: ['there', 'is', 'a', 'tree', 'in', 'the', 'garden'], accepted: ['there is a tree in the garden', 'in the garden there is a tree'] },
  { id: 'a1th-e16', conceptId: 'a1-there-is', type: 'word_order', prompt: 'Соберите: «В городе нет метро»', points: 1, bank: ['there', 'is', 'no', 'metro', 'in', 'the', 'city'], accepted: ['there is no metro in the city', 'in the city there is no metro'] },
  { id: 'a1th-e17', conceptId: 'a1-there-is', type: 'word_order', prompt: 'Соберите: «Здесь есть хорошие рестораны?»', points: 1, bank: ['are', 'there', 'any', 'good', 'restaurants', 'here'], accepted: ['are there any good restaurants here'] },
  // --- multi_gap ---
  { id: 'a1th-e18', conceptId: 'a1-there-is', type: 'multi_gap', prompt: 'There ___ a park nearby, but there ___ no shops.', points: 1, gaps: [{ accepted: ['is'] }, { accepted: ['are'] }] },
  { id: 'a1th-e19', conceptId: 'a1-there-is', type: 'multi_gap', prompt: '___ there a bank near here? No, there ___ not.', points: 1, gaps: [{ accepted: ['Is', 'is'] }, { accepted: ['is'] }] },
  { id: 'a1th-e20', conceptId: 'a1-there-is', type: 'multi_gap', prompt: 'There ___ some eggs, but there ___ not any milk.', points: 1, gaps: [{ accepted: ['are'] }, { accepted: ['is'] }] },
];
