import path from 'path'
import fs from 'fs-extra'
import minimatch from 'minimatch'
import browserify from 'browserify'
import forgetify from 'forgetify'
import babelify from 'babelify'
import envify from 'loose-envify'
import uglifyify from 'uglifyify'
import aliasify from 'aliasify'
import uglify from 'uglify-js'
import resolve from 'resolve'
import exorcist from 'exorcist'
import postcss from '../transforms/postcss'
import { debounce } from '../utils/common'
import { depTree } from '../deptree'
import { triggerRefresh } from '../serve'
import { CONFIG } from '../config'

let bundler
export function initBundle () {
  const b = browserify({
    plugin: [forgetify],
    paths: [CONFIG.sourceDir],
    debug: process.env.NODE_ENV === 'development' || CONFIG.prodSourceMaps,
    cache: {}, packageCache: {},
    insertGlobalVars: Object.assign(CONFIG.browserify.globals, {
      React: (file, basedir) => `require("${ resolve.sync('react', { basedir: __dirname })}")`,
      _INSERT_CSS_: (file, basedir) => `require("${ resolve.sync('insert-css', { basedir: __dirname })}")`
    })
  })

  b.transform(babelify, {
    presets: [
      resolve.sync('babel-preset-es2015', { basedir: __dirname }),
      resolve.sync('babel-preset-react', { basedir: __dirname }),
    ],
  })

  b.transform({
    global: true,
  }, envify)

  if (process.env.NODE_ENV === 'production') {
    b.transform({
      global: true,
      sourcemap: CONFIG.prodSourceMaps
    }, uglifyify)
  }

  b.transform(postcss)

  CONFIG.browserify.transforms.forEach((t) => {
    if (typeof t === 'string') {
      b.transform(resolve.sync(t, { basedir: process.cwd() }))
    } else if (typeof t === 'object' && t.transform) {
      b.transform(t.transform, t.options)
    }
  })

  b.transform(aliasify, {
    global: true,
    aliases: {
      // resolve to the react package location, not the file
      "react": path.resolve(resolve.sync('react', { basedir: __dirname }), '../')
    },
    verbose: true
  })

  return b
}

const createBundle = debounce((cb) => {
  const file = path.resolve(CONFIG.outputDir, path.basename(CONFIG.entry))

  let sourceMapFile = path.basename(CONFIG.entry).split('.')
  sourceMapFile.splice(sourceMapFile.length - 1, 0, 'map')
  sourceMapFile = sourceMapFile.join('.')

  const stream = fs.createWriteStream(file)
    .on('error', cb)
    .on('finish', () => {
      if (process.env.NODE_ENV === 'production') {
        const code = fs.readFileSync(file, 'utf8')
        const newCode = uglify.minify(code, {
          outSourceMap: CONFIG.prodSourceMaps ? sourceMapFile : undefined,
          fromString: true
        })
        fs.writeFileSync(file, newCode.code)
        return
      }

      triggerRefresh()
    })

  if(process.env.NODE_ENV === 'production' && CONFIG.prodSourceMaps){
    bundler.bundle((err) => {
      if (err) cb(err)
      else cb()
    })
    .pipe(exorcist(path.resolve(CONFIG.outputDir, sourceMapFile)))
    .pipe(stream)
  }
  else{
    bundler.bundle((err) => {
      if (err) cb(err)
      else cb()
    })
    .pipe(stream)
  }
}, { wait: 300 })

let firstRun = true
const entries = new Set()
export function buildJs (evt, file) {
  return new Promise((resolve, reject) => {
    if (!bundler) bundler = initBundle()

    /* only worry about bundling the main file on first run */
    if (firstRun && !file.match(new RegExp(`${CONFIG.entry}$`))) {
      return resolve()
    }

    const invalidate = new Set([file])

    if (depTree[file]) {
      depTree[file].forEach((f) => invalidate.add(f))
    }

    CONFIG.browserify.rebundles.forEach((f) => {
      if (minimatch(file, f.match)) {
        invalidate.add(path.resolve(f.file))
      }
    })

    invalidate.forEach((f) => forgetify.forget(bundler, f))

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
