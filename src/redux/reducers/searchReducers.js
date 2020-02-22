import { SET_MAKE, SET_MODEL, SET_YEAR } from "../types";

const initialState = {
  make: "Alfa Romeo",
  model: "",
  year: 1999
};

export default function searchReducers(state = initialState, action) {
  switch (action.type) {
    case SET_MAKE:
      return {
        ...state,
        make: action.payload
      };

    case SET_MODEL:
      return {
        ...state,
        model: action.payload
      };

    case SET_YEAR:
      return {
        ...state,
        year: action.payload
      };

    default:
      return state;
  }
}
