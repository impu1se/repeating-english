import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'a1-nouns-articles',
  title: 'Существительные и артикли',
  level: 'A1',
  masteryThreshold: 50,
  conceptIds: ['a1-articles', 'a1-plurals', 'a1-possessives'],
};

export const concepts: Concept[] = [
  {
    id: 'a1-articles',
    moduleId: 'a1-nouns-articles',
    title: 'Артикли: a/an/the',
    kind: 'grammar',
    theory:
      'Артикли a/an/the и нулевой артикль.\na/an — один из многих (первое упоминание), артикль выбирается по ЗВУКУ, а не по букве:\n• a book, a university (звук [j]), an hour (немая h), an apple.\nthe — конкретный, уже известный слушателю предмет или упомянутый раньше:\n• I bought a book. The book is interesting. (сначала a, потом the — уже известная книга)\nПеред множественным числом и неисчисляемыми без конкретики артикль не ставится:\n• I like apples. — Я люблю яблоки. (не the apples, если это не конкретные яблоки)\nПеред уникальными объектами и в устойчивых фразах — the: the sun, the sky.',
    exerciseIds: [
      'a1ar-e1', 'a1ar-e2', 'a1ar-e3', 'a1ar-e4', 'a1ar-e5',
      'a1ar-e6', 'a1ar-e7', 'a1ar-e8', 'a1ar-e9', 'a1ar-e10',
      'a1ar-e11', 'a1ar-e12', 'a1ar-e13', 'a1ar-e14', 'a1ar-e15',
      'a1ar-e16', 'a1ar-e17', 'a1ar-e18', 'a1ar-e19', 'a1ar-e20',
    ],
  },
  {
    id: 'a1-plurals',
    moduleId: 'a1-nouns-articles',
    title: 'Множественное число, this/that — these/those',
    kind: 'grammar',
    theory:
      'Множественное число существительных.\nОбычно + -s: book → books, car → cars.\nПосле -s/-sh/-ch/-x/-o добавляем -es: bus → buses, box → boxes, potato → potatoes.\nСогласная + y → -ies: city → cities, baby → babies (гласная + y: day → days, без изменений).\nНеправильные формы: man → men, woman → women, child → children, foot → feet, tooth → teeth, person → people.\nУказательные местоимения: this/that — для единственного числа, these/those — для множественного:\n• this book → these books; that car → those cars.',
    exerciseIds: [
      'a1pl-e1', 'a1pl-e2', 'a1pl-e3', 'a1pl-e4', 'a1pl-e5',
      'a1pl-e6', 'a1pl-e7', 'a1pl-e8', 'a1pl-e9', 'a1pl-e10',
      'a1pl-e11', 'a1pl-e12', 'a1pl-e13', 'a1pl-e14', 'a1pl-e15',
      'a1pl-e16', 'a1pl-e17', 'a1pl-e18', 'a1pl-e19', 'a1pl-e20',
    ],
  },
  {
    id: 'a1-possessives',
    moduleId: 'a1-nouns-articles',
    title: 'Притяжательные местоимения и \'s',
    kind: 'grammar',
    theory:
      "Притяжательные местоимения и притяжательный падеж.\nПеред существительным: my, your, his, her, its, our, their.\n• This is my phone. Her sister works here.\nСамостоятельные (без существительного): mine, yours, his, hers, ours, theirs.\n• This phone is mine. (не «the mine»)\nПритяжательный 's для одушевлённых и имён: Tom's car, my sister's bag.\nМножественное число на -s + апостроф без s: my parents' house, the girls' room.\nДля неправильного множественного (children, men) — как в единственном: the children's toys.",
    exerciseIds: [
      'a1po-e1', 'a1po-e2', 'a1po-e3', 'a1po-e4', 'a1po-e5',
      'a1po-e6', 'a1po-e7', 'a1po-e8', 'a1po-e9', 'a1po-e10',
      'a1po-e11', 'a1po-e12', 'a1po-e13', 'a1po-e14', 'a1po-e15',
      'a1po-e16', 'a1po-e17', 'a1po-e18', 'a1po-e19', 'a1po-e20',
    ],
  },
];

export const exercises: Exercise[] = [
  // ============ a1-articles: a/an/the/zero ============
  // --- translate_ru_en ---
  { id: 'a1ar-e1', conceptId: 'a1-articles', type: 'translate_ru_en', prompt: 'У меня есть кот.', points: 2, accepted: ['I have a cat'] },
  { id: 'a1ar-e2', conceptId: 'a1-articles', type: 'translate_ru_en', prompt: 'Мне нужен час.', points: 2, accepted: ['I need an hour'] },
  { id: 'a1ar-e3', conceptId: 'a1-articles', type: 'translate_ru_en', prompt: 'Я купил книгу. Книга интересная.', points: 2, accepted: ['I bought a book. The book is interesting', 'I bought a book. It is interesting', "I bought a book. It's interesting"] },
  { id: 'a1ar-e4', conceptId: 'a1-articles', type: 'translate_ru_en', prompt: 'Я люблю яблоки.', points: 2, accepted: ['I like apples', 'I love apples'] },
  // --- fill_gap ---
  { id: 'a1ar-e5', conceptId: 'a1-articles', type: 'fill_gap', prompt: 'I need ___ umbrella.', points: 1, accepted: ['an'] },
  { id: 'a1ar-e6', conceptId: 'a1-articles', type: 'fill_gap', prompt: 'He is ___ honest man.', points: 1, accepted: ['an'] },
  { id: 'a1ar-e7', conceptId: 'a1-articles', type: 'fill_gap', prompt: 'This is ___ university.', points: 1, accepted: ['a'] },
  // --- verb_form ---
  { id: 'a1ar-e8', conceptId: 'a1-articles', type: 'verb_form', prompt: 'This (be) ___ a good idea.', points: 1, accepted: ['is'] },
  { id: 'a1ar-e9', conceptId: 'a1-articles', type: 'verb_form', prompt: 'These (be) ___ my new shoes.', points: 1, accepted: ['are'] },
  { id: 'a1ar-e10', conceptId: 'a1-articles', type: 'verb_form', prompt: 'There (be) ___ an apple on the table.', points: 1, accepted: ['is'] },
  // --- choose_word ---
  { id: 'a1ar-e11', conceptId: 'a1-articles', type: 'choose_word', prompt: 'I saw ___ elephant at the zoo.', points: 1, options: ['an', 'a', 'the'], accepted: ['an'] },
  { id: 'a1ar-e12', conceptId: 'a1-articles', type: 'choose_word', prompt: 'She works as ___ nurse.', points: 1, options: ['a', 'an', 'the'], accepted: ['a'] },
  { id: 'a1ar-e13', conceptId: 'a1-articles', type: 'choose_word', prompt: "Look at ___ sky! It's so blue today.", points: 1, options: ['the', 'a', 'an'], accepted: ['the'] },
  { id: 'a1ar-e14', conceptId: 'a1-articles', type: 'choose_word', prompt: "I don't like ___.", points: 1, options: ['coffee', 'a coffee', 'the coffee'], accepted: ['coffee'] },
  // --- word_order ---
  { id: 'a1ar-e15', conceptId: 'a1-articles', type: 'word_order', prompt: 'Соберите: «Это яблоко»', points: 1, bank: ['this', 'is', 'an', 'apple'], accepted: ['this is an apple'] },
  { id: 'a1ar-e16', conceptId: 'a1-articles', type: 'word_order', prompt: 'Соберите: «Кошка на столе»', points: 1, bank: ['the', 'cat', 'is', 'on', 'the', 'table'], accepted: ['the cat is on the table'] },
  { id: 'a1ar-e17', conceptId: 'a1-articles', type: 'word_order', prompt: 'Соберите: «Дети любят мороженое»', points: 1, bank: ['children', 'love', 'ice', 'cream'], accepted: ['children love ice cream'] },
  // --- multi_gap ---
  { id: 'a1ar-e18', conceptId: 'a1-articles', type: 'multi_gap', prompt: 'I have ___ cat and ___ old dog.', points: 1, gaps: [{ accepted: ['a'] }, { accepted: ['an'] }] },
  { id: 'a1ar-e19', conceptId: 'a1-articles', type: 'multi_gap', prompt: 'I bought ___ shirt yesterday. ___ shirt is blue.', points: 1, gaps: [{ accepted: ['a'] }, { accepted: ['The', 'the'] }] },
  { id: 'a1ar-e20', conceptId: 'a1-articles', type: 'multi_gap', prompt: 'She has ___ orange and ___ banana.', points: 1, gaps: [{ accepted: ['an'] }, { accepted: ['a'] }] },

  // ============ a1-plurals: -s/-es/-ies, irregular, this/that — these/those ============
  // --- translate_ru_en ---
  { id: 'a1pl-e1', conceptId: 'a1-plurals', type: 'translate_ru_en', prompt: 'У меня три книги.', points: 2, accepted: ['I have three books'] },
  { id: 'a1pl-e2', conceptId: 'a1-plurals', type: 'translate_ru_en', prompt: 'Эти дети очень шумные.', points: 2, accepted: ['These children are very noisy', 'These children are very loud'] },
  { id: 'a1pl-e3', conceptId: 'a1-plurals', type: 'translate_ru_en', prompt: 'Те машины новые.', points: 2, accepted: ['Those cars are new', 'Those cars are brand new'] },
  { id: 'a1pl-e4', conceptId: 'a1-plurals', type: 'translate_ru_en', prompt: 'У неё болят зубы.', points: 2, accepted: ['Her teeth hurt', 'Her teeth ache'] },
  // --- fill_gap ---
  { id: 'a1pl-e5', conceptId: 'a1-plurals', type: 'fill_gap', prompt: 'She has two ___ and one son.', points: 1, accepted: ['daughters', 'girls'] },
  { id: 'a1pl-e6', conceptId: 'a1-plurals', type: 'fill_gap', prompt: 'There are five ___ in my family.', points: 1, accepted: ['people'] },
  { id: 'a1pl-e7', conceptId: 'a1-plurals', type: 'fill_gap', prompt: 'I brush my ___ every morning.', points: 1, accepted: ['teeth'] },
  // --- verb_form ---
  { id: 'a1pl-e8', conceptId: 'a1-plurals', type: 'verb_form', prompt: 'The children (be) ___ playing in the garden.', points: 1, accepted: ['are'] },
  { id: 'a1pl-e9', conceptId: 'a1-plurals', type: 'verb_form', prompt: 'My feet (be) ___ cold.', points: 1, accepted: ['are'] },
  { id: 'a1pl-e10', conceptId: 'a1-plurals', type: 'verb_form', prompt: 'These men (be) ___ my colleagues.', points: 1, accepted: ['are'] },
  // --- choose_word ---
  { id: 'a1pl-e11', conceptId: 'a1-plurals', type: 'choose_word', prompt: 'She has two ___.', points: 1, options: ['children', 'childs', 'child'], accepted: ['children'] },
  { id: 'a1pl-e12', conceptId: 'a1-plurals', type: 'choose_word', prompt: 'There are many ___ in the park.', points: 1, options: ['people', 'peoples', 'persons'], accepted: ['people'] },
  { id: 'a1pl-e13', conceptId: 'a1-plurals', type: 'choose_word', prompt: '___ shoes are very expensive.', points: 1, options: ['These', 'This', 'That'], accepted: ['These'] },
  { id: 'a1pl-e14', conceptId: 'a1-plurals', type: 'choose_word', prompt: 'Look at ___ boxes over there.', points: 1, options: ['those', 'that', 'this'], accepted: ['those'] },
  // --- word_order ---
  { id: 'a1pl-e15', conceptId: 'a1-plurals', type: 'word_order', prompt: 'Соберите: «У меня две сестры»', points: 1, bank: ['I', 'have', 'two', 'sisters'], accepted: ['I have two sisters'] },
  { id: 'a1pl-e16', conceptId: 'a1-plurals', type: 'word_order', prompt: 'Соберите: «Эти яблоки красные»', points: 1, bank: ['these', 'apples', 'are', 'red'], accepted: ['these apples are red'] },
  { id: 'a1pl-e17', conceptId: 'a1-plurals', type: 'word_order', prompt: 'Соберите: «Его ноги болят»', points: 1, bank: ['his', 'feet', 'hurt'], accepted: ['his feet hurt'] },
  // --- multi_gap ---
  { id: 'a1pl-e18', conceptId: 'a1-plurals', type: 'multi_gap', prompt: "I like ___ shoes here, but I don't like ___ shoes over there.", points: 1, gaps: [{ accepted: ['these'] }, { accepted: ['those'] }] },
  { id: 'a1pl-e19', conceptId: 'a1-plurals', type: 'multi_gap', prompt: 'One ___ (child) is sleeping, and two ___ (child) are eating.', points: 1, gaps: [{ accepted: ['child'] }, { accepted: ['children'] }] },
  { id: 'a1pl-e20', conceptId: 'a1-plurals', type: 'multi_gap', prompt: 'I have one ___ (tooth) missing, but my brother has all his ___ (tooth).', points: 1, gaps: [{ accepted: ['tooth'] }, { accepted: ['teeth'] }] },

  // ============ a1-possessives: my/mine, 's ============
  // --- translate_ru_en ---
  { id: 'a1po-e1', conceptId: 'a1-possessives', type: 'translate_ru_en', prompt: 'Это машина моих родителей.', points: 2, accepted: ["It is my parents' car", "It's my parents' car", "This is my parents' car"] },
  { id: 'a1po-e2', conceptId: 'a1-possessives', type: 'translate_ru_en', prompt: 'Это её книга.', points: 2, accepted: ['This is her book'] },
  { id: 'a1po-e3', conceptId: 'a1-possessives', type: 'translate_ru_en', prompt: 'Это машина Тома.', points: 2, accepted: ["This is Tom's car", "This car is Tom's"] },
  { id: 'a1po-e4', conceptId: 'a1-possessives', type: 'translate_ru_en', prompt: 'Этот телефон мой.', points: 2, accepted: ['This phone is mine', 'This is my phone'] },
  // --- fill_gap ---
  { id: 'a1po-e5', conceptId: 'a1-possessives', type: 'fill_gap', prompt: "This is Anna's bag. ___ bag is red.", points: 1, accepted: ['Her', 'her'] },
  { id: 'a1po-e6', conceptId: 'a1-possessives', type: 'fill_gap', prompt: 'I found this jacket. Is it ___, John?', points: 1, accepted: ['yours'] },
  { id: 'a1po-e7', conceptId: 'a1-possessives', type: 'fill_gap', prompt: 'My parents have a house. ___ house is big.', points: 1, accepted: ['Their', 'their'] },
  // --- verb_form ---
  { id: 'a1po-e8', conceptId: 'a1-possessives', type: 'verb_form', prompt: "This (be) ___ my sister's room.", points: 1, accepted: ['is'] },
  { id: 'a1po-e9', conceptId: 'a1-possessives', type: 'verb_form', prompt: "These (be) ___ our children's toys.", points: 1, accepted: ['are'] },
  { id: 'a1po-e10', conceptId: 'a1-possessives', type: 'verb_form', prompt: 'That (be) ___ his car over there.', points: 1, accepted: ['is'] },
  // --- choose_word ---
  { id: 'a1po-e11', conceptId: 'a1-possessives', type: 'choose_word', prompt: 'My wife and I bought a house last year. This is ___ house.', points: 1, options: ['our', 'ours', 'we'], accepted: ['our'] },
  { id: 'a1po-e12', conceptId: 'a1-possessives', type: 'choose_word', prompt: 'Is this pen ___?', points: 1, options: ['yours', 'your', 'you'], accepted: ['yours'] },
  { id: 'a1po-e13', conceptId: 'a1-possessives', type: 'choose_word', prompt: 'Sara has a red bag. This is ___ bag.', points: 1, options: ["Sara's", 'Saras', 'Sara'], accepted: ["Sara's"] },
  { id: 'a1po-e14', conceptId: 'a1-possessives', type: 'choose_word', prompt: 'The children have some books. Those are the ___ books.', points: 1, options: ["children's", "childrens'", "childs'"], accepted: ["children's"] },
  // --- word_order ---
  { id: 'a1po-e15', conceptId: 'a1-possessives', type: 'word_order', prompt: 'Соберите: «Это её собака»', points: 1, bank: ['this', 'is', 'her', 'dog'], accepted: ['this is her dog'] },
  { id: 'a1po-e16', conceptId: 'a1-possessives', type: 'word_order', prompt: 'Соберите: «Это машина моего брата»', points: 1, bank: ['this', 'is', 'my', "brother's", 'car'], accepted: ["this is my brother's car"] },
  { id: 'a1po-e17', conceptId: 'a1-possessives', type: 'word_order', prompt: 'Соберите: «Эта сумка не моя, она твоя»', points: 1, bank: ['this', 'bag', 'is', 'not', 'mine', 'it', 'is', 'yours'], accepted: ['this bag is not mine it is yours'] },
  // --- multi_gap ---
  { id: 'a1po-e18', conceptId: 'a1-possessives', type: 'multi_gap', prompt: 'I have a book, and you have a book too. This is ___ book, and that is ___ book.', points: 1, gaps: [{ accepted: ['my'] }, { accepted: ['your'] }] },
  { id: 'a1po-e19', conceptId: 'a1-possessives', type: 'multi_gap', prompt: 'I know you think this is your car. Actually, this car is ___, not ___.', points: 1, gaps: [{ accepted: ['mine'] }, { accepted: ['yours'] }] },
  { id: 'a1po-e20', conceptId: 'a1-possessives', type: 'multi_gap', prompt: "Tom has a sister. ___ sister's name is Anna. I have a brother too. ___ brother's name is Max.", points: 1, gaps: [{ accepted: ['his', 'His'] }, { accepted: ['my', 'My'] }] },
];
