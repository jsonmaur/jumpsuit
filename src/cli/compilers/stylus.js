import fs from 'fs'
import path from 'path'
import stylus from 'stylus'
import nib from 'nib'
import Clean from 'clean-css'
import { debounce, resolveModule } from '../../utils/common'
import { getConfig } from '../config'
import { triggerRefresh } from '../hsr'

const createBundle = debounce((cb) => {
  const output = path.resolve(
    getConfig().output,
    path.basename(getConfig().entryStyl, '.styl')
  ) + '.css'

  const nibBase = resolveModule('nib', __dirname, 3)
  const nibFile = `${nibBase}/lib/nib/index.styl`

  stylus(fs.readFileSync(getConfig().entryStyl, 'utf8'))
    .set('filename', getConfig().entryStyl)
    .set('include css', true)
    .set('hoist atrules', true)
    .set('compress', process.env.NODE_ENV === 'production')
    .set('sourcemap', { inline: process.env.NODE_ENV === 'development' })
    .use(nib())
    .import(nibFile)
    .set('paths', [getConfig().source])
    .render((err, css) => {
      if (err) return cb(err)

      if (process.env.NODE_ENV === 'production') {
        css = new Clean().minify(css).styles
      }

      fs.writeFileSync(output, css)
      triggerRefresh('css_refresh')

      cb()
    })
}, { wait: 300 })

let firstRun = true
export function buildStylus (evt, file) {
  return new Promise((resolve, reject) => {
    if (firstRun && !file.match(new RegExp(`${getConfig().entryStyl}$`))) {
      return resolve()
    }

    createBundle((err) => {
      if (err) reject(err)
      else resolve()

      firstRun = false
    })
  })
}
