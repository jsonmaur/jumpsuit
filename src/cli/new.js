import path from 'path'
import fs from 'fs-promise'
import glob from 'glob'
import { outputLogo, error, log } from './emit'

export default function (argv) {
  outputLogo({ indent: 1 })

  const isInit = argv._[0] === 'init'
  const exampleDir = (isInit ? argv._[1] : argv._[2]) || 'counter'
  const destDir = isInit ? '.' : (argv._[1] || 'new-jumpsuit')

  return glob(path.resolve(__dirname, `../../examples/${exampleDir}/*`), {
    ignore: '**/node_modules/**'
  }, (err, files) => {
    if (err) return error(err)
    files.forEach(async (file) => {
      await fs.copy(file, path.resolve(process.cwd(), destDir, path.basename(file)))
    })
    log('Your new jumpsuit is ready to go!')
    log('')
    log(`cd ${destDir} && jumpsuit watch`)
  })
}
