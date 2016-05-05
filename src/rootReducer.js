import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import thunk from 'redux-thunk'

export function combine (states) {
  // TODO: handle single state and combined state as well
  const allReducers = {}
  const dispatchers = {}

  states.forEach((d) => {
    if(allReducers[d.name]){
      console.log('WARNING: Duplicate state found for: ', d.name, d)
      return
    }
    allReducers[d.name] = d.reducer
    dispatchers[d.name] = d.dispatchers
  })

  // The middleware
  const middleware = [thunk]
  // Create the root reducers
  const rootReducer = combineReducers(allReducers)
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
  ))

  // Handle browserify HMR via livereactload
  if (module.onReload) {
    module.onReload(() => {
      store.replaceReducer(rootReducer)
      return true
    })
  }
  // TODO: Handle webpack HMR

  return {
    store,
    dispatchers,
  }
}
