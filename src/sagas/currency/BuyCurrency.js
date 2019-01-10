import { takeLatest, put, select } from 'redux-saga/effects'

import { BUY_CURRENCY_REQUEST } from '../../actions/ActionTypes'
import { currenciesListSuccess } from '../../actions/currency/CurrenciesList'
import { buyCurrencyFailure, buyCurrencySuccess } from '../../actions/currency/BuyCurrency'
import currencyAPIHelper from '../../services/Currency'

function * startBuyCurrencySagaFlow (data) {
  try {
    const currenciesListState = yield select((state) => state.currenciesList.currenciesList)
    const currenciesList = yield currencyAPIHelper.buyCurrency(data.payload, currenciesListState)
    yield put(currenciesListSuccess({ response: currenciesList }))
    console.log(data.payload.type)
    yield put(buyCurrencySuccess({ currencyType: data.payload.type }))
  } catch (err) {
    console.error('****Failed BuyCurrencySaga*****', err)
    yield put(buyCurrencyFailure({ msg: err }))
  }
}

export function * buyCurrencySaga () {
  yield takeLatest(BUY_CURRENCY_REQUEST, startBuyCurrencySagaFlow)
}
