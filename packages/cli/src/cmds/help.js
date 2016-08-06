import chalk from 'chalk'
import pkg from '../../package.json'
import { getLogo } from '../utils/emit'

export default async function (argv) {
  const cmd = argv._[1]
    ? argv._[1].split(':')[0]
    : (argv._[0] || '_default')

  console.log(menus[cmd] || menus['_default'])
}

export function spaced (name, desc) {
  const paddingLeft = 20
  const fill = new Array(paddingLeft - name.length - 1).join('.')
  return `${name} ${chalk.dim(fill)} ${desc}`
}

export const menus = {
  _default: `${chalk.dim(getLogo({ indent: 1, trim: true }))}
                      ${chalk.dim(pkg.description)}

  ${chalk.underline('Usage:')}

    js <command> [options]
    jumpsuit <command> [options]

    ${chalk.dim('For further info about a command:')}
    jumpsuit help <command> ${chalk.dim('or')} jumpsuit <command> --help

  ${chalk.underline('Commands:')}

    ${spaced('new', 'start a project in a new directory')}
    ${spaced('watch', 'build initial app and wait for changes')}
    ${spaced('build', 'create a production-ready version of app')}
    ${spaced('serve', 'run the static server')}

  ${chalk.underline('Options:')}

    ${spaced('-p, --port', 'specify the port you want to run on')}
    ${spaced('-h, --host', 'specify the host you want to run on')}
    ${spaced('-h, --help', 'show help menu for a command')}
    ${spaced('-v, --version', 'show Jumpsuit version number')}
  `,

  // -----------------------------------------------------------------------------

  'new': `
  ${chalk.underline('Usage:')}

    jumpsuit new <app-name> [options]
  `,

  // -----------------------------------------------------------------------------

  'watch': `
  ${chalk.underline('Usage:')}

    jumpsuit watch [options]
  `,

  // -----------------------------------------------------------------------------

  'build': `
  ${chalk.underline('Usage:')}

    jumpsuit build [options]
  `,

  // -----------------------------------------------------------------------------

  'serve': `
  ${chalk.underline('Usage:')}

    jumpsuit serve [options]
  `
}
