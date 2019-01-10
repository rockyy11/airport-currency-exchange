import { takeLatest, put } from 'redux-saga/effects'

import { FETCH_NEW_RATES_REQUEST } from '../../actions/ActionTypes'
import { currenciesListSuccess, currenciesListFailure } from '../../actions/currency/CurrenciesList'
import currencyAPIHelper from '../../services/Currency'

function * startGetNewCurrenciesSagaFlow () {
  try {
    console.log('*******Fetching New Rates**********', new Date())
    const currenciesList = yield currencyAPIHelper.getCurrenciesList()
    console.log('Updated currenciesList Rates', currenciesList)
    yield put(currenciesListSuccess({ response: currenciesList }))
  } catch (err) {
    yield put(currenciesListFailure({ msg: err }))
  }
}

export function * getNewCurrenciesRatesSaga () {
  yield takeLatest(FETCH_NEW_RATES_REQUEST, startGetNewCurrenciesSagaFlow)
}
