import React from "react";
import "./header.scss";
import agh from "../../assets/img/agh-logo.png";

export const Header = () => {
  return (
    <header className="header">
      <h1>Stock market analysis portal</h1>
      <img src={agh} alt="AGH logo" />
    </header>
  );
};
