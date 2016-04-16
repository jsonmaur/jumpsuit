import {
  Component,
  SimpleComponent,
  Routes,
  State,
  Render,
  Link,
} from '../lib'

/**
 * components connected to state
 */
const App = Component({
  render() {
    const { state: { count }, children } = this.props
    return (
      <div>
        <h1>Welcome to Jumpsuit ({ count })</h1>
        <button onClick={ this.increment }>Increment Count</button>
        <nav>
          <Link to="/">Home Page</Link><br />
          <Link to="/page2">Page2</Link>
        </nav>

        { children }
      </div>
    )
  },

  increment() {
    this.props.dispatch(increment())
  }
})

const Page1 = Component({
  render() {
    const { state: { count } } = this.props
    return (
      <div>
        <h2>Page 1</h2>
        <h5>Count: { count }</h5>
      </div>
    )
  }
})

/**
 * stateless component
 */
const Page2 = (props) => (
  <div>
    <h2>Page 2</h2>
  </div>
)

/**
 * setup state (needs more abstraction!!!)
 */
var increment = function() {
  return (dispatch) => {
    dispatch({
      type: 'INCREMENT'
    })
  }
}
State({
  initialState: { count: 0 },
  actions: {
    INCREMENT(state, action) {
      return Object.assign({}, state, {
        count: ++state.count,
      })
    }
  }
})

/**
 * define routes
 */
Routes({
  '/page1': {
    isIndex: true,
    component: Page1,
  },
  '/page2': Page2,
})

/**
 * render into DOM #app
 */
Render(App)
