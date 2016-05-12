import Router, { Route, IndexRoute, Link } from 'react-router'

import Component from './component'
import Render from './render'
import State from './state'
import Goto from './routing'
import { Middleware } from './reducer'

module.exports = {
  /* Core */
  Component,
  Render,
  State,

  /* React Router */
  Router,
  Route,
  IndexRoute,
  Goto,
  Link,

  /* Redux */
  Middleware,
}
