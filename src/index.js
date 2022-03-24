import glob from 'glob'
import { runTests, summaryTests } from './runner.js'
import suite from './suite.js'
import describe from './describe.js'
import test from './test.js'
import expect from './expect.js'
import * as mock from './mock.js'

const setupGlobals = () => {
  global.describe = describe
  global.test = test
  global.expect = expect
  global.fn = mock.fn
  global.spyOn = mock.spyOn
  global.mock = mock.mock
  global.mockReset = mock.mockReset
}

export const loadSuites = () =>
  glob.sync('{**/__tests__/**/*.[jt]s?(x),**/*.+(spec|test).[tj]s?(x)}', {
    ignore: ['**/node_modules/**', './node_modules/**'],
  })

const getTests = async (path, suites) => {
  global.testRun = []
  for (const title of suites) {
    suite(title)
    await import(`../${path}/${title}`)
  }
  return global.testRun
}

export const run = async (path) => {
  setupGlobals()

  const suites = loadSuites()

  const timeStart = performance.now()
  console.log()
  await getTests(path, suites)
  await runTests()
  const timeEnd = performance.now()
  const timeElapsed = timeEnd - timeStart
  summaryTests(timeElapsed)
}
