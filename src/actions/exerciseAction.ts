import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {CommonActions, ExerciseActions, ExerciseItem} from '../models';
import {RootState} from '../reducers';
import firebase from './../services/firebase';
import {handleError} from './commonAction';

export const getExercises =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    dispatch({
      type: CommonActions.SET_LOADING,
      payload: true,
    });
    let response = firebase.firestore().collection('exercise');
    response
      .get()
      .then((querySnapshot: any) => {
        let exercises: ExerciseItem[] = [];
        querySnapshot.forEach((snapshot: any) => {
          exercises.push(snapshot.data());
        });
        dispatch({
          type: ExerciseActions.GET_EXERCISE,
          payload: exercises,
        });
        dispatch({
          type: CommonActions.SET_LOADING,
          payload: false,
        });
      })
      .catch((err: any) => {
        handleError(err);
      });
  };

export const selectExercise = (current: number) => ({
  type: ExerciseActions.SELECT_EXERCISE,
  payload: current,
});
// import {getExercise, getNotifications, getWorkspace} from '../services/Api';

// export const selectExercise =
//   (index: number): ThunkAction<void, RootState, unknown, AnyAction> =>
//   async (dispatch, getState) => {
//     dispatch({
//       type: CommonActions.SET_LOADING,
//       payload: true,
//     });
//     let handleError = (err: any) => {
//       dispatch({
//         type: CommonActions.ERROR_OCCURED,
//         payload:
//           (err.response && err.response.data && err.response.data.code) ||
//           err.message ||
//           'Connection Timeout!',
//       });
//       dispatch({
//         type: CommonActions.SET_LOADING,
//         payload: false,
//       });
//       setTimeout(() => {
//         dispatch({
//           type: CommonActions.RESET_ERROR,
//         });
//       }, 3000);
//     };
//     let baseUrl = getState().dashboard?.sites[index].url;
//     getExercise(baseUrl)
//       .then(dashboardRes => {
//         console.log(dashboardRes);
//         getWorkspace(baseUrl)
//           .then(workspaceRes => {
//             console.log(workspaceRes);
//             getNotifications(baseUrl)
//               .then(notifiRes => {
//                 console.log(notifiRes);
//                 dispatch({
//                   type: ExerciseActions.GET_DASHBOARD_ITEM,
//                   payload: {
//                     featured_content: dashboardRes.data.featured_content,
//                     latest: dashboardRes.data?.latest
//                       ? [
//                           ...dashboardRes.data.latest.map((lat: any) => ({
//                             ...lat,
//                             date: new Date(lat.date),
//                           })),
//                         ]
//                       : [],
//                     quick_links: dashboardRes.data.quick_links,
//                   },
//                 });
//                 dispatch({
//                   type: ExerciseActions.GET_WORKSPACE_ITEM,
//                   payload: workspaceRes.data,
//                 });
//                 dispatch({
//                   type: NotificationActions.GET_NOTIFICATION_ITEM,
//                   payload: notifiRes.data,
//                 });
//                 dispatch({
//                   type: CommonActions.SET_LOADING,
//                   payload: false,
//                 });
//                 dispatch({
//                   type: ExerciseActions.SELECT_DASHBOARD,
//                   payload: index,
//                 });
//               })
//               .catch(handleError);
//           })
//           .catch(handleError);
//       })
//       .catch(handleError);
//   };
