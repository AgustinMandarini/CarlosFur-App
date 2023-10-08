import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import style from "./CartProductContainer.module.css";
import CartProductCard from "../CartProductCard/CartProductCard";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const CartProductContainer = () => {
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

  const [cartProducts, setCartProducts] = useState(initialCart);

  useEffect(() => {
    // Intenta obtener los datos del carrito desde el localStorage
    const cartDataFromLocalStorage = JSON.parse(localStorage.getItem("cart"));

    // Verifica si hay datos en el localStorage
    if (cartDataFromLocalStorage && Array.isArray(cartDataFromLocalStorage)) {
      // Si hay datos en el localStorage, cárgalos en el estado local
      setCartProducts(cartDataFromLocalStorage);
    }
  }, []);

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

    return result;
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
        cartProductCards.map((m) => (
          <div className="card" key={m.id}>
            <CartProductCard
              id={m.id}
              name={m.name}
              totalPrice={m.totalPrice}
              count={m.count}
            />
          </div>
        ))
      ) : (
        <div className={style.p}>
          <Link className={style.link} to="/home">
            <p>Añadir al carrito</p>
          </Link>
        </div>
      )}
      {shouldRenderTotalPrice && (
        <p className={style.p}>Precio Total de la compra: {totalPriceSum}</p>
      )}
    </div>
  );
};
export default CartProductContainer;
