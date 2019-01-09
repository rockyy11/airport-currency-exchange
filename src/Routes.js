import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomeContainer from './containers/Home'
import AdminContainer from './containers/Admin'
import Notification from './components/wrappers/Notification'

class Routes extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path='/' component={HomeContainer} />
          <Route path='/home' component={HomeContainer} />
          <Route path='/admin' component={AdminContainer} />
        </Switch>
        <Notification />
      </React.Fragment>
    )
  }
}

export default Routes
