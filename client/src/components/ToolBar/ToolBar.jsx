import React from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import style from "./ToolBar.module.css";

const ToolBar = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname === "/home" && (
        <div className={style.container}>
          <div>
            <select
              /* onChange={setSortRecipesHandler} */ className="selectMain"
            >
              <option value="notSorted">Ordenar...</option>
              <option value="A-z">Genérico</option>
              <option value="Z-a">Genérico</option>
              <option value="L-H">Genérico</option>
              <option value="H-L">Genérico</option>
            </select>
            <input
              type="search"
              placeholder="Recetas"
              autoComplete="off"
              /* onChange={setLocalNameHandler} */
              /* value={localName} */
            />

            <button /* onClick={onSearch} */>Buscar</button>
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
