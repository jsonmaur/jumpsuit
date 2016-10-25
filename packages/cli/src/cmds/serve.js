import jumpserver from 'jumpserver'
import chalk from 'chalk'
import { outputLogo, log } from '../utils/emit'
import { CONFIG } from '../utils/config'

export let socketMessage

export default async function (argv, fromWatch = false) {
  if (!fromWatch) outputLogo()

  const { uri, config, hsr } = await jumpserver(CONFIG.server)

  process.env.PORT = config.port
  process.env.HOST = config.host
  process.env.HSR_WS = hsr.uri
  process.env.HSR_MAX_AGE = CONFIG.hsr.maxAge
  process.env.HSR_SHOULD_CATCH_ERRORS = CONFIG.hsr.shouldCatchErrors

  socketMessage = hsr.send

  log('running at', chalk.underline(uri))
}
