import {
  DELETE_CART_PRODUCT,
  GET_COLOR,
  GET_DETAIL,
  GET_MATERIAL,
  GET_PRODUCTS,
  GET_PRODUCT_BY_NAME,
  GET_PRODUCT_TYPE,
  POST_CART_PRODUCT,
  POST_PRODUCT,
  SET_COLOR,
  SET_IMAGE_URL,
  SET_PRICE_RANGE,
  SET_PRODUCTS_COPY,
  SET_PRODUCT_TYPE,
  SET_SORT,
  POST_USER,
  LOGIN,
  LOAD_CART_FROM_LOCAL_STORAGE,
  POST_CART,
} from "./types";
import { toast } from "react-toastify";
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

// export const postProduct = (payload) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.post(`${apiUrl}/product`, payload);
//       const producto = response.data;
//       if (response.status === 200) {
//         dispatch({ type: POST_PRODUCT, payload: producto });
//         alert("Producto Creado");
//         window.location.reload();
//       }
//     } catch (error) {
//       alert(`No se pudo crear el producto`);
//     }
//   };
// };
export const postProduct = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${apiUrl}/product`, payload);
      const producto = response.data;
      if (response.status === 200) {
        dispatch({ type: POST_PRODUCT, payload: producto });
        toast.success("Producto Creado", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000, // Tiempo en milisegundos que la notificación estará visible
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      // Mostrar notificación de error
      toast.error("No se pudo crear el producto", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
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

export const getColor = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${apiUrl}/color`);
      const color = response.data;
      return dispatch({
        type: GET_COLOR,
        payload: color,
      });
    } catch (error) {
      alert("No se encontro color");
    }
  };
};

export const getMaterial = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${apiUrl}/material`);
      const material = response.data;
      return dispatch({
        type: GET_MATERIAL,
        payload: material,
      });
    } catch (error) {
      alert("No se encontro el material");
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

export const postUser = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${apiUrl}/user`, payload);
      const user = response.data;
      if (response.status === 200) {
        dispatch({ type: POST_USER, payload: user });
        alert("Usuario Creado");
      }
    } catch (error) {
      alert(`Error: ${error}. No se pudo crear el usuario!`);
    }
  };
};

export const login = (payload) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${apiUrl}/user/login`, payload);
      const user = response.data;
      if (response.status === 200) {
        dispatch({
          type: LOGIN,
          payload: user,
        });
      }
    } catch (error) {
      return alert("Usuario no registrado");
    }
  };
};
export const postCartProduct = (payload) => {
  return { type: POST_CART_PRODUCT, payload: payload };
};
export const deleteCartProduct = (payload) => {
  return { type: DELETE_CART_PRODUCT, payload: payload };
};
export const postCart = (cart) => {
  try {
    return async (dispatch) => {
      const { data } = await axios.post(`${apiUrl}/cart`, cart);
      const payload = data.data;

      return dispatch({
        type: POST_CART,
        payload: payload,
      });
    };
    // eslint-disable-next-line no-unreachable
  } catch (error) {
    console.log(error);
  }
};
export const loadCartFromLocalStorage = (savedCart) => {
  return {
    type: LOAD_CART_FROM_LOCAL_STORAGE,
    payload: savedCart,
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
