import { React, useState } from "react";
import style from "./SearchBar.module.css";
import { useLocation } from "react-router-dom";
import { getMuebleName } from "../../redux/actions";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const location = useLocation();
  const [characterName, setCharacterName] = useState("");
  const dispatch = useDispatch();

  const stateReset = () => {
    setCharacterName("");
  };
  console.log(characterName);
  const handleChange = (e) => {
    setCharacterName(e.target.value);
  };

  const handleOnClick = () => {
    dispatch(getMuebleName(characterName));
    stateReset();
  };
  return (
    <div>
      {location.pathname === "/home" && (
        <div className={style.divSerchBar}>
          <input
            placeholder="             mueble..."
            className={style.inputSearch}
            type="search"
            onChange={handleChange}
            onClick={handleOnClick}
          />
          <button type="submit" className={style.addButton}>
            Buscar
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
