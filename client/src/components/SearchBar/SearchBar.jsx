import { React, useState } from "react";
import style from "./SearchBar.module.css";
import { useLocation } from "react-router-dom";
import { getProductByName } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { InputGroup, Form, Button } from "react-bootstrap";

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
        </InputGroup>
      )}
    </div>
  );
};

export default SearchBar;
