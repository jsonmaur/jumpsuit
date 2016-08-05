import React from 'react'
import { connect } from 'react-redux'

export default function (component, connectFn) {
  const container = typeof component === 'object'
    ? React.createClass(options)
    : component

  return connectFn ? connect(connectFn)(container) : container
}
