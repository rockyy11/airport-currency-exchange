import { combineReducers } from 'redux'
import CurrenciesListReducer from './home/CurrenciesList'
import GetAdminSettingsReducer from './admin/GetSettings'

const reducers = combineReducers({
  currenciesList: CurrenciesListReducer,
  settings: GetAdminSettingsReducer
})

export default reducers
