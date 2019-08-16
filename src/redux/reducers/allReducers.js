import { combineReducers } from "redux";

import fetchingReducers from "./fetchingReducers";

const allReducers = combineReducers({
    fetchingReducers,
});

export default allReducers;