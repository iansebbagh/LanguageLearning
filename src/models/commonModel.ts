export interface Common {
  isLoading: boolean;
  error: string;
}

export enum CommonActions {
  SET_LOADING = 'SET_LOADING',
  ERROR_OCCURED = 'ERROR_OCCURED',
  RESET_ERROR = 'RESET_ERROR',
}

interface CommonActionType<T, P> {
  type: T;
  payload?: P;
}

export type CommonAction =
  | CommonActionType<typeof CommonActions.SET_LOADING, boolean>
  | CommonActionType<typeof CommonActions.RESET_ERROR, null>
  | CommonActionType<typeof CommonActions.ERROR_OCCURED, string>;
