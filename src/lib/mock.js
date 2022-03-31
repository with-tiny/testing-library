export const fn = (
  impl = () => {
    return
  },
) => {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args)
    return impl(...args)
  }
  mockFn.mock = { calls: [] }
  mockFn.mockImplementation = newImpl => (impl = newImpl)
  return mockFn
}

export const spyOn = (obj, prop) => {
  const originalValue = obj[prop]

  obj[prop] = fn()
  obj[prop].mockRestore = () => (obj[prop] = originalValue)
}

export const mock = (path, mockPath) => {
  if (typeof mockPath === 'string') {
    require(mockPath)
    require.cache[path] = require.cache[mockPath]
  } else {
    require.cache[path] = {
      ...require.cache[path],
      id: path,
      filename: path,
      loaded: true,
      exports: mockPath(),
    }
  }
}

export const mockReset = path => {
  delete require.cache[path]
}
