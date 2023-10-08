import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartProduct, postCartProduct } from "../../redux/actions";

const CartProductCard = (props) => {
  const dispatch = useDispatch();

  const deleteProduct = () => {
    dispatch(deleteCartProduct(props.id));
  };

  const postProduct = () => {
    dispatch(postCartProduct(props.id));
  };
  return (
    <div>
      <h1>Nombre: {props.name}</h1>
      <h3>Cantidad: {props.count}</h3>
      <h3>Precio Total: {props.totalPrice}</h3>
      <h3>ID: {props.id}</h3>
      <button onClick={deleteProduct}>-</button>
      <button onClick={postProduct}>+</button>
    </div>
  );
};

export default CartProductCard;
