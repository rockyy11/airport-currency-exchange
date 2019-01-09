import { createAction } from 'redux-actions'

import { RESET_NOTIFICATION } from './ActionTypes'

export const resetNotification = createAction(
  RESET_NOTIFICATION,
  () => {
    return null
  }
)
