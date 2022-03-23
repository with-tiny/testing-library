import chalk from 'chalk'

const test = async (title, callback) => {
  try {
    await callback()
    console.log(chalk.green(`  ✓ ${title}`))
  } catch (error) {
    console.error(chalk.red(`  ✕ ${title}`))
    console.error(`    ${error.message}`)
  }
}

export default test
