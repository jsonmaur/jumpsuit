import path from 'path'
import express from 'express'
import cors from 'cors'
import { enableHsr } from './hsr'

module.exports = async function (config = {}) {
  const app = express()

  app.use(cors())
  const root = path.resolve(config.root || 'dist')
  const hsr = await enableHsr(app)

  app.use(express.static(root))
  app.get('*', (req, res, next) => {
    res.sendFile(`${root}/index.html`)
  })

  const uri = `http://${config.host}:${config.port}`
  await new Promise((resolve, reject) => {
    app.listen(config.port, config.host, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })

  return { uri, config, hsr }
}
