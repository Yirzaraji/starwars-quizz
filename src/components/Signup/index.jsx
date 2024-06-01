import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseContext } from "../Firebase";
import { setDoc } from "firebase/firestore";

const Signup = () => {
  const firebase = useContext(FirebaseContext);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  //destructuring
  const { pseudo, email, password, confirmPassword } = loginData;

  const handleChange = (event) => {
    //spread operator
    setLoginData({ ...loginData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const authUser = await firebase.signupUser(email, password);
      await setDoc(firebase.user(authUser.user.uid), {
        pseudo: pseudo,
        email: email,
      });
      console.log("User signed up:", authUser);
      navigate("/welcome");
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error);
    }
  };

  const btn =
    pseudo === "" ||
    email === "" ||
    password === "" ||
    password !== confirmPassword ? (
      <button disabled>Inscription </button>
    ) : (
      <button>Inscription </button>
    );

  //handle Error
  const errorMsg = error !== "" && <span>{error.message}</span>;

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {errorMsg}
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  value={pseudo}
                  type="text"
                  id="pseudo"
                  placeholder="Pseudo"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="inputBox">
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="inputBox">
                <input
                  type="password"
                  id="password"
                  required
                  placeholder="Mot de passed"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              <div className="inputBox">
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  required
                  placeholder="Confirm Mot de passe"
                  onChange={handleChange}
                />
              </div>
              {btn}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                Deja inscrit? Connectez-vous.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
