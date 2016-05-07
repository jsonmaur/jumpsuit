import path from 'path'
import connect from 'connect'
import serve from 'serve-static'
import hsr from './hsr'
import { log } from './emit'

export default function (argv) {
  const app = connect()

  const root = path.resolve(process.cwd(), 'dist')

  app.use((req, res, next) => {
    if (!path.extname(req.url)) {
      req.url = '/index.html'
    }

    next()
  })

  app.use(serve(root))

  const port = argv.port || argv.p || 8080
  const host = argv.host || argv.h || 'localhost'

  return new Promise((resolve, reject) => {
    app.listen(port, host, () => {
      log(`running at http://${host}:${port}`)
      resolve(hsr())
    })
  })
}
