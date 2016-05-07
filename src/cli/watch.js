import path from 'path'
import fs from 'fs-extra'
import chokidar from 'chokidar'
import browserify from 'browserify'
import rememberify from 'rememberify'
import envify from 'loose-envify'
import babelify from 'babelify'
import { debounce } from '../utils/common'
import server from './server'
import { connections } from './hsr'
import { log, error } from './emit'

export default async function (argv) {
  log('starting')

  const baseDir = path.resolve(process.cwd(), 'src')
  const outputDir = path.resolve(process.cwd(), 'dist')

  const watcher = chokidar.watch(baseDir, {
    ignored: /[\/\\](\.)|node_modules/,
    persistent: true,
  })

  fs.removeSync(outputDir)
  fs.ensureDirSync(outputDir)

  watcher.on('all', async (evt, file) => {
    try {
      let outputFile = file.replace(baseDir, outputDir)
      if (outputFile.match(/\/assets\//)) {
        outputFile = outputFile.replace(/\/assets\//, '/')
      }

      switch (path.extname(file)) {
        case '.js':
        case '.css':
          await javascript(evt, file)
          break
        default:
          asset(evt, file, outputFile)
          break
      }
    } catch (err) {
      error(err)
    }
  })

  await server(argv)
}

export function asset (evt, file, outputFile) {
  switch (evt) {
    case 'add':
    case 'change':
      fs.existsSync(file)
        ? fs.copySync(file, outputFile)
        : fs.writeFileSync(outputFile, file)
      break
    case 'unlink':
      fs.removeSync(outputFile)
      break
  }
}

const entries = new Set()
const b = browserify({
  plugin: [rememberify],
  paths: [path.resolve(process.cwd(), 'src')],
  cache: {}, packageCache: {},
})

b.transform(babelify, {
  presets: [
    resolvePreset('es2015'),
    resolvePreset('react'),
  ],
})

b.transform({
  global: true,
}, envify)

b.plugin(cssModulesify, {
  rootDir: path.resolve(__dirname, '../'),
  output: path.resolve(process.cwd(), 'dist/app.css'),
})

const filepath = path.resolve(process.cwd(), 'src/app.js')
b.add(filepath)

const output = path.resolve(process.cwd(), 'dist/app.js')
fs.ensureDirSync(path.dirname(output))

const dBundle = debounce((cb) => {
  const stream = fs.createWriteStream(output)
  b.bundle((err) => {
    if (err) error(err)
  }).pipe(stream)

  stream.on('error', cb)
  stream.on('finish', () => {
    log('build is ready')

    connections.forEach((c) => c.send(JSON.stringify({ type: 'refresh' })))

    cb()
  })
}, 200)

export function javascript (evt, file) {
  if (entries.has(file)) {
    rememberify.forget(b, file)
  }

  entries.add(file)

  return new Promise((resolve, reject) => {
    dBundle((err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

export function resolvePreset (preset) {
  return path.resolve(__dirname, `../../node_modules/babel-preset-${preset}`)
}
