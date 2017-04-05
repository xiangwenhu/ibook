import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducers  from './reducers'

let createStoreWithMiddleware;
// store负责管理所有reducer，module.hot.accept表示支持热更新
const logger = createLogger({ collapsed: true })
createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    logger
)(createStore)

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducers, initialState)
  return store
}