import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./CartProductContainer.module.css";
import { updateLocalStorage } from "../LocalStorage/LocalStorageFunctions";
import CartProductCard from "../CartProductCard/CartProductCard";
const CartProductContainer = () => {
  const cartProducts = useSelector((state) => state.cartProducts);

  const cartProductCards = Array.isArray(cartProducts)
    ? cartProducts.reduce((result, product) => {
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
      }, [])
    : [];

  const sumTotalPrices = (cartProductCards) => {
    return (
      cartProductCards &&
      cartProductCards.length > 0 &&
      cartProductCards.reduce((total, product) => {
        return total + product.totalPrice;
      }, 0)
    );
  };
  const totalPriceSum = sumTotalPrices(cartProductCards);

  const shouldRenderTotalPrice = cartProductCards.length > 0;

  useEffect(() => {
    if (cartProducts.length === 0) {
      localStorage.removeItem("cart");
    } else {
      updateLocalStorage(cartProducts);
    }
  }, [cartProducts]);

  return (
    <div className={style.cntnCart}>
      {cartProductCards.length > 0 ? (
        cartProductCards.map((m) => {
          return (
            <div className={style.cntnCard} key={m.id}>
              <CartProductCard
                id={m.id}
                name={m.name}
                count={m.count}
                totalPrice={m.totalPrice}
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
        <p className={style.p}>Precio Total de la compra: {totalPriceSum}</p>
      )}
    </div>
  );
};
export default CartProductContainer;
