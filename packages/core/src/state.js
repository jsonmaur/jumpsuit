export default function (stateName, actions, detached) {
  const intialState = actions.initial || {}
  delete actions.initial

  const prefixedActions = {}

  const reducerWithActions = (state = intialState, action = {}) => {
    if (!prefixedActions[action.type]) {
      return state
    }

    return Object.assign({}, state, prefixedActions[action.type](state, action.payload))
  }

  // This is now a state detached from redux
  let detachedState = detached ? reducerWithActions() : null

  reducerWithActions._name = stateName

  Object.keys(actions).forEach((actionName) => {
    if (!detached) {
      /* alias the action dispatcher to the state under the action name */
      reducerWithActions[actionName] = (payload) => reducerWithActions.dispatch({
        type: `${stateName}_${actionName}`,
        payload
      })
    } else {
      /* short circuit to the reducer and detachedState itself */
      reducerWithActions[actionName] = (payload) => {
        detachedState = reducerWithActions(detachedState, {
          type: `${stateName}_${actionName}`,
          payload
        })
        return detachedState
      }
    }

    /* prefix an alias to the action for the reducer to reference */
    prefixedActions[`${stateName}_${actionName}`] = actions[actionName]

    /* makes actions available directly when testing */
    if (process.env.NODE_ENV === 'testing') {
      reducerWithActions[`_${actionName}`] = actions[actionName]
    }
  })

  if (detached) {
    return Object.assign(reducerWithActions, {
      getState: () => {
        return detachedState
      }
    })
  }

  return reducerWithActions
}
