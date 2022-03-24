const describe = (title, callback) => {
  const run = global.testRun
  const describes = run[run.length - 1].describes

  describes.push({
    title,
    tests: [],
    exec: async () => {
      console.log(`  ${title}`)
      const describe = describes.find((_describe) => _describe.title === title)
      for (const _test of describe.tests) {
        await _test.exec()
      }
    },
  })

  callback()
}

export default describe
