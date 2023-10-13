//actions.js
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
  LOGOUT,
  FETCH_USER_DATA,
  LOAD_CART_FROM_LOCAL_STORAGE,
  POST_CART,
  SET_MATERIAL

  GET_CART,
  DELETE_CART,

} from "./types";
import { toast } from "react-toastify";
import axios from "axios";
import {
  getToken,
  removeToken,
  setToken,
} from "../components/LocalStorage/LocalStorageFunctions";

const apiUrl = process.env.REACT_APP_API_URL;




//products
export const getProducts = () => {
  return async function (dispatch) {
    const apiData = await axios.get(`${apiUrl}/product`);
    const product = apiData.data;
    console.log(product);
    return dispatch({
      type: GET_PRODUCTS,
      payload: product,
    });
  };
};

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

//types

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

//img

export const setImageURL = (imageURL) => {
  return {
    type: SET_IMAGE_URL,
    payload: imageURL,
  };
};

//user

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
      console.log(`Error: ${error}. Ya existe un usuario con ese email`);
    }
  };
};

export const login = (payload) => {
  const accessToken = payload.accessToken;
  return async function (dispatch) {
    try {
      const response = await axios.post(`${apiUrl}/user/login`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Asegúrate de tener el token aquí
        },
      });
      const user = response.data;
      if (response.status === 200) {
        setToken(accessToken);
        dispatch({
          type: LOGIN,
          payload: { userToken: accessToken, user: user },
        });
      }
    } catch (error) {
      toast.error("La contraseña es incorrecta", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    removeToken();
    dispatch({
      type: LOGOUT,
      payload: null,
    });
  };
};

export const fetchUserData = () => {
  return async (dispatch) => {
    const accessToken = getToken();
    axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
    try {
      const response = await axios.post(
        `${apiUrl}/user/login`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Asegúrate de tener el token aquí
          },
        }
      );

      const user = response.data;
      return dispatch({
        type: FETCH_USER_DATA,
        payload: { userToken: accessToken, user: user },
      });
    } catch (error) {
      removeToken();
      // Puedes manejar el error aquí si lo deseas.
    }
  };
};

//carrito
export const getCart = () => {
  try {
    return async (dispatch) => {
      const { data } = await axios.post(`${apiUrl}/cart`);
      const payload = data.data;

      return dispatch({
        type: GET_CART,
        payload: payload,
      });
    };
  } catch (error) {
    console.log(error);
  }
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
export const deleteCart = (cartId) => {
  // borra todo el carro
  try {
    return async (dispatch) => {
      const { data } = await axios.post(`${apiUrl}/${cartId}`);
      const payload = data.data;

      return dispatch({
        type: DELETE_CART,
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


export const setProductsCopy = (payload) => {
  return { type: SET_PRODUCTS_COPY, payload };
};

export const setMaterial = (payload) => {
  return { type: SET_MATERIAL, payload };
};



