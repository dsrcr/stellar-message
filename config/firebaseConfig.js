import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: Constants.expoConfig.extra.apiKey,
//   authDomain: Constants.expoConfig.extra.authDomain,
//   projectId: Constants.expoConfig.extra.projectId,
//   storageBucket: Constants.expoConfig.extra.storageBucket,
//   messagingSenderId: Constants.expoConfig.extra.messagingSenderId,
//   appId: Constants.expoConfig.extra.appId,
// };
const firebaseConfig = {
  apiKey: 'AIzaSyDeFvM5K-i2rLQkzKxW9Q-4jEMCGTgyB7U',
  authDomain: 'stellar-message.firebaseapp.com',
  projectId: 'stellar-message',
  storageBucket: 'stellar-message.appspot.com',
  messagingSenderId: '433121963576',
  appId: '1:433121963576:web:d563d1be00e994389840cd',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
