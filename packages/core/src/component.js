import React from 'react'
import { connect } from 'react-redux'

export default function (options, connectFn) {
  // TODO: allow component creation with a class
  // see https://github.com/jumpsuit/jumpsuit/pull/18

  const container = React.createClass(options)
  return connectFn ? connect(connectFn)(container) : container
}
