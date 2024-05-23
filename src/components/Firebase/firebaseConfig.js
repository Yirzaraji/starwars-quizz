// firebaseConfig.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAEAOWrGpOEedc9xy2R-fslUUDKru00WnA",
  authDomain: "starwars-quizz.firebaseapp.com",
  projectId: "starwars-quizz",
  storageBucket: "starwars-quizz.appspot.com",
  messagingSenderId: "123621641847",
  appId: "1:123621641847:web:65c87d3d5809cb50ca0072",
};

const app = initializeApp(firebaseConfig);

export default app;
