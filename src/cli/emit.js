import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

const ARROW = String.fromCharCode(0x25B8) || '=>'
// const CHECKMARK = String.fromCharCode(0x2713) || 'done'

export function error (...msg) {
  console.log(chalk.red(`  ${ARROW}`, ...msg))
}

export function log (...msg) {
  console.log(`  ${ARROW}`, ...msg)
}

export function getLogo (indent = 0) {
  const prepend = Array(parseInt(indent, 10) + 1).join('  ')
  const filepath = path.resolve(__dirname, '../../assets/logo.txt')
  const logo = fs.readFileSync(filepath, 'utf8').replace(/^/gm, prepend)

  return logo
}
