import React from "react";
import { Link } from "react-router-dom";
import Signout from "../Logout/index";

const Header = () => {
  return (
    <header>
      <div className="banner-container">
        <h5 className="logs-info">
          Login: demo@test.fr | Pass: demo123 | Pseudo:demo
        </h5>
        <h1>
          <Link to="/"> Star Wars Quiz</Link>
        </h1>
      </div>
    </header>
  );
};

export default Header;
