import { takeLatest, put } from 'redux-saga/effects'

import { CURRENCIES_LIST_REQUEST } from '../../actions/ActionTypes'
import { currenciesListSuccess, currenciesListFailure } from '../../actions/currency/CurrenciesList'
import currencyAPIHelper from '../../services/Currency'

function * startGetCurrenciesListSagaFlow () {
  try {
    const currenciesList = yield currencyAPIHelper.getCurrenciesList()
    yield put(currenciesListSuccess({ response: currenciesList }))
  } catch (err) {
    yield put(currenciesListFailure({ msg: err }))
  }
}

export function * getCurrenciesListSaga () {
  yield takeLatest(CURRENCIES_LIST_REQUEST, startGetCurrenciesListSagaFlow)
}
