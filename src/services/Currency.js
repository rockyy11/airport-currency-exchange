import moment from 'moment'
import _ from 'lodash'
import ListData from '../data/CurrenciesList'
import Helper from './Helper'

const currencyAPIHelper = {
  async getCurrenciesList (oldCurrenciesList) {
    let CurrenciesListData
    const isEmptyList = _.isEmpty(oldCurrenciesList)
    if (isEmptyList) {
      CurrenciesListData = _.cloneDeep(ListData)
    } else {
      CurrenciesListData = oldCurrenciesList
    }
    const baseCurrency = CurrenciesListData.baseCurrency
    const filteredKeys = Object.keys(CurrenciesListData).filter((key) => {
      if (key !== baseCurrency && key !== 'baseCurrency' && key !== 'updatedRateTime') {
        return key
      }
    })
    const currencies = filteredKeys.join(',')
    const [response, err] = await Helper.fetchRates(currencies)
    if (err && isEmptyList) {
      console.error('Error while fetching the new currencies rates', err)
      throw err || 'Error fetching the API rates. Please try Again !!'
    }
    filteredKeys.forEach((key) => {
      const apiRate = response && response.quotes[`${baseCurrency}${key}`]
      let newRate = apiRate || oldCurrenciesList[key]
      const actualRate = oldCurrenciesList && oldCurrenciesList[key].actualRate
      if (newRate === actualRate) {
        newRate = oldCurrenciesList[key].rate * 1.01
      }
      CurrenciesListData[key].rate = newRate
      CurrenciesListData[key].actualRate = newRate
    })
    CurrenciesListData.updatedRateTime = moment().format('YYYY/MM/DD h:mm:ss')
    return CurrenciesListData
  },
  async buyCurrency (data, currenciesList) {
    const { type, totalAmount, buy } = data
    const baseCurrency = currenciesList.baseCurrency
    if (type === currenciesList.baseCurrency) {
      throw 'You can\'t buy base currency!!'
    }
    const remainingBaseAmount = currenciesList[baseCurrency].amount - totalAmount
    if (remainingBaseAmount < 0) {
      throw 'You don\'t have enough balance to buy the amount!!'
    }
    currenciesList[baseCurrency].amount = remainingBaseAmount
    currenciesList[type].amount = currenciesList[type].amount + buy
    return currenciesList
  },
  async sellCurrency (data, currenciesList) {
    const { type, totalAmount, sell } = data
    const baseCurrency = currenciesList.baseCurrency
    if (type === currenciesList.baseCurrency) {
      throw 'You can\'t sell base currency!!'
    }
    currenciesList[baseCurrency].amount = currenciesList[baseCurrency].amount + sell
    currenciesList[type].amount = currenciesList[type].amount - totalAmount
    if (currenciesList[type].amount < 0) {
      throw 'You don\'t have enough balance to sell the amount!!'
    }
    return currenciesList
  }
}

export default currencyAPIHelper
