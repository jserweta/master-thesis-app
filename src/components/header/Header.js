import React from "react";
import "./header.scss";
import agh from "../../img/agh-logo.png";

export const Header = () => {
  return (
    <header className="header">
      Stock market analysis portal
      <img src={agh} alt="AGH logo" />
    </header>
  );
};
