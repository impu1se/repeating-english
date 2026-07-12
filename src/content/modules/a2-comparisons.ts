import type { Module, Concept, Exercise } from '../../types';

export const module: Module = {
  id: 'a2-comparisons',
  title: 'Сравнения: сравнительная и превосходная степень',
  level: 'A2',
  masteryThreshold: 50,
  conceptIds: ['a2-comparative', 'a2-superlative'],
};

export const concepts: Concept[] = [
  {
    id: 'a2-comparative',
    moduleId: 'a2-comparisons',
    title: 'Сравнительная степень: -er / more, than, as...as',
    kind: 'grammar',
    theory:
      "Сравнительная степень прилагательных — сравниваем два предмета.\nКороткие прилагательные (1 слог, некоторые 2-сложные) + -er: tall → taller, big → bigger (удвоение согласной), happy → happier (y → i).\nДлинные прилагательные (2+ слога) — more + прилагательное: more interesting, more expensive.\nСравнение вводится словом than:\n• This book is more interesting than that one. My car is faster than yours.\nРавенство — as...as (такой же, как); неравенство — not as...as (не такой, как):\n• She is as tall as her brother. This test isn't as difficult as the last one.\nИсключения (неправильная форма): good → better, bad → worse, far → farther/further.\n• This coffee is better than the last one. The situation is worse than we thought.",
    exerciseIds: [
      'a2cm-e1', 'a2cm-e2', 'a2cm-e3', 'a2cm-e4', 'a2cm-e5',
      'a2cm-e6', 'a2cm-e7', 'a2cm-e8', 'a2cm-e9', 'a2cm-e10',
      'a2cm-e11', 'a2cm-e12', 'a2cm-e13', 'a2cm-e14', 'a2cm-e15',
      'a2cm-e16', 'a2cm-e17', 'a2cm-e18', 'a2cm-e19', 'a2cm-e20',
    ],
  },
  {
    id: 'a2-superlative',
    moduleId: 'a2-comparisons',
    title: 'Превосходная степень: the -est / most, too / enough',
    kind: 'grammar',
    theory:
      "Превосходная степень — сравниваем предмет со всеми остальными в группе; всегда употребляется с the.\nКороткие прилагательные + the ...-est, длинные — the most + прилагательное:\n• the tallest student, the biggest city, the most expensive car, the most interesting book.\nГруппа указывается словами in / of:\n• the tallest student in my class; the most expensive car of all.\nИсключения: good → the best, bad → the worst, far → the farthest/furthest.\ntoo + прилагательное — слишком, больше чем нужно (проблема):\n• This bag is too heavy — I can't carry it.\nприлагательное + enough — достаточно (норма или предел):\n• She isn't tall enough to reach the shelf. This coffee is hot enough.",
    exerciseIds: [
      'a2sp-e1', 'a2sp-e2', 'a2sp-e3', 'a2sp-e4', 'a2sp-e5',
      'a2sp-e6', 'a2sp-e7', 'a2sp-e8', 'a2sp-e9', 'a2sp-e10',
      'a2sp-e11', 'a2sp-e12', 'a2sp-e13', 'a2sp-e14', 'a2sp-e15',
      'a2sp-e16', 'a2sp-e17', 'a2sp-e18', 'a2sp-e19', 'a2sp-e20',
    ],
  },
];

export const exercises: Exercise[] = [
  // ============ a2-comparative ============
  // --- translate_ru_en ---
  { id: 'a2cm-e1', conceptId: 'a2-comparative', type: 'translate_ru_en', prompt: 'Этот дом больше, чем тот.', points: 2, accepted: ['This house is bigger than that one'] },
  { id: 'a2cm-e2', conceptId: 'a2-comparative', type: 'translate_ru_en', prompt: 'Это упражнение более сложное, чем предыдущее.', points: 2, accepted: ['This exercise is more difficult than the previous one', 'This exercise is more difficult than the last one'] },
  { id: 'a2cm-e3', conceptId: 'a2-comparative', type: 'translate_ru_en', prompt: 'Она такая же высокая, как её брат.', points: 2, accepted: ['She is as tall as her brother', "She's as tall as her brother"] },
  { id: 'a2cm-e4', conceptId: 'a2-comparative', type: 'translate_ru_en', prompt: 'Погода сегодня хуже, чем вчера.', points: 2, accepted: ['The weather is worse today than yesterday', 'The weather today is worse than yesterday'] },
  // --- fill_gap ---
  { id: 'a2cm-e5', conceptId: 'a2-comparative', type: 'fill_gap', prompt: 'My new phone is much ___ than my old one — the camera and battery are great.', points: 1, accepted: ['better'] },
  { id: 'a2cm-e6', conceptId: 'a2-comparative', type: 'fill_gap', prompt: 'This exercise is ___ than the last one — I finished it in five minutes without any mistakes.', points: 1, accepted: ['easier'] },
  { id: 'a2cm-e7', conceptId: 'a2-comparative', type: 'fill_gap', prompt: 'Her flat is ___ than mine — she has three rooms and I only have one.', points: 1, accepted: ['bigger'] },
  // --- verb_form ---
  { id: 'a2cm-e8', conceptId: 'a2-comparative', type: 'verb_form', prompt: 'This road is (long) ___ than that one.', points: 1, accepted: ['longer'] },
  { id: 'a2cm-e9', conceptId: 'a2-comparative', type: 'verb_form', prompt: 'Health is (important) ___ than money.', points: 1, accepted: ['more important'] },
  { id: 'a2cm-e10', conceptId: 'a2-comparative', type: 'verb_form', prompt: 'Today the traffic is (bad) ___ than yesterday.', points: 1, accepted: ['worse'] },
  // --- choose_word ---
  { id: 'a2cm-e11', conceptId: 'a2-comparative', type: 'choose_word', prompt: 'This bag is ___ than that one.', points: 1, options: ['heavier', 'more heavy', 'heaviest'], accepted: ['heavier'] },
  { id: 'a2cm-e12', conceptId: 'a2-comparative', type: 'choose_word', prompt: 'My sister is ___ than me.', points: 1, options: ['more intelligent', 'intelligenter', 'intelligent'], accepted: ['more intelligent'] },
  { id: 'a2cm-e13', conceptId: 'a2-comparative', type: 'choose_word', prompt: 'This film is ___ than the book.', points: 1, options: ['better', 'more good', 'gooder'], accepted: ['better'] },
  { id: 'a2cm-e14', conceptId: 'a2-comparative', type: 'choose_word', prompt: 'She runs ___ than her brother.', points: 1, options: ['faster', 'more fast', 'fastest'], accepted: ['faster'] },
  // --- word_order ---
  { id: 'a2cm-e15', conceptId: 'a2-comparative', type: 'word_order', prompt: 'Соберите: «Этот стол дешевле, чем тот»', points: 1, bank: ['this', 'table', 'is', 'cheaper', 'than', 'that', 'one'], accepted: ['this table is cheaper than that one'] },
  { id: 'a2cm-e16', conceptId: 'a2-comparative', type: 'word_order', prompt: 'Соберите: «Она не такая высокая, как я»', points: 1, bank: ['she', 'is', 'not', 'as', 'tall', 'as', 'me'], accepted: ['she is not as tall as me'] },
  { id: 'a2cm-e17', conceptId: 'a2-comparative', type: 'word_order', prompt: 'Соберите: «Эта работа более интересная, чем предыдущая»', points: 1, bank: ['this', 'job', 'is', 'more', 'interesting', 'than', 'the', 'last', 'one'], accepted: ['this job is more interesting than the last one'] },
  // --- multi_gap ---
  { id: 'a2cm-e18', conceptId: 'a2-comparative', type: 'multi_gap', prompt: 'This car is ___ (fast) than mine, but it is ___ (expensive) too.', points: 1, gaps: [{ accepted: ['faster'] }, { accepted: ['more expensive'] }] },
  { id: 'a2cm-e19', conceptId: 'a2-comparative', type: 'multi_gap', prompt: "Today's weather is ___ (good) than yesterday's, but it's ___ (bad) than last week's.", points: 1, gaps: [{ accepted: ['better'] }, { accepted: ['worse'] }] },
  { id: 'a2cm-e20', conceptId: 'a2-comparative', type: 'multi_gap', prompt: 'My new laptop is ___ (light) than my old one, and it is ___ (quiet) too.', points: 1, gaps: [{ accepted: ['lighter'] }, { accepted: ['quieter'] }] },

  // ============ a2-superlative ============
  // --- translate_ru_en ---
  { id: 'a2sp-e1', conceptId: 'a2-superlative', type: 'translate_ru_en', prompt: 'Это самый высокий дом в городе.', points: 2, accepted: ['This is the tallest building in the city', 'This is the tallest house in the city'] },
  { id: 'a2sp-e2', conceptId: 'a2-superlative', type: 'translate_ru_en', prompt: 'Он самый умный студент в классе.', points: 2, accepted: ['He is the most intelligent student in the class', 'He is the smartest student in the class', "He's the most intelligent student in the class", "He's the smartest student in the class"] },
  { id: 'a2sp-e3', conceptId: 'a2-superlative', type: 'translate_ru_en', prompt: 'Эта сумка слишком тяжёлая — я не могу её нести.', points: 2, accepted: ["This bag is too heavy — I can't carry it", 'This bag is too heavy — I cannot carry it'] },
  { id: 'a2sp-e4', conceptId: 'a2-superlative', type: 'translate_ru_en', prompt: 'Она недостаточно высокая, чтобы достать полку.', points: 2, accepted: ["She isn't tall enough to reach the shelf", 'She is not tall enough to reach the shelf', "She's not tall enough to reach the shelf"] },
  // --- fill_gap ---
  { id: 'a2sp-e5', conceptId: 'a2-superlative', type: 'fill_gap', prompt: "This is ___ film I've ever seen — I loved every minute of it.", points: 1, accepted: ['the best'] },
  { id: 'a2sp-e6', conceptId: 'a2-superlative', type: 'fill_gap', prompt: 'This soup is ___ to eat now — it was too hot five minutes ago.', points: 1, accepted: ['cool enough', 'warm enough'] },
  { id: 'a2sp-e7', conceptId: 'a2-superlative', type: 'fill_gap', prompt: 'This suitcase is ___ for me to carry — I need help.', points: 1, accepted: ['too heavy'] },
  // --- verb_form ---
  { id: 'a2sp-e8', conceptId: 'a2-superlative', type: 'verb_form', prompt: 'This is the (interesting) ___ museum in the city.', points: 1, accepted: ['most interesting'] },
  { id: 'a2sp-e9', conceptId: 'a2-superlative', type: 'verb_form', prompt: 'That was the (bad) ___ film of the year.', points: 1, accepted: ['worst'] },
  { id: 'a2sp-e10', conceptId: 'a2-superlative', type: 'verb_form', prompt: 'She is the (young) ___ person in our team.', points: 1, accepted: ['youngest'] },
  // --- choose_word ---
  { id: 'a2sp-e11', conceptId: 'a2-superlative', type: 'choose_word', prompt: 'This is ___ mountain in the world.', points: 1, options: ['the highest', 'highest', 'the most high'], accepted: ['the highest'] },
  { id: 'a2sp-e12', conceptId: 'a2-superlative', type: 'choose_word', prompt: 'He is ___ student in the class.', points: 1, options: ['the most talented', 'the talentedest', 'most talented'], accepted: ['the most talented'] },
  { id: 'a2sp-e13', conceptId: 'a2-superlative', type: 'choose_word', prompt: 'This shirt is ___ for me — I need a bigger size.', points: 1, options: ['too small', 'small enough', 'too much small'], accepted: ['too small'] },
  { id: 'a2sp-e14', conceptId: 'a2-superlative', type: 'choose_word', prompt: 'The pool looks cold. Is the water ___ to swim in?', points: 1, options: ['warm enough', 'enough warm', 'too warm'], accepted: ['warm enough'] },
  // --- word_order ---
  { id: 'a2sp-e15', conceptId: 'a2-superlative', type: 'word_order', prompt: 'Соберите: «Это самая интересная книга в моей коллекции»', points: 1, bank: ['this', 'is', 'the', 'most', 'interesting', 'book', 'in', 'my', 'collection'], accepted: ['this is the most interesting book in my collection', 'in my collection this is the most interesting book'] },
  { id: 'a2sp-e16', conceptId: 'a2-superlative', type: 'word_order', prompt: 'Соберите: «Эта сумка слишком тяжёлая для меня»', points: 1, bank: ['this', 'bag', 'is', 'too', 'heavy', 'for', 'me'], accepted: ['this bag is too heavy for me'] },
  { id: 'a2sp-e17', conceptId: 'a2-superlative', type: 'word_order', prompt: 'Соберите: «Он достаточно взрослый, чтобы водить машину»', points: 1, bank: ['he', 'is', 'old', 'enough', 'to', 'drive'], accepted: ['he is old enough to drive'] },
  // --- multi_gap ---
  { id: 'a2sp-e18', conceptId: 'a2-superlative', type: 'multi_gap', prompt: "This is ___ (good) restaurant in town, but it's also ___ (expensive).", points: 1, gaps: [{ accepted: ['the best'] }, { accepted: ['the most expensive'] }] },
  { id: 'a2sp-e19', conceptId: 'a2-superlative', type: 'multi_gap', prompt: 'This soup is ___ (hot) to eat right now, but it will be ___ (cool) in a few minutes.', points: 1, gaps: [{ accepted: ['too hot'] }, { accepted: ['cool enough'] }] },
  { id: 'a2sp-e20', conceptId: 'a2-superlative', type: 'multi_gap', prompt: 'She is ___ (young) person in the office, but she is ___ (experienced) of all the managers.', points: 1, gaps: [{ accepted: ['the youngest'] }, { accepted: ['the most experienced'] }] },
];
