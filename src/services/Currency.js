import moment from 'moment'
import CurrenciesListData from '../data/CurrenciesList'
import Helper from './Helper'

const currencyAPIHelper = {
  async getCurrenciesList (oldCurrenciesList) {
    const baseCurrency = CurrenciesListData.baseCurrency
    const filteredKeys = Object.keys(CurrenciesListData).filter((key) => {
      if (key !== baseCurrency && key !== 'baseCurrency' && key !== 'updatedRateTime') {
        return key
      }
    })
    const currencies = filteredKeys.join(',')
    const [response, err] = await Helper.fetchRates(currencies)
    if (err) {
      console.error('Error while fetching the new currencies rates', err)
      // TODO: throw  error
    }
    filteredKeys.forEach((key) => {
      let newRate = response.quotes[`${baseCurrency}${key}`]
      if (!oldCurrenciesList) {
        CurrenciesListData[key].rate = newRate
        CurrenciesListData[key].actualRate = newRate
      } else {
        if (newRate === oldCurrenciesList[key].actualRate) {
          newRate = oldCurrenciesList[key].rate + (oldCurrenciesList[key].rate * 0.01)
        } else {
          CurrenciesListData[key].actualRate = newRate
        }
        CurrenciesListData[key].rate = newRate
      }
    })
    CurrenciesListData.updatedRateTime = moment().format('YYYY/MM/DD h:mm:ss')
    return CurrenciesListData
  },
  async buyCurrency (data, currenciesList) {
    const { type, totalAmount, buy } = data
    const baseCurrency = currenciesList.baseCurrency
    if (type === currenciesList.baseCurrency) {
      throw new Error('You can\'t buy base currency!!')
    }
    const remainingBaseAmount = currenciesList[baseCurrency].amount - totalAmount
    if (remainingBaseAmount < 0) {
      throw new Error('You don\'t have enough balance to buy the amount!!')
    }
    currenciesList[baseCurrency].amount = remainingBaseAmount
    currenciesList[type].amount = currenciesList[type].amount + buy
    return currenciesList
  },
  async sellCurrency (data, currenciesList) {
    const { type, totalAmount, sell } = data
    const baseCurrency = currenciesList.baseCurrency
    if (type === currenciesList.baseCurrency) {
      throw new Error('You can\'t sell base currency!!')
    }
    currenciesList[baseCurrency].amount = currenciesList[baseCurrency].amount + sell
    currenciesList[type].amount = currenciesList[type].amount - totalAmount
    if (currenciesList[type].amount < 0) {
      throw new Error('You don\'t have enough balance to sell the amount!!')
    }
    return currenciesList
  }
}

export default currencyAPIHelper
