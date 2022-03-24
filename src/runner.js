import chalk from 'chalk'

export const runTests = async () => {
  for (const suite of global.testRun) {
    await suite.exec()
  }
}

export const summaryTests = (timeElapsed) => {
  const result = {
    suites: {
      total: 0,
      passed: 0,
      failed: 0,
    },
    tests: {
      total: 0,
      passed: 0,
      failed: 0,
    },
  }
  for (const suite of global.testRun) {
    result.suites.total++
    let suiteFailed = false
    for (const describe of suite.describes) {
      for (const test of describe.tests) {
        result.tests.total++
        if (test.ok) result.tests.passed++
        else {
          result.tests.failed++
          if (!suiteFailed) suiteFailed = true
        }
      }
    }
    if (suiteFailed) result.suites.failed++
    else result.suites.passed++
  }
  console.log()
  const suitesFailed = chalk.red(`${result.suites.failed} failed`)
  const suitesPassed = chalk.green(`${result.suites.passed} passed`)
  const testsFailed = chalk.red(`${result.tests.failed} failed`)
  const testsPassed = chalk.green(`${result.tests.passed} passed`)
  console.log(
    `${chalk.bold('Test Suites:')} \t ${suitesFailed}, ${suitesPassed}, ${
      result.suites.total
    } total`
  )
  console.log(
    `${chalk.bold('Tests:')} \t\t ${testsFailed}, ${testsPassed}, ${
      result.tests.total
    } total`
  )

  const time = Math.round(timeElapsed) / 1000

  console.log(`${chalk.bold('Time:')} \t\t ${time} s`)
  console.log()
}
