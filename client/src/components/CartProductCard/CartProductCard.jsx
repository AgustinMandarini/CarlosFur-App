import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartProduct,
  postCartProduct,
  updateCart,
} from "../../redux/actions";
import style from "./CartProductCard.module.css";
import defaultImage from "../../imagenes/default.png";

const CartProductCard = (props) => {
  const dispatch = useDispatch();

  const deleteProduct = () => {
    dispatch(deleteCartProduct(props.id));
    props.setCheckIncrementAndDecrement(true);
  };

  const postProduct = () => {
    dispatch(postCartProduct(props.id));
    props.setCheckIncrementAndDecrement(true);
  };

  return (
    <div className={style.divCard}>
      <img
        src={props.imagePath ? props.imagePath : defaultImage}
        alt={props.imagePath ? props.imagePath : "defaultImage"}
        className={props.imagePath ? style.img2 : style.img}
      />
      <div className={style.propsCartCard}>
        <p className={style.prop}>
          <strong>{props.name}</strong>
        </p>
        <p className={style.prop}>Cantidad: {props.count}</p>{" "}
        <p className={style.prop}>Precio Total: {props.totalPrice}</p>
        <div className={style.counterContainer}>
          <button className={style.buttonCount} onClick={deleteProduct}>
            -
          </button>
          <button className={style.buttonCount} onClick={postProduct}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
