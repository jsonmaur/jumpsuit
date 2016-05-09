export default async function () {
  console.log(`
  Usage:

      jumpsuit <command> [options]

  Commands:

      watch         run the watch system
      build         run the build system
      server        run the server

  Options:

      -o, --open    open the app in your browser
      -p, --port    specify the port you want to run on
      -h, --host    specify the host you want to run on\n`)
}
