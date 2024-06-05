import React, { useState, Fragment, useContext, useEffect } from "react";
import { FirebaseContext } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { getDoc } from "firebase/firestore";
import Logout from "../Logout/index";
import Quiz from "../Quiz/index";

const Welcome = () => {
  const firebase = useContext(FirebaseContext);
  const navigate = useNavigate();
  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({});

  //detection de la session
  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setUserSession(user);
      } else {
        setUserSession(null);
        navigate("/");
      }
    });

    if (userSession) {
      (async () => {
        try {
          const userDocRef = firebase.user(userSession.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      })();
    }

    //componentWillUnmount (cleanup auth)
    return () => {
      listener();
    };
  }, [userSession]);

  const display =
    userSession === null ? (
      <Fragment>
        <div className="loader"></div>
        <p className="loaderText">Patientez...</p>
      </Fragment>
    ) : (
      <Fragment>
        <div className="quiz-bg">
          <div className="container">
            <Logout />
            <Quiz userData={userData} />
          </div>
        </div>
      </Fragment>
    );

  return display;
};

export default Welcome;
