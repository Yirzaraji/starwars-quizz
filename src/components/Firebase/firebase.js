import { initializeApp } from "firebase/app";
import config from "./config";

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
}

export default Firebase;
