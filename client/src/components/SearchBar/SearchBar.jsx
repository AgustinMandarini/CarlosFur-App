import { React, useState } from "react";
import style from "./SearchBar.module.css";
import { useLocation } from "react-router-dom";
import { getProductByName } from "../../redux/actions";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const location = useLocation();
  const [products, setNameProducts] = useState("");
  const dispatch = useDispatch();

  const handleOnClick = (e) => {
    e.preventDefault();
    console.log("Button clicked");
    dispatch(getProductByName(products));
    setNameProducts("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameProducts(e.target.value);
  };
  // useEffect(() => {
  //   dispatch(getProductByName(products))
  // }, []);

  return (
    <div>
      {location.pathname === "/home" && (
        <div className={style.divSerchBar}>
          <input
            type="search"
            placeholder="buscar products..."
            value={products}
            onChange={handleSubmit}
            className={style.inputSearch}
          />
          <button
            type="submit"
            className={style.addButton}
            onClick={handleOnClick}
          >
            {" "}
            Buscar
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
