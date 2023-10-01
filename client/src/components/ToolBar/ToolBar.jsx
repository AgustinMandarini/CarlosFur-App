import React from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { setProductType, setSort } from "../../redux/actions";
import style from "./ToolBar.module.css";

const ToolBar = () => {
  const location = useLocation();

  const productTypeList = useSelector((state) => state.productType);
  const productTypeNames = productTypeList.map(
    (productType) => productType.name
  );

  // Acá se hacen los dispatchs para configurar el eventual renderizado en el estado global
  const dispatch = useDispatch();

  const setSortProductsHandler = (event) => {
    dispatch(setSort(event.target.value));
  };

  const setFilterByProductTypeHandler = (event) => {
    dispatch(setProductType(event.target.value));
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
          <div>
            <select
              onChange={setFilterByProductTypeHandler}
              className="selectMain"
            >
              <option value="allProductTypes">Tipo de ambiente</option>
              {productTypeNames.map((productType, index) => {
                return (
                  <option value={productType} key={index}>
                    {productType}
                  </option>
                );
              })}
            </select>

            {/* <select onChange={setFilterBySourceHandler} className="selectMain">
              <option value="allRecipes">Originales o Creadas?</option>
              <option value="apiRecipes">Recetas Originales</option>
              <option value="dbRecipes">Recetas Creadas por Vos!</option>
            </select> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolBar;
