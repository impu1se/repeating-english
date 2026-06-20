import type { Content } from '../types';
import * as presentPerfect from './modules/present-perfect';

export const content: Content = {
  version: '1',
  modules: [presentPerfect.module],
  concepts: [...presentPerfect.concepts],
  exercises: [...presentPerfect.exercises],
};
