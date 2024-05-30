import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../Firebase";

const Logout = () => {
  const navigate = useNavigate();
  const firebase = useContext(FirebaseContext);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) {
      console.log("checked");
      firebase.logoutUser();
      navigate("/");
    } else {
      console.log("unchecked");
    }
  }, [checked, firebase]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="logoutContainer">
      <label className="switch">
        <input onChange={handleChange} type="checkbox" checked={checked} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Logout;
