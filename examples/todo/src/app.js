import { Render, Router, Route, IndexRoute } from 'jumpsuit'
import './styles/base.css'

import Index from 'containers/index'

import todos from 'state/todos'

Render({ todos }, (
  <Router>
    <Route path="/" component={ Index }>
      <IndexRoute component={ Index }/>
    </Route>
  </Router>
))
