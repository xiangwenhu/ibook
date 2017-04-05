import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './Routes'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import configureStore from './store'

let store = configureStore({})
store.subscribe(() =>
  console.log(store.getState())
)

class App extends React.Component {
  render() {  
    return (
      <Provider store={store}>
        <div>
          <Routes/>
        </div>
      </Provider>
    )
  }
}

export default App

