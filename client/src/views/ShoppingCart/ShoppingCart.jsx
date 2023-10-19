import style from "./ShoppingCart.module.css";
import CartProductContainer from "../../components/CartProductContainer/CartProductContainer";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { emptyCart } from "../../redux/actions";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const REACT_APP_PUBLIC_MP_KEY = process.env.REACT_APP_PUBLIC_MP_KEY;
const CALLBACK_URL = process.env.REACT_APP_AUTH0_CALLBACK_URL;

const ShoppingCart = ({ show, handleClose, handleShow }) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cartProducts);
  const { isAuthenticated } = useAuth0();
  const [order, setOrder] = useState(false);
  const history = useHistory();

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
          quantity: product.count,
          currency_id: "ARS",
        };
      } else {
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
    if (isAuthenticated) {
      const id = await createPreference();
      if (id) {
        setOrder(true);
        setPreferenceId(id);
      }
    } else {
      history.push("/logIn");
      handleClose();
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
      toast.success("Compra realizada", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      dispatch(emptyCart());
      localStorage.clear();
      setOrder(false);
      setTimeout(() => {
        window.location.href = CALLBACK_URL;
      }, 4000);
    }
  }, [order]);

  return (
    handleShow && (
      <Offcanvas
        show={show}
        onHide={handleClose}
        className={style.cntnShoppingCart}
        placement="end"
      >
        <Offcanvas.Header className={style.Header}>
          <Offcanvas.Title className={style.cartTittle}>
            CARRITO
          </Offcanvas.Title>
          <button
            className={`${style.customCloseButton} close`}
            onClick={handleClose}
          >
            X
          </button>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CartProductContainer />
          <button className={style.buttonComprar} onClick={handleBuy}>
            Comprar!
          </button>
          {preferenceId && <Wallet initialization={{ preferenceId }} />}
        </Offcanvas.Body>
      </Offcanvas>
    )
  );
};

export default ShoppingCart;
