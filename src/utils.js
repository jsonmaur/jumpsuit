import React from 'react'

// If reactCmp is not already a react component, creates and returns a react component from reactCmp
export const component = (reactCmp) => {
  return typeof reactCmp === 'function' && reactCmp.prototype.isReactComponent
    ? reactCmp
    : React.createClass(reactCmp)
}
