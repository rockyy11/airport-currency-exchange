import rp from 'request-promise'

const Helper = {
  async fetchRates (currencies) {
    let response
    const options = {
      uri: 'http://apilayer.net/api/live',
      qs: {
        access_key: process.env.REACT_APP_CURREX_API_KEY,
        currencies: currencies,
        format: 1
      },
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true
    }
    try {
      const data = await rp(options)
      response = (data && data.error) ? [undefined, data.error.info] : response = [data]
    } catch (err) {
      response = [undefined, err]
      console.error('Error API fetching the new currencies rates', err)
    }
    return response
  }
}

export default Helper
