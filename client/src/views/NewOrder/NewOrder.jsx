import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { emptyCart } from "../../redux/actions";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const CALLBACK_URL = process.env.REACT_APP_AUTH0_CALLBACK_URL;

const NewOrder = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cartProducts);
  const loggedUser = useSelector((state) => state.loggedUser);
  const cart = useSelector((state) => state.cart);
  const { isAuthenticated } = useAuth0();
  const history = useHistory();
  const userIsAuthenticated = localStorage.getItem("token") !== null;

  const urlParams = new URLSearchParams(window.location.search);
  const collectionStatus = urlParams.get("collection_status");
  const status = urlParams.get("status");
  const collection_id = urlParams.get("collection_id");
  const payment_type = urlParams.get("payment_type");
  const encodedData = urlParams.get("data");
  console.log("ENCODED DATA DESDE NEWORDER: " + encodedData);
  const decodedData = atob(encodedData);
  const products = JSON.parse(decodedData);

  useEffect(() => {
    const fetchData = async () => {
      /* AGUS, EN ALGUNA PARTE DE ESTE useEffect HAY QUE MANDAR LA ORDER CON createOrderHandler.
      ACORDATE DE MODIFICAR EL CONTROLLER PARA PODER INCLUIR EL MAIL. */
      if (
        loggedUser &&
        (collectionStatus === "approved" || status === "approved")
      ) {
        try {
          const orderData = {
            collection_id: collection_id,
            cartId: localStorage.getItem("cartId"),
            payment_type: payment_type,
            e_mail: loggedUser.e_mail,
            products: products,
          };
          const response = await axios.post(
            `${REACT_APP_API_URL}/order`,
            orderData /*  acá va lo que hay que mandar */
          );

          if (response.status === 201) {
            toast.success("Compra realizada", {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 3000,
            });
            dispatch(emptyCart());
            localStorage.removeItem("cart");
            setTimeout(() => {
              window.location.href = CALLBACK_URL;
            }, 4000);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    };

    fetchData();
  }, [loggedUser]);

  return (
    <>
      <h1>ORDEN COMPLETADA</h1>
    </>
  );
};

export default NewOrder;
