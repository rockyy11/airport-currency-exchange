import moment from 'moment'
import CurrenciesListData from '../data/CurrenciesList'
import Helper from './Helper'

const currencyAPIHelper = {
  async getCurrenciesList (oldCurrenciesList) {
    console.log(process.env.DB_USER)
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
  }
}

export default currencyAPIHelper
