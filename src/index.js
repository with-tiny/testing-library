#!/usr/bin/env node

import glob from 'glob'
import { runTests, summaryTests } from './runner.js'
import suite from './suite.js'
import describe from './describe.js'
import test from './test.js'
import expect from './expect.js'
import utils from './utils.js'
import * as hooks from './hooks.js'
import * as mock from './mock.js'

const args = process.argv.slice(2)

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

export const loadSuites = testPath =>
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
  setupGlobals()

  const suites = loadSuites(testPath)

  const timeStart = performance.now()
  console.log()
  await getTests(suites)
  await runTests()
  const timeEnd = performance.now()
  const timeElapsed = timeEnd - timeStart
  summaryTests(timeElapsed)
}

const testPath = utils.appDirectory + (args.length ? `/${args[0]}` : '')
console.log({ testPath })

run(testPath)
