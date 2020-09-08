import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = !firebase.apps.length ? firebase.initializeApp(config) : firebase.apps[0];
const firestore = firebase.firestore();
let functions;
console.log(process.env.NODE_ENV);
if (
  typeof location !== 'undefined' &&
  location.hostname &&
  location.hostname === 'localhost' &&
  process.env.NODE_ENV === 'development'
) {
console.log(process.env.NODE_ENV, location);
  firestore.settings({
    host: 'localhost:8080',
    ssl: false,
  });
  firebase.functions().useFunctionsEmulator('http://localhost:5005');
  functions = firebase.app().functions();
} else {
  functions = firebase.app().functions('europe-west1');
}

const auth = firebase.auth(app);


export { app, auth, firestore, functions };

export default firebase;
