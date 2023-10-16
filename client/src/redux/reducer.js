//reducer.js
import {
  GET_PRODUCTS,
  GET_DETAIL,
  GET_USERS,
  POST_PRODUCT,
  GET_PRODUCT_TYPE,
  GET_COLOR,
  GET_MATERIAL,
  GET_PRODUCT_BY_NAME,
  SET_IMAGE_URL,
  SET_SORT,
  SET_PRODUCTS_COPY,
  SET_PRODUCT_TYPE,
  SET_COLOR,
  SET_PRICE_RANGE,
  POST_CART_PRODUCT,
  DELETE_CART_PRODUCT,
  DELETE_CART,
  POST_USER,
  LOGIN,
  LOGOUT,
  FETCH_USER_DATA,
  LOAD_CART_FROM_LOCAL_STORAGE,
  POST_CART,
  SET_MATERIAL,
  GET_CART,
  UPDATE_PRODUCT_COUNT_IN_CART,
  PUT_PRODUCT,
  DELETE_PRODUCT,
  ADMIN_ENABLEDISABLE
} from "./types";

const initialState = {
  muebles: [],
  allMuebles: [],
  detail: [],
  productType: [],
  sort: "notSorted",
  filter: {
    productType: "allProductTypes",
    color: "allColors",
    price: ["allPrices"],
    material: "allMaterials",
  },
  imageURL: null,
  colorState: [],
  materialState: [],
  cartProducts: [],
  localStorage: [],
  allUsers: [],
  userToken: null,
  loggedUser: null,
  cartTotal: 0,
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MATERIAL:
      return {
        ...state,
        materialState: action.payload,
      };

    case GET_PRODUCTS:
      return {
        ...state,
        muebles: action.payload,
        allMuebles: action.payload,
      };
      case PUT_PRODUCT:
        return {

        }
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
      case PUT_PRODUCT:
        return {
          ...state,
          muebles: action.payload
        }

    case SET_IMAGE_URL:
      return {
        ...state,
        imageURL: action.payload,
      };

    case POST_PRODUCT:
      return {
        ...state,
        muebles: action.payload,
      };
    case GET_PRODUCT_TYPE:
      return {
        ...state,
        productType: action.payload,
      };
    case GET_COLOR:
      return {
        ...state,
        colorState: action.payload,
      };

    case GET_PRODUCT_BY_NAME:
      return {
        ...state,
        muebles: action.payload,
      };
    case GET_CART:
      return {
        ...state,
        cartProducts: action.payload,
      };
    case POST_CART_PRODUCT:
      const productId = action.payload;
      // Busca el producto en el carrito actual
      const existingProductIndex = state.cartProducts.findIndex(
        (product) => product.id === productId
      );
      if (existingProductIndex !== -1) {
        // Si el producto ya existe en el carrito, incrementa su count
        const updatedCartProducts = [...state.cartProducts];
        updatedCartProducts[existingProductIndex].count += 1;
        return {
          ...state,
          cartProducts: updatedCartProducts,
        };
      } else {
        // Si el producto no existe en el carrito, agrégalo con count igual a 1
        const productToAdd = state.muebles.find(
          (mueble) => mueble.id === productId
        );

        return {
          ...state,
          cartProducts: [...state.cartProducts, { ...productToAdd, count: 1 }],
          cartTotal: state.cartTotal + (action.payload.price * action.payload.quantity)
        };
      }

    case DELETE_CART_PRODUCT:
      const productId2 = action.payload;
      const productToDelete = state.cartProducts.find(
        (product) => product.id === productId2
      );

      if (!productToDelete) {
        return state; // No se hace nada si el producto no se encuentra
      }

      if (productToDelete.count <= 1) {
        // Si el count es menor o igual a 1, elimina el producto del carrito
        const updatedCartProducts = state.cartProducts.filter(
          (product) => product.id !== productId2
        );

        // Actualiza el estado de Redux
        const newState = {
          ...state,
          cartProducts: updatedCartProducts,
        };

        // Actualiza el localStorage
        localStorage.setItem(
          "cartProducts",
          JSON.stringify(updatedCartProducts)
        );

        return newState;
      } else {
        // Si el count es mayor que 1, disminuye el count en 1
        const updatedCartProducts = state.cartProducts.map((product) =>
          product.id === productId2
            ? { ...product, count: product.count - 1 }
            : product
        );

        // Actualiza el estado de Redux
        const newState = {
          ...state,
          cartProducts: updatedCartProducts,
        };

        // Actualiza el localStorage
        localStorage.setItem(
          "cartProducts",
          JSON.stringify(updatedCartProducts)
        );

        return newState;
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        muebles: action.payload
      }
    case DELETE_CART:
      localStorage.removeItem("cart");
      return {
        ...state,
        cartProducts: [],
      };
    case LOAD_CART_FROM_LOCAL_STORAGE:
      return {
        ...state,
        cartProducts: action.payload, // Carga los productos del localStorage
      };
    case SET_SORT:
      return { ...state, sort: action.payload };

    case SET_PRODUCT_TYPE:
      return {
        ...state,
        filter: { ...state.filter, productType: action.payload },
      };
    case SET_COLOR:
      return {
        ...state,
        filter: { ...state.filter, color: action.payload },
      };
    case SET_MATERIAL:
      return {
        ...state,
        filter: { ...state.filter, material: action.payload },
      };

    case SET_PRICE_RANGE:
      return {
        ...state,
        filter: {
          ...state.filter,
          price: action.payload.split(","),
        },
      };

    case SET_PRODUCTS_COPY:
      return {
        ...state,
        allMuebles: action.payload,
      };
    case POST_USER:
      return {
        ...state,
        newUser: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case LOGIN: {
      const { accessToken, user } = action.payload;
      return {
        ...state,
        userToken: accessToken,
        loggedUser: user,
      };
    }
    case LOGOUT:
      return {
        ...state,
        userToken: action.payload,
      };
    case FETCH_USER_DATA: {
      const { accessToken, user } = action.payload;
      return {
        ...state,
        userToken: accessToken,
        loggedUser: user,
      };
    }

    case POST_CART:
      return {
        ...state,
        localStorage: action.payload,
      };
      case ADMIN_ENABLEDISABLE:
        return {
          ...state,
          muebles: action.payload,
          enabled_product: action.payload.enabled_product
        }; 

    default:
      return { ...state };
  }
};

export default rootReducer;
