import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import style from "./CartProductContainer.module.css";
import CartProductCard from "../CartProductCard/CartProductCard";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const CartProductContainer = () => {
  const cartProducts = useSelector((state) => state.cartProducts);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    // Obtener datos del carrito desde el localStorage al montar el componente
    const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
    setCartData(cartFromLocalStorage);
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
      ) : cartData.length > 0 ? (
        cartData.map((m) => (
          <div className="card" key={m.id}>
            <CartProductCard
              id={m.id}
              name={m.name}
              totalPrice={m.totalPrice}
              count={m.count}
            />
            {console.log(m)}
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
      )}{" "}

    </div>
  );
};
export default CartProductContainer;
