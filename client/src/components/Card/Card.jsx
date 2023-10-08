import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from "./Card.module.css";
import defaultImage from "./../../imagenes/default.png";
import { deleteCartProduct, postCartProduct } from "../../redux/actions";

const Card = (props) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cartProducts);

  //LOCALSTORAGE
  const postProduct = (productId) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...cart, { id: productId, count: 1 }];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const deleteProduct = (productId) => {
    // Obtén el carrito del localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Encuentra el índice del producto que deseas eliminar
    const indexToDelete = cart.findIndex((product) => product.id === productId);

    if (indexToDelete !== -1) {
      // Elimina el producto específico del carrito en el array
      cart.splice(indexToDelete, 1);

      // Actualiza el carrito en el localStorage con el array modificado
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };
  //

  const countForProductID = cartProducts.reduce((count, product) => {
    if (product.id === props.id) {
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
    dispatch(postCartProduct(props.id));
    setProduct(0);
    postProduct(props.id);
  };

  const decreaseCounter = () => {
    /* Contador */
    if (counter > 0) {
      setCounter(counter - 1);
    }

    /* Se quita el producto del carrito */
    setProduct(-1);
    dispatch(deleteCartProduct(props.id));
    setProduct(0);
    deleteProduct(props.id);
  };
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
        <button className={style.buttonCount} onClick={decreaseCounter}>
          -
        </button>
        <span className={style.counterValue}>{countForProductID}</span>
        <button className={style.buttonCount} onClick={increaseCounter}>
          +
        </button>
      </div>
    </div>
  );
};

export default Card;
