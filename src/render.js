import { render } from 'react-dom'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import { handleActions, createAction } from 'redux-actions'
import thunk from 'redux-thunk'

export default function (Component, data) {
  const reducer = handleActions(data, data.initial)

  // const reducers = combineReducers({})
  const middleware = applyMiddleware(thunk)
  const enhancer = compose(middleware)
  const store = createStore(reducer, enhancer)

  return render((
    <Provider store={ store }>
      <Component />
    </Provider>
  ), document.getElementById('app'))
}
