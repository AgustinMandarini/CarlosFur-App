import { GET_MUEBLES, GET_DETAIL, SET_IMAGE_URL } from "./types";
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

export const setImageURL = (imageURL) => {
  return {
    type: SET_IMAGE_URL,
    payload: imageURL,
  };
};

// export { getMuebles, getDetail };
