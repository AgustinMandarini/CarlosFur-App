import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartProduct,
  postCartProduct,
  deleteCartProductDirect,
  updateCart,
} from "../../redux/actions";
import style from "./CartProductCard.module.css";
import defaultImage from "../../imagenes/default.png";
import { IconTrash } from "@tabler/icons-react";

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

  const removeProduct = () => {
    dispatch(deleteCartProductDirect(props.id));
    props.setCheckIncrementAndDecrement(true);
  };

  const productTotalPrice = props.totalPrice * props.count;

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
        {/* <p className={style.prop}>Cantidad: {props.count}</p> */}
        <p className={style.prop}>Precio unitario: ${props.totalPrice}</p>
        <p className={style.prop}>Precio total: ${productTotalPrice}</p>
        <div className={style.butttons}>
          <div className={style.counterContainer}>
            <button className={style.buttonCount} onClick={deleteProduct}>
              -
            </button>

            <p className={style.propCounter}>{props.count}</p>

            <button className={style.buttonCount} onClick={postProduct}>
              +
            </button>
          </div>
          <button onClick={removeProduct} className={style.buttonDelete}>
            <IconTrash size="20px" stroke="1." />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
