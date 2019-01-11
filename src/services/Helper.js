import rp from 'request-promise'

const Helper = {
  async fetchRates (currencies) {
    let response
    const options = {
      uri: 'http://apilayer.net/api/live',
      qs: {
        access_key: 'c83929b29e310b821396a86e37c10fcd',
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
