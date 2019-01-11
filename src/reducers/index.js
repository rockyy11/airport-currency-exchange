import { combineReducers } from 'redux'
import CurrenciesListReducer from './home/CurrenciesList'
import GetAdminSettingsReducer from './admin/GetSettings'
import FetchNewRatesReducer from './admin/NewRates'
import ResponseReducer from './NotificationReducer'

const reducers = combineReducers({
  currenciesList: CurrenciesListReducer,
  settings: GetAdminSettingsReducer,
  response: ResponseReducer,
  newRates: FetchNewRatesReducer
})

export default reducers
