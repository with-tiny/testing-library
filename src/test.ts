import * as Types from './_types.js'
import chalk from 'chalk'

const test = (title: string, callback: () => void) => {
  const run: Types.TestRun = global.testRun
  const describes = run[run.length - 1].describes
  const tests = describes[describes.length - 1].tests

  tests.push({
    title,
    ok: null,
    exec: async () => {
      const test = tests.find(_test => _test.title === title)

      try {
        await callback()
        console.log(chalk.green(`    ✓ ${title}`))
        test.ok = 1
      } catch (error) {
        console.error(chalk.red(`    ✕ ${title}`))
        console.error(`${error.message}`)
        test.ok = 0
      }
    },
  })
}

export default test
