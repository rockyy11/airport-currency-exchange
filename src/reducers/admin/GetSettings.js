import { handleActions } from 'redux-actions'
import {
  ADMIN_SETTINGS_REQUEST,
  ADMIN_SETTINGS_SUCCESS,
  ADMIN_SETTINGS_FAILURE
} from '../../actions/ActionTypes'

const defaultState = {
  error: '',
  isPending: false,
  settings: {}
}

export default handleActions(
  {
    [ADMIN_SETTINGS_REQUEST]: (state) => {
      return {
        ...state,
        isPending: true
      }
    },
    [ADMIN_SETTINGS_SUCCESS]: (state, action) => {
      return {
        ...state,
        isPending: false,
        error: '',
        settings: action.payload && action.payload.response
      }
    },
    [ADMIN_SETTINGS_FAILURE]: (state, action) => {
      return {
        ...state,
        isPending: false,
        error: action.payload && action.payload.msg
      }
    }
  },
  defaultState
)
