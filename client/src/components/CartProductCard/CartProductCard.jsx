import React from "react";

const CartProductCard = (props) => {
  return (
    <div>
      <h1>Nombre: {props.name}</h1>
      <h3>Cantidad: {props.count}</h3>
      <h3>Precio Total: {props.totalPrice}</h3>
      <h3>ID: {props.id}</h3>
    </div>
  );
};

export default CartProductCard;
