import { takeLatest, put } from 'redux-saga/effects'

import { ADMIN_SETTINGS_REQUEST } from '../../actions/ActionTypes'
import { adminSettingsSuccess, adminSettingsFailure } from '../../actions/admin/settings'
import adminAPIHelper from '../../services/Admin'

function * startGetSettingsFlow () {
  try {
    const adminSettings = yield adminAPIHelper.getAdminSettings()
    yield put(adminSettingsSuccess({ response: adminSettings }))
  } catch (err) {
    console.error('****Failed GetSettingsSagaFlow*****', err)
    yield put(adminSettingsFailure({ msg: err }))
  }
}

export function * getSettingsSaga () {
  yield takeLatest(ADMIN_SETTINGS_REQUEST, startGetSettingsFlow)
}
