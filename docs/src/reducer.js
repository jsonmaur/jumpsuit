import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory, hashHistory } from 'react-router'
//
import { CreateJumpstateMiddleware } from 'jumpstate'

let userMiddleware = []
let userEnhancers = []

export function Middleware (...newMiddleware) {
  userMiddleware = [...userMiddleware, ...newMiddleware]
}

export function Enhancer (...newEnhancers) {
  userEnhancers = [...userEnhancers, ...newEnhancers]
}

// Default history to browser history
export let history = browserHistory

export function combine (states, options = {}) {
  // Update the history object to the correct history instance
  history = options.useHash ? hashHistory : browserHistory

  // Compose the middleware
  const middleware = applyMiddleware(
    routerMiddleware(history),
    ...userMiddleware,
    CreateJumpstateMiddleware()
  )
  const enhancers = [middleware, ...userEnhancers]

  // Insert dev tools if needed
  if (process.env.NODE_ENV !== 'production') {
    const devTools = require('./devtools')
    const devToolsExtension = devTools.default.instrument({
      maxAge: Number(process.env.HSR_MAX_AGE),
      shouldCatchErrors: Boolean(process.env.HSR_SHOULD_CATCH_ERRORS)
    })
    enhancers.push(devToolsExtension)
  }

  const enhancer = compose(...enhancers)
  const rootReducer = combineReducers(states)

  const store = createStore(rootReducer, enhancer)

  return store
}
