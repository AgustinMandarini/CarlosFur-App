import React from "react";
import style from "./Footer.module.css";
import {
  IconHome2,
  IconUserSquareRounded,
  IconMail,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={style.cntnFooter}>
      <div className={style.brandMr}>
        <p>MSC</p>
        <div className={style.divCopy}>
          <p className={style.pCopy}>
            MSC Amoblamientos.&copy;{new Date().getFullYear()} All Rights
            Reserved. Site Credit.
          </p>
        </div>
      </div>
      <div className={style.divLinks}>
        <div className={style.divLinkIcon}>
          <Link to="/home" className={style.link}>
            <IconHome2
              className={style.icon}
              color="white"
              stroke="1.2"
              size="20px"
            />
            Home
          </Link>
        </div>
        <div className={style.divLinkIcon}>
          <Link to="/about" className={style.link}>
            <IconUserSquareRounded
              className={style.icon}
              color="white"
              stroke="1.2"
              size="20px"
            />
            About
          </Link>
        </div>
        <div className={style.divLinkIcon}>
          <a
            href="mailto:msc.amoblamientos8@example.com"
            target="_blank"
            rel="noreferrer"
            className={style.link}
          >
            <IconUserSquareRounded
              className={style.icon}
              color="white"
              stroke="1.2"
              size="20px"
            />
            Contact
          </a>
        </div>
      </div>
    </div>
  );
};
export default Footer;
