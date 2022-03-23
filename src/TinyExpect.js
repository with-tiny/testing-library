import chalk from 'chalk'

const expect = (_actual) => {
  const actual = chalk.red(_actual)
  const green = (_expected) => chalk.green(_expected)

  return {
    toBe: (_expected) => {
      if (_actual !== _expected) {
        throw new Error(`${actual} is not equal to ${green(_expected)}`)
      }
    },
    toStrictBe: (_expected) => {
      if (JSON.stringify(_actual) !== JSON.stringify(_expected)) {
        throw new Error(`${actual} is not strict equal to ${green(_expected)}`)
      }
    },
    toBeDefined: () => {
      if (_actual === undefined) {
        throw new Error(`${actual} is not defined`)
      }
    },
    toBeUndefined: () => {
      if (_actual !== undefined) {
        throw new Error(`${actual} is not undefined`)
      }
    },
    toBeNull: () => {
      if (_actual !== null) {
        throw new Error(`${actual} is not null`)
      }
    },
    toBeFalsy: () => {
      if (!!_actual) {
        throw new Error(`${actual} is not falsy`)
      }
    },
    toBeTruthy: () => {
      if (!!!_actual) {
        throw new Error(`${actual} is not truthy`)
      }
    },
    toBeGreaterThan: (_expected) => {
      if (!(_actual > _expected)) {
        throw new Error(`${actual} is not greater than ${green(_expected)}`)
      }
    },
    toBeGreaterThanOrEqual: (_expected) => {
      if (!(_actual >= _expected)) {
        throw new Error(
          `${actual} is not greater or equal than ${green(_expected)}`
        )
      }
    },
    toBeLessThan: (_expected) => {
      if (!(_actual < _expected)) {
        throw new Error(`${actual} is not less than ${green(_expected)}`)
      }
    },
    toBeLessThanOrEqual: (_expected) => {
      if (!(_actual <= _expected)) {
        throw new Error(
          `${actual} is not less or equal than ${green(_expected)}`
        )
      }
    },
    toBeNaN: () => {
      if (!isNaN(_actual)) {
        throw new Error(`${actual} is not NaN`)
      }
    },
    toBeInstanceOf: (_expected) => {
      if (!(_actual instanceof _expected)) {
        throw new Error(`${actual} is not instanceof ${green(_expected)}`)
      }
    },
    toContain: (_expected) => {
      if (!(_actual?.includes?.(_expected) ?? false)) {
        throw new Error(`${actual} not contains ${green(_expected)}`)
      }
    },
    toHaveLength: (_expected) => {
      if (_actual?.length !== _expected) {
        throw new Error(`${actual} have not length ${green(_expected)}`)
      }
    },
  }
}

export default expect
