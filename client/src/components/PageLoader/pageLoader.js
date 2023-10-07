import React from "react";
import style from "./pageLoader.module.css";

export const PageLoader = () => {
  const loadingImg = "https://cdn.auth0.com/blog/hello-auth0/loader.svg";

  return (
    <div className={style.loader}>
      <img src={loadingImg} alt="Loading..." />
    </div>
  );
};
