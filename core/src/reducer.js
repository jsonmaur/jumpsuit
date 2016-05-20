import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk'

let userMiddleware = []

export function Middleware (...newMiddleware) {
  userMiddleware = [...userMiddleware, ...newMiddleware]
}

export let STORE

export function combine (states) {
  const nativeMiddleware = applyMiddleware(thunk, routerMiddleware(browserHistory), ...userMiddleware)
  const enhancers = [nativeMiddleware]

  if (process.env.NODE_ENV !== 'production') {
    const devTools = require('./devtools')
    const devToolsExtension = devTools.default.instrument()
    enhancers.push(devToolsExtension)
  }

  const enhancer = compose(...enhancers)
  const rootReducer = combineReducers(states)

  const store = createStore(rootReducer, enhancer)
  STORE = store

  for (const i in states) {
    states[i].dispatch = store.dispatch
    states[i].getState = (stateName) => {
      if (stateName === true) return store.getState()
      return store.getState()[states[i]._name]
    }
  }

  return store
}

export function getDevToolsState () {}
export function setDevToolsState () {}
