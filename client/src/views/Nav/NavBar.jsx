import React, { useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import logo from "../../imagenes/MSC.png";
import { getProducts } from "../../redux/actions";
import style from "./NavBar.module.css";
import shoppingCart from "./../../imagenes/shoppingCart.png";

const NavBar = () => {
  const cartProducts = useSelector((state) => state.cartProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    // No es necesario calcular cartItemCount aquí
  }, [cartProducts]);

  const cartItemCount = cartProducts.reduce((count, product) => {
    return count + product.count;
  }, 0);

  return (
    <>
      <Navbar className={style.navBar} collapseOnSelect expand="sm">
        <Container fluid>
          <Navbar.Brand>
            <img className={style.imgLogo} src={logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav" className={style.divLinks}>
            <div className={style.searchBar}>
              <Link
                to="/home"
                className={style.links}
                onClick={() => dispatch(getProducts())}
              >
                Home
              </Link>
              <Link to="/create" className={style.links}>
                Crear Producto
              </Link>
              <Link to="/about" className={style.links}>
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
