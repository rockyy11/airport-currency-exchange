import { createAction } from 'redux-actions'

import {
  FETCH_NEW_RATES_REQUEST,
  FETCH_NEW_RATES_SUCCESS,
  FETCH_NEW_RATES_FAILURE
} from '../ActionTypes'

export const fetchNewRatesRequest = createAction(FETCH_NEW_RATES_REQUEST)

export const fetchNewRatesSuccess = createAction(
  FETCH_NEW_RATES_SUCCESS,
  (payload) => payload
)

export const fetchNewRatesFailure = createAction(
  FETCH_NEW_RATES_FAILURE,
  (payload) => payload
)
