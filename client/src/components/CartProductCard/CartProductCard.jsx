import { useDispatch, useSelector } from "react-redux";
import { deleteCartProduct, postCartProduct } from "../../redux/actions";
import React, { useState } from "react";

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
    <div>
      <h1>Nombre: {props.name}</h1>
      <h3>Cantidad:{countForProductID}</h3>
      <h3>Precio Total: {props.totalPrice}</h3>
      <h3>ID: {props.id}</h3>
      <button onClick={decreaseCounter}>-</button>
      <button onClick={increaseCounter}>+</button>
    </div>
  );
};

export default CartProductCard;
