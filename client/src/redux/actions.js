import { GET_MUEBLES } from "./types";
import axios from "axios";

const getMuebles = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/muebles");
    const muebles = apiData.data;
    dispatch({ type: GET_MUEBLES, payload: muebles });
  };
};

export { getMuebles };
