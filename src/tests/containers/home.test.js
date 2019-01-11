import React from 'react'
import Home from '../../containers/Home'
import { shallow } from 'enzyme'
it('render home container without crashing', () => {
  shallow(<Home />)
})
