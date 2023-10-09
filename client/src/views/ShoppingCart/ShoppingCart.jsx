import style from "./ShoppingCart.module.css";
import CartProductContainer from "../../components/CartProductContainer/CartProductContainer";
import { React, useEffect } from "react";
import { postCart } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cartProducts);
  const localStorage = useSelector((state) => state.localStorage);

  /*   useEffect(() => {
    // Intenta obtener los datos del carrito desde el localStorage
    const cartDataFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
  }, []); */

  const cartArray = cartProducts.reduce((result, product) => {
    const existingProduct = result.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      result.push({
        id: product.id,
        quantity: 1,
      });
    }
    return result;
  }, []);
  const cartToDispatch = { products: cartArray };
  const postCartHandler = () => {
    dispatch(postCart(cartToDispatch));
  };
  console.log(localStorage);
  return (
    <div className={style.background}>
      <CartProductContainer />
      <button onClick={postCartHandler}>Comprar!</button>
    </div>
  );
};

export default ShoppingCart;
