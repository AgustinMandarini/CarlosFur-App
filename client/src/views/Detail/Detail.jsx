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

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const stateDetail = useSelector((state) => state.detail);
  const cartProducts = useSelector((state) => state.cartProducts);

  const countForProductID = cartProducts.reduce((count, product) => {
    if (product.id === Number(id)) {
      return count + 1;
    }
    return count;
  }, 0);
  const [counter, setCounter] = useState(0);
  const [product, setProduct] = useState(0);

  const increaseCounter = () => {
    /* Contador */
    setCounter(counter + 1);

    /* Se suma el producto al carrito */
    setProduct(1);
    dispatch(postCartProduct(Number(id)));
    setProduct(0);
  };

  const decreaseCounter = () => {
    /* Contador */
    if (counter > 0) {
      setCounter(counter - 1);
    }

    /* Se quita el producto del carrito */
    setProduct(-1);
    dispatch(deleteCartProduct(Number(id)));
    setProduct(0);
  };

  useEffect(() => {
    if (cartProducts.length === 0) {
      localStorage.clear();
    } else {
      updateLocalStorage(cartProducts);
    }
  }, [cartProducts]);

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
            <p className={style.p2}>{stateDetail.name}</p>
            <p className={style.p2}>${stateDetail.price}</p>
          </div>
          <div className={style.texto}>
            <p className={style.p}>{stateDetail.description}</p>
            <p className={style.p}>Altura: {stateDetail.height} </p>
            <p className={style.p}>Profundidad: {stateDetail.depth} </p>
            <p className={style.p}>Ancho: {stateDetail.width}</p>
            <p className={style.p}>Peso: {stateDetail.weight}</p>
            <p className={style.p}>Color: {stateDetail.color}</p>
            <div className={style.counterContainer}>
              <button className={style.buttonCount} onClick={decreaseCounter}>
                -
              </button>
              <p className={style.counterValue}>{countForProductID}</p>
              <button className={style.buttonCount} onClick={increaseCounter}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
