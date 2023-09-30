import { GET_MUEBLES, GET_DETAIL, GET_MUEBLE_NAME } from "./types";
import axios from "axios";
import mueblesData from "../muebles.json";

export const getMuebles = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/product");
    const muebles = apiData.data;
    console.log(muebles, "aca");

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

export const getMuebleName = (name) => {
  return async function (dispatch) {
    const apiData = await axios.get(
      `http://localhost:3001/product?name=${name}`
    );
    const nameid = apiData.data;
    console.log(nameid);

    return dispatch({
      type: GET_MUEBLE_NAME,
      payload: nameid,
    });
  };
};
// export { getMuebles, getDetail };
