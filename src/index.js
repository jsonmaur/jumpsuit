import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, Link } from 'react-router'
import _ from 'lodash'

global.React = React

const Component = (obj) => React.createClass(obj)

let routes
const Routes = (obj) => (routes = obj)

const Render = (App) => {
  routes = _.map(routes, (component, route) => {
    return <Route key={ route } path={ route } component={ component } />
  })

  render((
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        { routes }
      </Route>
    </Router>
  ), document.getElementById('app'))
}

module.exports = {
  Component,
  Routes,
  Render,
  Link,
}
