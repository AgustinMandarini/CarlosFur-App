import { React, useEffect, useState } from "react";
import style from "./Detail.module.css";
import { getDetail, postCartProduct, getCart } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import imagenDefault from "./../../imagenes/default.png";
import { updateCart } from "../../redux/actions";
import Reviews from "../Reviews/Reviews";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLoader } from "../../components/PageLoader/pageLoader";
import { updateLocalStorage } from "../../components/LocalStorage/LocalStorageFunctions";

const Detail = () => {
  const { isLoading, isAuthenticated } = useAuth0();
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  const cartId = localStorage.getItem("cartId");

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const stateDetail = useSelector((state) => state.detail);
  const cartProducts = useSelector((state) => state.cartProducts) || [];
  const colorState = useSelector((state) => state.colorState);
  const userIsAuthenticated = localStorage.getItem("token") !== null;

  const handleUpdateCart = () => {
    // Verifica si user y cartId están definidos antes de analizarlos
    if (user && cartId) {
      const userParse = JSON.parse(user);
      const cartIdParse = JSON.parse(cartId);
      const newProducts = cartProducts
        .filter((product) => product && product.id !== undefined)
        .map((item) => ({
          id: item.id,
          quantity: item.count,
        }));

      const data = {
        userId: userParse.userId,
        products: newProducts,
      };
      if (cartIdParse) {
        dispatch(updateCart(cartIdParse, data));
      }
    }
  };

  const increaseCounter = () => {
    dispatch(postCartProduct(Number(id)));
    handleUpdateCart();
  };

  useEffect(() => {
    if (!userIsAuthenticated) {
      if (cartProducts.length === 0) {
        localStorage.removeItem("cart");
      } else {
        updateLocalStorage(cartProducts);
      }
    }
  }, [cartProducts]);

  useEffect(() => {
    const cartIdParse = cartId != null ? JSON.parse(cartId) : undefined;
    if (userIsAuthenticated && cartIdParse != undefined) {
      dispatch(getCart(cartIdParse));
    }
  }, []);

  const getColorName = (colorId) => {
    const color = colorState.find((color) => color.id === colorId);
    return color ? color.name : "Desconocido";
  };

  const carritoDelLocal = JSON.parse(localStorage.getItem("cart"));

  if (isLoading) {
    if (carritoDelLocal !== cartProducts) {
      return (
        <div className="page-layout">
          <PageLoader />
        </div>
      );
    }
  }

  return (
    <div className={style.cntnDetail}>
      <Button
        className={style.goBackLink}
        variant="dark"
        href="/home"
        size="sm"
      >
        Volver
      </Button>

      <div className={style.cntnCardDetail}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className={style.ImgandData}>
            <div className={style.imgContainer}>
              {stateDetail.imagePath ? (
                <>
                  <img
                    src={stateDetail.imagePath}
                    className={style.imgDetail}
                    alt="image"
                  />
                </>
              ) : (
                <img
                  src={imagenDefault}
                  className={style.imgDetail}
                  alt="image"
                />
              )}
            </div>
            <div className={style.texto}>
              <p className={style.p2}>{stateDetail.name}</p>
              <p className={style.description}>{stateDetail.description}</p>
              <p className={style.price}>${stateDetail.price}</p>
              <p className={style.p}>Altura: {stateDetail.height} </p>
              <p className={style.p}>Profundidad: {stateDetail.depth} </p>
              <p className={style.p}>Ancho: {stateDetail.width}</p>
              <p className={style.p}>Peso: {stateDetail.weight}</p>
              <p className={style.p}>
                Color: {getColorName(stateDetail.colorId)}
              </p>
              <div className={style.counterContainer}>
                <button className={style.buttonCount} onClick={increaseCounter}>
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
          <div>
            <Reviews id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
