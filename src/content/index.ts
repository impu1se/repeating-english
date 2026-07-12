import type { Content } from '../types';
import { validateContent } from './schema';
import * as presentPerfect from './modules/present-perfect';
import * as vocabA2 from './modules/vocab-a2';
import * as pastVsPerfect from './modules/past-vs-perfect';
import * as conditionals from './modules/conditionals';
import * as vocabB1WorkPhrasal from './modules/vocab-b1-work-phrasal';
import * as a1BePresentSimple from './modules/a1-be-present-simple';
import * as a1NounsArticles from './modules/a1-nouns-articles';
import * as a1Basics from './modules/a1-basics';
import * as a2Past from './modules/a2-past';
import * as a2ContinuousFuture from './modules/a2-continuous-future';
import * as a2Comparisons from './modules/a2-comparisons';
import * as a2Quantity from './modules/a2-quantity';
import * as b1PastTenses from './modules/b1-past-tenses';
import * as b1Modals from './modules/b1-modals';
import * as b1Passive from './modules/b1-passive';

// version is bumped ONLY on breaking changes to existing concepts/exercises —
// bump on breaking-изменения; порог 5→50 — breaking.
export const content: Content = {
  version: '2',
  modules: [
    presentPerfect.module,
    pastVsPerfect.module,
    conditionals.module,
    vocabA2.module,
    vocabB1WorkPhrasal.module,
    a1BePresentSimple.module,
    a1NounsArticles.module,
    a1Basics.module,
    a2Past.module,
    a2ContinuousFuture.module,
    a2Comparisons.module,
    a2Quantity.module,
    b1PastTenses.module,
    b1Modals.module,
    b1Passive.module,
  ],
  concepts: [
    ...presentPerfect.concepts,
    ...pastVsPerfect.concepts,
    ...conditionals.concepts,
    ...vocabA2.concepts,
    ...vocabB1WorkPhrasal.concepts,
    ...a1BePresentSimple.concepts,
    ...a1NounsArticles.concepts,
    ...a1Basics.concepts,
    ...a2Past.concepts,
    ...a2ContinuousFuture.concepts,
    ...a2Comparisons.concepts,
    ...a2Quantity.concepts,
    ...b1PastTenses.concepts,
    ...b1Modals.concepts,
    ...b1Passive.concepts,
  ],
  exercises: [
    ...presentPerfect.exercises,
    ...pastVsPerfect.exercises,
    ...conditionals.exercises,
    ...vocabA2.exercises,
    ...vocabB1WorkPhrasal.exercises,
    ...a1BePresentSimple.exercises,
    ...a1NounsArticles.exercises,
    ...a1Basics.exercises,
    ...a2Past.exercises,
    ...a2ContinuousFuture.exercises,
    ...a2Comparisons.exercises,
    ...a2Quantity.exercises,
    ...b1PastTenses.exercises,
    ...b1Modals.exercises,
    ...b1Passive.exercises,
  ],
};

const errors = validateContent(content);
if (errors.length > 0) console.error('Content validation failed:', errors);
