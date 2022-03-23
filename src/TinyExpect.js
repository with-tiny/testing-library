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

export default expect
