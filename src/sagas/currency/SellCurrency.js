import { takeLatest, put, select } from 'redux-saga/effects'

import { SELL_CURRENCY_REQUEST } from '../../actions/ActionTypes'
import { currenciesListSuccess } from '../../actions/currency/CurrenciesList'
import { sellCurrencyFailure, sellCurrencySuccess } from '../../actions/currency/SellCurrency'
import currencyAPIHelper from '../../services/Currency'

function * startSellCurrencySagaFlow (data) {
  try {
    const currenciesListState = yield select((state) => state.currenciesList.currenciesList)
    const currenciesList = yield currencyAPIHelper.sellCurrency(data.payload, currenciesListState)
    yield put(currenciesListSuccess({ response: currenciesList }))
    yield put(sellCurrencySuccess({ currencyType: data.payload.type }))
  } catch (err) {
    console.error('****Failed SellCurrencySaga*****', err)
    yield put(sellCurrencyFailure({ msg: err }))
  }
}

export function * sellCurrencySaga () {
  yield takeLatest(SELL_CURRENCY_REQUEST, startSellCurrencySagaFlow)
}
