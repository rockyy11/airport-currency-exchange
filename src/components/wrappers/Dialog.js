import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import DefaultSettingsData from '../../data/AdminConfiguration'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { buyCurrencyRequest } from '../../actions/currency/BuyCurrency'
import { sellCurrencyRequest } from '../../actions/currency/SellCurrency'

class DialogWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputAmount: 100,
      commission: this.calculateCommision(props, 100),
      subTotal: this.getSubTotal(props, 100)
    }
  }

  calculateCommision(props, inputAmount) {
    const { settings } = props.settingsStates
    const configurationSettings = _.isEmpty(settings) ? DefaultSettingsData : settings
    const { commission, surcharge, minimalCommission } = configurationSettings
    const newCommission = Math.max((this.getSubTotal(props, inputAmount) * (commission / 100) + surcharge), minimalCommission)
    return newCommission
  }

  getSubTotal(props, inputAmount) {
    const { dialogType, buyRate, sellRate } = props
    let subTotal
    if (dialogType === 'Buy') {
      subTotal = buyRate * inputAmount
    } else {
      subTotal = sellRate * inputAmount
    }
    return subTotal
  }

  updateAmount = () => {
    const { dialogType, currency, buyCurrency, sellCurrency } = this.props
    const { commission, subTotal, inputAmount } = this.state
    const total = commission + subTotal
    if (dialogType === 'Buy') {
      buyCurrency({ type: currency, totalAmount: total, buy: inputAmount })
    } else {
      sellCurrency({ type: currency, totalAmount: total, sell: inputAmount })
    }
  }

  getTotal() {
    const { subTotal, commission } = this.state
    const total = subTotal + commission
    return total.toFixed(4)
  }

  onFieldChange = (event) => {
    const inputAmount = parseInt(event.target.value)
    const commission = this.calculateCommision(this.props, inputAmount)
    this.setState({
      inputAmount,
      commission,
      subTotal: this.getSubTotal(this.props, inputAmount)
    });
  }

  componentWillReceiveProps(nextProps, nextStates) {
    const { buyRate: newBuyRate, sellRate: newSellRate } = nextProps
    const { buyRate: oldBuyRate, sellRate: oldSellRate } = this.props
    if (oldBuyRate !== newBuyRate || oldSellRate !== newSellRate) {
      const subTotal = this.getSubTotal(nextProps, this.state.inputAmount)
      this.setState({ subTotal })
    }
  }

  render() {
    const { commission, inputAmount, subTotal } = this.state
    const { open, onClose, dialogType, buyRate, sellRate, currency } = this.props

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{dialogType} {currency}</DialogTitle>
        <div className={'container'} style={{ width: '100%' }}>
          <div className={'row'}>
            <div className={'col-md-2'}>
              <IconButton aria-label={'Menu'}>
                <MenuIcon />
              </IconButton>
            </div>
            <div className={'col-md-8'}>
              <TextField
                defaultValue={inputAmount}
                onChange={this.onFieldChange}
                InputProps={{ inputProps: { min: 1 } }}
                type='number'
              />
            </div>
            <div className={'col-md-2'}>
              <IconButton aria-label='Menu'>
                .00
              </IconButton>
            </div>
          </div>
          <div className={'row'} style={{ padding: '12px' }}>
            <div className={'col-md-9 dialogBodyPadding'}>
              Exchange rate
            </div>
            <div className={'col-md-3 dialogBodyPadding'}>
              {dialogType === 'Buy' ? buyRate : sellRate}
            </div>
            <div className={'col-md-9 dialogBodyPadding'}>
              Subtotal
            </div>
            <div className={'col-md-3 dialogBodyPadding'}>
              {subTotal.toFixed(4)}
            </div>
            <div className={'col-md-9 dialogBodyPadding'}>
              Commision
            </div>
            <div className={'col-md-3 dialogBodyPadding'}>
              {commission.toFixed(2)}
            </div>
          </div>
          <hr className={'hrRow'} />
          <div className={'row'} style={{ padding: '12px' }}>
            <div className={'col-md-9 dialogBodyPadding'}>
              Total
            </div>
            <div className={'col-md-3 dialogBodyPadding'}>
              {this.getTotal()}
            </div>
          </div>
          <div className={'row'} style={{ padding: '12px' }}>
            <div className={'col-md-4'}>
              <Button>
                Cancel
              </Button>
            </div>
            <div className={'col-md-8'} style={{ float: 'right' }}>
              <Button
                className={'dialogButton'}
                disabled={!inputAmount}
                onClick={this.updateAmount}>
                {dialogType}
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    )
  }
}

const mapStateToProps = ({ settings }) => ({ settingsStates: settings })

const mapDispatchToProps = (dispatch) => ({
  buyCurrency: (data) => dispatch(buyCurrencyRequest(data)),
  sellCurrency: (data) => dispatch(sellCurrencyRequest(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(DialogWrapper)
