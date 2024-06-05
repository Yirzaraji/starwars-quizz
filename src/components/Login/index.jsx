import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseContext } from "../Firebase";

const Login = () => {
  const firebase = useContext(FirebaseContext);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [btn, setBtn] = useState(false);
  const [error, setError] = useState("");

  const { email, password } = loginData;

  //verification datas formulaire
  useEffect(() => {
    if (password.length > 5 && email !== "") {
      setBtn(true);
    } else if (btn === true) {
      setBtn(false);
    }
  }, [password, email, btn]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await firebase.loginUser(email, password);
      console.log("User signed in:", user);
      navigate("/welcome");
    } catch (error) {
      setError(error);
      console.error("Error signing in:", error);
    }
  };

  const handleChange = (event) => {
    setLoginData({ ...loginData, [event.target.id]: event.target.value });
  };

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxRight">
          <div className="formContent">
            {error !== "" && <span>{error.message}</span>}
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  type="email"
                  autoComplete="off"
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
                  autoComplete="off"
                  required
                  placeholder="Mot de passed"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              {btn ? (
                <button className="btn">Login</button>
              ) : (
                <button disabled className="btn">
                  Login
                </button>
              )}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/signup">
                Nouveau sur Star Wars quiz ? Inscrivez-vous.
              </Link>
              <br />
              <Link className="simpleLink" to="/forgetpassword">
                Mot de passe oublié ? Recuperez-le ici.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
