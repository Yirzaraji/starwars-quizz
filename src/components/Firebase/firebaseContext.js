// firebaseContext.js
import React, { createContext, useContext } from "react";
import { auth } from "./firebaseAuth"; // Import the auth instance

const FirebaseContext = createContext(null);

const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ auth }}>
      {children}
    </FirebaseContext.Provider>
  );
};

// Custom hook for easier usage
const useFirebase = () => {
  return useContext(FirebaseContext);
};

export { FirebaseProvider, useFirebase };
