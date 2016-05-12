export default function (stateName, actions) {
  const intialState = actions.initial || {}
  delete actions.initial

  const prefixedActions = {}

  const reducerWithActions = (state = intialState, action = {}) => {
    if (!prefixedActions[action.type]) {
      return state
    }

    return Object.assign({}, state, prefixedActions[action.type](state, action.payload))
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

    // Prefix an alias to the action for the reducer to reference
    prefixedActions[`${stateName}_${actionName}`] = actions[actionName]

    /* makes actions available directly when testing */
    if (process.env.NODE_ENV === 'testing') {
      reducerWithActions[`_${actionName}`] = actions[actionName]
    }
  })

  return reducerWithActions
}
