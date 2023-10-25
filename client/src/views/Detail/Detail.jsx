import { React, useEffect, useState } from "react";
import style from "./Detail.module.css";
import {
  getDetail,
  postCartProduct,
  deleteCartProduct,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import imagenDefault from "./../../imagenes/default.png";
import { updateLocalStorage } from "../../components/LocalStorage/LocalStorageFunctions";
import { updateCart } from "../../redux/actions";
import Reviews from "../Reviews/Reviews";

const Detail = () => {
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

  const countForProductID = cartProducts
    .filter((product) => product && product.id !== undefined)
    .reduce((count, product) => {
      if (product.id === Number(id)) {
        return count + product.count;
      }
      return count;
    }, 0);
  const [counter, setCounter] = useState(0);
  const [product, setProduct] = useState(0);
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
    /* Contador */
    setCounter(counter + 1);

    /* Se suma el producto al carrito */
    setProduct(1);
    dispatch(postCartProduct(Number(id)));
    setProduct(0);
    handleUpdateCart();
  };
  //put
  const decreaseCounter = () => {
    /* Contador */
    if (counter > 0) {
      setCounter(counter - 1);
      handleUpdateCart();
    }

    /* Se quita el producto del carrito */
    setProduct(-1);
    dispatch(deleteCartProduct(Number(id)));
    setProduct(0);
  };

  const getColorName = (colorId) => {
    const color = colorState.find((color) => color.id === colorId);
    return color ? color.name : "Desconocido";
  };

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
