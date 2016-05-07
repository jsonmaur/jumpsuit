import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { isDevTools } from './utils/env'

export function combine (states) {
  const middleware = applyMiddleware(thunk)
  const enhancers = [middleware]


  if (process.env.NODE_ENV === 'development') {
    const devTools = require('./devtools')
    const devToolsExtension = devTools.default.instrument()
    // window.devToolsExtension()
    enhancers.push(devToolsExtension)
  }

  const enhancer = compose(...enhancers)
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

export function getDevToolsState(){}

export function setDevToolsState(){}
