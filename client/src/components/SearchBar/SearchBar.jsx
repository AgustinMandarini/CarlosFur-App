import React from "react";
import style from "./SearchBar.module.css";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname === "/home" && (
        <div className={style.divSerchBar}>
          <input
            placeholder="mueble..."
            className={style.inputSearch}
            type="search"
          />
          <button type="submit" className={style.addButton}>
            buscar
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
