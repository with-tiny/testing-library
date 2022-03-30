const describe = (title, callback) => {
  const run = global.testRun
  const describes = run[run.length - 1].describes

  describes.push({
    title,
    tests: [],
    beforeAll: () => {},
    beforeEach: () => {},
    afterEach: () => {},
    afterAll: () => {},
    exec: async () => {
      console.log(`  ${title}`)
      const describe = describes.find(_describe => _describe.title === title)

      await describe.beforeAll()
      for (const _test of describe.tests) {
        await describe.beforeEach()
        await _test.exec()
        await describe.afterEach()
      }
      await describe.afterAll()
    },
  })

  callback()
}

export default describe
