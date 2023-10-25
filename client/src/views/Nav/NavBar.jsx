import React, { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import logo from "../../imagenes/MSC.png";
import { getProducts } from "../../redux/actions";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import TextoDesplazante from "./../../components/TextoDesplazante/TextoDesplazante";
import shoppingCart from "./../../imagenes/shoppingCart.png";
import style from "./NavBar.module.css";

const NavBar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cartProducts = useSelector((state) => state.cartProducts) || [];
  const [navResponsive, setNavResponsive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {}, [cartProducts]);

  const cartItemCount = cartProducts
    .filter((product) => product && product.id !== undefined)
    .reduce((count, product) => {
      return count + product.count;
    }, 0);

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
                to="/about"
                className={navResponsive ? style.linkResponsive : style.links}
              >
                About
              </Link>
            </div>
          </Navbar.Collapse>
          <SearchBar />
          <div onClick={() => setShow(true)} className={style.linkCart}>
            <img src={shoppingCart} className={style.shoppingCart} alt="" />
            <span className={style.cartItemCount}>{cartItemCount}</span>
          </div>
        </Container>
      </Navbar>
      <TextoDesplazante />
      <ShoppingCart
        show={show}
        handleShow={handleShow}
        handleClose={handleClose}
      />
    </>
  );
};

export default NavBar;
