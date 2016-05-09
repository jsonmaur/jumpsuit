import chalk from 'chalk'
import pkg from '../../package.json'
import { getLogo } from './emit'

export default async function () {
  const logo = chalk.dim(getLogo(1))
  const desc = chalk.dim(`${pkg.description} (v${pkg.version})`)

  console.log(`${logo}
  ${desc}

  Usage:

      jumpsuit <command> [options]

  Commands:

      watch         run the watch system
      build         run the build system
      server        run the server
      help          display this text

  Options:

      -o, --open    open the app in your browser
      -p, --port    specify the port you want to run on
      -h, --host    specify the host you want to run on\n`)
}
