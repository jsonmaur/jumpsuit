import fs from 'fs'
import path from 'path'
import stylus from 'stylus'
import nib from 'nib'
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
    .set('include css', true)
    .set('hoist atrules', true)
    .use(nib())
    .import(nibFile)
    .set('paths', [getConfig().source])
    .render((err, css) => {
      if (err) return cb(err)

      fs.writeFileSync(output, css)

      cb()
      triggerRefresh('cssRefresh')
    })
}, { wait: 300 })

let firstRun = true
export function buildStylus (evt, file) {
  // console.log(evt, file)
  return new Promise((resolve, reject) => {
    if (firstRun && !file.match(new RegExp(`${getConfig().entryStyl}$`))) {
      return resolve()
    }

    // resolve()
    createBundle((err) => {
      if (err) reject(err)
      else resolve()

      firstRun = false
    })
  })
}
