import {combineReducers} from 'redux';
import {Common, Exercise} from '../models';
import {commonReducer} from './commonReducer';
import {exerciseReducer} from './exerciseReducer';

export interface RootState {
  common: Common;
  exercise: Exercise;
}

const combined = combineReducers({
  exercise: exerciseReducer,
  common: commonReducer,
});

export default combined;
