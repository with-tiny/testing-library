#!/usr/bin/env node

import glob from 'glob'
import '../index.js'

glob(
  '{**/__tests__/**/*.[jt]s?(x),**/?(*.)+(spec|test).[tj]s?(x)}',
  {},
  async (er, files) => {
    files.forEach((file) => import(`../../../${file}`))
  }
)
