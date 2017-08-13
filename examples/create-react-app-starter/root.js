import React from 'react'
import { Render, Router, Route, IndexRoute } from 'jumpsuit'
// Styles
import './index.css'
// State
import states from './state'
// Containers
import App from './containers/App'
// Screens
import Home from './screens/Home'
import Counter from './screens/Counter'

// Simple Routing
export default Render(states, (
  <Router>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='counter' component={Counter} />
    </Route>
  </Router>
))
