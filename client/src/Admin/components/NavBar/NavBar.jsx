import { Link } from "react-router-dom";
import logo from "./../../../imagenes/icono.png";
import style from "./NavBar.module.css";
const NavBar = () => {
  return (
    <div className={style.container}>
      <img src={logo} alt="LOGO" className={style.logo} />
      <Link to="/admin/productos">Productos</Link>
      <Link to="/admin/ventas">Ventas</Link>
      <Link to="/admin/usuarios">Usuarios</Link>
    </div>
  );
};

export default NavBar;
