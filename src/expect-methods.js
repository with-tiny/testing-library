export default (_received, execute, not) => ({
  toBe: _expected => {
    execute({
      name: 'toBe',
      condition: _received === _expected,
      not: not,
      expected: _expected,
    })
  },
  toStrictBe: _expected => {
    execute({
      name: 'toStrictBe',
      condition: JSON.stringify(_received) === JSON.stringify(_expected),
      not: not,
      expected: _expected,
    })
  },
  toBeDefined: () => {
    execute({
      name: 'toBeDefined',
      condition: _received !== undefined,
      not: not,
      expected: '!undefined',
    })
  },
  toBeUndefined: () => {
    execute({
      name: 'toBeUndefined',
      condition: _received === undefined,
      not: not,
      expected: 'undefined',
    })
  },
  toBeNull: () => {
    execute({
      name: 'toBeNull',
      condition: _received === null,
      not: not,
      expected: 'null',
    })
  },
  toBeNotNull: () => {
    execute({
      name: 'toBeNotNull',
      condition: _received !== null,
      not: not,
      expected: '!null',
    })
  },
  toBeFalsy: () => {
    execute({
      name: 'toBeFalsy',
      condition: !_received,
      not: not,
      expected: false,
      other: !!_received,
    })
  },
  toBeTruthy: () => {
    execute({
      name: 'toBeTruthy',
      condition: _received,
      not: not,
      expected: true,
      other: !!_received,
    })
  },
  toBeGreaterThan: _expected => {
    execute({
      name: 'toBeGreaterThan',
      condition: _received > _expected,
      not: not,
      expected: _expected,
    })
  },
  toBeGreaterThanOrEqual: _expected => {
    execute({
      name: 'toBeGreaterThanOrEqual',
      condition: _received >= _expected,
      not: not,
      expected: _expected,
    })
  },
  toBeLessThan: _expected => {
    execute({
      name: 'toBeLessThan',
      condition: _received < _expected,
      not: not,
      expected: _expected,
    })
  },
  toBeLessThanOrEqual: _expected => {
    execute({
      name: 'toBeLessThanOrEqual',
      condition: _received <= _expected,
      not: not,
      expected: _expected,
    })
  },
  toBeNaN: () => {
    execute({
      name: 'toBeNaN',
      condition: isNaN(_received),
      not: not,
      expected: 'NaN',
    })
  },
  toBeInstanceOf: _expected => {
    execute({
      name: 'toBeInstanceOf',
      condition: _received instanceof _expected,
      not: not,
      expected: _expected,
    })
  },
  toContain: _expected => {
    execute({
      name: 'toContain',
      condition: _received?.includes?.(_expected) ?? false,
      not: not,
      expected: _expected,
    })
  },
  toHaveLength: _expected => {
    execute({
      name: 'toHaveLength',
      condition: _received?.length === _expected,
      not: not,
      expected: _expected,
      other: _received?.length,
    })
  },
})
