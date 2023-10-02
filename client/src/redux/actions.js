import {
  GET_PRODUCTS,
  GET_DETAIL,
  POST_PRODUCT,
  GET_PRODUCT_TYPE,
  GET_PRODUCT_BY_NAME,
  SET_IMAGE_URL,
  SET_SORT,
  SET_PRODUCT_TYPE,
  SET_PRODUCTS_COPY,
  SET_COLOR,
  SET_PRICE_RANGE,
} from "./types";

import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const getProducts = () => {
  return async function (dispatch) {
    const apiData = await axios.get(`${apiUrl}/product`);
    const product = apiData.data;
    return dispatch({
      type: GET_PRODUCTS,
      payload: product,
    });
  };
};

export const getDetail = (id) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`${apiUrl}/product/${id}`);
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

export const postProduct = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${apiUrl}/product`, payload);
      const producto = response.data;
      if (response.status === 200) {
        dispatch({ type: POST_PRODUCT, payload: producto });
        alert("Producto Creado");
        window.location.reload();
      }
    } catch (error) {
      alert(`No se pudo crear el producto`);
    }
  };
};

export const setImageURL = (imageURL) => {
  return {
    type: SET_IMAGE_URL,
    payload: imageURL,
  };
};

export const getProductType = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${apiUrl}/productType`);
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

export const getProductByName = (name) => {
  return async function (dispatch) {
    const apiData = await axios.get(
      `${apiUrl}/product${name ? `?name=${name}` : ""}`
    );
    const nameid = apiData.data;

    return dispatch({
      type: GET_PRODUCT_BY_NAME,
      payload: nameid,
    });
  };
};

export const setSort = (payload) => {
  return { type: SET_SORT, payload };
};
export const setProductType = (payload) => {
  return { type: SET_PRODUCT_TYPE, payload };
};
export const setColor = (payload) => {
  return { type: SET_COLOR, payload };
};
export const setPriceRange = (payload) => {
  return { type: SET_PRICE_RANGE, payload };
};

export const setProductsCopy = (payload) => {
  return { type: SET_PRODUCTS_COPY, payload };
};
