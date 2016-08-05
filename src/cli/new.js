import path from 'path'
import fs from 'fs-promise'
import glob from 'glob'
import { spawn } from 'child_process'
import { outputLogo, error, log } from './emit'

export default function (argv) {
  outputLogo({ indent: 1 })

  const isInit = argv._[0] === 'init'
  const exampleDir = (isInit ? argv._[1] : argv._[2]) || 'counter'
  const destDir = isInit ? '.' : (argv._[1] || 'new-jumpsuit')

  return glob(path.resolve(__dirname, `../../examples/${exampleDir}/*`), {
    ignore: '**/node_modules/**'
  }, async (err, files) => {
    if (err) return error(err)
    log('Creating new jumpsuit project...')
    await Promise.all(files.map((file) => {
      return fs.copy(file, path.resolve(process.cwd(), destDir, path.basename(file)))
    }))

    log('Installing project dependencies...')
    const ls = spawn('npm', ['install'], {
      cwd: path.resolve(process.cwd(), destDir),
      stdio: 'ignore'
    })

    ls.on('close', (code) => {
      log('Your new jumpsuit is ready to go!')
      log('')
      log(`cd ${destDir} && jumpsuit watch`)
      process.exit(0)
    })
  })
}
