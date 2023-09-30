import React, { useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
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
          <div>
            <select onChange={setSortProductsHandler} className="selectMain">
              <option value="notSorted">Ordenar...</option>
              <option value="MC">Mas caros</option>
              <option value="MB">Mas baratos </option>
              <option value="MN">Mayor Antiguedad</option>
              <option value="MV">Menor Antiguedad </option>
            </select>
          </div>
          <div>
            <select
              /* onChange={setFilterByDietHandler} */ className="selectMain"
            >
              <option value="allDiets">Qué producto buscás?</option>
              {/* {dietsByName.map((diet, index) => {
            return (
              <option value={diet} key={index}>
                {diet}
              </option>
            );
          })} */}
            </select>

            <select
              /* onChange={setFilterBySourceHandler} */ className="selectMain"
            >
              <option value="allRecipes">Otro filtro</option>
              <option value="apiRecipes">Genérico</option>
              <option value="dbRecipes">Genérico</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolBar;
