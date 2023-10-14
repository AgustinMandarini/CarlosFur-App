// ToolBar.jsx
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import {
  setColor,
  setPriceRange,
  setProductType,
  setMaterial, // Nuevo action para filtrar por material
  setSort,
} from "../../redux/actions";
import style from "./ToolBar.module.css";
import filter from "./../../imagenes/filter.png";
<<<<<<< HEAD

=======
>>>>>>> a1e061cdf6bc101c19f6822f1c200be4ae4b7ee6

const ToolBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const productTypeList = useSelector((state) => state.productType);
  const materialList = useSelector((state) => state.materialState);
  const productList = useSelector((state) => state.muebles);
  const coloresList = useSelector((state) => state.colorState);

  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

<<<<<<< HEAD
  const productTypeNames = productTypeList.map(
    (productType) => productType.name
  );
  const materialNames = materialList.map((material) => material.name);
=======
  const productTypeNames = productTypeList.map((productType) => productType);

  const materialNames = materialList.map((material) => material);
>>>>>>> a1e061cdf6bc101c19f6822f1c200be4ae4b7ee6

  const productPrices = productList.map((product) => product.price);
  const sortedProductPrices = [...productPrices].sort((a, b) => a - b);

  const chunkSize = Math.ceil(sortedProductPrices.length / 3);
  const chunk = (arr, size) => arr.slice(0, size);

  const cheapPrices = chunk(sortedProductPrices, chunkSize);
  const middlePrices = chunk(sortedProductPrices.slice(chunkSize), chunkSize);
  const highPrices = chunk(sortedProductPrices.slice(2 * chunkSize), chunkSize);

  const setSortProductsHandler = (event) => {
    dispatch(setSort(event.target.value));
  };

  const setFilterByProductTypeHandler = (event) => {
    dispatch(setProductType(event.target.value));
  };

  const setFilterByColorHandler = (event) => {
    dispatch(setColor(event.target.value));
  };

  const setFilterByMaterialHandler = (event) => {
<<<<<<< HEAD
=======
    console.log(event.target.value);
>>>>>>> a1e061cdf6bc101c19f6822f1c200be4ae4b7ee6
    dispatch(setMaterial(event.target.value));
  };

  const setFilterByPriceHandler = (event) => {
    dispatch(setPriceRange(event.target.value));
  };

  return (
    <div className={style.cntnToolBar}>
      {location.pathname === "/home" && (
        <div className={style.container}>
<<<<<<< HEAD
=======
          

>>>>>>> a1e061cdf6bc101c19f6822f1c200be4ae4b7ee6
          <div className={style.divSelect}>
            <Form.Select
              onChange={setFilterByProductTypeHandler}
              size="sm"
              className={style.select}
            >
              <option value="allProductTypes">Tipo de ambiente</option>
              {productTypeNames &&
<<<<<<< HEAD
                productTypeNames.map((productType, index) => (
                  <option value={productType} key={index}>
                    {productType}
=======
                productTypeNames.map((productType) => (
                  <option value={productType.id} key={productType.id}>
                    {productType.name}
>>>>>>> a1e061cdf6bc101c19f6822f1c200be4ae4b7ee6
                  </option>
                ))}
            </Form.Select>
          </div>

          <div className={style.filterIcon} onClick={toggleFilters}>
            <span>Filtrados</span>
            <img src={filter} alt="" className={style.filter} />
          </div>
          {showFilters && (
            <div className={style.filterOptions}>
<<<<<<< HEAD
              {/* ... Otro código ... */}

=======
>>>>>>> a1e061cdf6bc101c19f6822f1c200be4ae4b7ee6
              <div className={style.divSelect}>
                <Form.Select
                  onChange={setFilterByMaterialHandler}
                  size="sm"
                  className={style.select}
                >
                  <option value="allMaterials">Todos los Materiales</option>
                  {materialNames &&
<<<<<<< HEAD
                    materialNames.map((material, index) => (
                      <option value={material} key={index}>
                        {material}
=======
                    materialNames.map((material) => (
                      <option value={material.id} key={material.id}>
                        {material.name}
>>>>>>> a1e061cdf6bc101c19f6822f1c200be4ae4b7ee6
                      </option>
                    ))}
                </Form.Select>
              </div>

              <div className={style.divSelect}>
                <Form.Select
                  onChange={setFilterByColorHandler}
                  size="sm"
                  className={style.select}
                >
                  <option value="allColors">Todos los Colores</option>
                  {coloresList.map((color) => {
                    return (
                      <option value={color.id} key={color.id}>
                        {color.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>

              {/* <div className={style.divSelect}>
                <Form.Select
                  onChange={setFilterByPriceHandler}
                  size="sm"
                  className={style.select}
                >
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
                </Form.Select>
              </div>
<<<<<<< HEAD

=======
 */}
>>>>>>> a1e061cdf6bc101c19f6822f1c200be4ae4b7ee6
              <div className={style.divSelect}>
                <Form.Select
                  size="sm"
                  onChange={setSortProductsHandler}
                  className={style.select}
                >
                  <option value="notSorted">Ordenar...</option>
<<<<<<< HEAD
                  <option value="DESC">Mas caros</option>
                  <option value="ASC">Mas baratos </option>
                  {/* <option value="MV">Mayor Antiguedad</option>
              <option value="MN">Menor Antiguedad </option> */}
                </Form.Select>
              </div>

              {/* ... Otro código ... */}
=======
                  <option value="desc">Mayor precio</option>
                  <option value="asc">Menor precio</option>
                </Form.Select>
              </div>

              {/* ...otros selectores... */}
>>>>>>> a1e061cdf6bc101c19f6822f1c200be4ae4b7ee6
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ToolBar;
