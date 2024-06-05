import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseContext } from "../Firebase";

//rafce
const ForgetPassword = () => {
  const navigate = useNavigate();
  const firebase = useContext(FirebaseContext);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const passwordReset = await firebase.passwordReset(email);
      console.log(passwordReset);
      setSuccess(
        `Consultez votre email: ${email} pour changer le mot de passe`
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      setError(error);
      setEmail("");
    }
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const disabled = email === "";

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxRight">
          <div className="formContent">
            {console.log(success)}
            {success && <span>{success}</span>}
            {error && <span>{error.message}</span>}
            <h2>Mot de passe oublié</h2>
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
              <button disabled={disabled}>Recuperer</button>
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

export default ForgetPassword;
