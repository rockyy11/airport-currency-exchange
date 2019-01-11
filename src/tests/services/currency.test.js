import _ from 'lodash'
import CurrencyAPIHelper from '../../services/Currency'
import CurrencyListDefaultData from '../../data/CurrenciesList'

jest.setTimeout(10000)

const isCurrencyKey = (key, response) => {
  return (key !== 'baseCurrency' && key !== response.baseCurrency && key !== 'updatedRateTime')
}

const getNoBaseCurrency = (currenciesList) => {
  const baseCurrency = currenciesList.baseCurrency
  const filteredList = Object.keys(currenciesList).filter((key) => key !== baseCurrency)
  return filteredList[0]
}

describe('Currency Service Test', () => {
  let currenciesList
  let updatedList
  it('Should be able to fech the currencies List', async () => {
    const response = await CurrencyAPIHelper.getCurrenciesList()
    const keys = Object.keys(CurrencyListDefaultData)
    keys.forEach((key) => {
      expect(response).toHaveProperty(key)
    })
    currenciesList = response
  })

  describe(('Stochastic Currency Rate Updation Test'), () => {
    it('Rate should be Updated by defined stochastic factor - I', async () => {
      const clonedCurrenciesList = _.cloneDeep(currenciesList)
      const response = await CurrencyAPIHelper.getCurrenciesList(clonedCurrenciesList)
      const keys = Object.keys(currenciesList)
      keys.forEach((key) => {
        expect(response).toHaveProperty(key)
        if (isCurrencyKey(key, response)) {
          const oldRate = currenciesList[key].rate * 1.01
          const newRate = response[key].rate
          expect(oldRate).toEqual(newRate)
        }
      })
      updatedList = response
    })
    it('Rate should be Updated by defined stochastic factor - II', async () => {
      const response = await CurrencyAPIHelper.getCurrenciesList(updatedList)
      const keys = Object.keys(currenciesList)
      keys.forEach((key) => {
        if (isCurrencyKey(key, response)) {
          const oldRate = currenciesList[key].rate
          const newRate = response[key].rate
          expect(oldRate).toEqual(newRate)
        }
      })
    })
  })
  describe(('Buy service test'), () => {
    const clonedCurrenciesList = _.cloneDeep(CurrencyListDefaultData)
    const baseCurrency = clonedCurrenciesList.baseCurrency
    const initialBaseAmount = clonedCurrenciesList[baseCurrency].amount
    const noBaseCurrency = getNoBaseCurrency(clonedCurrenciesList)
    it('Buy Service Test', async () => {
      const totalAmount = 116.50
      const buyAmount = 500
      const currency = clonedCurrenciesList[noBaseCurrency]
      const response = await CurrencyAPIHelper.buyCurrency({
        totalAmount,
        type: noBaseCurrency,
        buy: buyAmount
      }, clonedCurrenciesList)
      const remainingBaseAmount = initialBaseAmount - totalAmount
      currency.amount = currency.amount + buyAmount
      expect(response[baseCurrency].amount).toEqual(remainingBaseAmount)
      expect(response[noBaseCurrency].amount).toEqual(currency.amount)
    })
  })
})
