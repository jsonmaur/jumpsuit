import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
//
import { CreateJumpstateMiddleware } from 'jumpstate'
import { GetHistory } from './historyMode'

export let store

export const devToolsConfig = {}

export default function CreateStore (
  reducer,
  initialState,
  options = {}
) {
// Option defaults
  const {
    middleware = [],
    enhancers = [],
    history = GetHistory()
  } = options

  // Compose the middleware
  const middlewares = applyMiddleware(
    routerMiddleware(history),
    ...middleware,
    CreateJumpstateMiddleware()
  )

  const finalEnhancers = [middlewares, ...enhancers]

  let resolvedCompose = compose

  // Insert dev tools if needed
  if (process.env.NODE_ENV !== 'production') {
    if (global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      resolvedCompose = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(devToolsConfig) || compose
    } else {
      const devTools = require('./devtools').default
      const devToolsExtension = devTools.instrument(devToolsConfig)
      finalEnhancers.push(devToolsExtension)
      console.info('Dev Tools: Press ctrl+h to toggle and ctrl+p to change position')
    }
  }

  const enhancer = resolvedCompose(...finalEnhancers)
  store = createStore(reducer, initialState, enhancer)

  return store
}
