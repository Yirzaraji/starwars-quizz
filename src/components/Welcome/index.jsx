import React, { useState, Fragment, useContext, useEffect } from "react";
import { FirebaseContext } from "../Firebase";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout/index";

const Welcome = () => {
  const firebase = useContext(FirebaseContext);
  const navigate = useNavigate();
  const [userSession, setUserSession] = useState(null);

  //detection de la session
  useEffect(() => {
    let listener = firebase.auth.onAuthStateChanged((user) => {
      user ? setUserSession(user) : navigate("/");
    });

    //componentWillUnmount
    return () => {
      listener();
    };
  });

  const display =
    userSession === null ? (
      <Fragment>
        <div className="loader"></div>
        <p className="loaderText">Connectez-vous...</p>
      </Fragment>
    ) : (
      <Fragment>
        <div className="quiz-bg">
          <div className="container">
            Welcomeeze
            <Logout />
          </div>
        </div>
      </Fragment>
    );

  return display;
};

export default Welcome;
