import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import DisplaySettings from '../components/admin/DisplaySettings'
import { adminSettingsRequest } from '../actions/admin/settings'

class AdminContainer extends React.Component {
  render () {
    const { settings, isPending } = this.props.settingsStates

    return (
      <React.Fragment>
        {
          !isPending && !_.isEmpty(settings) &&
          <DisplaySettings settings={settings} />
        }
      </React.Fragment>
    )
  }

  componentDidMount () {
    const { settingsStates, getAdminSettings } = this.props
    console.log(settingsStates)
    getAdminSettings()
  }
}

const mapStateToProps = (state) => ({ settingsStates: state.settings })

const mapDispatchToProps = (dispatch) => ({
  getAdminSettings: () => dispatch(adminSettingsRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)
