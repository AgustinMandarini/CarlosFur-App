import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from "./Card.module.css";
import defaultImage from "./../../imagenes/default.png";
import { deleteCartProduct, postCartProduct } from "../../redux/actions";
import { updateLocalStorage, getLocalStorageCart } from "../LocalStorage/LocalStorageFunctions";
const Card = (props) => {
  const cart = getLocalStorageCart();

  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cartProducts);
  const countForProductID = cartProducts.reduce((count, product) => {
    if (product.id === props.id) {
      return count + 1;
    }
    return count;
  }, 0);
  const [counter, setCounter] = useState(0);
  const [product, setProduct] = useState(0);

  const increaseCounter = () => {
    /* Contador */
    setCounter(counter);

    /* Se suma el producto al carrito */
    setProduct(1);
    dispatch(postCartProduct(props.id));
    setProduct(0);
    updateLocalStorage([...cart, props]);
  };

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
        <span className={style.counterValue}>{countForProductID}</span>
        <button className={style.buttonCount} onClick={increaseCounter}>
          +
        </button>
      </div>
    </div>
  );
};

export default Card;