import { Button } from "react-bootstrap";
import style from "./LandingPage.module.css";
import imagen from "../../imagenes/MSC.png";
const LandingPage = () => {
  return (
    <div className={style.background}>
      <div className={style.container}>
        <img src={imagen} alt="ICONO MSC" />
        <Button variant="dark" href="/home" size="sm" className={style.boton}>
          Ingresar a la Tienda
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
