import path from 'path'
import fs from 'fs-extra'
import browserify from 'browserify'
import watchify from 'watchify'
import envify from 'loose-envify'
import babelify from 'babelify'
import { log } from './emit'

export default async function () {
  log('starting')
  const filepath = path.resolve(process.cwd(), 'src/app.js')

  const b = browserify({
    entries: [filepath],
    plugin: [watchify],
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

  const output = path.resolve(process.cwd(), 'dist/app.js')
  fs.ensureDirSync(path.dirname(output))

  const bundle = () => {
    const stream = fs.createWriteStream(output)
      .on('finish', () => log('build is ready'))
    b.bundle().pipe(stream)
  }

  b.on('update', bundle)
  bundle()
}

export function resolvePreset (preset) {
  return path.resolve(__dirname, `../../node_modules/babel-preset-${preset}`)
}
