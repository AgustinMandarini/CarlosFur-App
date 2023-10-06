import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../Card/Card";
import CartProductCard from "../CartProductCard/CartProductCard";

const CartProductContainer = () => {
  const cartProducts = useSelector((state) => state.cartProducts);

  const cartProductCards = cartProducts.reduce((result, product) => {
    const existingProduct = result.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.count += 1;
      existingProduct.totalPrice += product.price;
    } else {
      result.push({
        id: product.id,
        count: 1,
        totalPrice: product.price,
        name: product.name,
      });
    }

    return result.sort((a, b) => a.id - b.id);
  }, []);

  const sumTotalPrices = (cartProductCards) => {
    return cartProductCards.reduce((total, product) => {
      return total + product.totalPrice;
    }, 0);
  };
  const totalPriceSum = sumTotalPrices(cartProductCards);

  const shouldRenderTotalPrice = cartProductCards.length > 0;

  return (
    <div className="container">
      {cartProductCards.length > 0 ? (
        cartProductCards.map((m) => {
          return (
            <div className="card" key={m.id}>
              <CartProductCard
                id={m.id}
                name={m.name}
                totalPrice={m.totalPrice}
                count={m.count}
              />
            </div>
          );
        })
      ) : (
        <div className="noProducts">
          <h1>No se ha añadido nada al carrito</h1>
        </div>
      )}
      {shouldRenderTotalPrice && (
        <h1>Precio Total de la compra: {totalPriceSum}</h1>
      )}{" "}
    </div>
  );
};

export default CartProductContainer;
