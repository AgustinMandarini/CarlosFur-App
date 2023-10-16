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

const Card = (props) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cartProducts);
  const user = localStorage.getItem("user");
  const cartId = localStorage.getItem("cartId");
  const { isAuthenticated } = useAuth0();

  const countForProductID = useSelector((state) =>
    state.cartProducts.reduce((count, product) => {
      if (product.id === props.id) {
        return count + product.count;
      }
      return count;
    }, 0)
  );

  const [counter, setCounter] = useState(0);
  const [product, setProduct] = useState(0);

  const increaseCounter = () => {
    /* Contador */
    setCounter(counter);
    /* Se suma el producto al carrito */
    setProduct(1);
    dispatch(postCartProduct(props.id));
    setProduct(0);
    handleUpdateCart();
  };

  const handleUpdateCart = () => {
    const userParse = cartId != null && JSON.parse(user);
    const cartIdParse = cartId != null && JSON.parse(cartId);
    const newProducts = cartProducts.map((item) => ({
      id: item.id,
      quantity: item.count,
    }));

    const data = {
      userId: userParse.userId,
      products: newProducts,
    };
    if (isAuthenticated && cartIdParse) {
      dispatch(updateCart(cartIdParse, data));
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      if (cartProducts.length === 0) {
        localStorage.removeItem("cartProducts");
      } else {
        updateLocalStorage(cartProducts);
      }
    }
  }, [cartProducts]);

  return (
    <div className={style.container} key={props.id}>
      <Link to={`/detail/${props.id}`} className={style.nameLink}>
        {props.imagePath ? (
          <>
            <img src={props.imagePath} alt="image" className={style.imgCard} />
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
        {/* <span className={style.counterValue}>{countForProductID}</span> */}
        <button className={style.buttonCount} onClick={increaseCounter}>
          Agregar al carrito
        </button>
        <span className={style.counterValue}>{countForProductID}</span>
      </div>
    </div>
  );
};

export default Card;
