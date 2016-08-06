import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import strip from 'strip-ansi'

const ARROW = String.fromCharCode(0x25B8) || '=>'
const CHECKMARK = String.fromCharCode(0x2713) || 'done'

export function error (err, lineBreak = false) {
  if (!err) return
  // else if (process.env.NODE_ENV === 'development' && err.stack) err = err.stack

  if (lineBreak) console.log()

  const msg = err.message || err.msg || err
  console.log(chalk.red(`  ${ARROW}`, strip(msg)))
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
  let logo = fs.readFileSync(filepath, 'utf8').replace(/^/gm, prepend)

  if (options.trim) {
    logo = logo.substring(0, logo.lastIndexOf('\n'))
  }

  return logo
}

export function outputLogo () {
  console.log(chalk.dim(getLogo({ indent: 1 })))
}
