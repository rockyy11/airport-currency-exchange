import CurrenciesListData from '../data/CurrenciesList'

const helper = {
  isLessAmount (key, amount) {
    const leastAmount = CurrenciesListData[key].amount * 0.25
    return amount <= leastAmount
  }
}

export default helper
