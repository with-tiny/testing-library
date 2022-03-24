const suite = async (title) => {
  const run = global.testRun

  run.push({
    title,
    describes: [],
    exec: async () => {
      console.log(title)

      const _suite = run.find((_suite) => _suite.title === title)
      for (const _describe of _suite.describes) {
        await _describe.exec()
      }
    },
  })
}

export default suite
