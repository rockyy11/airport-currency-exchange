import CurrenciesListData from '../data/CurrenciesList'

const helper = {
  isLessAmount (key, amount) {
    const leastAmount = CurrenciesListData[key].amount * 0.25
    return amount <= leastAmount
  },
  fixAmount (amount) {
    return amount.toFixed(2)
  },
  fixRate (amount) {
    return amount.toFixed(4)
  }
}

export default helper
