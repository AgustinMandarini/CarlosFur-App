import { NavLink } from "react-router-dom";
import style from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={style.background}>
      <div className={style.container}>
        <h1 className={style.tittle}> MSC Amoblamientos</h1>
        <NavLink to="/home" className={style.loginButton}>
          Ingresar
        </NavLink>
      </div>
    </div>
  );
};

export default LandingPage;
