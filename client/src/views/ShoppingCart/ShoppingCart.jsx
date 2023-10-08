import { useEffect } from "react";
import { useSelector } from "react-redux";
import CartProductContainer from "../../components/CartProductContainer/CartProductContainer";
import style from "./ShoppingCart.module.css";
const ShoppingCart = () => {

 const stateCartProducts =  useSelector((state)=> state.cartProducts);
//  console.log(stateCartProducts);
 const updateLocalStorage = (cart) => {
  const carrito = [];
carrito = [...carrito, cart];
  localStorage.setItem('cart', JSON.stringify(carrito));
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
