import { Render, Router } from 'jumpsuit'

import App from 'containers/index'
import Counter from 'containers/counter'

import counterState from 'state/counter'

const { Route, IndexRoute } = Router
Render(
  { counter: counterState },
  (
    <Route path="/" component={ App }>
      <IndexRoute component={ Counter } />
    </Route>
  )
)
