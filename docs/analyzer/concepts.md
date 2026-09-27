# Каталог грамматических концептов

Сгенерирован `npm run catalog` из контента. Руками не править.

contentVersion: 2
концептов: 46

Этот файл читает Claude в чате, когда размечает ошибки из расшифровки речи.
Ошибка, которой здесь нет соответствия, помечается `conceptId: null`.

- `pp-experience` — Опыт: ever/never. Present Perfect для опыта: have/has + V3. Факт «когда-либо в жизни», время не названо.
- `pp-just-already-yet` — just / already / yet: только что, уже, ещё. just, already, yet — слова-спутники Present Perfect, показывают позицию действия во времени.
- `pp-for-since` — for / since: длительность действия. for и since показывают длительность действия в Present Perfect.
- `psp-past-simple` — Past Simple: законченное время. Past Simple — законченное действие в законченном времени: V2 (или did + V1).
- `psp-contrast` — Контраст: Past Simple или Present Perfect. Выбор между Past Simple и Present Perfect:
- `cond-first` — First Conditional: if + Present, will. First Conditional — реальное условие в будущем: if + Present Simple, will + V1.
- `cond-second` — Second Conditional: if + Past, would. Second Conditional — воображаемая ситуация сейчас/в будущем: if + Past Simple, would + V1.
- `a1-be` — Глагол to be: am/is/are. Глагол to be (быть/являться) в Present Simple: am / is / are.
- `a1-present-simple` — Present Simple: утверждения и наречия частоты. Present Simple — обычные, регулярные действия и факты.
- `a1-ps-questions` — Present Simple: вопросы с do/does. Вопросы и отрицания в Present Simple образуются с помощью do/does (сам смысловой глагол остаётся в базовой форме).
- `a1-articles` — Артикли: a/an/the. Артикли a/an/the и нулевой артикль.
- `a1-plurals` — Множественное число, this/that — these/those. Множественное число существительных.
- `a1-possessives` — Притяжательные местоимения и 's. Притяжательные местоимения и притяжательный падеж.
- `a1-some-any` — some / any. some / any — неопределённое количество (с исчисляемыми во множественном числе и неисчисляемыми).
- `a1-can` — can / can't: умения и просьбы. can — модальный глагол: умение, возможность, просьба. После can — глагол в базовой форме, без to.
- `a1-there-is` — there is / there are. there is / there are — существование чего-либо (есть, имеется).
- `a2-was-were` — was / were. was/were — прошедшее время глагола to be (был/была/было/были).
- `a2-past-simple` — Past Simple: правильные и неправильные глаголы. Past Simple — законченное действие в прошлом, которое уже закончилось.
- `a2-past-questions` — Past Simple: вопросы с did. Вопросы и отрицания в Past Simple образуются с помощью did (для всех лиц), смысловой глагол — в базовой форме (went, не went-ed).
- `a2-present-continuous` — Present Continuous: действие сейчас. Present Continuous — действие, которое происходит сейчас, в момент речи.
- `a2-simple-vs-continuous` — Present Simple vs Present Continuous. Present Simple — обычные действия, привычки, факты (usually, every day). Present Continuous — действие прямо сейчас (now, at the moment).
- `a2-going-to-will` — Будущее: going to и will. going to — планы (уже решено) и предсказания по признакам, которые видны сейчас.
- `a2-comparative` — Сравнительная степень: -er / more, than, as...as. Сравнительная степень прилагательных — сравниваем два предмета.
- `a2-superlative` — Превосходная степень: the -est / most, too / enough. Превосходная степень — сравниваем предмет со всеми остальными в группе; всегда употребляется с the.
- `a2-countability` — Исчисляемые и неисчисляемые существительные. Исчисляемые существительные (countable) — можно посчитать, есть множественное число: one apple — two apples, a book — books.
- `a2-much-many` — much / many / a lot of, (a) few, (a) little. much — с неисчисляемыми (money, time, water); many — с исчисляемыми во множественном числе (books, people). a lot of — с обоими, более нейтрально и употребительно в утверждениях.
- `b1-past-continuous` — Past Continuous: was/were + V-ing. Past Continuous — действие в процессе в определённый момент прошлого; часто это фон для другого, более короткого действия.
- `b1-used-to` — used to: привычки в прошлом. used to + V1 — привычки и состояния в прошлом, которых больше нет (сейчас всё иначе).
- `b1-past-perfect` — Past Perfect: had + V3. Past Perfect (had + V3) — действие, которое произошло раньше другого прошедшего действия («прошлое в прошлом»).
- `b1-modals-obligation` — must / have to / should: обязанность и совет. must / have to — обязанность, необходимость.
- `b1-modals-possibility` — may / might / could: вероятность. may / might / could — вероятность, предположение (что-то, возможно, происходит или произойдёт).
- `b1-passive-present` — Passive Voice: am/is/are + V3. Passive Voice (present) — когда важнее действие или объект, а не тот, кто его совершает (или это неизвестно/неважно).
- `b1-passive-past` — Passive Voice: was/were + V3. Passive Voice (past) — was/were + V3; используется для фактов и событий в прошлом, когда важен результат, а не исполнитель.
- `b1-gerund-infinitive` — Gerund vs Infinitive: -ing или to + verb. После некоторых глаголов следующий глагол всегда стоит в форме герундия (-ing): enjoy, avoid, finish, mind, keep...
- `b1-verb-prepositions` — Verb / adjective + preposition + -ing. После прилагательных и глаголов с предлогом (at, in, of, to...) следующий глагол всегда в форме герундия (-ing), а не в инфинитиве:
- `b1-relative-who-which` — who / which / that: относительные придаточные. Относительные придаточные уточняют, о ком или о чём идёт речь.
- `b1-relative-where-whose` — where / whose: место и принадлежность. where — вводит придаточное о МЕСТЕ, заменяет «in/at which»:
- `b2-third-conditional` — Third Conditional: if + Past Perfect, would have + V3. Third Conditional — нереальное условие в прошлом: то, что не произошло, и его нереальный результат тоже в прошлом (сожаление, упущенная возможность).
- `b2-mixed-conditional` — Mixed Conditional: смешанные времена. Mixed Conditional — «смешанное» условие: условие и результат относятся к разным временам.
- `b2-wish` — wish / if only: сожаление и раздражение. wish — сожаление о том, что что-то не так, как хотелось бы.
- `b2-passive-advanced` — Passive Voice (продвинутый уровень): перфект, будущее, модальные глаголы. Passive Voice — продвинутые времена и конструкции: перфект, будущее, модальные глаголы, продолженное время.
- `b2-causative` — Causative: have/get something done. Causative (have/get something done) — говорим, что действие для нас выполняет кто-то другой (не мы сами).
- `b2-reported-statements` — Reported statements: сдвиг времён, said vs told. Косвенная речь (reported speech) — передаём чужие слова своими: He said (that) he was tired. Союз that можно опускать.
- `b2-reported-questions` — Reported questions и просьбы: asked if/whether, asked/told + to-инфинитив. Косвенные вопросы (reported questions) — прямой порядок слов, как в утверждении: без do/does/did и без инверсии.
- `b2-deduction-past` — Дедукция о прошлом: must have / can't have / might have + V3. Модальный глагол + have + V3 — вывод о прошлом по имеющимся уликам.
- `b2-should-have` — Сожаление и упрёк: should have / shouldn't have / could have + V3. should have + V3 — упрёк или сожаление: надо было сделать, но не сделали.
