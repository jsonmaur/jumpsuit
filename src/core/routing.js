import { push, go} from 'react-router-redux'
import { getStore } from './reducer'

export default function Goto(params){

  // Back
  if(params.back){
    return go(-(params.back === true ? 1 : params.back))
  }

  // Forward
  if(params.forward){
    return go(params.forward === true ? 1 : params.forward)
  }

  const store = getStore()
  const state = store.getState()

  // Replace State
  if(params.replace){
    const newParams = Object.assign({}, params)
    delete newParams.replace
    return store.dispatch(push(newParams))
  }

  // Upsert State
  const location = state.routing.locationBeforeTransitions
  const newParams = Object.assign({
    hash: location.hash,
    pathname: location.pathname,
  }, params)
  newParams.query = Object.assign({}, location.query, newParams.query)
  return store.dispatch(push(newParams))

}
