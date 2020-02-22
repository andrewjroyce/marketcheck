import { combineReducers } from "redux";

import fetchingReducers from "./fetchingReducers";
import searchReducers from "./searchReducers";

const allReducers = combineReducers({
  fetchingReducers,
  searchReducers
});

export default allReducers;
