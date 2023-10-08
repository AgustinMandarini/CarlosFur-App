import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartProductContainer from "../../components/CartProductContainer/CartProductContainer";
import style from "./ShoppingCart.module.css";
const ShoppingCart = () => {
  const stateCartProducts = useSelector((state) => state.cartProducts);
  const [carrito, setCarrito] = useState([]);
  const updateLocalStorage = (cart) => {
    const carro = [...carrito, cart];
    localStorage.setItem("cart", JSON.stringify(carro));
  };
  useEffect(() => {
    updateLocalStorage(stateCartProducts);
  }, [stateCartProducts]);
  return (
    <div className={style.background}>
      <CartProductContainer />
    </div>
  );
};

export default ShoppingCart;
