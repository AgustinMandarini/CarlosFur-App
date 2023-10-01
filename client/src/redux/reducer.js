import {
  GET_PRODUCTS,
  GET_DETAIL,
  POST_PRODUCT,
  GET_PRODUCT_TYPE,
  GET_PRODUCT_BY_NAME,
  SET_IMAGE_URL,
  SET_SORT,
  SET_PRODUCTS_COPY,
  SET_PRODUCT_TYPE,
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
    price: "allPrices",
  },
  imageURL: null,
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

    case GET_PRODUCT_BY_NAME:
      return {
        ...state,
        muebles: action.payload,
      };

    case SET_SORT:
      return { ...state, sort: action.payload };

    case SET_PRODUCT_TYPE:
      return {
        ...state,
        filter: { ...state.filter, productType: action.payload },
      };

    case SET_PRODUCTS_COPY:
      return {
        ...state,
        allMuebles: action.payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
