import path from 'path'
import fs from 'fs-extra'
import chalk from 'chalk'
import spawn from 'cross-spawn'
import inquirer from 'inquirer'
import { outputLogo, log, question, questionErr } from '../utils/emit'

export default async function (argv) {
  outputLogo()

  const name = argv._[1] || (await inquirer.prompt([
    {
      type: 'input',
      message: question('Enter a name for your app:'),
      name: 'name',
      validate (val) {
        if (!val) {
          return questionErr('Please enter a name!')
        }
        if (fs.existsSync(path.resolve(val))) {
          return questionErr('A folder with that name already exists here!')
        }
        return true
      }
    }
  ])).name

  const template = path.resolve(__dirname, '../../getting-started')
  const destination = path.resolve(name)

  log('Creating new project')
  fs.copySync(template, destination)

  const pkgFile = `${destination}/package.json`
  const pkg = fs.readJsonSync(pkgFile)
  pkg.name = name

  fs.outputJsonSync(pkgFile, pkg)

  log('Installing dependencies\n')
  const child = spawn('npm', ['install'], {
    cwd: destination,
    stdio: 'inherit'
  })

  child.on('close', (code) => {
    log('Your new project is ready to go!')
    log(`Run ${chalk.green('cd', name, '&& jumpsuit watch')} to get started.\n`)

    process.exit(code)
  })
}
