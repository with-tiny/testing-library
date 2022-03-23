const test = async (title, callback) => {
  try {
    await callback()
    console.log(`  ✓ ${title}`)
  } catch (error) {
    console.error(`  ✕ ${title}`)
    console.error(`    ${error.message}`)
  }
}

const expect = (actual) => ({
  toBe: (_expected) => {
    if (actual !== _expected) {
      throw new Error(`${actual} is not equal to ${_expected}`)
    }
  },
  toStrictBe: (_expected) => {
    if (JSON.stringify(actual) !== JSON.stringify(_expected)) {
      throw new Error(`${actual} is not strict equal to ${_expected}`)
    }
  },
})

const fn = (impl = () => {}) => {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args)
    return impl(...args)
  }
  mockFn.mock = { calls: [] }
  mockFn.mockImplementation = (newImpl) => (impl = newImpl)
  return mockFn
}

const spyOn = (obj, prop) => {
  const originalValue = obj[prop]

  obj[prop] = fn()
  obj[prop].mockRestore = () => (obj[prop] = originalValue)
}

const mock = (path, mockPath) => {
  if (typeof mockPath === 'string') {
    require(mockPath)
    require.cache[path] = require.cache[mockPath]
  } else {
    require.cache[path] = {
      id: path,
      filename: path,
      loaded: true,
      exports: mockPath(),
    }
  }
}

const mockReset = (path) => {
  delete require.cache[path]
}

global.test = test
global.expect = expect
global.fn = fn
global.spyOn = spyOn
global.mock = mock
global.mockReset = mockReset
