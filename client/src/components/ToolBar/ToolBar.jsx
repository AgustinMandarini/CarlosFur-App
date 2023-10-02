import React from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import {
  setColor,
  setPriceRange,
  setProductType,
  setSort,
} from "../../redux/actions";
import style from "./ToolBar.module.css";

const ToolBar = () => {
  const location = useLocation();

  const productTypeList = useSelector((state) => state.productType);
  const productList = useSelector((state) => state.muebles);

  // Armado de opciones por tipo de producto
  const productTypeNames = productTypeList.map(
    (productType) => productType.name
  );

  // Armado de opciones por color
  const productColors = [
    ...new Set(productList.map((product) => product.color)),
  ];
  // Armado de opciones "Precios Baratos", "Precios Medios", "Precios Altos"
  const productPrices = productList.map((product) => product.price);
  const cheapPrices = [];
  const middlePrices = [];
  const highPrices = [];
  const sortedProductPrices = productPrices.sort(function (a, b) {
    return a - b;
  });
  const higherPrice = sortedProductPrices[sortedProductPrices.length - 1];
  const dividedByThree = higherPrice / 3;
  const dividedByThreeTimesTwo = dividedByThree * 2;
  productPrices.forEach(function (price) {
    if (price >= 0 && price < dividedByThree) {
      cheapPrices.push(price);
    } else if (price >= dividedByThree && price < dividedByThreeTimesTwo) {
      middlePrices.push(price);
    } else {
      highPrices.push(price);
    }
  });
  // Acá se hacen los dispatchs para configurar el eventual renderizado en el estado global
  const dispatch = useDispatch();

  const setSortProductsHandler = (event) => {
    dispatch(setSort(event.target.value));
  };

  const setFilterByProductTypeHandler = (event) => {
    dispatch(setProductType(event.target.value));
  };
  const setFilterByColorHandler = (event) => {
    dispatch(setColor(event.target.value));
  };
  const setFilterByPriceHandler = (event) => {
    dispatch(setPriceRange(event.target.value));
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

            <select onChange={setFilterByColorHandler} className="selectMain">
              <option value="allColors">Colores</option>
              {productColors.map((color, index) => {
                return (
                  <option value={color} key={index}>
                    {color}
                  </option>
                );
              })}
            </select>
            <select onChange={setFilterByPriceHandler} className="selectMain">
              <option value={[]}>Precios</option>
              <option value={cheapPrices}>
                Precios entre {cheapPrices[0]} y{" "}
                {cheapPrices[cheapPrices.length - 1]}
              </option>
              <option value={middlePrices}>
                Precios entre {middlePrices[0]} y{" "}
                {middlePrices[middlePrices.length - 1]}
              </option>
              <option value={highPrices}>
                Precios entre {highPrices[0]} y{" "}
                {highPrices[highPrices.length - 1]}
              </option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolBar;
