# Hot State Reloading (HSR)

Jumpsuit ships with a lightweight version of hot module reloading and is super easy to setup.

In contrast to traditional hot module reloading, Jumpsuit efficiently saves your state and **refreshes** your entire app, then restores the previously saved state.

In the example below, we are using a brand new install of Create-React-App!

```javascript
// Import the HSR rerenderer from Jumpsuit
import { Rerender } from 'jumpsuit'

// Import your app
import App from './App'

// For webpack
if (module.hot) {
  module.hot.accept('./App', Rerender)
}

// For other build systems you must be able to subscribe to file changes to trigger the Rerender. We will continue to post recipes here for those build systems as we see them.

```

Although it may not appear as smooth as traditional HMR, it is very reliable and **much** easier to set up. For anyone wanting support for traditional HMR, file an issue and we can discuss it!
