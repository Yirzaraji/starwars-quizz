import { initializeApp } from "firebase/app";
import config from "./config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

class Firebase {
  constructor() {
    this.app = initializeApp(config);
    this.auth = getAuth(this.app);
  }

  // Inscription
  signupUser = (email, password) =>
    createUserWithEmailAndPassword(this.auth, email, password);

  // Connexion
  loginUser = (email, password) =>
    signInWithEmailAndPassword(this.auth, email, password);

  // Déconnexion
  logoutUser = () => signOut(this.auth);
}

export default Firebase;
