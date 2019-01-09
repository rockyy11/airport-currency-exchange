import { createAction } from 'redux-actions'

import {
  CURRENCIES_LIST_REQUEST,
  CURRENCIES_LIST_SUCCESS,
  CURRENCIES_LIST_FAILURE
} from '../ActionTypes'

export const currenciesListRequest = createAction(CURRENCIES_LIST_REQUEST)

export const currenciesListSuccess = createAction(
  CURRENCIES_LIST_SUCCESS,
  (payload) => payload
)

export const currenciesListFailure = createAction(
  CURRENCIES_LIST_FAILURE,
  (payload) => payload
)
