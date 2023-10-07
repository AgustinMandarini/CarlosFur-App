import style from "./ShoppingCart.module.css";
import CartProductContainer from "../../components/CartProductContainer/CartProductContainer";
const ShoppingCart = () => {
  return (
    <div className={style.background}>
      <CartProductContainer />
    </div>
  );
};

export default ShoppingCart;
