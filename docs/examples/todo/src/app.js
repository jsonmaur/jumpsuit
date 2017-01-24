import { Render } from 'jumpsuit'

import App from 'containers/index'
import todos from 'state/todos'

const globalState = { todos }

Render(globalState, <App />)
