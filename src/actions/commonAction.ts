import {CommonActions} from '../models';

export const setLoading = (loading: boolean) => ({
  type: CommonActions.SET_LOADING,
  payload: loading,
});

export const handleError = (dispatch: any) => (err: any) => {
  dispatch({
    type: CommonActions.ERROR_OCCURED,
    payload:
      (err.response && err.response.data && err.response.data.code) ||
      err.message ||
      'Connection Timeout!',
  });
  dispatch({
    type: CommonActions.SET_LOADING,
    payload: false,
  });
  setTimeout(() => {
    dispatch({
      type: CommonActions.RESET_ERROR,
    });
  }, 3000);
};
