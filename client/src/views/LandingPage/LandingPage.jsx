import { Button } from "react-bootstrap";
import style from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={style.background}>
      <div className={style.container}>
        <h1 className={style.tittle}> MSC Amoblamientos</h1>
        <Button variant="dark" href="/home" size="sm">
          Ingresar
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
