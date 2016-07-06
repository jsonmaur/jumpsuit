import butler from 'butler'
import chalk from 'chalk'
import { log } from './emit'
import { CONFIG } from './config'

export let triggerRefresh

export default async function () {
  const { uri, config, hsr } = await butler(CONFIG.server, { hsr: true })

  process.env.PORT = config.port
  process.env.HOST = config.host
  process.env.HSR_WS = hsr.uri
  process.env.HSR_MAX_AGE = CONFIG.hsr.maxAge
  process.env.HSR_SHOULD_CATCH_ERRORS = CONFIG.hsr.shouldCatchErrors

  triggerRefresh = hsr.trigger

  log('running at', chalk.underline(uri))
}
