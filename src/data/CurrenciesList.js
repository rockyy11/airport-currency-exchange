// React Environment Setting - https://stackoverflow.com/questions/48378337/create-react-app-not-picking-up-env-files

const currenciesList = {
  USD: { amount: 10000, label: 'US Dollar' },
  EUR: { amount: 1000, label: 'Euro' },
  CAD: { amount: 800, label: 'Canadian Dollar' },
  AUD: { amount: 800, label: 'Australian Dollar' },
  JPY: { amount: 800, label: 'Japan Yen' },
  baseCurrency: process.env.REACT_APP_BASE_CURRENCY
}

export default currenciesList
