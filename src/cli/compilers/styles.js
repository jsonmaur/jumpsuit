import fs from 'fs'
import path from 'path'
import { CONFIG } from '../config'
import { socketMessage } from '../serve'
import { debounce } from '../utils/common'

const { outputDir, styles } = CONFIG
const fileName = 'app.css'
const outputFile = path.resolve(outputDir, fileName)

let currentResolve

let stylesActionDebounced = styles ? debounce(doStyles, { wait: 300 }) : () => {}

export async function buildStyles (evt, file) {
  // A tricky way to debounce a promise
  currentResolve && currentResolve()
  return new Promise((resolve, reject) => {
    currentResolve = resolve
    stylesActionDebounced(evt, file, (err, css) => {
      if (err) return reject(err)
      fs.writeFile(outputFile, css, function (err) {
        if (err) return reject(err)
        if (process.env.NODE_ENV === 'development'){
          socketMessage({
            type: 'styles',
            url: fileName
          })
        }
        resolve()
        currentResolve = null
      })
    })
  })
}

function doStyles (file, evt, cb) {
  const res = styles.action(file, evt)
  if (res.then) {
    return res.then((url) => cb(null, url))
      .catch(cb)
  }
  return res
}
