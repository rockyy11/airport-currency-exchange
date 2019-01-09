import { handleActions } from 'redux-actions'
import {
  CURRENCIES_LIST_REQUEST,
  CURRENCIES_LIST_SUCCESS,
  CURRENCIES_LIST_FAILURE
} from '../../actions/ActionTypes'

const defaultState = {
  error: '',
  isPending: false,
  currenciesList: {}
}

export default handleActions(
  {
    [CURRENCIES_LIST_REQUEST]: (state) => {
      return {
        ...state,
        isPending: true
      }
    },
    [CURRENCIES_LIST_SUCCESS]: (state, action) => {
      return {
        ...state,
        isPending: false,
        error: '',
        currenciesList: action.payload && action.payload.response
      }
    },
    [CURRENCIES_LIST_FAILURE]: (state, action) => {
      return {
        ...state,
        isPending: false,
        error: action.payload && action.payload.msg
      }
    }
  },
  defaultState
)
