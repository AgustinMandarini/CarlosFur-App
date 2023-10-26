import { Link } from "react-router-dom";
import logo from "./../../../imagenes/icono.png";
import style from "./NavBar.module.css";
import { useState } from "react";
import {
  IconCoin,
  IconUserSquareRounded,
  IconSquareRoundedPlus,
  IconBox,
  IconHome2,
  IconStar,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const loggedUser = useSelector((state) => state.loggedUser);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className={style.container}>
      <img src={logo} alt="LOGO" className={style.logo} />
      <div className={style.divLinks}>
        <div className={style.dropdown} onClick={toggleDropdown}>
          <IconSquareRoundedPlus stroke="1.3" className={style.icon} /> Crear
          {isDropdownOpen && (
            <div className={style.dropdownContent}>
              <Link to={`/user/admin/${loggedUser.id}/crear/producto`}>Producto</Link>
              <Link to={`/user/admin/${loggedUser.id}/crear/color`}>Color</Link>
              <Link to={`/user/admin/${loggedUser.id}/crear/tipo-de-producto`}>Tipo de Producto</Link>
              <Link to={`/user/admin/${loggedUser.id}/crear/material`}>Material</Link>
            </div>
          )}
        </div>
        <Link to={`/user/admin/${loggedUser.id}/productos`} className={style.link}> {/* cuando haglo clic en Productos*/}
          <IconBox stroke="1.3" className={style.icon} /> Productos
        </Link>
        <Link to={`/user/admin/${loggedUser.id}/ventas`} className={style.link}>
          <IconCoin stroke="1.3" className={style.icon} />
          Ventas
        </Link>
        <Link to={`/user/admin/${loggedUser.id}/usuarios`} className={style.link}>
          <IconUserSquareRounded className={style.icon} stroke="1.3" />
          Usuarios
        </Link>
        <Link to="/home" className={style.link}>
          <IconHome2 className={style.icon} stroke="1.3" />
          Home
        </Link>
        <Link to="/reviews" className={style.link}>
          <IconStar className={style.icon} stroke="1.2" />
          Reviews
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
