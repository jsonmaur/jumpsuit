export default function(cb){
  return function(dispatch, getState){
    return cb(customDispatch(dispatch), customGetState(getState))
  }
}

function customDispatch(dispatch){
  return (store, action, payload) =>{
    return dispatch({
      type: prependedActionName,
      payload,
    })
  }
}

function customGetState(getState){
  return (stateName) =>{
    if(!stateName){
      return getState()
    }
    return getState()[stateName]
  }

}
