import React from "react";
import "./loadingError.scss";

const LoadingError = ({ message }) => {
  return (
    <div className="loadingError">
      {message.split("\n").map((str) => (
        <p>{str}</p>
      ))}
    </div>
  );
};

export default LoadingError;
