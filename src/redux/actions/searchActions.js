import { SET_MAKE, SET_MODEL, SET_YEAR } from "../types";

export const setMake = payload => ({
  type: SET_MAKE,
  payload
});

export const setModel = payload => {
  return {
    type: SET_MODEL,
    payload
  };
};

export const setYear = payload => ({
  type: SET_YEAR,
  payload
});
