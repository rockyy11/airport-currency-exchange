import _ from 'lodash'
import CurrencyAPIHelper from '../../services/Currency'
import CurrencyListDefaultData from '../../data/CurrenciesList'

jest.setTimeout(10000)

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
        if (key !== 'baseCurrency' && key !== response.baseCurrency && key !== 'updatedRateTime') {
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
        if (key !== 'baseCurrency' && key !== response.baseCurrency && key !== 'updatedRateTime') {
          const oldRate = currenciesList[key].rate
          const newRate = response[key].rate
          expect(oldRate).toEqual(newRate)
        }
      })
    })
  })
})
