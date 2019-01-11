// React Environment Setting - https://stackoverflow.com/questions/48378337/create-react-app-not-picking-up-env-files

const currenciesList = {
  USD: { amount: 1500 },
  EUR: { amount: 1000 },
  CAD: { amount: 800 },
  baseCurrency: process.env.REACT_APP_BASE_CURRENCY
}

export default currenciesList
