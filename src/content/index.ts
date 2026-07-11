import type { Content } from '../types';
import { validateContent } from './schema';
import * as presentPerfect from './modules/present-perfect';
import * as vocabA2 from './modules/vocab-a2';
import * as pastVsPerfect from './modules/past-vs-perfect';
import * as conditionals from './modules/conditionals';
import * as vocabB1WorkPhrasal from './modules/vocab-b1-work-phrasal';

// version is bumped ONLY on breaking changes to existing concepts/exercises —
// adding new modules keeps it, so saved progress survives.
export const content: Content = {
  version: '1',
  modules: [
    presentPerfect.module,
    pastVsPerfect.module,
    conditionals.module,
    vocabA2.module,
    vocabB1WorkPhrasal.module,
  ],
  concepts: [
    ...presentPerfect.concepts,
    ...pastVsPerfect.concepts,
    ...conditionals.concepts,
    ...vocabA2.concepts,
    ...vocabB1WorkPhrasal.concepts,
  ],
  exercises: [
    ...presentPerfect.exercises,
    ...pastVsPerfect.exercises,
    ...conditionals.exercises,
    ...vocabA2.exercises,
    ...vocabB1WorkPhrasal.exercises,
  ],
};

const errors = validateContent(content);
if (errors.length > 0) console.error('Content validation failed:', errors);
