import { takeLatest, put, select } from 'redux-saga/effects'
import { FETCH_NEW_RATES_REQUEST } from '../../actions/ActionTypes'
import { currenciesListSuccess } from '../../actions/currency/CurrenciesList'
import { fetchNewRatesFailure } from '../../actions/currency/NewRates'
import currencyAPIHelper from '../../services/Currency'

function * startGetNewCurrenciesSagaFlow () {
  try {
    console.log('*******Fetching New Rates**********', new Date())
    const currenciesListState = yield select((state) => state.currenciesList.currenciesList)
    const currenciesList = yield currencyAPIHelper.getCurrenciesList(currenciesListState)
    console.log('********Updated Rates*************', currenciesList)
    yield put(currenciesListSuccess({ response: currenciesList }))
  } catch (err) {
    console.error('****Failed GetNewCurrenciesSagaFlow*****', err)
    yield put(fetchNewRatesFailure({ msg: err }))
  }
}

export function * getNewCurrenciesRatesSaga () {
  yield takeLatest(FETCH_NEW_RATES_REQUEST, startGetNewCurrenciesSagaFlow)
}
