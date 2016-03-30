import _ from 'lodash'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { getDefaultDuck } from './duck'

let STORE, HISTORY
export function setupRedux(obj) {
  const stateReducer = getDefaultDuck(obj)
  const reducers = combineReducers({
    state: stateReducer,
    routing: routerReducer,
  })

  const middleware = applyMiddleware(thunk, routerMiddleware(browserHistory))
  STORE = createStore(reducers, compose(middleware))
  HISTORY = syncHistoryWithStore(browserHistory, STORE)
}

let ROUTES
export function setRoutes(routes) {
  ROUTES = _.map(routes, (component, route) => {
    if (typeof component === 'function') {
      return <Route key={ route } path={ route } component={ component } />
    } else if (typeof component === 'object') {
      const routeObj = component
      component = routeObj.component

      if (routeObj.isIndex) {
        return <IndexRoute key={ route } component={ component } />
      }

      return <Route key={ route } path={ route } component={ component } />
    }
  })
}

export function getRoutes(App) {
  return (
    <Provider store={ STORE }>
      <Router history={ HISTORY }>
        <Route path="/" component={ App }>
          { ROUTES }
        </Route>
      </Router>
    </Provider>
  )
}
