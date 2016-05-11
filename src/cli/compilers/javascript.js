import path from 'path'
import fs from 'fs-extra'
import minimatch from 'minimatch'
import browserify from 'browserify'
import rememberify from 'rememberify'
import babelify from 'babelify'
import envify from 'loose-envify'
import uglifyify from 'uglifyify'
import uglify from 'uglify-js'
import resolve from 'resolve'
import postcss from '../transforms/postcss'
import { debounce } from '../../utils/common'
import { triggerRefresh } from '../hsr'
import { getConfig } from '../config'

let bundler
const entries = new Set()

export function initBundle () {
  const b = browserify({
    plugin: [rememberify],
    paths: [path.resolve(getConfig().source)],
    debug: process.env.NODE_ENV === 'development',
    cache: {}, packageCache: {},
    insertGlobalVars: {
      React: (file, basedir) => 'require("react")',
      _INSERT_CSS_: (file, basedir) => 'require("insert-css")',
    },
  })

  b.transform(babelify, {
    presets: [
      resolve.sync('babel-preset-es2015', { basedir: process.cwd() }),
      resolve.sync('babel-preset-react', { basedir: process.cwd() }),
    ],
  })

  b.transform({
    global: true,
  }, envify)

  if (process.env.NODE_ENV === 'production') {
    b.transform({
      global: true,
    }, uglifyify)
  }

  b.transform(postcss)

  getConfig().browserify.transforms.forEach((t) => {
    if (typeof t === 'string') {
      b.transform(resolve.sync(t, { basedir: process.cwd() }))
    } else if (typeof t === 'object' && t.transform) {
      b.transform(t.transform, t.options)
    }
  })

  return b
}

const createBundle = debounce((cb) => {
  const file = path.resolve(getConfig().output, path.basename(getConfig().entry))

  const stream = fs.createWriteStream(file)
    .on('error', cb)
    .on('finish', () => {
      if (process.env.NODE_ENV === 'production') {
        const code = fs.readFileSync(file, 'utf8')
        const newCode = uglify.minify(code, { fromString: true })
        fs.writeFileSync(file, newCode.code)
      }

      triggerRefresh()
    })

  bundler.bundle((err) => {
    if (err) cb(err)
    else cb()
  }).pipe(stream)
}, { wait: 300 })

let firstRun = true
export function buildJs (evt, file) {
  return new Promise((resolve, reject) => {
    if (!bundler) bundler = initBundle()

    /* only worry about bundling the main file on first run */
    if (firstRun && !file.match(new RegExp(`${getConfig().entry}$`))) {
      return resolve()
    }

    rememberify.forget(bundler, file)
    getConfig().browserify.rebundles.forEach((f) => {
      if (minimatch(file, f.match)) {
        rememberify.forget(bundler, path.resolve(f.file))
      }
    })

    if (!entries.has(file)) {
      entries.add(file)
      bundler.add(file)
    }

    createBundle((err) => {
      if (err) reject(err)
      else resolve()

      firstRun = false
    })
  })
}
