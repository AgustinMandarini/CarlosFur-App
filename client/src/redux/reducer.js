import { GET_MUEBLES, GET_DETAIL, SET_IMAGE_URL } from "./types";

const initialState = {
  muebles: [],
  detail: {},
  imageURL: null,
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MUEBLES:
      return {
        ...state,
        muebles: action.payload,
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
    default:
      return { ...state };
  }
};

export default rootReducer;
