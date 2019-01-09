import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { updateAdminSettingsRequest } from '../../actions/admin/updateSettings'

class DisplaySettings extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...props.settings }
  }

  onFieldChange = (name) => (event) => {
    this.setState({
      [name]: parseInt(event.target.value, 10)
    });
  }

  updateSettings = () => {
    this.props.updateSettings(this.state);
  }

  render() {
    const {
      currenciesRatesRefreshTime,
      commission,
      surcharge,
      minimalCommission,
      rateMargin
    } = this.state

    return (
      <div className={'container'} style={{ width: '45%' }}>
        <div className={'row'}>
          <div className={'col-md-12'}>Settings</div>
        </div>
        <div className={'row'}>
          <div className={'col-md-8 dialogBodyPadding'}>
            Refresh currency exchange rates at every (seconds)
          </div>
          <div className={'col-md-4 dialogBodyPadding'}>
            <TextField
              type='number'
              onChange={this.onFieldChange('currenciesRatesRefreshTime')}
              defaultValue={currenciesRatesRefreshTime} />
          </div>
        </div>
        <div className={'row'}>
          <div className={'col-md-8 dialogBodyPadding'}>
            Commission (%)
          </div>
          <div className={'col-md-4 dialogBodyPadding'}>
            <TextField
              type='number'
              onChange={this.onFieldChange('commission')}
              defaultValue={commission} />
          </div>
        </div>
        <div className={'row'}>
          <div className={'col-md-8 dialogBodyPadding'}>
            Surcharge ($)
          </div>
          <div className={'col-md-4 dialogBodyPadding'}>
            <TextField
              type='number'
              onChange={this.onFieldChange('surcharge')}
              defaultValue={surcharge} />
          </div>
        </div>
        <div className={'row'}>
          <div className={'col-md-8 dialogBodyPadding'}>
            Minimal commission ($)
          </div>
          <div className={'col-md-4 dialogBodyPadding'}>
            <TextField
              type='number'
              onChange={this.onFieldChange('minimalCommission')}
              defaultValue={minimalCommission} />
          </div>
        </div>
        <div className={'row'}>
          <div className={'col-md-8 dialogBodyPadding'}>
            Buy/sell rate margin (%)
          </div>
          <div className={'col-md-4 dialogBodyPadding'}>
            <TextField
              type='number'
              onChange={this.onFieldChange('rateMargin')}
              defaultValue={rateMargin} />
          </div>
        </div>
        <Button
          onClick={this.updateSettings}
          className={'dialogButton'}
          style={{ float: 'right' }}>
          Update
        </Button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateSettings: (settings) => dispatch(updateAdminSettingsRequest(settings))
})

export default connect(null, mapDispatchToProps)(DisplaySettings)
