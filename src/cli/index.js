import minimist from 'minimist'
import { error } from './emit'

const argv = minimist(process.argv.slice(2))

export default async function () {
  const cmd = argv._[0]

  try {
    switch (cmd) {
      case 'watch':
        process.env.NODE_ENV = 'development'
        await require('./watch').default()
        break
      case 'build':
        process.env.NODE_ENV = 'production'
        await require('./build').default()
        break
      case 'server':
        await require('./server').default()
        break
      case 'help':
      case undefined:
        await require('./help').default()
        break
      default:
        error(`"${cmd}" is not a Jumpsuit command!`)
        break
    }
  } catch (err) {
    error(err)
  }
}
