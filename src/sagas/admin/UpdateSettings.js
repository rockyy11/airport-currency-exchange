import { takeLatest, put } from 'redux-saga/effects'

import { UPDATE_ADMIN_SETTINGS_REQUEST } from '../../actions/ActionTypes'
import { adminSettingsSuccess } from '../../actions/admin/settings'
import { updateAdminSettingsFailure, updateAdminSettingsSuccess } from '../../actions/admin/updateSettings'
import adminAPIHelper from '../../services/Admin'

function * startUpdateSettingsFlow (data) {
  try {
    const adminSettings = yield adminAPIHelper.updateAdminSettings(data.payload)
    yield put(adminSettingsSuccess({ response: adminSettings }))
    yield put(updateAdminSettingsSuccess())
  } catch (err) {
    yield put(updateAdminSettingsFailure({ msg: err }))
  }
}

export function * getUpdateSettingsSaga () {
  yield takeLatest(UPDATE_ADMIN_SETTINGS_REQUEST, startUpdateSettingsFlow)
}
