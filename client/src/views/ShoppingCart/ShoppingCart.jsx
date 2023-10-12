import style from "./ShoppingCart.module.css";
import CartProductContainer from "../../components/CartProductContainer/CartProductContainer";
import { useSelector, useDispatch } from "react-redux";
import { postCart } from "../../redux/actions";
import React, { useState, useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const REACT_APP_PUBLIC_MP_KEY = process.env.REACT_APP_PUBLIC_MP_KEY;

const ShoppingCart = () => {
  const dispatch = useDispatch();

  const cartProducts = useSelector((state) => state.cartProducts);
  console.log(cartProducts);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago(REACT_APP_PUBLIC_MP_KEY);

  const createPreference = async () => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/cart/create_preference`,
        {
          description: "Demo de compra",
          price: 100,
          quantity: 1,
          currency_id: "ARS",
        }
      );

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const collectionStatus = urlParams.get("collection_status");
    const status = urlParams.get("status");

    if (
      (collectionStatus === "approved" || status === "approved") &&
      (collectionStatus || status)
    ) {
      alert("Compra exitosa!");
    }
  }, []);

  const cartArray = Array.isArray(cartProducts)
    ? cartProducts.reduce((result, product) => {
        const existingProduct = result.find((item) => item.id === product.id);
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          result.push({
            id: product.id,
            quantity: 1,
          });
        }
        return result;
      }, [])
    : [];

  const cartToDispatch = { products: cartArray };

  const postCartHandler = () => {
    dispatch(postCart(cartToDispatch));
  };

  return (
    <div className={style.background}>
      <CartProductContainer />
      <button className={style.buttonComprar} onClick={handleBuy}>
        Comprar!
      </button>
      {preferenceId && <Wallet initialization={{ preferenceId }} />}
    </div>
  );
};

export default ShoppingCart;
