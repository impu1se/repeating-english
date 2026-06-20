import type { Content } from '../types';
import * as presentPerfect from './modules/present-perfect';
import * as vocabA2 from './modules/vocab-a2';

export const content: Content = {
  version: '1',
  modules: [presentPerfect.module, vocabA2.module],
  concepts: [...presentPerfect.concepts, ...vocabA2.concepts],
  exercises: [...presentPerfect.exercises, ...vocabA2.exercises],
};
