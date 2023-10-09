import { useDispatch, useSelector } from "react-redux";
import { deleteCartProduct, postCartProduct } from "../../redux/actions";
import React, { useState } from "react";
import style from "./CartProductCard.module.css";

const CartProductCard = (props) => {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(0);
  const cartProducts = useSelector((state) => state.cartProducts);
  const [product, setProduct] = useState(0);

  const countForProductID = cartProducts.reduce((count, product) => {
    if (product.id === props.id) {
      return count + 1;
    }
    return count;
  }, 0);
  const updateLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const increaseCounter = () => {
    /* Contador */
    setCounter(counter + 1);
    dispatch(postCartProduct(props.id));

    updateLocalStorage([...cartProducts, props]);
  };

  const decreaseCounter = () => {
    /* Contador */
    if (counter > 0) {
      setCounter(counter - 1);
      dispatch(deleteCartProduct(props.id));

      updateLocalStorage([...cartProducts, props]);
    }

    /* Se quita el producto del carrito */
    setProduct(-1);
    setProduct(0);
  };

  return (
    <div className={style.divCard}>
      <p className={style.prop}>
        <strong>{props.name}</strong>
      </p>
      <p className={style.prop}>Cantidad: {countForProductID}</p>
      <p className={style.prop}>Precio Total:$ {props.totalPrice}</p>
      <div className={style.counterContainer}>
        {/* <button className={style.buttonCount} onClick={decreaseCounter}>
          -
        </button>
        <button className={style.buttonCount} onClick={increaseCounter}>
          +
        </button> */}
      </div>
    </div>
  );
};

export default CartProductCard;
