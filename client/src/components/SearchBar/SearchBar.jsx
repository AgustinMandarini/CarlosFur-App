import { React, useState } from "react";
import style from "./SearchBar.module.css";
import { useLocation } from "react-router-dom";
import { getMuebleName } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { InputGroup, Form, Button } from "react-bootstrap";

const SearchBar = () => {
  const location = useLocation();
  const [mueble, setNameMueble] = useState("");
  const dispatch = useDispatch();

  const handleOnClick = (e) => {
    e.preventDefault();
    console.log("Button clicked");
    dispatch(getMuebleName(mueble));
    setNameMueble("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameMueble(e.target.value);
  };
  // useEffect(() => {
  //   dispatch(getMuebleName(mueble))
  // }, []);

  return (
    <div className={style.divSerchBar}>
      {location.pathname === "/home" && (
        <InputGroup size="sm">
          <Form.Control
            placeholder="buscar mueble..."
            onChange={handleSubmit}
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
