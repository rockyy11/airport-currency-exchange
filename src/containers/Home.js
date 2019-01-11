import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import DisplayCurrencies from '../components/home/DisplayCurrencies'
import DisplayBaseCurrencyDetails from '../components/home/DisplayBaseCurrencyDetails'
import Loader from '../components/wrappers/Loader'
import { currenciesListRequest } from '../actions/currency/CurrenciesList'

class HomeContainer extends React.Component {
  render () {
    const { settingsStates, currenciesListStates, newRatesStates } = this.props
    const { currenciesList, isPending } = currenciesListStates

    return (
      <React.Fragment>
        {
          !isPending && !_.isEmpty(currenciesList) && !newRatesStates.error &&
          <div>
            <div className={'container headingStyles'}>
              <DisplayBaseCurrencyDetails currencyData={currenciesList} />
            </div>
            <DisplayCurrencies
              settings={settingsStates.settings}
              currenciesList={currenciesList}
              skip={currenciesList.baseCurrency}
            />
          </div>
        }
        {isPending && <Loader />}
      </React.Fragment>
    )
  }

  componentDidMount () {
    const { currenciesList } = this.props.currenciesListStates
    if (_.isEmpty(currenciesList)) {
      this.props.getCurrenciesList()
    }
  }
}

const mapStateToProps = (state) => ({
  currenciesListStates: state.currenciesList,
  settingsStates: state.settings,
  newRatesStates: state.newRates
})

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesList: () => dispatch(currenciesListRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
