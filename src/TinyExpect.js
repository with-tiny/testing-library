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
  toBeDefined: () => {
    if (actual === undefined) {
      throw new Error(`${actual} is not defined`)
    }
  },
  toBeUndefined: () => {
    if (actual !== undefined) {
      throw new Error(`${actual} is not undefined`)
    }
  },
  toBeNull: () => {
    if (actual !== null) {
      throw new Error(`${actual} is not null`)
    }
  },
  toBeFalsy: () => {
    if (!!actual) {
      throw new Error(`${actual} is not falsy`)
    }
  },
  toBeTruthy: () => {
    if (!!!actual) {
      throw new Error(`${actual} is not truthy`)
    }
  },
  toBeGreaterThan: (_expected) => {
    if (!(actual > _expected)) {
      throw new Error(`${actual} is not greater than ${_expected}`)
    }
  },
  toBeGreaterThanOrEqual: (_expected) => {
    if (!(actual >= _expected)) {
      throw new Error(`${actual} is not greater or equal than ${_expected}`)
    }
  },
  toBeLessThan: (_expected) => {
    if (!(actual < _expected)) {
      throw new Error(`${actual} is not less than ${_expected}`)
    }
  },
  toBeLessThanOrEqual: (_expected) => {
    if (!(actual <= _expected)) {
      throw new Error(`${actual} is not less or equal than ${_expected}`)
    }
  },
  toBeNaN: () => {
    if (!isNaN(actual)) {
      throw new Error(`${actual} is not NaN`)
    }
  },
  toBeInstanceOf: (_expected) => {
    if (!(actual instanceof _expected)) {
      throw new Error(`${actual} is not instanceof ${_expected}`)
    }
  },
  toContain: (_expected) => {
    if (!(actual?.includes?.(_expected) ?? false)) {
      throw new Error(`${actual} not contains ${_expected}`)
    }
  },
  toHaveLength: (_expected) => {
    if (actual?.length !== _expected) {
      throw new Error(`${actual} have not length ${_expected}`)
    }
  },
})

export default expect
