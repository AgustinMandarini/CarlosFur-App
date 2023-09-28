import { GET_MUEBLES, GET_DETAIL } from "./types";

const initialState = {
  muebles: [],
  detail: {},
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
    default:
      return { ...state };
  }
};

export default rootReducer;
