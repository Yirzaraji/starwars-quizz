import React, { useState } from "react";
import { useFirebase } from "../Firebase/firebaseContext";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const { auth } = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed in:", userCredential.user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <h1>Login</h1>
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
        <button onClick={handleSignIn}>Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
