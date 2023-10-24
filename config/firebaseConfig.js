import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';
import {
  browserPopupRedirectResolver,
  browserSessionPersistence,
  getAuth,
  GoogleAuthProvider,
  initializeAuth,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getFirestore(app);
