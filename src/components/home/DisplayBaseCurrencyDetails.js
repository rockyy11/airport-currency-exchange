import React from 'react'
import Helper from '../helper'

const displayBaseCurrencyDetails = (props) => {
  const { currencyData } = props
  const baseCurrency = currencyData.baseCurrency
  const baseAmount = currencyData[`${baseCurrency}`].amount

  return (
    <React.Fragment>
      Exchange rates shown as per
      <span> {currencyData.updatedRateTime}.</span>
      You have
      <span
        style={{ 'paddingLeft': '3px', 'paddingRight': '3px' }}
        className={Helper.isLessAmount(baseCurrency, baseAmount) ? 'warning' : ''}>
        {Helper.fixAmount(baseAmount)} {baseCurrency}
      </span>
      left.
    </React.Fragment>
  )
}

export default displayBaseCurrencyDetails
