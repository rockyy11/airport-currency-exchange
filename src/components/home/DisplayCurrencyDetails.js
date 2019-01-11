import * as React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import DialogWrapper from '../wrappers/Dialog'
import helper from '../helper'

class DisplayCurrencyDetails extends React.Component {
  state = {
    openDialog: false,
    dialogType: ''
  };

  closeDialog = () => {
    this.setState({ openDialog: false, dialogType: '' });
  }

  onBuyCellClick = () => {
    this.setState({ openDialog: true, dialogType: 'Buy' });
  }

  onSellCellClick = () => {
    this.setState({ openDialog: true, dialogType: 'Sell' });
  }

  render() {
    const { currency, label, buy, sell, amount, settings } = this.props;
    const sellAmount = sell * (1 + (settings.rateMargin / 100))

    return (
      <React.Fragment>
        <DialogWrapper
          dialogType={this.state.dialogType}
          buyRate={buy}
          settings={settings}
          sellRate={sell}
          currency={currency}
          open={this.state.openDialog}
          onClose={this.closeDialog} />
        <TableRow hover={true} >
          <TableCell className={'tableRow'} title={label}>{currency}</TableCell>
          <TableCell
            align='right'
            className={'tableRow'}
            onClick={this.onBuyCellClick}>
            {helper.fixRate(1 / buy)}
          </TableCell>
          <TableCell
            align='right'
            className={'tableRow'}
            onClick={this.onSellCellClick}>
            {helper.fixRate(1 / sellAmount)}
          </TableCell>
          <TableCell
            align='right'
            className={helper.isLessAmount(currency, amount) ? 'warning tableRow' : 'tableRow'}>
            {helper.fixAmount(amount)}
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
}

export default DisplayCurrencyDetails;
