import { render } from 'react-dom'
import { getRoutes } from './routes'

export default function (App) {
  const routes = getRoutes(App)
  render(routes, document.getElementById('app'))
}
