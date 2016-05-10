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

      watch         run the watch system
      build         run the build system
      server        run the server
      help          display this text

  Options:

      -o, --open    open the app in your browser
      -p, --port    specify the port you want to run on
      -h, --host    specify the host you want to run on\n`)
}
