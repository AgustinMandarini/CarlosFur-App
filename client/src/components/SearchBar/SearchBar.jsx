import { React, useState, useEffect } from "react";
import style from "./SearchBar.module.css";
import { useLocation } from "react-router-dom";
import { getProductByName, setName } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { InputGroup, Form, Button } from "react-bootstrap";

const SearchBar = () => {
  const location = useLocation();
  const [products, setNameProducts] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (products === "") {
      dispatch(getProductByName(products));
      dispatch(setName(false));
    }
  }, [products]);

  useEffect(() => {
    const performSearch = async () => {
      dispatch(getProductByName(products));
      if (products !== "") {
        dispatch(setName(true));
      }
    };

    const timer = setTimeout(performSearch, 500);

    return () => clearTimeout(timer);
  }, [products, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameProducts(e.target.value);
  };

  return (
    <div className={style.divSerchBar}>
      {location.pathname === "/home" && (
        <InputGroup size="sm">
          <Form.Control
            placeholder="buscar mueble..."
            onChange={handleSubmit}
            className={style.inputSearch}
          />
        </InputGroup>
      )}
    </div>
  );
};

export default SearchBar;
