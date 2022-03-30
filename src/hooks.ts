import * as Types from './_types.js'

const findDescribe = () => {
  const run: Types.TestRun = global.testRun
  const describes = run[run.length - 1].describes
  const describe = describes[describes.length - 1]
  return describe
}

export const beforeEach = (callback: Types.HookFn) => {
  const describe = findDescribe()
  describe.beforeEach = callback
}

export const afterEach = (callback: Types.HookFn) => {
  const describe = findDescribe()
  describe.afterEach = callback
}

export const beforeAll = (callback: Types.HookFn) => {
  const describe = findDescribe()
  describe.beforeAll = callback
}

export const afterAll = (callback: Types.HookFn) => {
  const describe = findDescribe()
  describe.afterAll = callback
}
