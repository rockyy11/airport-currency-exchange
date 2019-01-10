import CurrenciesListData from '../data/CurrenciesList'
import Helper from './Helper'

const currencyAPIHelper = {
  async getCurrenciesList () {
    const baseCurrency = CurrenciesListData.baseCurrency
    const filteredKey = Object.keys(CurrenciesListData).filter((key) => {
      if (key !== baseCurrency && key !== 'baseCurrency') {
        return key
      }
    })
    const currencies = filteredKey.join(',')
    const [response, err] = await Helper.fetchRates(currencies)
    if (err) {
      console.error('Error while fetching the new currencies rates')
      // TODO: throw  error
    }
    filteredKey.forEach((key) => {
      CurrenciesListData[key].rates = response.quotes[`${baseCurrency}${key}`]
    })
    return CurrenciesListData
  }
}

export default currencyAPIHelper
