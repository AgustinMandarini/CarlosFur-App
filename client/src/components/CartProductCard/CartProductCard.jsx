import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartProduct, postCartProduct} from "../../redux/actions";
import style from "./CartProductCard.module.css";

const CartProductCard = (props) => {
  const dispatch = useDispatch();

  const countForProductID = useSelector((state) =>
    state.cartProducts.reduce((count, product) => {
      if (product.id === props.id) {
        return count + product.count;
      }
      return count;
    }, 0)
  );

  const deleteProduct = () => {
    dispatch(deleteCartProduct(props.id));
  };

  const postProduct = () => {
    dispatch(postCartProduct(props.id));
  };

  return (
    <div className={style.divCard}>
      <p className={style.prop}>
        <strong>{props.name}</strong>
      </p>
      <p className={style.prop}>Cantidad: {countForProductID}</p> {/* Usa countForProductID */}
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
  );
};

export default CartProductCard;