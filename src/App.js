import React from 'react'
import Header from './layouts/Header'
import Footer from './layouts/Footer'
import Routes from './Routes'
import UpdateRates from './utils/UpdateRates'
import './App.css'

class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Header />
        <Routes />
        <Footer />
      </React.Fragment>
    )
  }
}

UpdateRates()

export default App
