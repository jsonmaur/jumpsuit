import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

const ARROW = String.fromCharCode(0x25B8) || '=>'
const CHECKMARK = String.fromCharCode(0x2713) || 'done'

export function error (err) {
  if (!err) return
  else if (process.env.NODE_ENV === 'development' && err.stack) err = err.stack

  console.log(chalk.red(`  ${ARROW}`, err))
}

export function warn (...msg) {
  if (!msg.length) return
  console.log(chalk.yellow(`  ${ARROW}`, ...msg))
}

export function log (...msg) {
  if (!msg.length) return
  console.log(`  ${ARROW}`, ...msg)
}

export function pending (msg) {
  if (!msg.length) return
  process.stdout.write(`  ${ARROW} ${msg}... `)
}

export function pendingDone (time) {
  if (time) time = chalk.dim(`(${time}ms)`)
  process.stdout.write(`${CHECKMARK} ${time}\n`)
}

export function getLogo (options = {}) {
  options.indent = options.indent || 0

  const prepend = Array(parseInt(options.indent, 10) + 1).join('  ')
  const filepath = path.resolve(__dirname, '../../assets/logo.txt')
  const logo = fs.readFileSync(filepath, 'utf8').replace(/^/gm, prepend)

  return logo
}

export function outputLogo (opts) {
  console.log(chalk.dim(getLogo(opts)))
}
