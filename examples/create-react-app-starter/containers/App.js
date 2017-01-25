import React from 'react'
//
import logo from './logo.svg'
import './App.css'

export default React.createClass({
  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Welcome to React + Jumpsuit!</h2>
        </div>
        {this.props.children}
      </div>
    )
  }
})
