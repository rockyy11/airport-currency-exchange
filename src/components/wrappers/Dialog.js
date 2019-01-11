import React from 'react'
import { connect } from 'react-redux'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { buyCurrencyRequest } from '../../actions/currency/BuyCurrency'
import { sellCurrencyRequest } from '../../actions/currency/SellCurrency'
import Helper from '../helper'

class DialogWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputAmount: 100,
      commission: this.calculateCommision(props, 100),
      subTotal: this.getSubTotal(props, 100)
    }
    this.isTypeBuy = this.isTypeBuy.bind(this)
    this.rateToShow = this.rateToShow.bind(this)
  }

  calculateCommision(props, inputAmount) {
    const { settings: configurationSettings } = props
    const { commission, surcharge, minimalCommission } = configurationSettings
    const newCommission = Math.max(((this.getSubTotal(props, inputAmount) * (commission / 100)) + surcharge), minimalCommission)
    return newCommission
  }

  getSubTotal(props, inputAmount) {
    const { buyRate, sellRate } = props
    return inputAmount / (this.isTypeBuy() ? buyRate : sellRate)
  }

  updateAmount = () => {
    const { currency, buyCurrency, sellCurrency } = this.props
    const { commission, subTotal, inputAmount } = this.state
    const total = commission + subTotal
    if (this.isTypeBuy()) {
      buyCurrency({ type: currency, totalAmount: total, buy: inputAmount })
    } else {
      sellCurrency({ type: currency, totalAmount: total, sell: inputAmount })
    }
    this.props.onClose()
  }

  getTotal() {
    const { subTotal, commission } = this.state
    const total = this.isTypeBuy() ? subTotal + commission : subTotal - commission
    return Helper.fixAmount(total)
  }

  isTypeBuy() {
    return this.props.dialogType === 'Buy'
  }

  onFieldChange = (event) => {
    const val = parseInt(event.target.value)
    const inputAmount = val || 0

    const commission = this.calculateCommision(this.props, inputAmount)
    this.setState({
      inputAmount: isNaN(inputAmount) ? 0 : inputAmount,
      commission,
      subTotal: this.getSubTotal(this.props, inputAmount)
    });
  }

  componentWillReceiveProps(nextProps) {
    const { buyRate: newBuyRate, sellRate: newSellRate } = nextProps
    const { buyRate: oldBuyRate, sellRate: oldSellRate } = this.props
    if (oldBuyRate !== newBuyRate || oldSellRate !== newSellRate) {
      const subTotal = this.getSubTotal(nextProps, this.state.inputAmount)
      this.setState({
        subTotal,
        commission: this.calculateCommision(nextProps, this.state.inputAmount)
      })
    }
  }

  rateToShow() {
    const rate = this.isTypeBuy() ? this.props.buyRate : this.props.sellRate
    return (1 / rate).toFixed(4)
  }

  render() {
    const { commission, inputAmount, subTotal } = this.state
    const { open, onClose, dialogType, currency } = this.props
    return (
      <Dialog
        className={'customDialog'}
        PaperProps={{ classes: { root: 'dialogRootStyle' } }}
        open={open}
        onClose={onClose} >
        <DialogTitle>{dialogType} {currency}</DialogTitle>
        <div className={'container'} style={{ width: '100%' }}>
          <div className={'row'}>
            <div className={'col-md-3'}>
              <TextField
                placeholder='Amount'
                defaultValue={inputAmount}
                onChange={this.onFieldChange}
                InputProps={{ inputProps: { min: 1 } }}
                type='number'
              />
            </div>
            <div className={'col-md-2 customIcon'}>
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
              {this.rateToShow()}
            </div>
            <div className={'col-md-9 dialogBodyPadding'}>
              Subtotal
            </div>
            <div className={'col-md-3 dialogBodyPadding'}>
              {Helper.fixAmount(subTotal)}
            </div>
            <div className={'col-md-9 dialogBodyPadding'}>
              Commision
            </div>
            <div className={'col-md-3 dialogBodyPadding'}>
              {Helper.fixRate(commission)}
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
          <div className={'row pull-right'} style={{ padding: '12px' }}>
            <div className={'col-md-4'}>
              <Button onClick={onClose}>
                Cancel
              </Button>
            </div>
            <div className={'col-md-4'} >
              <Button
                className={'dialogButton'}
                disabled={!inputAmount}
                onClick={this.updateAmount}>
                {dialogType}
              </Button>
            </div>
          </div>
        </div>
      </Dialog >
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  buyCurrency: (data) => dispatch(buyCurrencyRequest(data)),
  sellCurrency: (data) => dispatch(sellCurrencyRequest(data))
})

export default connect(null, mapDispatchToProps)(DialogWrapper)
