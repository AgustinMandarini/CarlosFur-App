import style from "./ShoppingCart.module.css";
import CartProductContainer from "../../components/CartProductContainer/CartProductContainer";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const REACT_APP_PUBLIC_MP_KEY = process.env.REACT_APP_PUBLIC_MP_KEY;

const ShoppingCart = () => {
  const cartProducts = useSelector((state) => state.cartProducts);

  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago(REACT_APP_PUBLIC_MP_KEY);

  function transformCartProducts(cartProducts) {
    const productMap = {};

    cartProducts.forEach((product) => {
      const productId = product.id;
      if (!productMap[productId]) {
        productMap[productId] = {
          description: product.name,
          unit_price: product.price,
          total_price: product.price,
          quantity: 1,
          currency_id: "ARS",
        };
      } else {
        productMap[productId].quantity++;
        productMap[productId].total_price += product.unit_price;
      }
    });

    const result = Object.values(productMap);
    return result;
  }

  const transformedProducts = transformCartProducts(cartProducts);

  const createPreference = async () => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/cart/create_preference`,
        transformedProducts
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
