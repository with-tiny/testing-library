import chalk from 'chalk'
import glob from 'glob'

import suite from './suite.js'
import describe from './describe.js'
import test from './test.js'
import expect from './expect.js'
import * as hooks from './hooks.js'
import * as mock from './mock.js'

const setupGlobals = () => {
  global.describe = describe
  global.test = test
  global.expect = expect
  global.beforeAll = hooks.beforeAll
  global.beforeEach = hooks.beforeEach
  global.afterEach = hooks.afterEach
  global.afterAll = hooks.afterAll
  global.fn = mock.fn
  global.spyOn = mock.spyOn
  global.mock = mock.mock
  global.mockReset = mock.mockReset
}

const runTests = async () => {
  const run = global.testRun
  for (const suite of run) {
    await suite.exec()
  }
}

const summaryTests = timeElapsed => {
  const run = global.testRun

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

  for (const suite of run) {
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
    } total`,
  )
  console.log(
    `${chalk.bold('Tests:')} \t\t ${testsFailed}, ${testsPassed}, ${
      result.tests.total
    } total`,
  )

  const time = Math.round(timeElapsed) / 1000

  console.log(`${chalk.bold('Time:')} \t\t ${time} s`)
  console.log()
}

const loadSuites = testPath =>
  glob.sync(
    `${testPath}{/**/__tests__/**/*.[jt]s?(x),/**/*.+(spec|test).[tj]s?(x)}`,
    {
      ignore: ['**/node_modules/**', '**/dist/**'],
    },
  )

const getTests = async suites => {
  global.testRun = []
  for (const title of suites) {
    suite(title)
    await import(title)
  }
  return global.testRun
}

const run = async testPath => {
  const suites = loadSuites(testPath)

  const timeStart = performance.now()
  console.log()
  await getTests(suites)
  await runTests()
  const timeEnd = performance.now()
  const timeElapsed = timeEnd - timeStart
  summaryTests(timeElapsed)
}

let args = process.argv.slice(2)

setupGlobals()
run(args[0])
