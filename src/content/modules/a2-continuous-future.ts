import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'a2-continuous-future',
  title: 'Present Continuous и будущее: going to, will',
  level: 'A2',
  masteryThreshold: 20,
  conceptIds: ['a2-present-continuous', 'a2-simple-vs-continuous', 'a2-going-to-will'],
};

export const concepts: Concept[] = [
  {
    id: 'a2-present-continuous',
    moduleId: 'a2-continuous-future',
    title: 'Present Continuous: действие сейчас',
    kind: 'grammar',
    theory:
      "Present Continuous — действие, которое происходит сейчас, в момент речи.\nОбразование: am/is/are + глагол-ing.\n• I am working now. She is reading a book. They are watching TV.\nОрфография -ing: обычно + ing (play → playing); немая -e выпадает (make → making); одна гласная+согласная на конце — согласная удваивается (run → running, sit → sitting).\nОтрицание: am not / isn't (is not) / aren't (are not) + -ing.\n• He isn't listening. We aren't working today.\nВопрос — am/is/are на первое место:\n• Are you waiting for someone? Is she sleeping?\nСлова-маркеры: now, right now, at the moment, today (это точно момент речи, а не привычка).",
    exerciseIds: [
      'a2pc-e1', 'a2pc-e2', 'a2pc-e3', 'a2pc-e4', 'a2pc-e5',
      'a2pc-e6', 'a2pc-e7', 'a2pc-e8', 'a2pc-e9', 'a2pc-e10',
      'a2pc-e11', 'a2pc-e12', 'a2pc-e13', 'a2pc-e14', 'a2pc-e15',
      'a2pc-e16', 'a2pc-e17', 'a2pc-e18', 'a2pc-e19', 'a2pc-e20',
      'a2pc-e21', 'a2pc-e22', 'a2pc-e23', 'a2pc-e24', 'a2pc-e25', 'a2pc-e26', 'a2pc-e27', 'a2pc-e28', 'a2pc-e29', 'a2pc-e30',
    ],
  },
  {
    id: 'a2-simple-vs-continuous',
    moduleId: 'a2-continuous-future',
    title: 'Present Simple vs Present Continuous',
    kind: 'grammar',
    theory:
      "Present Simple — обычные действия, привычки, факты (usually, every day). Present Continuous — действие прямо сейчас (now, at the moment).\n• I usually drink tea, but today I am drinking coffee. — Обычно пью чай, но сегодня пью кофе.\nГлаголы состояния (state verbs) НЕ используются в Continuous, даже если действие происходит сейчас: know, like, want, love, hate, need, understand, believe, remember.\n• I know the answer. (не I am knowing) I want a coffee now. (не I am wanting)\nСлова-маркеры Simple: usually, always, every day, on Mondays. Слова-маркеры Continuous: now, right now, at the moment, today, currently.\nГлагол have двоякий: have a car (обладание) — только Simple; have breakfast/a shower (действие) — может быть Continuous: I am having breakfast now.\nГлагол think тоже меняет значение: think (полагать) = Simple; think (обдумывать) = Continuous: I think it's true. / I am thinking about it.",
    exerciseIds: [
      'a2sc-e1', 'a2sc-e2', 'a2sc-e3', 'a2sc-e4', 'a2sc-e5',
      'a2sc-e6', 'a2sc-e7', 'a2sc-e8', 'a2sc-e9', 'a2sc-e10',
      'a2sc-e11', 'a2sc-e12', 'a2sc-e13', 'a2sc-e14', 'a2sc-e15',
      'a2sc-e16', 'a2sc-e17', 'a2sc-e18', 'a2sc-e19', 'a2sc-e20',
      'a2sc-e21', 'a2sc-e22', 'a2sc-e23', 'a2sc-e24', 'a2sc-e25', 'a2sc-e26', 'a2sc-e27', 'a2sc-e28', 'a2sc-e29', 'a2sc-e30',
    ],
  },
  {
    id: 'a2-going-to-will',
    moduleId: 'a2-continuous-future',
    title: 'Будущее: going to и will',
    kind: 'grammar',
    theory:
      "going to — планы (уже решено) и предсказания по признакам, которые видны сейчас.\n• I'm going to visit my parents this weekend. — Планирую (уже решил).\n• Look at those clouds! It's going to rain. — Предсказание по видимым признакам.\nОбразование: am/is/are + going to + базовая форма глагола.\nwill — решение прямо в момент речи (спонтанное) и обещания, предложения помощи.\n• The phone is ringing. — I'll answer it! (решение только что)\n• I promise I will help you. — обещание.\nwill не используется для уже принятых планов: I'm going to buy a new phone (не I will buy — если уже решено заранее).\nОтрицание: isn't/aren't going to; won't (will not).\n• We aren't going to be late. I won't tell anyone.",
    exerciseIds: [
      'a2gw-e1', 'a2gw-e2', 'a2gw-e3', 'a2gw-e4', 'a2gw-e5',
      'a2gw-e6', 'a2gw-e7', 'a2gw-e8', 'a2gw-e9', 'a2gw-e10',
      'a2gw-e11', 'a2gw-e12', 'a2gw-e13', 'a2gw-e14', 'a2gw-e15',
      'a2gw-e16', 'a2gw-e17', 'a2gw-e18', 'a2gw-e19', 'a2gw-e20',
      'a2gw-e21', 'a2gw-e22', 'a2gw-e23', 'a2gw-e24', 'a2gw-e25', 'a2gw-e26', 'a2gw-e27', 'a2gw-e28', 'a2gw-e29', 'a2gw-e30',
    ],
  },
];

export const exercises: Exercise[] = [
  // ============ a2-present-continuous ============
  // --- translate_ru_en ---
  { id: 'a2pc-e1', conceptId: 'a2-present-continuous', type: 'translate_ru_en', prompt: 'Я сейчас работаю.', points: 2, accepted: ['I am working now', "I'm working now"] },
  { id: 'a2pc-e2', conceptId: 'a2-present-continuous', type: 'translate_ru_en', prompt: 'Она сейчас не спит.', points: 2, accepted: ["She isn't sleeping now", "She's not sleeping now", 'She is not sleeping now'] },
  { id: 'a2pc-e3', conceptId: 'a2-present-continuous', type: 'translate_ru_en', prompt: 'Ты сейчас ждёшь автобус?', points: 2, accepted: ['Are you waiting for the bus now?'] },
  { id: 'a2pc-e4', conceptId: 'a2-present-continuous', type: 'translate_ru_en', prompt: 'Дети играют в саду прямо сейчас.', points: 2, accepted: ['The children are playing in the garden right now', 'The children are playing in the garden now'] },
  // --- fill_gap ---
  { id: 'a2pc-e5', conceptId: 'a2-present-continuous', type: 'fill_gap', prompt: 'Listen! Somebody ___ at the door.', points: 1, accepted: ['is knocking'] },
  { id: 'a2pc-e6', conceptId: 'a2-present-continuous', type: 'fill_gap', prompt: 'Look at the sky! It ___ — grab an umbrella!', points: 1, accepted: ['is raining', "'s raining"] },
  { id: 'a2pc-e7', conceptId: 'a2-present-continuous', type: 'fill_gap', prompt: 'Please be quiet, I ___ on the phone.', points: 1, accepted: ['am talking', 'am speaking'] },
  // --- verb_form ---
  { id: 'a2pc-e8', conceptId: 'a2-present-continuous', type: 'verb_form', prompt: 'She is (make) ___ dinner right now.', points: 1, accepted: ['making'] },
  { id: 'a2pc-e9', conceptId: 'a2-present-continuous', type: 'verb_form', prompt: 'They are (run) ___ in the park at the moment.', points: 1, accepted: ['running'] },
  { id: 'a2pc-e10', conceptId: 'a2-present-continuous', type: 'verb_form', prompt: 'We are (watch) ___ a movie together.', points: 1, accepted: ['watching'] },
  // --- choose_word ---
  { id: 'a2pc-e11', conceptId: 'a2-present-continuous', type: 'choose_word', prompt: 'She ___ TV at the moment.', points: 1, options: ['is watching', 'watchs', 'watches'], accepted: ['is watching'] },
  { id: 'a2pc-e12', conceptId: 'a2-present-continuous', type: 'choose_word', prompt: '___ you listening to me?', points: 1, options: ['Are', 'Do', 'Is'], accepted: ['Are'] },
  { id: 'a2pc-e13', conceptId: 'a2-present-continuous', type: 'choose_word', prompt: "I can't talk, I ___ right now.", points: 1, options: ['am driving', 'drive', 'drives'], accepted: ['am driving'] },
  { id: 'a2pc-e14', conceptId: 'a2-present-continuous', type: 'choose_word', prompt: 'He ___ his room at the moment.', points: 1, options: ['is cleaning', 'is cleanning', 'cleans'], accepted: ['is cleaning'] },
  // --- word_order ---
  { id: 'a2pc-e15', conceptId: 'a2-present-continuous', type: 'word_order', prompt: 'Соберите: «Я сейчас читаю книгу»', points: 1, bank: ['I', 'am', 'reading', 'a', 'book', 'now'], accepted: ['I am reading a book now', 'now I am reading a book'] },
  { id: 'a2pc-e16', conceptId: 'a2-present-continuous', type: 'word_order', prompt: 'Соберите: «Она не слушает музыку»', points: 1, bank: ['she', 'is', 'not', 'listening', 'to', 'music'], accepted: ['she is not listening to music'] },
  { id: 'a2pc-e17', conceptId: 'a2-present-continuous', type: 'word_order', prompt: 'Соберите: «Вы ждёте кого-то?»', points: 1, bank: ['are', 'you', 'waiting', 'for', 'someone'], accepted: ['are you waiting for someone'] },
  // --- multi_gap ---
  { id: 'a2pc-e18', conceptId: 'a2-present-continuous', type: 'multi_gap', prompt: 'I ___ (work) now, but he ___ (rest).', points: 1, gaps: [{ accepted: ['am working'] }, { accepted: ['is resting'] }] },
  { id: 'a2pc-e19', conceptId: 'a2-present-continuous', type: 'multi_gap', prompt: '___ she cooking? No, she ___ cleaning the kitchen.', points: 1, gaps: [{ accepted: ['is'] }, { accepted: ['is'] }] },
  { id: 'a2pc-e20', conceptId: 'a2-present-continuous', type: 'multi_gap', prompt: 'Look! It ___ (rain), so the kids ___ (not play) outside.', points: 1, gaps: [{ accepted: ['is raining'] }, { accepted: ["aren't playing", 'are not playing'] }] },

  // ============ a2-simple-vs-continuous ============
  // --- translate_ru_en ---
  { id: 'a2sc-e1', conceptId: 'a2-simple-vs-continuous', type: 'translate_ru_en', prompt: 'Обычно я пью чай, но сегодня я пью кофе.', points: 2, accepted: ['I usually drink tea, but today I am drinking coffee', "I usually drink tea, but today I'm drinking coffee"] },
  { id: 'a2sc-e2', conceptId: 'a2-simple-vs-continuous', type: 'translate_ru_en', prompt: 'Я знаю ответ.', points: 2, accepted: ['I know the answer'] },
  { id: 'a2sc-e3', conceptId: 'a2-simple-vs-continuous', type: 'translate_ru_en', prompt: 'Она сейчас готовит ужин.', points: 2, accepted: ['She is cooking dinner now', "She's cooking dinner now"] },
  { id: 'a2sc-e4', conceptId: 'a2-simple-vs-continuous', type: 'translate_ru_en', prompt: 'Я хочу чашку кофе.', points: 2, accepted: ['I want a cup of coffee'] },
  // --- fill_gap ---
  { id: 'a2sc-e5', conceptId: 'a2-simple-vs-continuous', type: 'fill_gap', prompt: 'I ___ to work by bus every day, but today I am walking.', points: 1, accepted: ['go'] },
  { id: 'a2sc-e6', conceptId: 'a2-simple-vs-continuous', type: 'fill_gap', prompt: "Right now, she ___ her homework, so please don't disturb her.", points: 1, accepted: ['is doing'] },
  { id: 'a2sc-e7', conceptId: 'a2-simple-vs-continuous', type: 'fill_gap', prompt: 'I ___ this word — can you explain it?', points: 1, accepted: ["don't understand", 'do not understand'] },
  // --- verb_form ---
  { id: 'a2sc-e8', conceptId: 'a2-simple-vs-continuous', type: 'verb_form', prompt: 'She (like) ___ ice cream.', points: 1, accepted: ['likes'] },
  { id: 'a2sc-e9', conceptId: 'a2-simple-vs-continuous', type: 'verb_form', prompt: 'Look! He (run) ___ across the street.', points: 1, accepted: ['is running'] },
  { id: 'a2sc-e10', conceptId: 'a2-simple-vs-continuous', type: 'verb_form', prompt: 'We (want) ___ to leave now.', points: 1, accepted: ['want'] },
  // --- choose_word ---
  { id: 'a2sc-e11', conceptId: 'a2-simple-vs-continuous', type: 'choose_word', prompt: 'I ___ this song — turn it up!', points: 1, options: ['love', 'am loving', 'loves'], accepted: ['love'] },
  { id: 'a2sc-e12', conceptId: 'a2-simple-vs-continuous', type: 'choose_word', prompt: '___ you understand the instructions?', points: 1, options: ['Do', 'Are', 'Does'], accepted: ['Do'] },
  { id: 'a2sc-e13', conceptId: 'a2-simple-vs-continuous', type: 'choose_word', prompt: 'Look, it ___ outside!', points: 1, options: ['is raining', 'rains', 'rain'], accepted: ['is raining'] },
  { id: 'a2sc-e14', conceptId: 'a2-simple-vs-continuous', type: 'choose_word', prompt: 'She ___ a shower at the moment, call back later.', points: 1, options: ['is having', 'has', 'have'], accepted: ['is having'] },
  // --- word_order ---
  { id: 'a2sc-e15', conceptId: 'a2-simple-vs-continuous', type: 'word_order', prompt: 'Соберите: «Я знаю правильный ответ»', points: 1, bank: ['I', 'know', 'the', 'right', 'answer'], accepted: ['I know the right answer'] },
  { id: 'a2sc-e16', conceptId: 'a2-simple-vs-continuous', type: 'word_order', prompt: 'Соберите: «Она сейчас готовит завтрак»', points: 1, bank: ['she', 'is', 'cooking', 'breakfast', 'now'], accepted: ['she is cooking breakfast now', 'now she is cooking breakfast'] },
  { id: 'a2sc-e17', conceptId: 'a2-simple-vs-continuous', type: 'word_order', prompt: 'Соберите: «Мы хотим пойти домой»', points: 1, bank: ['we', 'want', 'to', 'go', 'home'], accepted: ['we want to go home'] },
  // --- multi_gap ---
  { id: 'a2sc-e18', conceptId: 'a2-simple-vs-continuous', type: 'multi_gap', prompt: 'I usually ___ (walk) to work, but today I ___ (drive).', points: 1, gaps: [{ accepted: ['walk'] }, { accepted: ['am driving'] }] },
  { id: 'a2sc-e19', conceptId: 'a2-simple-vs-continuous', type: 'multi_gap', prompt: 'She ___ (not like) coffee, but she ___ (drink) tea every morning.', points: 1, gaps: [{ accepted: ["doesn't like", 'does not like'] }, { accepted: ['drinks'] }] },
  { id: 'a2sc-e20', conceptId: 'a2-simple-vs-continuous', type: 'multi_gap', prompt: 'Look! The children ___ (play) in the garden, but they ___ (not study).', points: 1, gaps: [{ accepted: ['are playing'] }, { accepted: ["aren't studying", 'are not studying'] }] },

  // ============ a2-going-to-will ============
  // --- translate_ru_en ---
  { id: 'a2gw-e1', conceptId: 'a2-going-to-will', type: 'translate_ru_en', prompt: 'Я собираюсь навестить родителей в эти выходные.', points: 2, accepted: ['I am going to visit my parents this weekend', "I'm going to visit my parents this weekend"] },
  { id: 'a2gw-e2', conceptId: 'a2-going-to-will', type: 'translate_ru_en', prompt: 'Посмотри на эти тучи! Сейчас пойдёт дождь.', points: 2, accepted: ["Look at those clouds! It's going to rain", 'Look at those clouds! It is going to rain'] },
  { id: 'a2gw-e3', conceptId: 'a2-going-to-will', type: 'translate_ru_en', prompt: 'Телефон звонит. Я отвечу!', points: 2, accepted: ["The phone is ringing. I'll answer it!", 'The phone is ringing. I will answer it!'] },
  { id: 'a2gw-e4', conceptId: 'a2-going-to-will', type: 'translate_ru_en', prompt: 'Я обещаю — я не скажу никому.', points: 2, accepted: ["I promise — I won't tell anyone", 'I promise — I will not tell anyone'] },
  // --- fill_gap ---
  { id: 'a2gw-e5', conceptId: 'a2-going-to-will', type: 'fill_gap', prompt: "I've already booked the tickets — we ___ visit Rome next month.", points: 1, accepted: ['are going to'] },
  { id: 'a2gw-e6', conceptId: 'a2-going-to-will', type: 'fill_gap', prompt: 'Watch out, that glass ___ fall off the table!', points: 1, accepted: ['is going to'] },
  { id: 'a2gw-e7', conceptId: 'a2-going-to-will', type: 'fill_gap', prompt: 'OK, you look tired — I ___ make you a cup of tea.', points: 1, accepted: ['will', "'ll"] },
  // --- verb_form ---
  { id: 'a2gw-e8', conceptId: 'a2-going-to-will', type: 'verb_form', prompt: 'She is going to (start) ___ a new job next week.', points: 1, accepted: ['start'] },
  { id: 'a2gw-e9', conceptId: 'a2-going-to-will', type: 'verb_form', prompt: 'They are going to (buy) ___ a new car.', points: 1, accepted: ['buy'] },
  { id: 'a2gw-e10', conceptId: 'a2-going-to-will', type: 'verb_form', prompt: 'I will (call) ___ you as soon as I arrive.', points: 1, accepted: ['call'] },
  // --- choose_word ---
  { id: 'a2gw-e11', conceptId: 'a2-going-to-will', type: 'choose_word', prompt: "I've decided — I ___ to study medicine.", points: 1, options: ['am going', 'will', 'go'], accepted: ['am going'] },
  { id: 'a2gw-e12', conceptId: 'a2-going-to-will', type: 'choose_word', prompt: 'Look at the sky — it ___ rain soon!', points: 1, options: ['is going to', 'will', 'is go to'], accepted: ['is going to'] },
  { id: 'a2gw-e13', conceptId: 'a2-going-to-will', type: 'choose_word', prompt: '___ you help me carry these bags?', points: 1, options: ['Will', 'Do', 'Are'], accepted: ['Will'] },
  { id: 'a2gw-e14', conceptId: 'a2-going-to-will', type: 'choose_word', prompt: 'We ___ be late — the traffic is terrible.', points: 1, options: ['are going to', 'go to', 'will to'], accepted: ['are going to'] },
  // --- word_order ---
  { id: 'a2gw-e15', conceptId: 'a2-going-to-will', type: 'word_order', prompt: 'Соберите: «Я собираюсь купить новый телефон»', points: 1, bank: ['I', 'am', 'going', 'to', 'buy', 'a', 'new', 'phone'], accepted: ['I am going to buy a new phone'] },
  { id: 'a2gw-e16', conceptId: 'a2-going-to-will', type: 'word_order', prompt: 'Соберите: «Она не собирается приходить»', points: 1, bank: ['she', 'is', 'not', 'going', 'to', 'come'], accepted: ['she is not going to come'] },
  { id: 'a2gw-e17', conceptId: 'a2-going-to-will', type: 'word_order', prompt: 'Соберите: «Я помогу тебе»', points: 1, bank: ['I', 'will', 'help', 'you'], accepted: ['I will help you'] },
  // --- multi_gap ---
  { id: 'a2gw-e18', conceptId: 'a2-going-to-will', type: 'multi_gap', prompt: "I've decided — I ___ (go) to the gym tonight. But I'm hungry right now, so I ___ (make) a sandwich first.", points: 1, gaps: [{ accepted: ['am going'] }, { accepted: ['will make'] }] },
  { id: 'a2gw-e19', conceptId: 'a2-going-to-will', type: 'multi_gap', prompt: "I'm not sure about the weather, but I think it ___ rain tomorrow. Look outside now, though — it ___ rain any minute!", points: 1, gaps: [{ accepted: ['will'] }, { accepted: ['is going to'] }] },
  { id: 'a2gw-e20', conceptId: 'a2-going-to-will', type: 'multi_gap', prompt: "The phone's ringing — I ___ (answer) it! And remember, I ___ (visit) Paris next summer — I've already bought the tickets.", points: 1, gaps: [{ accepted: ['will answer'] }, { accepted: ['am going to visit'] }] },
  // ---- добор: a2-present-continuous ----
  { id: 'a2pc-e21', conceptId: 'a2-present-continuous', type: 'translate_ru_en', prompt: 'В этом месяце я живу у друга.', points: 2, accepted: ["This month I'm staying with a friend", 'This month I am staying with a friend'] },
  { id: 'a2pc-e22', conceptId: 'a2-present-continuous', type: 'translate_ru_en', prompt: 'Почему ты смеёшься?', points: 2, accepted: ['Why are you laughing?'] },
  { id: 'a2pc-e23', conceptId: 'a2-present-continuous', type: 'fill_gap', prompt: 'Be quiet! The baby ___ in the next room.', points: 1, accepted: ['is sleeping'] },
  { id: 'a2pc-e24', conceptId: 'a2-present-continuous', type: 'fill_gap', prompt: 'What ___ you doing at the moment?', points: 1, accepted: ['are'] },
  { id: 'a2pc-e25', conceptId: 'a2-present-continuous', type: 'verb_form', prompt: 'He is (sit) ___ next to the window.', points: 1, accepted: ['sitting'] },
  { id: 'a2pc-e26', conceptId: 'a2-present-continuous', type: 'choose_word', prompt: 'She is ___ a letter to her friend.', points: 1, options: ['writing', 'writeing', 'writting'], accepted: ['writing'] },
  { id: 'a2pc-e27', conceptId: 'a2-present-continuous', type: 'choose_word', prompt: 'They ___ dinner right now — call back later.', points: 1, options: ['are having', 'have', 'are haveing'], accepted: ['are having'] },
  { id: 'a2pc-e28', conceptId: 'a2-present-continuous', type: 'word_order', prompt: 'Соберите: «Почему ты улыбаешься?»', points: 1, bank: ['why', 'are', 'you', 'smiling'], accepted: ['why are you smiling'] },
  { id: 'a2pc-e29', conceptId: 'a2-present-continuous', type: 'word_order', prompt: 'Соберите: «Они сейчас не работают»', points: 1, bank: ['they', 'are', 'not', 'working', 'now'], accepted: ['they are not working now'] },
  { id: 'a2pc-e30', conceptId: 'a2-present-continuous', type: 'multi_gap', prompt: 'He ___ (sit) in the garden and she ___ (run) in the park.', points: 1, gaps: [{ accepted: ['is sitting'] }, { accepted: ['is running'] }] },

  // ---- добор: a2-simple-vs-continuous ----
  { id: 'a2sc-e21', conceptId: 'a2-simple-vs-continuous', type: 'translate_ru_en', prompt: 'Эта книга принадлежит мне.', points: 2, accepted: ['This book belongs to me'] },
  { id: 'a2sc-e22', conceptId: 'a2-simple-vs-continuous', type: 'translate_ru_en', prompt: 'Он всегда опаздывает.', points: 2, accepted: ['He is always late', "He's always late"] },
  { id: 'a2sc-e23', conceptId: 'a2-simple-vs-continuous', type: 'fill_gap', prompt: 'She ___ she is right, but I disagree.', points: 1, accepted: ['believes', 'thinks'] },
  { id: 'a2sc-e24', conceptId: 'a2-simple-vs-continuous', type: 'fill_gap', prompt: 'Sorry, I ___ understand you — say it again, please.', points: 1, accepted: ["don't", 'do not'] },
  { id: 'a2sc-e25', conceptId: 'a2-simple-vs-continuous', type: 'verb_form', prompt: 'This bag (belong) ___ to my sister.', points: 1, accepted: ['belongs'] },
  { id: 'a2sc-e26', conceptId: 'a2-simple-vs-continuous', type: 'choose_word', prompt: 'I ___ what you mean.', points: 1, options: ['see', 'am seeing', 'sees'], accepted: ['see'] },
  { id: 'a2sc-e27', conceptId: 'a2-simple-vs-continuous', type: 'choose_word', prompt: 'She ___ a shower right now.', points: 1, options: ['is having', 'has', 'is haveing'], accepted: ['is having'] },
  { id: 'a2sc-e28', conceptId: 'a2-simple-vs-continuous', type: 'word_order', prompt: 'Соберите: «Я предпочитаю чай кофе»', points: 1, bank: ['I', 'prefer', 'tea', 'to', 'coffee'], accepted: ['I prefer tea to coffee'] },
  { id: 'a2sc-e29', conceptId: 'a2-simple-vs-continuous', type: 'word_order', prompt: 'Соберите: «Сейчас он думает о работе»', points: 1, bank: ['he', 'is', 'thinking', 'about', 'work', 'now'], accepted: ['he is thinking about work now'] },
  { id: 'a2sc-e30', conceptId: 'a2-simple-vs-continuous', type: 'multi_gap', prompt: 'I ___ (need) help now, but she ___ (help) someone else at the moment.', points: 1, gaps: [{ accepted: ['need'] }, { accepted: ['is helping'] }] },

  // ---- добор: a2-going-to-will ----
  { id: 'a2gw-e21', conceptId: 'a2-going-to-will', type: 'translate_ru_en', prompt: 'Я встречаюсь с ней завтра в шесть.', points: 2, accepted: ["I'm meeting her tomorrow at six", 'I am meeting her tomorrow at six'] },
  { id: 'a2gw-e22', conceptId: 'a2-going-to-will', type: 'translate_ru_en', prompt: 'Думаю, завтра будет солнечно.', points: 2, accepted: ['I think it will be sunny tomorrow', "I think it'll be sunny tomorrow"] },
  { id: 'a2gw-e23', conceptId: 'a2-going-to-will', type: 'fill_gap', prompt: 'That bag looks heavy. I ___ help you with it.', points: 1, accepted: ['will', "'ll"] },
  { id: 'a2gw-e24', conceptId: 'a2-going-to-will', type: 'fill_gap', prompt: 'We ___ flying to Paris on Monday — the tickets are booked.', points: 1, accepted: ['are'] },
  { id: 'a2gw-e25', conceptId: 'a2-going-to-will', type: 'verb_form', prompt: 'I think she (pass) ___ the exam easily.', points: 1, accepted: ['will pass'] },
  { id: 'a2gw-e26', conceptId: 'a2-going-to-will', type: 'choose_word', prompt: 'I have an appointment — I ___ the dentist at 3 pm.', points: 1, options: ['am seeing', 'will see', 'see'], accepted: ['am seeing'] },
  { id: 'a2gw-e27', conceptId: 'a2-going-to-will', type: 'choose_word', prompt: '___ we go for a walk? The weather is lovely.', points: 1, options: ['Shall', 'Will', 'Are'], accepted: ['Shall'] },
  { id: 'a2gw-e28', conceptId: 'a2-going-to-will', type: 'word_order', prompt: 'Соберите: «Мы летим в Париж в понедельник»', points: 1, bank: ['we', 'are', 'flying', 'to', 'Paris', 'on', 'Monday'], accepted: ['we are flying to Paris on Monday'] },
  { id: 'a2gw-e29', conceptId: 'a2-going-to-will', type: 'word_order', prompt: 'Соберите: «Я думаю, тебе понравится этот фильм»', points: 1, bank: ['I', 'think', 'you', 'will', 'like', 'this', 'film'], accepted: ['I think you will like this film'] },
  { id: 'a2gw-e30', conceptId: 'a2-going-to-will', type: 'multi_gap', prompt: "Look at that car — it ___ (hit) the tree! Don't worry, I ___ (call) an ambulance.", points: 1, gaps: [{ accepted: ['is going to hit'] }, { accepted: ['will call', "'ll call"] }] },
];
