# Hooks

**Warning!** - *Hooks are a powerful tool that when handled incorrectly may result in reduced performance. Proceed with caution.*

Hooks provide a simple way for you to monitor your state for actions or conditions and do just about anything you want.

To create a hook:
```javascript
import { Hook } from 'jumpstate'

// You can hook into any actions, even ones from external libraries!
const formLoadedHook = Hook((action, getState) => {
  if (action.type === 'redux-form/INITIALIZE') {
    console.log('A Redux-Form was just initialized with this payload', payload)
  }
})

// Load google analytics if it is not yet loaded
const analyticsLoadedHook = Hook((action, getState) => {
  if (!getState().analytics.loaded)
  Actions.analytics.load()
})

// Cancel a hook:
formLoadedHook.cancel()
analyticsLoadedHook.cancel()
```
