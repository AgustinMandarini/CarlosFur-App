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
    if (products !== "") {
      dispatch(getProductByName(products));
      dispatch(setName(true));
    }
  }, [products]);

  const handleChange = (e) => {
    e.preventDefault();
    setNameProducts(e.target.value);
  };

  return (
    <div className={style.divSerchBar}>
      {location.pathname === "/home" && (
        <InputGroup size="sm">
          <Form.Control
            placeholder="buscar mueble..."
            onChange={handleChange}
            className={style.inputSearch}
          />
        </InputGroup>
      )}
    </div>
  );
};

export default SearchBar;

// import { React, useState } from "react";
// import style from "./SearchBar.module.css";
// import { useLocation } from "react-router-dom";
// import { getProductByName, setName } from "../../redux/actions";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { InputGroup, Form, Button } from "react-bootstrap";

// const SearchBar = () => {
//   const location = useLocation();
//   const [products, setNameProducts] = useState("");
//   const dispatch = useDispatch();

//   const handleOnClick = (e) => {
//     e.preventDefault();
//     dispatch(getProductByName(products));
//     dispatch(setName(true));
//   };

//   useEffect(() => {
//     if (products === "") {
//       dispatch(getProductByName(products));
//       dispatch(setName(false));
//     }
//   }, [products]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setNameProducts(e.target.value);
//   };

//   return (
//     <div className={style.divSerchBar}>
//       {location.pathname === "/home" && (
//         <InputGroup size="sm">
//           <Form.Control
//             placeholder="buscar mueble..."
//             onChange={handleSubmit}
//             className={style.inputSearch}
//           />
//           <Button className="ms-1" variant="dark" onClick={handleOnClick}>
//             Buscar
//           </Button>
//         </InputGroup>
//       )}
//     </div>
//   );
// };

// export default SearchBar;
