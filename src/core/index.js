import React from 'react'
import Router, { Route, IndexRoute, Link } from 'react-router'
import { go, goBack, goForward } from 'react-router-redux'

import Component from './component'
import Render from './render'
import State from './state'
import Goto from './goto'

global.React = React
module.exports = {
  // Core
  Component,
  Render,
  State,

  // Router
  Router,
  Route,
  IndexRoute,
  Goto,
  Go: go,
  GoBack: goBack,
  GoForward: goForward,
  Link: Link,
}
