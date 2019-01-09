import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomeContainer from './containers/Home'
import AdminContainer from './containers/Admin'

class Routes extends React.Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={HomeContainer} />
        <Route path='/home' component={HomeContainer} />
        <Route path='/admin' component={AdminContainer} />
      </Switch>
    )
  }
}

export default Routes
