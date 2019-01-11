# Airport Currency Exchange

## Description

A portal for airport currency exchange to buy/sell foriegn currencies. Currently USD is the default(home) currency.

We are fetching the currency rates from Currex API.

To calculate the sell rate and buy rate from the exchange rate, we use the below formulae:
```javascript
BuyRate = 1 / ExchangeRate
/* eg: buy rate for EUR = 1 / 0.8802 = 1.1361 */
SellRate = BuyRate + ( BuyRate * MarginPercent / 100)
/* eg: sell rate for EUR =  1.1361 + (1.1361 * 2 / 100) = 1.1588 */
```

## Usage

- Click on Admin option on top right to configure settings
- On home page
  - click on Buy rate of any currency to buy the currency
  - click on Sell rate of any currency to sell the currency

## Live Demo
You can find a live demo at Heroku: http://airport-currency-exchange.herokuapp.com/

## Available Scripts
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
