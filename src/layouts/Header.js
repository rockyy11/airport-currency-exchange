import * as React from 'react'
import { NavLink } from 'react-router-dom'

const buttonAppBar = () => {
  return (
    <React.Fragment>
      <div className={'rootStyle'}>
        <div
          className={'headerBg'}
          style={{ backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }}>
          <div className={'headerLeft'}>
            Airport Currency Exchange Office
          </div>
          <div className={'headerRight'}>
            <ul>
              <li>
                <NavLink
                  to='/home'
                  activeClassName='select'
                  className={'bttn'}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/admin'
                  activeClassName='select'
                  className={'bttn'}>
                  Admin
                </NavLink>
              </li>
              <li> <img
                className={'logoImage'}
                src='logo.jpg'
                alt='logo' /></li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default buttonAppBar
