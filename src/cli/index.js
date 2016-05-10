import minimist from 'minimist'
import pkg from '../../package.json'
import { error } from './emit'

const argv = minimist(process.argv.slice(2))

export default async function () {
  try {
    if (argv.v || argv.version) {
      return console.log(`v${pkg.version}`)
    }

    const cmd = argv._[0]
    switch (cmd) {
      case 'watch':
        process.env.NODE_ENV = 'development'
        await require('./build').watch(argv)
        break
      case 'build':
        process.env.NODE_ENV = 'production'
        await require('./build').default(argv)
        break
      case 'server':
        await require('./server').default(argv)
        break
      case 'help':
      case undefined:
        await require('./help').default(argv)
        break
      default:
        error(`"${cmd}" is not a Jumpsuit command!`)
        break
    }
  } catch (err) {
    error(err)
  }
}
