import React from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { setSort } from "../../redux/actions";
import style from "./ToolBar.module.css";

const ToolBar = () => {
  const location = useLocation();

  // Acá se hace el dispatch para configurar el eventual renderizado en el estado global
  const dispatch = useDispatch();
  const setSortProductsHandler = (event) => {
    dispatch(setSort(event.target.value));
  };

  return (
    <div>
      {location.pathname === "/home" && (
        <div className={style.container}>
          <div className={style.divSelect}>
            <select onChange={setSortProductsHandler} className={style.select}>
              <option value="notSorted">Ordenar...</option>
              <option value="MC">Mas caros</option>
              <option value="MB">Mas baratos </option>
              <option value="MV">Mayor Antiguedad</option>
              <option value="MN">Menor Antiguedad </option>
            </select>
          </div>
          <div className={style.divSelect}>
            <select
              /* onChange={setFilterByDietHandler} */ className={style.select}
            >
              <option value="allDiets">Producto</option>
              {/* {dietsByName.map((diet, index) => {
            return (
              <option value={diet} key={index}>
                {diet}
              </option>
            );
          })} */}
            </select>
            <div className={style.divSelect}>
              <select
                /* onChange={setFilterBySourceHandler} */ className={
                  style.select
                }
              >
                <option value="allRecipes">Otro filtro</option>
                <option value="apiRecipes">Genérico</option>
                <option value="dbRecipes">Genérico</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolBar;
