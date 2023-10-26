import React from "react";
import style from "./Footer.module.css";
const Footer = () => {
  return (
    <div className={style.cntnFooter}>
      <div className={style.brandMr}>
        <p>MSC</p>
      </div>
      <div className={style.divCopy}>
        <p className={style.pCopy}>
          MSC Amoblamientos.&copy;{new Date().getFullYear()} All Rights
          Reserved. Site Credit.
        </p>
      </div>
    </div>
  );
};
export default Footer;
