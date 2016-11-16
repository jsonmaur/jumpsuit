# Effects

Effects are jumpsuit flexible and powerful way of performing asynchronous actions. Unlike the synchronous actions you place on your `State`, effects do not change any state directly.  However, they are able to call state actions that do.  In fact, they are able to do anything asynchronous you can dream up!

A couple of common use cases for Effects:
- Fetching Data for your `States`
- Performing any kind of asynchronous action (also helps with logging)
- Batching or combining multiple different global actions into a single call

## Creating an Effect
Since we just built a Counter App in our last example, let's add an asynchronous effect to get the hang of things:
```javascript
Effect('incrementAsync', (time) => {
  setTimeout(() => Actions.increment(), time)
})
```

We just created our first Effect! Simply put, when we call our effect, it will call the global `increment` action after `time`ms. Let's call it!

```javascript
Actions.incrementAsync(2000)
```

Sweet! As you can see, when we created our new effect, it was automatically added to our global Actions list for quick access.

## Firing Multiple Actions with Effects
This is more straight-forward than you would think, so let's try something new. Let's say we want to fetch some `contacts` from a server, then place those contacts in a state. Effects create a very simple way to do that:

```javascript
// First we need a State to handle our contacts
State({
  initial: {
    all: [],
    loading: false,
    error: false
  },
  contactsSetAll (state, all) {
    return {all}
  },
  contactsLoading (state, loading) {
    return {loading}
  }
  contactsError (state, error) {
    return {error}
  }
})

// Now let's create an Effect that will orchestrate fetching our contacts
Effect('contactsFetch', (time) => {
  Actions.contactsLoading(true) // Let the state know we're loading
  // Fetch the contacts from a server
  return axios.get('https://mysite.com/contacts')
    .then((res) => {
      // Once we have the contacts, load them into our Contacts state
      Actions.contactsSetAll(res.data)
    })
    .catch((err) => {
      // If we get an error, let the contacts state know
      Actions.contactsError(err)
    })
    .finally(() => {
      // When all is said and done, turn the loading off for contacts
      Actions.contactsLoading(false)
    })
})
```

This example is bit more involved, but you can start seeing how easy it is to orchestrate asynchronous events in Jumpsuit.

More Docs on `Event` coming soon!
