import chalk from 'chalk'
import pkg from '../../package.json'
import { outputLogo } from './emit'

export default async function () {
  const desc = chalk.dim(`${pkg.description} (v${pkg.version})`)

  outputLogo({ indent: 1 })
  console.log(`  ${desc}

  Usage:

      jumpsuit <command> [options]

  Commands:

      watch           build initial app and wait for file changes
      build           create a production-ready version of app
      serve           run the static server

  Options:

      -p, --port      specify the port you want to run on
      -h, --host      specify the host you want to run on
      -v, --version   show jumpsuit version number\n`)
}
