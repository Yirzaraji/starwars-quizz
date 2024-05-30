import React from "react";
import Signout from "../Logout/index";

const Header = () => {
  return (
    <header>
      <div className="banner-container">
        <h5 className="logs-info">
          Login: demo@test.fr | Pass: demo123 | Pseudo:demo
        </h5>
        <h1>
          <a href="/"> Star Wars Quiz</a>
        </h1>
      </div>
    </header>
  );
};

export default Header;
