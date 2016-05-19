#### State.combine <em>(stateMapping)</em>
- Combines multiple state into a single state that you can use in Render
- Parameters
  - <strong>stateMapping</strong> Object
    - An object that maps state names to a state
- Returns
  - <strong>State Reducer</strong>, a combined reducer function that can be used directly in the Render method
  ```javascript

    import user from './states/user'
    import counter from './states/counter'

    const state = {
      user,
      counter
    }

    Render(state, <App/>)
  ```
