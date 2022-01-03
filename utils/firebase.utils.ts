import * as firebase from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  UserCredential,
  FacebookAuthProvider,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
} from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyAXPEr9OUMVttCdhrPJRFRiAUY6CV1fDuo',
  authDomain: 'sentences-3406a.firebaseapp.com',
  databaseURL: 'https://sentences-3406a-default-rtdb.firebaseio.com',
  projectId: 'sentences-3406a',
  storageBucket: 'sentences-3406a.appspot.com',
  messagingSenderId: '394776494553',
  appId: '1:394776494553:web:53ff73313d7c8b4eebd9c8',
  measurementId: 'G-CB1WWFHH95',
};

firebase.initializeApp(firebaseConfig);
export const auth = getAuth();
export const firestore = getFirestore();

// Google provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Github provider
const githubProvider = new GithubAuthProvider();
githubProvider.setCustomParameters({
  prompt: 'select_account',
});

// Github provider
const facebookProvider = new FacebookAuthProvider();
facebookProvider.setCustomParameters({
  prompt: 'select_account',
});

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInWithGithub = () => signInWithPopup(auth, githubProvider);
export const signInWithFacebook = () => signInWithPopup(auth, facebookProvider);
export default firebase;

export const createUserIfNotExists = async (userCred: UserCredential) => {
  const snapshot = await getDoc(doc(firestore, `users/${userCred.user.uid}`));
  if (!snapshot.exists()) {
    await addDoc(collection(firestore, 'users'), {
      uid: userCred.user.uid,
      email: userCred.user.email,
      username: userCred.user.displayName,
    });
  }
};
