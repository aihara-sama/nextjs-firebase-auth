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
  // your firebase configs go here...
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
