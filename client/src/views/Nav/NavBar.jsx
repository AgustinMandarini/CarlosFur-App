import React, { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import logo from "../../imagenes/MSC.png";
import { getProducts } from "../../redux/actions";
import style from "./NavBar.module.css";
import shoppingCart from "./../../imagenes/shoppingCart.png"
const NavBar = () => {
  const cartProducts = useSelector((state) => state.cartProducts);
  const [navResponsive, setNavResponsive] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const itemCount = cartProducts.reduce((count, product) => {
      return count + 1;
    }, 0);
    setCartItemCount(itemCount);
  }, [cartProducts]);

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
            <SearchBar />
          <Link to="/shoppingcart" className={style.linkCart}>
           <img src={shoppingCart} className={style.shoppingCart} alt="" />
            <span className={style.cartItemCount}>{cartItemCount}</span>
          </Link>
        </Container>
      
      </Navbar>
    </>
  );
};

export default NavBar;
