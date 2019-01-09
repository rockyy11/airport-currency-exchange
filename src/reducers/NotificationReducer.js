import { handleActions, combineActions } from 'redux-actions'
import {
  UPDATE_ADMIN_SETTINGS_FAILURE,
  ADMIN_SETTINGS_FAILURE,
  UPDATE_ADMIN_SETTINGS_SUCCESS,
  RESET_NOTIFICATION
} from '../actions/ActionTypes'

const defaultState = {
  isError: false,
  message: ''
}

export default handleActions(
  {
    [combineActions(UPDATE_ADMIN_SETTINGS_FAILURE, ADMIN_SETTINGS_FAILURE)]: (state, action) => {
      return {
        ...state,
        isError: true,
        message: action.payload.msg || 'Something went wrong. Please try again later.'
      }
    },
    [UPDATE_ADMIN_SETTINGS_SUCCESS]: (state) => ({
      ...state,
      isError: false,
      message: 'Admin settings have been successfully updated.'
    }),
    [RESET_NOTIFICATION]: (state) => ({
      ...state,
      message: ''
    })
  },
  defaultState
)
