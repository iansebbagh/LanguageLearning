import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { firebaseConfig } from '../config';

firebase.initializeApp(firebaseConfig);
firebase
  .firestore()
  .settings({experimentalForceLongPolling: true, merge: true});
export default firebase;
