const findDescribe = () => {
  const run = global.testRun
  const describes = run[run.length - 1].describes
  const describe = describes[describes.length - 1]
  return describe
}

export const beforeEach = (callback) => {
  const describe = findDescribe()
  describe.beforeEach = callback
}

export const afterEach = (callback) => {
  const describe = findDescribe()
  describe.afterEach = callback
}

export const beforeAll = (callback) => {
  const describe = findDescribe()
  describe.beforeAll = callback
}

export const afterAll = (callback) => {
  const describe = findDescribe()
  describe.afterAll = callback
}
