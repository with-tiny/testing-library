# tiny-testing-library

Tiny testing library for little projects

## Installation

```
npm install -D @tiny-apps/testing-library
```

## Usage

Create a test file (ex: src/\_\_tests\_\_/math.js)

```js
describe('test math module', () => {
  test('add 1 + 2 is equal to 3', () => {
    expect(1 + 2).toBe(3)
  })
})
```

Set package.json test script to tiny-testing-library and run it

```
npm set-script test "tiny-testing-library"
npm run test
```

Or run directly from binary

```
npx tiny-testing-library
```

You should see a colored version of this output
```
~/your-awesome-project/src/__tests__/math.spec.js
  test math module
    ✓ add 1 + 2 is equal to 3

Test Suites: 	 0 failed, 1 passed, 1 total
Tests: 		 0 failed, 1 passed, 1 total
Time: 		 0.007 s

```

## Watch mode

It's also possible to run it in watch-mode

```
npm run test -- --watch
OR
npx tiny-testing-library --watch
```

## API docs
### Expect Methods

Functions that can be call to make assertions

```js
expect(5).toBeGreaterThan(2)
```

- toBe
- toStrictBe
- toBeDefined
- toBeUndefined
- toBeNull
- toBeNotNull
- toBeFalsy
- toBeTruthy
- toBeGreaterThan
- toBeGreaterThanOrEqual
- toBeLessThan
- toBeLessThanOrEqual
- toBeNaN
- toBeInstaceOf
- toContain
- toHaveLength

### Not Modifier

```js
expect(5).not.toBeGreaterThan(20)
```

### Test Hooks

Function that load before/after the tests to prepare or clean the environment

```js
describe('my awesome test', () => {
  beforeEach(() => {
    seedDatabase()
  })

  test(...)

  afterEach(() => {
    cleanDatabase()
  })
})
```

- beforeAll
- beforeEach
- afterEach
- afterAll

## Next Features

- Configuration
- Tests against itself
- Coverage
