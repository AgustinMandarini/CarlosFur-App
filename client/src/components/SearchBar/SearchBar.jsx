import { React, useState } from "react";
import style from "./SearchBar.module.css";
import { useLocation } from "react-router-dom";
import { getMuebleName } from "../../redux/actions";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const location = useLocation();
  const [mueble, setNameMueble] = useState("");
  const dispatch = useDispatch();


  const handleOnClick = (e) => {
    e.preventDefault();
    console.log("Button clicked")
    dispatch(getMuebleName(mueble));
    setNameMueble("")
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    setNameMueble(e.target.value)
  }
  // useEffect(() => {
  //   dispatch(getMuebleName(mueble))
  // }, []);


  return (
    <div>
      {location.pathname === "/home" && (
        <div className={style.divSerchBar}>
          <input
            type="search"
            placeholder="buscar mueble..."
            value={mueble}
            onChange={handleSubmit}
          />
             <button type="submit" className={style.addButton} onClick={handleOnClick}> Buscar</button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
