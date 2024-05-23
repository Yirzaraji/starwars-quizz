import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "../Firebase/firebaseContext";
import FirebaseAuth from "../Firebase/firebaseAuth";

const Signup = () => {
  const { auth } = useFirebase();
  const firebaseAuth = new FirebaseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const user = await firebaseAuth.signup(email, password);
      console.log("User signed up:", user);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };
  return (
    <div className="signUpLoginBox">
      <div className="slContainer">singup</div>
      <div>
        <h1>Inscription</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
};

export default Signup;
