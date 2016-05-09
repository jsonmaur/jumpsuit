import { push} from 'react-router-redux'
import { getStore } from './reducer'

export default function (params){
  const store = getStore()
  console.log(store)
  return store.dispatch(push(params))
}
