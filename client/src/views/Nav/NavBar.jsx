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
          <Link to="/shoppingcart" className={style.linkCart}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="27"
              fill="currentColor"
              class="bi bi-cart"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
          </Link>
        </Container>
        <SearchBar />
      </Navbar>
    </>
  );
};

export default NavBar;
