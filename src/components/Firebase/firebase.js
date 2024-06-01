import { initializeApp } from "firebase/app";
import config from "./config";
import { getFirestore, doc } from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

class Firebase {
  constructor() {
    this.app = initializeApp(config);
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
  }

  // Subscription
  signupUser = (email, password) =>
    createUserWithEmailAndPassword(this.auth, email, password);

  // Connection
  loginUser = (email, password) =>
    signInWithEmailAndPassword(this.auth, email, password);

  // Logout
  logoutUser = () => signOut(this.auth);

  //Recover Password
  passwordReset = (email) => sendPasswordResetEmail(this.auth, email);

  user = (uid) => doc(this.db, `users/${uid}`);
}

export default Firebase;
