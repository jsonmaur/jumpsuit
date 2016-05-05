export default function (stateName, actions){

  const intialState = actions.initial || {}
  delete actions.initial

  const reducerWithActions = (state = intialState, action = {}) => {
    if(!reducerWithActions[action.type]){
      return state
    }
    return Object.assign({}, state, actions[action.type](state, action.payload))
  }

  Object.keys(actions).forEach((actionName) => {
    reducerWithActions[actionName] = `${stateName}_${actionName}`
  })

  return reducerWithActions
}

// Should return a function which is a reducer and have properties that
// correspond with the full action names available on the state eg.

// reducerWithActions === function(state, action){} // reducer
// reducerWithActions.increment === 'count_increment'
// reducerWithActions.decrement === 'count_decrement'
