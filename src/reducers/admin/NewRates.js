import { handleActions } from 'redux-actions'
import {
  FETCH_NEW_RATES_REQUEST,
  FETCH_NEW_RATES_SUCCESS,
  FETCH_NEW_RATES_FAILURE
} from '../../actions/ActionTypes'

const defaultState = {
  error: '',
  isPending: false
}

export default handleActions(
  {
    [FETCH_NEW_RATES_REQUEST]: (state) => {
      return {
        ...state,
        isPending: true
      }
    },
    [FETCH_NEW_RATES_SUCCESS]: (state, action) => {
      return {
        ...state,
        isPending: false,
        error: ''
      }
    },
    [FETCH_NEW_RATES_FAILURE]: (state, action) => {
      return {
        ...state,
        isPending: false,
        error: action.payload && action.payload.msg
      }
    }
  },
  defaultState
)
