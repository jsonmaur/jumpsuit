import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

export default (states) => {
  return combineReducers({
    ...states,
    routing: routerReducer
  })
}
