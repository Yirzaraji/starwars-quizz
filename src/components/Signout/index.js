import React, { useState } from "react";
import { useFirebase } from "../Firebase/firebaseContext";
import { signOut } from "firebase/auth";

const Signout = () => {
  const { auth } = useFirebase();
  const [user, setUser] = useState(null); // Simulating a logged-in user for demonstration

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.email}</h1>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <h1>Please sign in</h1>
      )}
    </div>
  );
};

export default Signout;
