import fs from 'fs'
import path from 'path'
import { readPackageUpSync } from 'read-pkg-up'

const { packageJson: pkg, path: pkgPath } = readPackageUpSync()

const appDirectory = path.dirname(pkgPath)
const fromRoot = (...p) => path.join(appDirectory, ...p)
const hasFile = (...p) => fs.existsSync(fromRoot(...p))

export default {
  pkg,
  appDirectory,
  fromRoot,
  hasFile,
}
