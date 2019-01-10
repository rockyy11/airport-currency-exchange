import { createAction } from 'redux-actions'

import {
  SELL_CURRENCY_REQUEST,
  SELL_CURRENCY_SUCCESS,
  SELL_CURRENCY_FAILURE
} from '../ActionTypes'

export const sellCurrencyRequest = createAction(SELL_CURRENCY_REQUEST)

export const sellCurrencySuccess = createAction(
  SELL_CURRENCY_SUCCESS,
  (payload) => payload
)

export const sellCurrencyFailure = createAction(
  SELL_CURRENCY_FAILURE,
  (payload) => payload
)
