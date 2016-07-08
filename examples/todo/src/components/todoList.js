import Todos from 'state/todos'
import Todo from 'components/todo'

export default ({ todos }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={e => Todos.toggle(todo.id)}
      />
    )}
  </ul>
)
