import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../Card/Card";

const CartProductContainer = () => {
  const cartProducts = useSelector((state) => state.cartProducts);
  return (
    <div className="container">
      {cartProducts.length > 0 ? (
        cartProducts.map((m) => {
          return (
            <div className="card" key={m.id}>
              <Card
                imagePath={m.imagePath}
                name={m.name}
                description={m.description}
                price={m.price}
                id={m.id}
              />
            </div>
          );
        })
      ) : (
        <div className="noProducts">
          <h1>No se ha añadido nada al carrito</h1>
        </div>
      )}
    </div>
  );
};

export default CartProductContainer;
