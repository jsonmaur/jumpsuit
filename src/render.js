import React from 'react'
import { render } from 'react-dom'
//
import ConnectStore from './connectStore'

export default function (...params) {
  // If passed a raw state object, combine/create/connect it to the component
  const hasState = typeof params[0] === 'object' && typeof params[1] === 'object'
  const states = hasState && params[0]
  const userComponent = hasState ? params[1] : params[0]
  const Comp = hasState ? ConnectStore(states, userComponent) : userComponent

    // If we're in the dom, render to it
  global.document && render(
    <Comp />,
    global.document.getElementById((hasState ? params[2] : params[1]) || 'root')
  )

  return Comp
}
