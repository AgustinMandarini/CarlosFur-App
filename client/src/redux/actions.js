import {
  GET_MUEBLES,
  GET_DETAIL,
  POST_MUEBLES,
  GET_PRODUCT_TYPE,
  GET_MUEBLE_NAME,
  SET_IMAGE_URL,
  SET_SORT,
  SET_PRODUCTS_COPY,
} from "./types";

import axios from "axios";

export const getMuebles = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/product");
    const muebles = apiData.data;
    return dispatch({
      type: GET_MUEBLES,
      payload: muebles,
    });
  };
};
export const getDetail = (id) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`http://localhost:3001/product/${id}`);
      const detail = apiData.data;
      dispatch({
        type: GET_DETAIL,
        payload: detail,
      });
    } catch (error) {
      console.error("Error en la acción getDetail:", error);
    }
  };
};
// export const getDetail = (id) => {
//   return {
//     type: GET_DETAIL,
//     payload: mueblesData.find((producto) => producto.id === parseInt(id)), // esta es la provisoria
//   };
// };

export const postMueble = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/product`,
        payload
      ); //hacemos un post mandandole la nueva actividad
      const mueble = response.data;
      return dispatch({
        type: POST_MUEBLES,
        payload: mueble,
      }); //returnamos la action type y la actividad creada
    } catch (error) {
      alert(`No se pudo crear`);
    }
  };
};

export const setImageURL = (imageURL) => {
  return {
    type: SET_IMAGE_URL,
    payload: imageURL,
  };
};

// export { getMuebles, getDetail };

export const getProductType = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/productType");
      // console.log(response.data);
      const productType = response.data;
      return dispatch({
        type: GET_PRODUCT_TYPE,
        payload: productType,
      });
    } catch (error) {
      alert("No se encontro un tipo de producto");
    }
  };
};

export const getMuebleName = (name) => {
  return async function (dispatch) {
    const apiData = await axios.get(
      `http://localhost:3001/product${name ? `?name=${name}` : ""}`
    );
    const nameid = apiData.data;
    console.log(nameid);

    return dispatch({
      type: GET_MUEBLE_NAME,
      payload: nameid,
    });
  };
};

export const setSort = (payload) => {
  return { type: SET_SORT, payload };
};

export const setProductsCopy = (payload) => {
  return { type: SET_PRODUCTS_COPY, payload };
};
