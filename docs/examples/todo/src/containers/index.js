import Visibility from 'containers/visibility'
import Todos from 'containers/todos'
import AddTodo from 'containers/addTodo'

export default () => (
  <div className='TodoApp'>
    <Visibility />
    <br />
    <Todos />
    <br />
    <AddTodo />
  </div>
)
