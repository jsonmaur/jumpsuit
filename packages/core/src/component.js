import React from 'react'
import { connect } from 'react-redux'

export default function (options, connectFn) {
  const container = React.createClass(options)
  return connectFn ? connect(connectFn)(container) : container
}
