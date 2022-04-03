import {
  defaultConfig,
  runConfig,
} from './node_modules/@tiny-apps/dev-scripts/dist/config/rollup.mjs'

const rollupConfig = {
  ...defaultConfig,
  entries: {
    index: 'src/index.js',
    runner: 'src/runner.js',
  },
}

export default () => runConfig(rollupConfig)
