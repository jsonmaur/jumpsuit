export default function(store, action, payload){
  return store.dispatch({
    type: prependedActionName,
    payload,
  })
}
