import { render } from 'react-dom'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import { handleActions, createAction } from 'redux-actions'
import thunk from 'redux-thunk'
import State from './state'

export default function (state, routes) {

  // Detect a single state
  if(state.name){
    state = State.combine([state])
  }

  return render((
    <Provider store={ state.store }>
      <Component />
    </Provider>
  ), document.getElementById('app'))
}
