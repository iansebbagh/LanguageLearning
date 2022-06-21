export interface Exercise {
  exercises: ExerciseItem[];
  selected: number;
}

export interface ExerciseItem {
  words: {
    english: string;
    german: string;
  }[];
  problem: string[];
  englishBlank: number;
  germanBlank: number;
  answers: string[];
}

export enum ExerciseActions {
  GET_EXERCISE = 'GET_EXERCISE',
  SELECT_EXERCISE = 'SELECT_EXERCISE',
}

interface ExerciseActionType<T, P> {
  type: T;
  payload?: P;
}

export type ExerciseAction =
  | ExerciseActionType<typeof ExerciseActions.GET_EXERCISE, any>
  | ExerciseActionType<typeof ExerciseActions.SELECT_EXERCISE, any>;
