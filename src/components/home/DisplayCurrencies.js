import React from 'react'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import Paper from '@material-ui/core/Paper'
import DisplayCurrencyDetails from './DisplayCurrencyDetails'
import Helper from '../helper'

class DisplayCurrencies extends React.Component {
  displayCurrencyDetails () {
    const { currenciesList, skip } = this.props

    return (
      Object.keys(currenciesList)
        .filter((key) => key !== skip && key !== 'baseCurrency' && key !== 'updatedRateTime')
        .map((key) => (
          <DisplayCurrencyDetails
            key={key}
            currency={key}
            buy={Helper.fixRate(currenciesList[key].rate)}
            sell={Helper.fixRate(currenciesList[key].rate)}
            amount={currenciesList[key].amount}
          />
        ))
    )
  }

  render () {
    return (
      <React.Fragment>
        <Paper className={'container paperRootStyle'}>
          <Table className={'currencyTableStyle'}>
            <TableHead className={'customTh'}>
              <TableRow>
                <TableCell>Currency</TableCell>
                <TableCell align='right'>Buy</TableCell>
                <TableCell align='right'>Sell</TableCell>
                <TableCell align='right'>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={'customTd'}>
              {this.displayCurrencyDetails()}
            </TableBody>
          </Table>
        </Paper>
      </React.Fragment>
    )
  }
}

export default DisplayCurrencies
