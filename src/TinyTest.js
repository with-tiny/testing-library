const test = async (title, callback) => {
  try {
    await callback()
    console.log(`  ✓ ${title}`)
  } catch (error) {
    console.error(`  ✕ ${title}`)
    console.error(`    ${error.message}`)
  }
}

export default test
