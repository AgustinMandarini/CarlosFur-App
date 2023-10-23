import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./CartProductContainer.module.css";
import { updateLocalStorage } from "../LocalStorage/LocalStorageFunctions";
import CartProductCard from "../CartProductCard/CartProductCard";
import { postCart, updateCart } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

const CartProductContainer = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cartProducts);
  const userIsAuthenticated = localStorage.getItem("token") !== null;
  const user = localStorage.getItem("user");
  const cartId = localStorage.getItem("cartId");
  const [checkIncrementAndDecrement, setCheckIncrementAndDecrement] =
    useState(false);

  const calculateTotalPrice = (cartProducts) => {
    return cartProducts.reduce((total, product) => {
      return total + product.price * product.count;
    }, 0);
  };
  const cartTotal = calculateTotalPrice(cartProducts);

  useEffect(() => {
    if (checkIncrementAndDecrement === true) {
      if (user && cartId) {
        const userParse = JSON.parse(user);
        const cartIdParse = JSON.parse(cartId);
        const newProducts = cartProducts.map((item) => ({
          id: item.id,
          quantity: item.count,
        }));

        const data = {
          userId: userParse.userId,
          products: newProducts.filter((item) => item.quantity !== 0),
        };
        if (userIsAuthenticated && cartIdParse) {
          dispatch(updateCart(cartIdParse, data));
          setCheckIncrementAndDecrement(true);
        }
      }
    }
  }, [cartProducts, checkIncrementAndDecrement]);

  useEffect(() => {
    if (!userIsAuthenticated) {
      if (cartProducts.length === 0) {
        localStorage.removeItem("cart");
      } else {
        updateLocalStorage(cartProducts);
        localStorage.getItem("cart");
      }
    }
  }, [cartProducts]);
  return (
    <div className={style.cntnCart}>
      {cartProducts.length > 0 ? (
        cartProducts.map((m) => {
          return (
            <div className={style.cntnCard} key={m.id}>
              <CartProductCard
                id={m.id}
                name={m.name}
                count={m.count}
                totalPrice={m.price}
                imagePath={m.imagePath}
                setCheckIncrementAndDecrement={setCheckIncrementAndDecrement}
              />
            </div>
          );
        })
      ) : (
        <div className="noProducts">
          <h1>No se ha añadido nada al carrito</h1>
        </div>
      )}
      <p className={style.p}>Precio total de la compra: ${cartTotal} </p>
    </div>
  );
};
export default CartProductContainer;
