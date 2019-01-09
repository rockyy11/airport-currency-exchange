import { takeLatest, put } from 'redux-saga/effects'

import { ADMIN_SETTINGS_REQUEST } from '../../actions/ActionTypes'
import { adminSettingsSuccess, adminSettingsFailure } from '../../actions/admin/settings'
import adminAPIHelper from '../../services/Admin'

function * startGetSettingsFlow () {
  try {
    const adminSettings = yield adminAPIHelper.getAdminSettings()
    /* tslint:disable:no-unsafe-any */
    yield put(adminSettingsSuccess({ response: adminSettings }))
  } catch (err) {
    yield put(adminSettingsFailure({ msg: err }))
  }
}

export function * getSettingsSaga () {
  yield takeLatest(ADMIN_SETTINGS_REQUEST, startGetSettingsFlow)
}
