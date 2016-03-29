import { Component, Routes, Render, Link } from '../lib'

const App = Component({
  render() {
    return (
      <div>
        <h1 onClick={ this.sayHello }>Welcome!!</h1>

        <Link to="/whatup">Whatup</Link><br />
        <Link to="/hi">Hi</Link>

        { this.props.children }
      </div>
    )
  },

  sayHello() {
    alert('hello')
  }
})

const Whatup = (props) => (
  <div>Whatup</div>
)

const Hi = (props) => (
  <div>Hi</div>
)

Routes({
  '/whatup': Whatup,
  '/hi': Hi,
})

Render(App)
