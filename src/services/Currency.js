import CurrenciesListData from '../data/CurrenciesList'

const currencyAPIHelper = {
  async getCurrenciesList () {
    return new Promise((resolve) => {
      resolve(CurrenciesListData)
    })
  }
}

export default currencyAPIHelper
