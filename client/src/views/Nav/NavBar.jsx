import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import style from "./NavBar.module.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { getProducts } from "../../redux/actions";
import { useDispatch } from "react-redux";
import logo from "../../imagenes/MSC.png";
const NavBar = () => {
  const [navResponsive, setNavResponsive] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar
        className={navResponsive ? style.navOne : style.navBar}
        collapseOnSelect
        expand="sm"
      >
        <Container fluid>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => setNavResponsive(true)}
            className={style.buttonResponsive}
          />
          <Navbar.Brand>
            <img
              className={
                navResponsive ? style.imgLogoResponsive : style.imgLogo
              }
              src={logo}
              alt="Logo"
            />
          </Navbar.Brand>
          {/* Botón hamburguesa */}
          <Navbar.Collapse
            id="basic-navbar-nav"
            className={navResponsive ? style.active : style.divLinks}
          >
            <div
              className={
                navResponsive ? style.searchBarResponsive : style.searchBar
              }
            >
              <Link
                to="/home"
                className={navResponsive ? style.linkResponsive : style.links}
                onClick={() => dispatch(getProducts())}
              >
                Home
              </Link>
              <Link
                to="/create"
                className={navResponsive ? style.linkResponsive : style.links}
              >
                Crear Producto
              </Link>
              <Link
                to="/about"
                className={navResponsive ? style.linkResponsive : style.links}
              >
                About
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
        <SearchBar />
      </Navbar>
    </>
  );
};

export default NavBar;
