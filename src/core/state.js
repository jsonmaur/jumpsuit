export default function (stateName, actions) {
  const intialState = actions.initial || {}
  delete actions.initial

  const reducerWithActions = (state = intialState, action = {}) => {
    if (!actions[action.type]) {
      return state
    }

    return Object.assign({}, state, actions[action.type](state, action.payload))
  }

  reducerWithActions._name = stateName

  Object.keys(actions).forEach((actionName) => {
    // Alias the action dispatcher to the state under the action name
    reducerWithActions[actionName] = function(payload) {
      return reducerWithActions.dispatch({
        type: `${stateName}_${actionName}`,
        payload
      })
    }

    /* makes actions available directly when testing */
    if (process.env.NODE_ENV === 'testing') {
      reducerWithActions[`_${actionName}`] = actions[actionName]
    }
  })

  return reducerWithActions
}
