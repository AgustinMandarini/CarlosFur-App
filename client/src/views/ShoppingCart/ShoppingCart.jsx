import style from "./ShoppingCart.module.css";
import CartProductContainer from "../../components/CartProductContainer/CartProductContainer";
import { React, useEffect } from "react";

const ShoppingCart = () => {
  useEffect(() => {
    // Intenta obtener los datos del carrito desde el localStorage
    const cartDataFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
  }, []);
  return (
    <div className={style.background}>
      <CartProductContainer />
    </div>
  );
};

export default ShoppingCart;
