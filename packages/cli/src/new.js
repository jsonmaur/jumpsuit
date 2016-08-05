import path from 'path'
import fs from 'fs-promise'
import glob from 'glob'
import spawn from 'cross-spawn'
import { outputLogo, error, log } from './emit'

export default function (argv) {
  outputLogo({ indent: 1 })

  const isInit = argv._[0] === 'init'
  const exampleDir = (isInit ? argv._[1] : argv._[2]) || 'counter'
  const destDir = isInit ? '.' : (argv._[1] || 'new-jumpsuit')

  return glob(path.resolve(__dirname, `../examples/${exampleDir}/*`), async (err, files) => {
    if (err) return error(err)

    log('Creating new jumpsuit project...')
    await fs.mkdirs(path.resolve(process.cwd(), destDir))
    await Promise.all(files.map((file) => {
      return fs.copy(file, path.resolve(process.cwd(), destDir, path.basename(file)))
    }))
    await fs.remove(path.resolve(process.cwd(), destDir, 'node_modules'))

    log('Installing project dependencies...\n')

    // It would be nice to just copy jumpsuit or jumpsuit-core into here instead of installing it again
    // await fs.copy(path.resolve(__dirname, '../../'), path.resolve(process.cwd(), destDir, 'node_modules/jumpsuit'))

    const ls = spawn('npm', ['install'], {
      cwd: path.resolve(process.cwd(), destDir),
      stdio: 'inherit'
    })

    ls.on('close', (code) => {
      console.log('\n')
      log('Your new jumpsuit is ready to go!')
      log(`cd ${destDir} && jumpsuit watch\n`)
      process.exit(0)
    })
  })
}
