import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'present-perfect',
  title: 'Present Perfect',
  level: 'B1',
  masteryThreshold: 50,
  conceptIds: ['pp-experience', 'pp-just-already-yet', 'pp-for-since'],
};

export const concepts: Concept[] = [
  {
    id: 'pp-experience',
    moduleId: 'present-perfect',
    title: 'Опыт: ever/never',
    kind: 'grammar',
    theory: 'Present Perfect для опыта: have/has + V3. Факт «когда-либо в жизни», время не названо.\n• Have you ever been to London? — Ты когда-нибудь был в Лондоне?\n• I have never seen this film. — Я никогда не видел этот фильм.\never — «когда-нибудь» (вопросы), never — «никогда» (отрицание без not).\nЕсли время названо (yesterday, in 2020) — это уже Past Simple.\nСо словом ever превосходная степень тоже требует Present Perfect: the best film I have ever seen.',
    exerciseIds: [
      'pp-e1', 'pp-e2', 'pp-e3', 'pp-e4', 'pp-e5', 'pp-e6',
      'pp-e7', 'pp-e8', 'pp-e9', 'pp-e10', 'pp-e11', 'pp-e12', 'pp-e13', 'pp-e14',
      'pp-e15', 'pp-e16', 'pp-e17', 'pp-e18', 'pp-e19', 'pp-e20',
    ],
  },
  {
    id: 'pp-just-already-yet',
    moduleId: 'present-perfect',
    title: 'just / already / yet: только что, уже, ещё',
    kind: 'grammar',
    theory: "just, already, yet — слова-спутники Present Perfect, показывают позицию действия во времени.\n• just («только что») — между have/has и V3: I have just finished my homework. — Я только что закончил домашнее задание.\n• already («уже») — тоже между have/has и V3, в утверждениях: She has already left. — Она уже ушла.\n• yet («ещё», «уже») — в конце предложения, в вопросах и отрицаниях: Have you finished yet? I haven't finished yet.\nyet не используется в утвердительных предложениях.\nalready в вопросах звучит как удивление: Have you finished already?\nalready может стоять и в конце: I've done it already.",
    exerciseIds: [
      'pja-e1', 'pja-e2', 'pja-e3', 'pja-e4', 'pja-e5', 'pja-e6', 'pja-e7',
      'pja-e8', 'pja-e9', 'pja-e10', 'pja-e11', 'pja-e12', 'pja-e13', 'pja-e14',
      'pja-e15', 'pja-e16', 'pja-e17', 'pja-e18', 'pja-e19', 'pja-e20',
    ],
  },
  {
    id: 'pp-for-since',
    moduleId: 'present-perfect',
    title: 'for / since: длительность действия',
    kind: 'grammar',
    theory: 'for и since показывают длительность действия в Present Perfect.\n• for + период времени (сколько): for two years, for a week, for a long time.\n• since + точка отсчёта (с какого момента): since 2020, since Monday, since I was a child.\n• I have lived here for five years. — Я живу здесь уже пять лет.\n• She has worked here since 2018. — Она работает здесь с 2018 года.\nHow long…? — вопрос о длительности: How long have you known him? — For three years. / Since university.\nС глаголами live, work, know, have (обладание) используем Present Perfect, если действие длится до сих пор, а не Present Simple.',
    exerciseIds: [
      'pfs-e1', 'pfs-e2', 'pfs-e3', 'pfs-e4', 'pfs-e5', 'pfs-e6', 'pfs-e7',
      'pfs-e8', 'pfs-e9', 'pfs-e10', 'pfs-e11', 'pfs-e12', 'pfs-e13', 'pfs-e14',
      'pfs-e15', 'pfs-e16', 'pfs-e17', 'pfs-e18', 'pfs-e19', 'pfs-e20',
    ],
  },
];

export const exercises: Exercise[] = [
  { id: 'pp-e1', conceptId: 'pp-experience', type: 'translate_ru_en', prompt: 'Ты когда-нибудь был в Лондоне?', points: 2, accepted: ['Have you ever been to London?', 'Have you ever been in London?'] },
  { id: 'pp-e2', conceptId: 'pp-experience', type: 'translate_ru_en', prompt: 'Я никогда не видел этот фильм.', points: 2, accepted: ['I have never seen this film', "I haven't seen this film", 'I have never watched this movie'] },
  { id: 'pp-e3', conceptId: 'pp-experience', type: 'fill_gap', prompt: 'Have you ever ___ sushi?', points: 1, accepted: ['eaten', 'had'] },
  { id: 'pp-e4', conceptId: 'pp-experience', type: 'verb_form', prompt: 'She has never (be) ___ abroad.', points: 1, accepted: ['been'] },
  { id: 'pp-e5', conceptId: 'pp-experience', type: 'choose_word', prompt: 'I have ___ been to Paris.', points: 1, options: ['ever', 'never', 'yet'], accepted: ['never'] },
  { id: 'pp-e6', conceptId: 'pp-experience', type: 'word_order', prompt: 'Соберите: «Ты когда-нибудь пробовал суши?»', points: 1, bank: ['have', 'you', 'ever', 'tried', 'sushi'], accepted: ['have you ever tried sushi'] },
  // --- pp-experience: extension (superlative + ever, more ever/never variety) ---
  { id: 'pp-e7', conceptId: 'pp-experience', type: 'translate_ru_en', prompt: 'Это лучший фильм, который я когда-либо смотрел.', points: 2, accepted: ['This is the best film I have ever seen', "This is the best film I've ever seen", 'This is the best movie I have ever seen', "This is the best movie I've ever seen"] },
  { id: 'pp-e8', conceptId: 'pp-experience', type: 'translate_ru_en', prompt: 'Это самая вкусная пицца, которую я когда-либо пробовал.', points: 2, accepted: ['This is the most delicious pizza I have ever tried', "This is the most delicious pizza I've ever tried", 'This is the most delicious pizza I have ever had', "This is the most delicious pizza I've ever had"] },
  { id: 'pp-e9', conceptId: 'pp-experience', type: 'fill_gap', prompt: 'This is the most interesting book I have ever ___.', points: 1, accepted: ['read'] },
  { id: 'pp-e10', conceptId: 'pp-experience', type: 'fill_gap', prompt: 'He is the kindest person I have ever ___.', points: 1, accepted: ['met', 'known'] },
  { id: 'pp-e11', conceptId: 'pp-experience', type: 'verb_form', prompt: 'This is the worst film I have ever (see) ___.', points: 1, accepted: ['seen'] },
  { id: 'pp-e12', conceptId: 'pp-experience', type: 'verb_form', prompt: 'She is the best teacher I have ever (have) ___.', points: 1, accepted: ['had'] },
  { id: 'pp-e13', conceptId: 'pp-experience', type: 'choose_word', prompt: 'This is the best coffee I have ___ tasted.', points: 1, options: ['ever', 'never', 'yet'], accepted: ['ever'] },
  { id: 'pp-e14', conceptId: 'pp-experience', type: 'choose_word', prompt: "It's the most boring lecture I've ___ attended.", points: 1, options: ['ever', 'never', 'yet'], accepted: ['ever'] },
  { id: 'pp-e15', conceptId: 'pp-experience', type: 'choose_word', prompt: '___ you ever eaten octopus?', points: 1, options: ['Have', 'Has', 'Did'], accepted: ['Have'] },
  { id: 'pp-e16', conceptId: 'pp-experience', type: 'word_order', prompt: 'Соберите: «Это самая длинная книга, которую я когда-либо читал»', points: 1, bank: ['this', 'is', 'the', 'longest', 'book', 'i', 'have', 'ever', 'read'], accepted: ['this is the longest book i have ever read'] },
  { id: 'pp-e17', conceptId: 'pp-experience', type: 'word_order', prompt: 'Соберите: «Он никогда не летал на самолёте»', points: 1, bank: ['he', 'has', 'never', 'flown', 'on', 'a', 'plane'], accepted: ['he has never flown on a plane'] },
  { id: 'pp-e18', conceptId: 'pp-experience', type: 'multi_gap', prompt: 'I ___ (try) Indian food, but I have never ___ (try) Thai food.', points: 1, gaps: [{ accepted: ['have tried', "'ve tried"] }, { accepted: ['tried'] }] },
  { id: 'pp-e19', conceptId: 'pp-experience', type: 'multi_gap', prompt: 'This is the best trip I have ever ___ (have), and it is also the most expensive one I have ever ___ (book).', points: 1, gaps: [{ accepted: ['had'] }, { accepted: ['booked'] }] },
  { id: 'pp-e20', conceptId: 'pp-experience', type: 'multi_gap', prompt: 'Have you ever ___ (climb) a mountain, or ___ (swim) in the ocean?', points: 1, gaps: [{ accepted: ['climbed'] }, { accepted: ['swum'] }] },

  // ============ pp-just-already-yet ============
  // --- translate_ru_en ---
  { id: 'pja-e1', conceptId: 'pp-just-already-yet', type: 'translate_ru_en', prompt: 'Я только что закончил домашнее задание.', points: 2, accepted: ['I have just finished my homework', "I've just finished my homework", 'I have just done my homework', "I've just done my homework"] },
  { id: 'pja-e2', conceptId: 'pp-just-already-yet', type: 'translate_ru_en', prompt: 'Она уже ушла.', points: 2, accepted: ['She has already left', "She's already left", 'She has left already', "She's left already"] },
  { id: 'pja-e3', conceptId: 'pp-just-already-yet', type: 'translate_ru_en', prompt: 'Ты уже поел?', points: 2, accepted: ['Have you eaten yet?', 'Have you already eaten?', 'Have you eaten already?'] },
  { id: 'pja-e4', conceptId: 'pp-just-already-yet', type: 'translate_ru_en', prompt: 'Мы ещё не решили.', points: 2, accepted: ["We haven't decided yet", 'We have not decided yet', "We haven't made a decision yet"] },
  // --- fill_gap ---
  { id: 'pja-e5', conceptId: 'pp-just-already-yet', type: 'fill_gap', prompt: 'I have just ___ my coffee.', points: 1, accepted: ['finished', 'had', 'drunk'] },
  { id: 'pja-e6', conceptId: 'pp-just-already-yet', type: 'fill_gap', prompt: "She hasn't called me ___.", points: 1, accepted: ['yet'] },
  { id: 'pja-e7', conceptId: 'pp-just-already-yet', type: 'fill_gap', prompt: "You've ___ eaten all the cake? That was fast!", points: 1, accepted: ['already', 'just'] },
  // --- verb_form ---
  { id: 'pja-e8', conceptId: 'pp-just-already-yet', type: 'verb_form', prompt: 'I have just (finish) ___ my lunch.', points: 1, accepted: ['finished'] },
  { id: 'pja-e9', conceptId: 'pp-just-already-yet', type: 'verb_form', prompt: 'She has already (leave) ___ the office.', points: 1, accepted: ['left'] },
  { id: 'pja-e10', conceptId: 'pp-just-already-yet', type: 'verb_form', prompt: 'Have you (do) ___ your homework yet?', points: 1, accepted: ['done'] },
  // --- choose_word ---
  { id: 'pja-e11', conceptId: 'pp-just-already-yet', type: 'choose_word', prompt: 'I have ___ finished my work.', points: 1, options: ['just', 'yet', 'ever'], accepted: ['just'] },
  { id: 'pja-e12', conceptId: 'pp-just-already-yet', type: 'choose_word', prompt: '___ you finished your homework yet?', points: 1, options: ['Have', 'Has', 'Did'], accepted: ['Have'] },
  { id: 'pja-e13', conceptId: 'pp-just-already-yet', type: 'choose_word', prompt: "She hasn't replied to my email ___.", points: 1, options: ['yet', 'already', 'just'], accepted: ['yet'] },
  { id: 'pja-e14', conceptId: 'pp-just-already-yet', type: 'choose_word', prompt: "Guess what? I've ___ won the lottery!", points: 1, options: ['just', 'yet', 'never'], accepted: ['just'] },
  // --- word_order ---
  { id: 'pja-e15', conceptId: 'pp-just-already-yet', type: 'word_order', prompt: 'Соберите: «Я только что закончил отчёт»', points: 1, bank: ['i', 'have', 'just', 'finished', 'the', 'report'], accepted: ['i have just finished the report'] },
  { id: 'pja-e16', conceptId: 'pp-just-already-yet', type: 'word_order', prompt: 'Соберите: «Она уже видела этот фильм»', points: 1, bank: ['she', 'has', 'already', 'seen', 'this', 'film'], accepted: ['she has already seen this film', 'she has seen this film already'] },
  { id: 'pja-e17', conceptId: 'pp-just-already-yet', type: 'word_order', prompt: 'Соберите: «Ты уже пообедал?»', points: 1, bank: ['have', 'you', 'had', 'lunch', 'yet'], accepted: ['have you had lunch yet'] },
  // --- multi_gap ---
  { id: 'pja-e18', conceptId: 'pp-just-already-yet', type: 'multi_gap', prompt: "I have just ___ (wake) up, so I haven't ___ (have) breakfast yet.", points: 1, gaps: [{ accepted: ['woken'] }, { accepted: ['had'] }] },
  { id: 'pja-e19', conceptId: 'pp-just-already-yet', type: 'multi_gap', prompt: "She has already ___ (finish) her exams, but she hasn't ___ (get) her results yet.", points: 1, gaps: [{ accepted: ['finished'] }, { accepted: ['got', 'gotten'] }] },
  { id: 'pja-e20', conceptId: 'pp-just-already-yet', type: 'multi_gap', prompt: '___ you ___ (finish) the report yet?', points: 1, gaps: [{ accepted: ['have'] }, { accepted: ['finished'] }] },

  // ============ pp-for-since ============
  // --- translate_ru_en ---
  { id: 'pfs-e1', conceptId: 'pp-for-since', type: 'translate_ru_en', prompt: 'Я живу здесь уже пять лет.', points: 2, accepted: ['I have lived here for five years', "I've lived here for five years", 'I have been living here for five years', "I've been living here for five years"] },
  { id: 'pfs-e2', conceptId: 'pp-for-since', type: 'translate_ru_en', prompt: 'Она работает здесь с 2018 года.', points: 2, accepted: ['She has worked here since 2018', "She's worked here since 2018", 'She has been working here since 2018', "She's been working here since 2018"] },
  { id: 'pfs-e3', conceptId: 'pp-for-since', type: 'translate_ru_en', prompt: 'Как долго ты его знаешь?', points: 2, accepted: ['How long have you known him?', 'For how long have you known him?', 'How long have you known him for?'] },
  { id: 'pfs-e4', conceptId: 'pp-for-since', type: 'translate_ru_en', prompt: 'Мы не виделись с прошлого понедельника.', points: 2, accepted: ["We haven't seen each other since last Monday", 'We have not seen each other since last Monday', "We haven't seen one another since last Monday"] },
  // --- fill_gap ---
  { id: 'pfs-e5', conceptId: 'pp-for-since', type: 'fill_gap', prompt: 'I have known her ___ ten years.', points: 1, accepted: ['for'] },
  { id: 'pfs-e6', conceptId: 'pp-for-since', type: 'fill_gap', prompt: 'He has lived in Paris ___ he was a child.', points: 1, accepted: ['since'] },
  { id: 'pfs-e7', conceptId: 'pp-for-since', type: 'fill_gap', prompt: 'How long have you ___ this car?', points: 1, accepted: ['had', 'owned'] },
  // --- verb_form ---
  { id: 'pfs-e8', conceptId: 'pp-for-since', type: 'verb_form', prompt: 'I (know) ___ him for ten years.', points: 1, accepted: ['have known', "'ve known"] },
  { id: 'pfs-e9', conceptId: 'pp-for-since', type: 'verb_form', prompt: 'They (be) ___ married since 2015.', points: 1, accepted: ['have been', "'ve been"] },
  { id: 'pfs-e10', conceptId: 'pp-for-since', type: 'verb_form', prompt: 'She (not see) ___ him since last year.', points: 1, accepted: ["hasn't seen", 'has not seen'] },
  // --- choose_word ---
  { id: 'pfs-e11', conceptId: 'pp-for-since', type: 'choose_word', prompt: 'I have lived here ___ ten years.', points: 1, options: ['for', 'since', 'during'], accepted: ['for'] },
  { id: 'pfs-e12', conceptId: 'pp-for-since', type: 'choose_word', prompt: 'I have lived here ___ 2015.', points: 1, options: ['since', 'for', 'from'], accepted: ['since'] },
  { id: 'pfs-e13', conceptId: 'pp-for-since', type: 'choose_word', prompt: '___ long have you known each other?', points: 1, options: ['How', 'What', 'Since'], accepted: ['How'] },
  { id: 'pfs-e14', conceptId: 'pp-for-since', type: 'choose_word', prompt: 'We ___ known each other since school.', points: 1, options: ['have', 'has', 'had'], accepted: ['have'] },
  // --- word_order ---
  { id: 'pfs-e15', conceptId: 'pp-for-since', type: 'word_order', prompt: 'Соберите: «Я знаю его пять лет»', points: 1, bank: ['i', 'have', 'known', 'him', 'for', 'five', 'years'], accepted: ['i have known him for five years'] },
  { id: 'pfs-e16', conceptId: 'pp-for-since', type: 'word_order', prompt: 'Соберите: «Она живёт в Лондоне с 2019 года»', points: 1, bank: ['she', 'has', 'lived', 'in', 'london', 'since', '2019'], accepted: ['she has lived in london since 2019'] },
  { id: 'pfs-e17', conceptId: 'pp-for-since', type: 'word_order', prompt: 'Соберите: «Как долго вы женаты?»', points: 1, bank: ['how', 'long', 'have', 'you', 'been', 'married'], accepted: ['how long have you been married'] },
  // --- multi_gap ---
  { id: 'pfs-e18', conceptId: 'pp-for-since', type: 'multi_gap', prompt: 'I have lived here ___ ten years, but my brother has lived here ___ 2010.', points: 1, gaps: [{ accepted: ['for'] }, { accepted: ['since'] }] },
  { id: 'pfs-e19', conceptId: 'pp-for-since', type: 'multi_gap', prompt: 'She ___ (work) here since 2019, and she ___ (know) her boss for six years.', points: 1, gaps: [{ accepted: ['has worked', "'s worked", 'has been working'] }, { accepted: ['has known', "'s known"] }] },
  { id: 'pfs-e20', conceptId: 'pp-for-since', type: 'multi_gap', prompt: 'How long have you ___ (know) your neighbours, and how long have you ___ (live) in this city?', points: 1, gaps: [{ accepted: ['known'] }, { accepted: ['lived'] }] },
];
