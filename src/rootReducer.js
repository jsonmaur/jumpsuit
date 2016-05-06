import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

export function combine (states) {
  let devTools
  if (process.env.NODE_ENV === 'development') {
    devTools = require('./devtools').default
  }

  const middleware = applyMiddleware(thunk)

  const devToolsExtension = window.devToolsExtension
    ? window.devToolsExtension()
    : devTools
    ? devTools.instrument() :
    f => f

  const enhancer = devTools
    ? compose(middleware, devToolsExtension)
    : compose(middleware)

  const rootReducer = combineReducers(states)
  const store = createStore(rootReducer, enhancer)

  for (const i in states) {
    states[i].dispatch = (type, payload) => store.dispatch({ type, payload })
    states[i].getState = (stateName) => {
      if (stateName === true) return store.getState()
      else if (typeof stateName === 'string') return store.getState()[stateName]

      return store.getState()[states[i]._name]
    }
  }

  // if (module.onReload) {
  //   module.onReload(() => {
  //     // store.replaceReducer(rootReducer)
  //     return true
  //   })
  // }

  return store
}
