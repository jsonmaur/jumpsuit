import { push, go, goBack, goForward } from 'react-router-redux'
import { getStore } from './reducer'

export function Goto(params){
  const store = getStore()
  const { routing } = store.getState()
  const newParams = Object.assign({pathname: routing.locationBeforeTransitions.pathname}, params)
  return store.dispatch(push(newParams))
}

export function Go(params){
  const store = getStore()
  return store.dispatch(go(params))
}

export function GoBack(params){
  const store = getStore()
  return store.dispatch(goBack(params))
}

export function GoForward(params){
  const store = getStore()
  return store.dispatch(goForward(params))
}
