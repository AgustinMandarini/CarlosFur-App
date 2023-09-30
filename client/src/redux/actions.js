import { GET_MUEBLES, GET_DETAIL, POST_MUEBLES, GET_PRODUCTTYPE } from "./types";
import axios from "axios";
import mueblesData from "../muebles.json";

export const getMuebles = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/muebles");
    const muebles = apiData.data;
    return dispatch({
      type: GET_MUEBLES,
      payload: muebles,
    });
  };
};
// const getDetail = (id) => {
//   return async function (dispatch) {
//     const apiData = await axios.get(`http://localhost:3001/muebles/${id}`); // O COMO SEA LA RUTA
//     const detail = apiData.data;
//     return dispatch({
//       type: GET_DETAIL,
//       payload: detail,
//     });
//   };
// };
export const getDetail = (id) => {
  return {
    type: GET_DETAIL,
    payload: mueblesData.find((producto) => producto.id === parseInt(id)), // esta es la provisoria
  };
};

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

export const getProductType = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/productType");
      // console.log(response.data);
      const productType = response.data;
      return dispatch({
        type: GET_PRODUCTTYPE,
        payload: productType,
      });
    } catch (error) {
      alert(`No se pudo crear`);
    }
  };
};
// export { getMuebles, getDetail };
