import React from 'react'
import { Provider } from 'react-redux'
// import { Router } from 'react-router'
//
import CombineState from './combineState'
import CreateStore from './createStore'

export default function (store, base) {
  // If passed a state object, make the store automagically
  if (typeof store === 'object' && !store.dispatch) {
    const reducer = CombineState(store)
    store = CreateStore(reducer)
  }

  let WrappedBaseComponent
  if (process.env.NODE_ENV !== 'production') {
    const Hsr = require('./hsr').default

    let DevTools = require('./devtools').default
    if (global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      DevTools = () => <span />
    }

    WrappedBaseComponent = React.createClass({
      getInitialState: () => ({
        ready: false
      }),
      render () {
        return (
          <div>
            <Hsr>
              {base}
            </Hsr>
            <DevTools />
          </div>
        )
      }
    })
  }

  return () => (
    <Provider
      store={store}
    >
      {WrappedBaseComponent ? <WrappedBaseComponent /> : base}
    </Provider>
  )
}

// export const Router = React.createClass({
//   render () {
//     return (
//       <Router history={syncedHistory}>
//         {this.props.children}
//       </Router>
//     )
//   }
// })
