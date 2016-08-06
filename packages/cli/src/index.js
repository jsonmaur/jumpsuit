import minimist from 'minimist'
import updateNotifier from 'update-notifier'
import pkg from '../package.json'
import initConfig from './utils/config'
import { error } from './utils/emit'

updateNotifier({ pkg }).notify()

export default async function () {
  try {
    /* parse arguments into config */
    const argv = minimist(process.argv.slice(2), {
      boolean: ['h', 'help', 'v', 'version']
    })

    /* allow help flag on any command */
    if (argv.help || argv.h) {
      argv._.unshift('help')
    }

    /* show version number */
    if (argv.version || argv.v) {
      return console.log(`v${pkg.version}`)
    }

    /* predefined responses */
    const invalidCommand = () => {
      error(`"${argv._.join(' ')}" is not a valid Jumpsuit command`)
    }

    const cmd = argv._[0]
    switch (cmd) {
      case 'new':
        await require('./cmds/new').default(argv)
        break
      case 'watch':
        process.env.NODE_ENV = 'development'
        await initConfig(argv)
        await require('./cmds/build').watch(argv)
        break
      case 'build':
        process.env.NODE_ENV = 'production'
        await initConfig(argv)
        await require('./cmds/build').default(argv)
        break
      case 'serve':
        await initConfig(argv)
        await require('./cmds/serve').default(argv)
        break
      case 'help':
      case undefined:
        await require('./cmds/help').default(argv)
        break
      default:
        invalidCommand()
        break
    }
  } catch (err) {
    error(err, true)
    process.exit(1)
  }
}
