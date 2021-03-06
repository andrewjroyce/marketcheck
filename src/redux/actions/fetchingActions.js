import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  CLEAR_SEARCH
} from "../types";
import axios from "axios";

export function fetchProducts(make, model, year, city, lat, long) {
  return dispatch => {
    dispatch(fetchProductsBegin());
    if (city.length > 0) {
      return axios
        .get(
          `http://marketcheck-prod.apigee.net/v1/search?api_key=SIsRbdnFQAWDHpFIJPR9QnPmzpIh3sja&make=${make}&model=${model}&year=${year}&car_type=used&city=${city}&zip=&start=0&rows=10&country=ALL`
        )
        .then(res => {
          dispatch(fetchProductsSuccess(res.data.listings));
          return res.data.listings;
        })
        .catch(error => dispatch(fetchProductsFailure(error)));
    } else {
      return axios
        .get(
          `http://marketcheck-prod.apigee.net/v1/search?api_key=SIsRbdnFQAWDHpFIJPR9QnPmzpIh3sja&make=${make}&model=${model}&year=${year}&car_type=used&latitude=${lat}&longitude=${long}&radius=30&zip=&start=0&rows=10&country=CA`
        )
        .then(res => {
          dispatch(fetchProductsSuccess(res.data.listings));
          return res.data.listings;
        })
        .catch(error => dispatch(fetchProductsFailure(error)));
    }
  };
}

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = payload => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload
  };
};

export const clearSearch = () => {
  return {
    type: CLEAR_SEARCH
  };
};

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error }
});
