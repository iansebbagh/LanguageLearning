import {Exercise, ExerciseAction, ExerciseActions} from '../models';

let initialState: Exercise = {
  exercises: [],
  selected: -1,
};

const generateRandom = (min: number, max: number, except: number): number => {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num === except ? generateRandom(min, max, except) : num;
};

export const exerciseReducer = (
  state: Exercise = initialState,
  action: ExerciseAction,
) => {
  switch (action.type) {
    case ExerciseActions.GET_EXERCISE:
      return {
        ...state,
        exercises: action.payload,
        selected: generateRandom(0, action.payload.length - 1, -1),
      };
    case ExerciseActions.SELECT_EXERCISE:
      return {
        ...state,
        selected: generateRandom(0, state.exercises.length - 1, action.payload),
      };
    default:
      return state;
  }
};
