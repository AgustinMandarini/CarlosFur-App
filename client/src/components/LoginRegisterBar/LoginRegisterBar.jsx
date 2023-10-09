import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import style from "./LoginRegisterBar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { postCart } from "../../redux/actions";

function LoginBar() {
  const { logout, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  const cartProducts = useSelector((state) => state.cartProducts);
  const localStorage = useSelector((state) => state.localStorage);
  const cartArray = cartProducts.reduce((result, product) => {
    const existingProduct = result.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      result.push({
        id: product.id,
        quantity: 1,
      });
    }
    return result;
  }, []);
  const cartToDispatch = { products: cartArray };

  console.log(localStorage);
  const handleLogout = () => {
    dispatch(postCart(cartToDispatch));
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Navbar className={style.nav} expand="lg">
      <div className={style.container}>
        <Nav className="mr-auto"></Nav>
        <Nav style={{ marginLeft: "auto" }}>
          {!isAuthenticated && (
            <>
              <Link to="/register">
                <Button variant="dark" className={style.buttonLogin}>
                  Registrate
                </Button>
              </Link>
              <Link to="/logIn">
                <Button variant="dark" className={style.button}>
                  Log In
                </Button>
              </Link>
            </>
          )}
          {isAuthenticated && (
            <Button onClick={handleLogout} variant="dark">
              Log Out
            </Button>
          )}
        </Nav>
      </div>
    </Navbar>
  );
}

export default LoginBar;
