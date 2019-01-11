import { handleActions, combineActions } from 'redux-actions'
import {
  UPDATE_ADMIN_SETTINGS_FAILURE,
  ADMIN_SETTINGS_FAILURE,
  UPDATE_ADMIN_SETTINGS_SUCCESS,
  BUY_CURRENCY_FAILURE,
  SELL_CURRENCY_FAILURE,
  SELL_CURRENCY_SUCCESS,
  BUY_CURRENCY_SUCCESS,
  CURRENCIES_LIST_FAILURE,
  RESET_NOTIFICATION
} from '../actions/ActionTypes'

const defaultState = {
  isError: false,
  message: ''
}

export default handleActions(
  {
    [combineActions(UPDATE_ADMIN_SETTINGS_FAILURE, CURRENCIES_LIST_FAILURE, ADMIN_SETTINGS_FAILURE, BUY_CURRENCY_FAILURE, SELL_CURRENCY_FAILURE)]: (state, action) => {
      return {
        ...state,
        isError: true,
        message: action.payload.msg || 'Something went wrong. Please try again later !!'
      }
    },
    [UPDATE_ADMIN_SETTINGS_SUCCESS]: (state) => ({
      ...state,
      isError: false,
      message: 'Admin settings have been successfully updated.'
    }),
    [BUY_CURRENCY_SUCCESS]: (state, action) => ({
      ...state,
      isError: false,
      message: `Currency ${action.payload.currencyType} has been successfully bought.`
    }),
    [SELL_CURRENCY_SUCCESS]: (state, action) => ({
      ...state,
      isError: false,
      message: `Currency ${action.payload.currencyType} has been successfully sold.`
    }),
    [RESET_NOTIFICATION]: (state) => ({
      ...state,
      message: ''
    })
  },
  defaultState
)
