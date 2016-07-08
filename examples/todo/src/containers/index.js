import Visibility from 'containers/visibility'
import Todos from 'containers/todos'
import AddTodo from 'containers/addTodo'

export default () => (
  <div class="App">
    <Visibility />
    <br/>
    <Todos />
    <br/>
    <AddTodo />
  </div>
)
