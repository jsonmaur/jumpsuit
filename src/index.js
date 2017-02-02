// Core
import Component from './component'
import CombineState from './combineState'
import CreateStore, { store, devToolsConfig } from './createStore'
import ConnectStore from './connectStore'
import Render from './render'
import { Rerender } from './hsr'
import Router from './router'
import Goto from './goto'
import HistoryMode from './historyMode'

// Jumpstate
import {
  State,
  Effect,
  Hook,
  Actions,
  ActionCreators,
  StateDefaults,
  getState,
  dispatch
} from 'jumpstate'

// React Router
import {
  Route,
  IndexRoute,
  Redirect,
  IndexRedirect,
  Link,
  IndexLink
} from 'react-router'

//

module.exports = {
  /* Core */
  Component,
  CombineState,
  CreateStore,
  ConnectStore,
  Render,
  Rerender,
  HistoryMode,
  Router,
  store,
  devToolsConfig,

  /* Jumpstate */
  State,
  Effect,
  Hook,
  Actions,
  ActionCreators,
  StateDefaults,
  getState,
  dispatch,

  /* React Router */
  Route,
  IndexRoute,
  Redirect,
  IndexRedirect,
  Link,
  IndexLink,
  Goto
}
