import {Common, CommonAction, CommonActions} from '../models';

let initialState: Common = {
  isLoading: false,
  error: '',
};

export const commonReducer = (
  state: Common = initialState,
  action: CommonAction,
) => {
  switch (action.type) {
    case CommonActions.RESET_ERROR:
      return {
        ...state,
        error: '',
        isLoading: false,
      };
    case CommonActions.ERROR_OCCURED:
      return {
        ...state,
        error: action.payload,
      };
    case CommonActions.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
        error: '',
      };
  }
  return state;
};
