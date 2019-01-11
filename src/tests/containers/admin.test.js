import React from 'react'
import Admin from '../../containers/Admin'
import { shallow } from 'enzyme'
it('render admin container without crashing', () => {
  shallow(<Admin />)
})
