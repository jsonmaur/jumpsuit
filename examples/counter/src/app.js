import './styles/base.sss'
import { Render, Route, IndexRoute } from 'jumpsuit'

import state from 'state'

import App from 'containers/index'
import Counter from 'containers/counter'

Render(state, (
  <Route path="/" component={ App }>
    <IndexRoute component={ Counter } />
  </Route>
))
