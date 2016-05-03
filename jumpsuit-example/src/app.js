import {
  Component,
  SimpleComponent,
  Routes,
  State,
  Render,
  Link,
} from 'jumpsuit'

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

const Page2 = (props) => (
  <div>
    <h2>Page 2</h2>
  </div>
)

var increment = function() {
  return (dispatch) => {
    dispatch({
      type: 'INCREMENT'
    })
  }
}

State({
  initialState: { loggedIn: false },
  actions: {
    INCREMENT(state, action) {
      return Object.assign({}, state, {
        count: ++state.count,
      })
    }
  }
})

Routes({
  '/page1': {
    isIndex: true,
    component: Page1,
  },
  '/page2': Page2,
})

Render(App)
