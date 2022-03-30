import * as Types from './_types.js'

export const fn = (
  impl: Types.AnonymousFn = () => {
    return
  },
) => {
  const mockFn = (...args: any[]) => {
    mockFn.mock.calls.push(args)
    return impl(...args)
  }
  mockFn.mock = { calls: [] }
  mockFn.mockImplementation = (newImpl: Types.AnonymousFn) => (impl = newImpl)
  return mockFn
}

export const spyOn = (obj: Types.SpiedObject, prop: string): void => {
  const originalValue = obj[prop]

  obj[prop] = fn()
  obj[prop].mockRestore = () => (obj[prop] = originalValue)
}

export const mock = (path: string, mockPath: string | Types.AnonymousFn) => {
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

export const mockReset = (path: string) => {
  delete require.cache[path]
}
