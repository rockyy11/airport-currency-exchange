import { createAction } from 'redux-actions'

import {
  UPDATE_ADMIN_SETTINGS_REQUEST,
  UPDATE_ADMIN_SETTINGS_FAILURE,
  UPDATE_ADMIN_SETTINGS_SUCCESS
} from '../ActionTypes'

export const updateAdminSettingsRequest = createAction(UPDATE_ADMIN_SETTINGS_REQUEST,
  (payload) => payload
)

export const updateAdminSettingsSuccess = createAction(UPDATE_ADMIN_SETTINGS_SUCCESS)

export const updateAdminSettingsFailure = createAction(
  UPDATE_ADMIN_SETTINGS_FAILURE,
  (payload) => payload
)
