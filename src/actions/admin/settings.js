import { createAction } from 'redux-actions'

import {
  ADMIN_SETTINGS_REQUEST,
  ADMIN_SETTINGS_SUCCESS,
  ADMIN_SETTINGS_FAILURE
} from '../ActionTypes'

export const adminSettingsRequest = createAction(ADMIN_SETTINGS_REQUEST)

export const adminSettingsSuccess = createAction(
  ADMIN_SETTINGS_SUCCESS,
  (payload) => payload
)

export const adminSettingsFailure = createAction(
  ADMIN_SETTINGS_FAILURE,
  (payload) => payload
)
