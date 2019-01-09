import { createAction } from 'redux-actions'

import {
  UPDATE_ADMIN_SETTINGS_REQUEST,
  UPDATE_ADMIN_SETTINGS_FAILURE
} from '../ActionTypes'

export const updateAdminSettingsRequest = createAction(UPDATE_ADMIN_SETTINGS_REQUEST,
  (payload) => payload
)

export const updateAdminSettingsFailure = createAction(
  UPDATE_ADMIN_SETTINGS_FAILURE,
  (payload) => payload
)
