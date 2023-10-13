import { Link } from "react-router-dom";
import logo from "./../../../imagenes/icono.png"
import style from "./NavBar.module.css"
const NavBar = () => {
  return (
    <div className={style.container}>
      <img src={logo} alt="LOGO" className={style.logo} />
      <Link to="/admin/home">Home</Link>
      <Link to="/admin/users">Users</Link>
      <Link to="/admin/crear">Crear</Link>
    </div>
  );
};

export default NavBar;
