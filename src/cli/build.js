import path from 'path'
import fs from 'fs-extra'
import browserify from 'browserify'
import envify from 'loose-envify'
import babelify from 'babelify'
import uglifyify from 'uglifyify'
import uglify from 'uglify-js'
import { log } from './emit'

export default async function () {
  log('building for production')

  const filepath = path.resolve(process.cwd(), 'src/app.js')

  const b = browserify({
    entries: [filepath],
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

  b.transform({
    global: true,
  }, uglifyify)

  const output = path.resolve(process.cwd(), 'dist/app.js')

  fs.ensureDirSync(path.dirname(output))
  const stream = fs.createWriteStream(output)

  b.bundle().pipe(stream)

  stream.on('finish', () => {
    const content = fs.readFileSync(output, 'utf8')
    const result = uglify.minify(content, { fromString: true })

    fs.writeFileSync(output, result.code)
  })
}

export function resolvePreset (preset) {
  return path.resolve(__dirname, `../../node_modules/babel-preset-${preset}`)
}
