import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
//import { useRef } from 'react';

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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
