import path from 'path'
import connect from 'connect'
import serve from 'serve-static'

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

  app.listen(8080)
}
