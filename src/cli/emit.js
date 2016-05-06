import chalk from 'chalk'

const ARROW = String.fromCharCode(0x25B8) || '=>'
const CHECKMARK = String.fromCharCode(0x2713) || 'done'

export function error (...msg) {
  console.log(chalk.red(`  ${ARROW}`, ...msg))
}

export function log (...msg) {
  console.log(`  ${ARROW}`, ...msg)
}
