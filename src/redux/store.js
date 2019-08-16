
import { createStore, applyMiddleware } from 'redux'

import ReduxThunk from 'redux-thunk';
import allReducers from './reducers/allReducers';

let middleware = [ReduxThunk]

const store = createStore(allReducers, {}, applyMiddleware(...middleware));

export default store;
