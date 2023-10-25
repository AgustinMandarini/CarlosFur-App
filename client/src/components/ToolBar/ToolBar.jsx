// ToolBar.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  setColor,
  setMaterial,
  setProductType,
  setSort,
} from "../../redux/actions";
import style from "./ToolBar.module.css";

const ToolBar = () => {
  const location = useLocation();

  const productTypeList = useSelector((state) => state.productType);
  const materialList = useSelector((state) => state.materialState);
  const coloresList = useSelector((state) => state.colorState);
  const nameState = useSelector((state) => state.nameState);
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    if (nameState === true) {
      const defaultOptionValue = "allOptions"; // Valor que debe coincidir con las opciones que quieres seleccionar

      const selects = document.querySelectorAll(`.${style.select}`);
      selects.forEach((select) => {
        select.value = defaultOptionValue;
      });

      // Dispara manualmente los eventos "change" para que se refleje en el estado de Redux
      selects.forEach((select) => {
        const event = new Event("change", { bubbles: true });
        select.dispatchEvent(event);
      });
    }
  }, [nameState]);

  const productTypeNames = productTypeList.map((productType) => productType);
  const materialNames = materialList.map((material) => material);

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

  const setFilterByMaterialHandler = (event) => {
    dispatch(setMaterial(event.target.value));
  };

  return (
    <div className={style.cntnToolBar}>
      {location.pathname === "/home" && (
        <div className={style.container}>
          <div className={style.divSelect}>
            <Form.Select
              onChange={setFilterByProductTypeHandler}
              size="sm"
              className={style.select}
            >
              <option value="allOptions">Tipo de ambiente</option>
              {productTypeNames &&
                productTypeNames.map((productType) => (
                  <option value={productType.id} key={productType.id}>
                    {productType.name}
                  </option>
                ))}
            </Form.Select>
          </div>

          {/* <div className={style.filterIcon} onClick={toggleFilters}>
            <span>Filtrados</span>
          </div> */}

          <div className={style.divSelect}>
            <Form.Select
              onChange={setFilterByMaterialHandler}
              size="sm"
              className={style.select}
            >
              <option value="allOptions">Todos los Materiales</option>
              {materialNames &&
                materialNames.map((material) => (
                  <option value={material.id} key={material.id}>
                    {material.name}
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
              <option value="allOptions">Todos los Colores</option>
              {coloresList.map((color) => {
                return (
                  <option value={color.id} key={color.id}>
                    {color.name}
                  </option>
                );
              })}
            </Form.Select>
          </div>

          <div className={style.divSelect}>
            <Form.Select
              size="sm"
              onChange={setSortProductsHandler}
              className={style.select}
            >
              <option value="allOptions">Ordenar...</option>
              <option value="desc">Mayor precio</option>
              <option value="asc">Menor precio</option>
            </Form.Select>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolBar;
