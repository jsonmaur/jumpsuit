import { push, go} from 'react-router-redux'
import { getStore } from './reducer'

export function Goto(params){
  const store = getStore()
  return store.dispatch(push(params))
}

export function Go(params){
  const store = getStore()
  const state = store.getState()
  const location = state.routing.locationBeforeTransitions
  const newParams = Object.assign({
      hash: location.hash,
      pathname: location.pathname,
    }, params)
  newParams.query = Object.assign({}, location.query, newParams.query)
  return store.dispatch(push(newParams))
}

export function GoBack(amount){
  amount = typeof amount === 'undefined' ? 1 : amount
  return go(-(amount))
}

export function GoForward(params){
  amount = typeof amount === 'undefined' ? 1 : amount
  return go(amount)
}
