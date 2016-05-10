import { Render, Route, IndexRoute } from 'jumpsuit'

import App from 'containers/index'
import Counter from 'containers/counter'

import counterState from 'state/counter'

Render(
  { counter: counterState },
  (
    <Route path="/" component={ App }>
      <IndexRoute component={ Counter } />
    </Route>
  )
)
