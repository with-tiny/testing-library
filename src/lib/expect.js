import chalk from 'chalk'
import expectMethods from './expect-methods.js'

const call = (func, not) =>
  `expect(${chalk.red('received')})${not ? '.not' : ''}.${func}(${chalk.green(
    'expected',
  )})`
const spacing = ''.padStart(7)
const spaced = str => spacing + str

const expect = _received => {
  const received = chalk.red(`Received: ${_received}`)

  const error = (_func, _expected, _otherReceived, not) => {
    const func = call(_func, not)
    const expected = chalk.green(`Expected: ${_expected}`)
    const realReceived = _otherReceived
      ? chalk.red(`Received: ${_otherReceived}`)
      : received

    throw new Error(
      `${spaced(func)}\n\n${spaced(expected)}\n${spaced(realReceived)}`,
    )
  }

  const execute = ({ name, condition, not, expected, other }) => {
    if ((!condition && !not) || (condition && not))
      error(name, expected, other, not)
  }

  return {
    ...expectMethods(_received, execute),
    not: expectMethods(_received, execute, true),
  }
}

export default expect
