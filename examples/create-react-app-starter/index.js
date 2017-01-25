import { Rerender } from 'jumpsuit'

import index from './root'
export default index

if (module.hot) {
  module.hot.accept('./root', Rerender)
}
