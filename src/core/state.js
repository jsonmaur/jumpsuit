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
    reducerWithActions[actionName] = `${stateName}_${actionName}`

    if (process.env.NODE_ENV === 'testing') {
      reducerWithActions[`_${actionName}`] = actions[actionName]
    }

    const actionFn = actions[actionName]
    delete actions[actionName]

    actions[reducerWithActions[actionName]] = actionFn
  })

  return reducerWithActions
}
