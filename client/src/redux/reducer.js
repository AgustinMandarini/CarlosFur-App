import { GET_MUEBLES } from "./types";

const initialState = {
  muebles: [],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return { ...state };
  }
};

export default rootReducer;
