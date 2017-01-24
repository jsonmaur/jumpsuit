import React from 'react'
import { connect } from 'react-redux'

export default function (options, connectFn) {
  const container = typeof options === 'function' && options.prototype.isReactComponent
    ? options
    : React.createClass(options)
  return connectFn ? connect(connectFn)(container) : container
}
