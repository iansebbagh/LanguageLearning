export * from './exerciseModel';
export * from './commonModel';

import {CommonAction} from './commonModel';
import {ExerciseAction} from './exerciseModel';

export type Action =
  | ExerciseAction
  | CommonAction;
