import { Link } from "react-router-dom";
import logo from "./../../../imagenes/icono.png";
import style from "./NavBar.module.css";
import { useState } from "react";
const NavBar = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className={style.container}>
      <img src={logo} alt="LOGO" className={style.logo} />
      <div className={style.dropdown} onClick={toggleDropdown}>
        Crear
        {isDropdownOpen && (
          <div className={style.dropdownContent}>
            <Link to="/admin/crear/producto">Crear Producto</Link>
            <Link to="/admin/crear/color">Crear Color</Link>
            <Link to="/admin/crear/tipo-de-producto">Crear Tipo de Producto</Link>
            <Link to="/admin/crear/material">Crear Material</Link>
          </div>
        )}
      </div>
      <Link to="/admin/productos">Productos</Link>
      <Link to="/admin/ventas">Ventas</Link>
      <Link to="/admin/usuarios">Usuarios</Link>
      
    </div>
  );
};

export default NavBar;
