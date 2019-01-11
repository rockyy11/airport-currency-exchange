import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import DisplayCurrencies from '../components/home/DisplayCurrencies'
import DisplayBaseCurrencyDetails from '../components/home/DisplayBaseCurrencyDetails'
import Loader from '../components/wrappers/Loader'
import { currenciesListRequest } from '../actions/currency/CurrenciesList'

class HomeContainer extends React.Component {
  render () {
    const { currenciesList, isPending } = this.props.currenciesListStates

    return (
      <React.Fragment>
        {
          !isPending && !_.isEmpty(currenciesList) &&
          <div>
            <div className={'container headingStyles'}>
              <DisplayBaseCurrencyDetails currencyData={currenciesList} />
            </div>
            <DisplayCurrencies
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

const mapStateToProps = (state) => ({ currenciesListStates: state.currenciesList })

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesList: () => dispatch(currenciesListRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
