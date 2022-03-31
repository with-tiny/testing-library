#!/usr/bin/env node

import spawn from 'cross-spawn'

let args = process.argv.slice(2)

const watchMode = args.includes('--watch')
if (watchMode) args = args.filter(i => i !== '--watch')

const testPath = process.cwd() + (args.length ? `/${args[0]}` : '')

let runnerCommand = new URL('runner.js', import.meta.url).toString()
runnerCommand = runnerCommand.split(process.cwd() + '/')[1]

if (!watchMode) {
  spawn.sync('node', [runnerCommand, testPath], { stdio: 'inherit' })
} else {
  spawn.sync('nodemon', ['-e', 'js jsx', runnerCommand, testPath], {
    stdio: 'inherit',
  })
}
