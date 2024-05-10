'use strict'

import path from 'node:path'

const jsTests = [
  'forward-ref-arrow-function-expression-w-default-export-object',
  // 'arrow-function-expression-w-default-export-object',
  // 'arrow-function-expression-w-named-exports.input',
  // 'arrow-function-expression-w-default-export-memo',
]

const defineTest = require('jscodeshift/src/testUtils').defineTest
const transform = require('../../react/func-default-props-to-params')

describe('react/func-default-props-to-params', () => {
  jsTests.forEach((fixture) =>
    defineTest(
      path.join(__dirname, '..'),
      'react/func-default-props-to-params',
      null,
      `react/func-default-props-to-params/${fixture}`,
    ),
  )
})
