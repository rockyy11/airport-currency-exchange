import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import DisplayCurrencies from '../components/home/DisplayCurrencies'
import { currenciesListRequest } from '../actions/currency/CurrenciesList'

class HomeContainer extends React.Component {
  getBaseCurrency () {
    const { currenciesList } = this.props.currenciesListStates
    const baseCurrency = currenciesList.baseCurrency
    const baseAmount = currenciesList[`${baseCurrency}`].amount

    return `${baseAmount.toFixed(2)} ${baseCurrency}`
  }

  render () {
    const { currenciesList, isPending } = this.props.currenciesListStates

    return (
      <React.Fragment>
        {
          !isPending && !_.isEmpty(currenciesList) &&
          <div>
            <div className={'container headingStyles'}>
              Exchange rates shown as per {currenciesList.updatedRateTime}. You have {this.getBaseCurrency()} left.
            </div>
            <DisplayCurrencies
              currenciesList={currenciesList}
              skip={currenciesList.baseCurrency}
            />
          </div>
        }
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
