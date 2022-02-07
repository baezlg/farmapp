import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <h1>Farm Data</h1>
      <div className="header__links">
        <Link to="/" className="header__link">
          home
        </Link>
        <Link to="/stats" className="header__link">
          stats
        </Link>
        <Link to="/contact" className="header__link">
          contact
        </Link>
      </div>
    </div>
  );
};

export default Header;
