import path from 'path'
import fs from 'fs-extra'
import chokidar from 'chokidar'
import browserify from 'browserify'
import rememberify from 'rememberify'
import envify from 'loose-envify'
import babelify from 'babelify'
import server from './server'
import { log } from './emit'

export default async function () {
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

  server()
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

const entries = []
const b = browserify({
  plugin: [rememberify],
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

export function javascript (evt, file) {
  const filepath = path.resolve(process.cwd(), 'src/app.js')

  if (entries.indexOf(file) > -1) {
    rememberify.forget(b, file)
  } else {
    b.add(file)
    entries.push(file)
  }

  const output = path.resolve(process.cwd(), 'dist/app.js')
  fs.ensureDirSync(path.dirname(output))

  const stream = fs.createWriteStream(output)

  return new Promise((resolve, reject) => {
    b.bundle().pipe(stream)

    stream.on('error', reject)
    stream.on('finish', () => {
      log('build is ready')
      resolve()
    })
  })
}

export function resolvePreset (preset) {
  return path.resolve(__dirname, `../../node_modules/babel-preset-${preset}`)
}
