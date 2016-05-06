import path from 'path'
import connect from 'connect'
import serve from 'serve-static'
import { log } from './emit'

export default function () {
  const app = connect()

  const root = path.resolve(process.cwd(), 'dist')

  app.use((req, res, next) => {
    if (!path.extname(req.url)) {
      req.url = '/index.html'
    }

    next()
  })

  app.use(serve(root))

  const port = 8080
  app.listen(port, () => log(`running at http://localhost:${port}`))
}
