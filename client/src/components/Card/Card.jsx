import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from "./Card.module.css";
import defaultImage from "./../../imagenes/default.png";
import {
  deleteCartProduct,
  postCartProduct,
  updateCart,
} from "../../redux/actions";
import { updateLocalStorage } from "../LocalStorage/LocalStorageFunctions";
import { useAuth0 } from "@auth0/auth0-react";
import ShoppingCart from "../../views/ShoppingCart/ShoppingCart";

const Card = (props) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cartProducts) || [];
  const user = localStorage.getItem("user");
  const cartId = localStorage.getItem("cartId");

  const userIsAuthenticated = localStorage.getItem("token") !== null;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const increaseCounter = () => {
    dispatch(postCartProduct(props.id));
    handleUpdateCart();
    handleShow();
  };

  const handleUpdateCart = () => {
    // Verifica si user y cartId están definidos antes de analizarlos
    if (user && cartId) {
      const userParse = JSON.parse(user);
      const cartIdParse = JSON.parse(cartId);
      const newProducts = cartProducts
        .filter((item) => item && item.id !== undefined)
        .map((item) => ({
          id: item.id,
          quantity: item.count,
        }));

      const data = {
        userId: userParse.userId,
        products: newProducts,
      };
      if (userIsAuthenticated && cartIdParse) {
        dispatch(updateCart(cartIdParse, data));
      }
    }
  };

  useEffect(() => {
    if (!userIsAuthenticated) {
      if (cartProducts.length === 0) {
        localStorage.removeItem("cart");
      } else {
        updateLocalStorage(cartProducts);
      }
    }
  }, [cartProducts]);

  return (
    <>
      <div className={style.container} key={props.id}>
        <Link to={`/detail/${props.id}`} className={style.nameLink}>
          {props.imagePath ? (
            <>
              <img
                src={props.imagePath}
                alt="image"
                className={style.imgCard}
              />
            </>
          ) : (
            <img src={defaultImage} alt="default image" />
          )}
          <h1 className={style.nameCard}>{props.name}</h1>
          <div className={style.divProps}>
            <p className={style.price}>${props.price}</p>
            <p className={style.description}>{props.description} </p>
          </div>
        </Link>
        <div className={style.counterContainer}>
          <button className={style.buttonCount} onClick={increaseCounter}>
            Agregar al carrito
          </button>
        </div>
      </div>
      <ShoppingCart
        show={show}
        handleShow={handleShow}
        handleClose={handleClose}
      />
    </>
  );
};

export default Card;
