import { createAction } from 'redux-actions'

import {
  BUY_CURRENCY_REQUEST,
  BUY_CURRENCY_SUCCESS,
  BUY_CURRENCY_FAILURE
} from '../ActionTypes'

export const buyCurrencyRequest = createAction(BUY_CURRENCY_REQUEST)

export const buyCurrencySuccess = createAction(
  BUY_CURRENCY_SUCCESS,
  (payload) => payload
)

export const buyCurrencyFailure = createAction(
  BUY_CURRENCY_FAILURE,
  (payload) => payload
)
