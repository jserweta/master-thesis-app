import React from "react";
import "./loadingError.scss";

const LoadingError = ({ message }) => {
  return (
    <div className="loadingError">
      {message.split("\n").map((str, index) => (
        <p key={index}>{str}</p>
      ))}
    </div>
  );
};

export default LoadingError;
