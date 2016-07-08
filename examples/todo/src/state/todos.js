import { State } from 'jumpsuit'

let nextTodoID = 0

const state = State('counter', {
  initial: {
    all: [],
    visibility: 'all'
  },

  add (state, text) {
    return {
      all: [
        ...state.all,
        {
          id: nextTodoID++,
          text
        }
      ]
    }
  },

  toggle (state, id) {
    return {
      all: state.all.map(d => {
        if(d.id == id){
          d.completed = !d.completed
        }
        return d
      })
    }
  },

  setVisibility(state, filter){
    return {
      visibility: filter
    }
  }
})

export default state
