import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from "./Card.module.css";
import defaultImage from "./../../imagenes/default.png";
import { postCartProduct } from "../../redux/actions";

const Card = (props) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cartProducts);

  /* Contador */
  const [counter, setCounter] = useState(0);
  const [product, setProduct] = useState(0);

  const increaseCounter = () => {
    setCounter(counter + 1);
    setProduct(1);
    dispatch(postCartProduct(props.id));
    setProduct(0);
  };

  const decreaseCounter = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  /* Estado product */

  useEffect(() => {
    console.log("Productos en el carrito", cartProducts);
  }, [cartProducts]);
  return (
    <div className={style.container} key={props.id}>
      <Link to={`/detail/${props.id}`} className={style.nameLink}>
        {props.imagePath ? (
          <>
            <img src={props.imagePath} alt="image" className={style.imgCard} />
          </>
        ) : (
          <img src={defaultImage} alt="default image" />
        )}
        <h1 className={style.nameCard}>{props.name}</h1>
        <div className={style.divProps}>
          <p className={style.price}>${props.price}</p>
          <p className={style.description}>{props.description} </p>
        </div>
      </Link>
      <div className={style.counterContainer}>
        <button onClick={decreaseCounter}>-</button>
        <span className={style.counterValue}>{counter}</span>
        <button onClick={increaseCounter}>+</button>
      </div>
    </div>
  );
};

export default Card;
