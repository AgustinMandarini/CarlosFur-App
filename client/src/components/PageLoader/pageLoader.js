import React from "react";
import style from "./pageLoader.module.css";

export const PageLoader = () => {

  return (
    <div className={`d-flex justify-content-center align-items-center ${style.loaderContainer}`}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
