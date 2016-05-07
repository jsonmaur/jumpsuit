import React from 'react'
import { connect } from 'react-redux'

export default function (options, connectFn) {
  if (!connectFn) connectFn = (state) => state

  const container = React.createClass(options)
  // class Container extends React.Component {}
  return connect(connectFn)(container)
}
