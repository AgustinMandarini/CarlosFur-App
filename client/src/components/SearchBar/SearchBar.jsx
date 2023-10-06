import { React, useState } from "react";
import style from "./SearchBar.module.css";
import { useLocation } from "react-router-dom";
import { getProductByName } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { InputGroup, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
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
    <div className={style.divSerchBar}>
      {location.pathname === "/home" && (
        <InputGroup size="sm">
          <Form.Control
            placeholder="buscar mueble..."
            onChange={handleSubmit}
            className={style.inputSearch}
          />
          <Button className="ms-1" variant="dark" onClick={handleOnClick}>
            Buscar
          </Button>
          <Link to="/shoppingcart" className={style.links}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              class="bi bi-cart"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
          </Link>
        </InputGroup>
      )}
    </div>
  );
};

export default SearchBar;
