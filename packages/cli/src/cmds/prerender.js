import fs from 'fs'
import path from 'path'
import ReactDOM from 'react-dom/server'
import { CONFIG } from '../utils/config'

export default async function (argv) {
  global.IS_SERVERSIDE = true
  const app = require(path.resolve(CONFIG.outputDir, 'app.js')).default
  const appHTML = ReactDOM.renderToString(app)
  const html = fs.readFileSync(path.resolve(CONFIG.outputDir, 'index.html'), 'utf8')
  const newHtml = html.replace(appHTML, '').replace(/id=['"]app['"](.+)?></, `id='app'$1>${appHTML}<`)
  fs.writeFileSync(path.resolve(CONFIG.outputDir, 'index.html'), newHtml)
}
