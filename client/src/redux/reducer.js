import {
  GET_PRODUCTS,
  GET_DETAIL,
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
  POST_USER,
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
  },
  imageURL: null,
  colorState: [],
  materialState: [],
  cartProducts: [],
  newUser: null,
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        muebles: action.payload,
        allMuebles: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

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
    case GET_MATERIAL:
      return {
        ...state,
        materialState: action.payload,
      };

    case GET_PRODUCT_BY_NAME:
      return {
        ...state,
        muebles: action.payload,
      };
    case POST_CART_PRODUCT:
      const productToAdd = state.muebles.find(
        (mueble) => mueble.id === action.payload
      );
      return {
        ...state,
        cartProducts: [...state.cartProducts, productToAdd],
      };

    case DELETE_CART_PRODUCT:
      const indexToRemove = state.cartProducts.findIndex(
        (product) => product.id === action.payload
      );

      if (indexToRemove !== -1) {
        const newCartProducts = [...state.cartProducts];
        newCartProducts.splice(indexToRemove, 1);

        return {
          ...state,
          cartProducts: newCartProducts,
        };
      } else {
        return state;
      }

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

    default:
      return { ...state };
  }
};

export default rootReducer;
