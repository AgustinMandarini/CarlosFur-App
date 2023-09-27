import React from "react";
import style from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/home" && (
        <div className={style.navBar}>
          <div className={style.divLinks}>
            <p className={style.logo}>LOGO</p>
            <Link to="/home" className={style.links}>
              Home
            </Link>
            <Link to="/create" className={style.links}>
              Form
            </Link>
            <Link to="/about" className={style.links}>
              About
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
