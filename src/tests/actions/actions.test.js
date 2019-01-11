import _ from 'lodash'
import * as actions from '../../actions/ActionTypes'
import { updateAdminSettingsRequest } from '../../actions/admin/updateSettings'
import { adminSettingsRequest } from '../../actions/admin/settings'
import { buyCurrencyRequest } from '../../actions/currency/BuyCurrency'
import { sellCurrencyRequest } from '../../actions/currency/SellCurrency'
import { fetchNewRatesRequest } from '../../actions/currency/NewRates'
import { currenciesListRequest } from '../../actions/currency/CurrenciesList'

import AdminConfigurationSettings from '../../data/AdminConfiguration'

const adminConfigSetings = _.cloneDeep(AdminConfigurationSettings)

describe('actions', () => {
  const testSettingsData = adminConfigSetings
  describe('Admin settings action', () => {
    it('Get Admin Settings Action', () => {
      const testData = testSettingsData
      const expectedAction = {
        type: actions.ADMIN_SETTINGS_REQUEST,
        payload: testSettingsData
      }
      expect(adminSettingsRequest(testData)).toEqual(expectedAction)
    })
    it('Update Admin Settings Action', () => {
      const testData = testSettingsData
      testData.rateMargin = 3
      const expectedAction = {
        type: actions.UPDATE_ADMIN_SETTINGS_REQUEST,
        payload: testSettingsData
      }
      expect(updateAdminSettingsRequest(testData)).toEqual(expectedAction)
    })
  })
  describe('Buy rate and sell rate action', () => {
    it('Buy Rate', () => {
      const testData = { type: 'Buy', totalAmount: 1000, buy: 800 }
      const expectedAction = {
        type: actions.BUY_CURRENCY_REQUEST,
        payload: testData
      }
      expect(buyCurrencyRequest(testData)).toEqual(expectedAction)
    })
    it('Sell Rate', () => {
      const testData = { type: 'Sell', totalAmount: 1000, sell: 800 }
      testData.rateMargin = 3
      const expectedAction = {
        type: actions.SELL_CURRENCY_REQUEST,
        payload: testData
      }
      expect(sellCurrencyRequest(testData)).toEqual(expectedAction)
    })
  })
  describe('Currency rate', () => {
    it('Fetch New Rate', () => {
      const expectedAction = {
        type: actions.FETCH_NEW_RATES_REQUEST
      }
      expect(fetchNewRatesRequest()).toEqual(expectedAction)
    })
  })
  describe('Fetch Currencies List', () => {
    it('Currencies List', () => {
      const expectedAction = {
        type: actions.CURRENCIES_LIST_REQUEST
      }
      expect(currenciesListRequest()).toEqual(expectedAction)
    })
  })
})
