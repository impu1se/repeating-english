export type ExerciseType =
  | 'translate_ru_en'
  | 'word_order'
  | 'choose_word'
  | 'fill_gap'
  | 'multi_gap'
  | 'verb_form'
  | 'match_pairs';

export interface Pair {
  en: string;
  ru: string;
}

export interface Gap {
  accepted: string[];
}

export interface Exercise {
  id: string;
  conceptId: string;
  type: ExerciseType;
  prompt: string;
  points: number;
  accepted?: string[];   // translate_ru_en | fill_gap | verb_form | word_order (full orderings) | choose_word (the correct option)
  gaps?: Gap[];          // multi_gap (one entry per blank, in order)
  options?: string[];    // choose_word
  bank?: string[];       // word_order (shuffled tokens)
  pairs?: Pair[];        // match_pairs
}

export interface Concept {
  id: string;
  moduleId: string;
  title: string;
  kind: 'grammar' | 'vocab';
  exerciseIds: string[];
}

export interface Module {
  id: string;
  title: string;
  level: string;
  masteryThreshold: number;
  conceptIds: string[];
}

export interface Content {
  version: string;
  modules: Module[];
  concepts: Concept[];
  exercises: Exercise[];
}
