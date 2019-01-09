import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import * as sagas from './sagas'
import _ from 'lodash'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  applyMiddleware(
    sagaMiddleware
  )
)

const initSagas = () => {
  /* tslint:disable:no-unsafe-any */
  _.values(sagas)
    .forEach(sagaMiddleware.run.bind(sagaMiddleware))
}

initSagas()

export default store
