import { updateAdminSettingsRequest } from '../../actions/admin/updateSettings'
import * as actions from '../../actions/ActionTypes'
import CurrenciesListData from '../../data/CurrenciesList'
import AdminConfigurationSettings from '../../data/AdminConfiguration'

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const text = AdminConfigurationSettings
    const expectedAction = {
      type: actions.UPDATE_ADMIN_SETTINGS_REQUEST,
      payload: AdminConfigurationSettings
    }
    expect(updateAdminSettingsRequest(text)).toEqual(expectedAction)
  })
})
