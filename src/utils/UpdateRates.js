import _ from 'lodash'
import store from '../Store'
import { fetchNewRatesRequest } from '../actions/currency/NewRates'
import settings from '../data/AdminConfiguration'

const callInterval = (refreshTime) => {
  return setInterval(() => store.dispatch(fetchNewRatesRequest()), refreshTime * 1000)
}

const initializeStore = () => {
  let interval
  let defaultRefreshTime = settings.currenciesRatesRefreshTime
  let oldCurrenciesList
  store.subscribe(() => {
    const states = store.getState()
    const newCurrenciesList = states.currenciesList.currenciesList
    const newRefreshTime = states.settings.settings.currenciesRatesRefreshTime
    if (!oldCurrenciesList && !_.isEmpty(newCurrenciesList)) {
      oldCurrenciesList = newCurrenciesList
      interval = callInterval(defaultRefreshTime)
    }

    if (newRefreshTime && newRefreshTime !== defaultRefreshTime) {
      defaultRefreshTime = newRefreshTime
      clearInterval(interval)
      interval = callInterval(defaultRefreshTime)
    }
  })
}

export default initializeStore
