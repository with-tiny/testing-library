import chalk from 'chalk'

const call = func =>
  `expect(${chalk.red('received')}).${func}(${chalk.green('expected')})`
const spacing = ''.padStart(7)
const spaced = str => spacing + str

const expect = _received => {
  const received = chalk.red(`Received: ${_received}`)

  const error = (_func, _expected, _otherReceived) => {
    const func = call(_func)
    const expected =                chalk.green(`Expected: ${_expected}`)
    const realReceived = _otherReceived
      ? chalk.red(`Received: ${_otherReceived}`)
      : received

    throw new Error(
      `${spaced(func)}\n\n${spaced(expected)}\n${spaced(realReceived)}`,
    )
  }

  return {
    toBe: _expected => {
      if (_received !== _expected) {
        error('toBe', _expected)
      }
    },
    toStrictBe: _expected => {
      if (JSON.stringify(_received) !== JSON.stringify(_expected)) {
        error('toStrictBe', _expected)
      }
    },
    toBeDefined: () => {
      if (_received === undefined) {
        error('toBeDefined', '!undefined')
      }
    },
    toBeUndefined: () => {
      if (_received !== undefined) {
        error('toBeUndefined', 'undefined')
      }
    },
    toBeNull: () => {
      if (_received !== null) {
        error('toBeNull', 'null')
      }
    },
    toBeFalsy: () => {
      if (_received) {
        error('toBeFalsy', '!true')
      }
    },
    toBeTruthy: () => {
      if (!_received) {
        error('toBeTruthy', '!false')
      }
    },
    toBeGreaterThan: _expected => {
      if (!(_received > _expected)) {
        error('toBeGreaterThan', _expected)
      }
    },
    toBeGreaterThanOrEqual: _expected => {
      if (!(_received >= _expected)) {
        error('toBeGreaterThanOrEqual', _expected)
      }
    },
    toBeLessThan: _expected => {
      if (!(_received < _expected)) {
        error('toBeLessThan', _expected)
      }
    },
    toBeLessThanOrEqual: _expected => {
      if (!(_received <= _expected)) {
        error('toBeLessThanOrEqual', _expected)
      }
    },
    toBeNaN: () => {
      if (!isNaN(_received)) {
        error('toBeNaN', 'NaN')
      }
    },
    toBeInstanceOf: _expected => {
      if (!(_received instanceof _expected)) {
        error('toBeInstanceOf', _expected)
      }
    },
    toContain: _expected => {
      if (!(_received?.includes?.(_expected) ?? false)) {
        error('toContain', _expected)
      }
    },
    toHaveLength: _expected => {
      if (_received?.length !== _expected) {
        error('toHaveLength', _expected, _received?.length)
      }
    },
  }
}

export default expect
