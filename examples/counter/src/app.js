import './styles/base.css'
import { Render, Router, Route, IndexRoute } from 'jumpsuit'

import App from 'containers/index'
import Counter from 'containers/counter'

import counterState from 'state/counter'

Render({ counter: counterState }, (
  <Router>
    <Route path="/" component={ App }>
      <IndexRoute component={ Counter } />
    </Route>
  </Router>
))
