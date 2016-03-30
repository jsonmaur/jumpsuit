import { connectedComponent, statelessComponent } from './component'
import Render from './render'
import { setRoutes, setupRedux } from './routes'
import { Link } from 'react-router'

import React from 'react'
global.React = React

module.exports = {
  Component: connectedComponent,
  SimpleComponent: statelessComponent,
  Routes: setRoutes,
  State: setupRedux,
  Render,
  Link,
}
