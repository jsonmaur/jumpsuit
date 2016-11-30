import { syncedHistory } from './render'
import { getState } from 'jumpstate'

export default function Goto (params, append = false, shouldReplace = false) {
  const state = getState()
  const location = state.routing.locationBeforeTransitions

  // Utilize the the right push or replace action
  const action = shouldReplace ? syncedHistory.replace : syncedHistory.push

  // If the params is just a string, dipatch the replacement router state
  if (typeof params === 'string') {
    return syncedHistory.push(params)
  }

  // Extract params
  const { path, query, hash } = params

  const prefixedHash = hash ? '#' + hash : undefined

  // If we're not appending, just dispatch the replacement router state
  if (!append) {
    return action({
      pathname: path || location.pathname,
      query,
      hash: prefixedHash
    })
  }

  // If we are appending, then we need to "assign" the new params onto the existing router state
  const newQuery = Object.assign({}, location.query, query)

  // Remove any user-set undefined and null keys
  for (var key in newQuery) {
    if (newQuery[key] === undefined || newQuery[key] === null) {
      delete newQuery[key]
    }
  }

  // Construct the new router state
  const newParams = {
    pathname: path || location.pathname,
    query: newQuery,
    hash: prefixedHash || location.hash
  }

  // Dispatch
  return action(newParams)
}

Goto.back = function (amount = -1) {
  return syncedHistory.go(-(Math.abs(amount)))
}

Goto.back = function (amount = 1) {
  return syncedHistory.go((Math.abs(amount)))
}
