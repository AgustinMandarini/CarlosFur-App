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
const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
              <Link to="/admin/crear/producto">Producto</Link>
              <Link to="/admin/crear/color">Color</Link>
              <Link to="/admin/crear/tipo-de-producto">Tipo de Producto</Link>
              <Link to="/admin/crear/material">Material</Link>
            </div>
          )}
        </div>
        <Link to="user/admin/:userId/productos" className={style.link}>
          <IconBox stroke="1.3" className={style.icon} /> Productos
        </Link>
        <Link to="/admin/ventas" className={style.link}>
          <IconCoin stroke="1.3" className={style.icon} />
          Ventas
        </Link>
        <Link to="/admin/usuarios" className={style.link}>
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
