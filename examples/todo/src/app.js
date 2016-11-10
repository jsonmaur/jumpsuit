import { Render, Router, Route, IndexRoute } from 'jumpsuit'

import Index from 'containers/index'
import todos from 'state/todos'

const globalState = { todos }

Render(globalState, (
  <Router>
    <Route path='/' component={Index}>
      <IndexRoute component={Index} />
    </Route>
  </Router>
))
