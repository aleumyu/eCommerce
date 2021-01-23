import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAasFLoKsXUTaEOTspQEqpgcIE1UT6h1Zs',
  authDomain: 'ecommerce-21f94.firebaseapp.com',
  projectId: 'ecommerce-21f94',
  storageBucket: 'ecommerce-21f94.appspot.com',
  messagingSenderId: '855551006967',
  appId: '1:855551006967:web:54d62be10b28a70ee9dbf2',
  measurementId: 'G-TVGCSHMM7W',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
