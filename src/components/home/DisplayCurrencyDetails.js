import * as React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DialogWrapper from '../wrappers/Dialog';

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
    const { currency, buy, sell, amount } = this.props;

    return (
      <React.Fragment>
        <DialogWrapper
          dialogType={this.state.dialogType}
          buyRate={buy}
          sellRate={sell}
          currency={currency}
          open={this.state.openDialog}
          onClose={this.closeDialog} />
        <TableRow hover={true} >
          <TableCell>{currency}</TableCell>
          <TableCell
            align='right'
            onClick={this.onBuyCellClick}>
            {buy}
          </TableCell>
          <TableCell
            align='right'
            onClick={this.onSellCellClick}>
            {sell}
          </TableCell>
          <TableCell align='right'>{amount.toFixed(2)}</TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
}

export default DisplayCurrencyDetails;
