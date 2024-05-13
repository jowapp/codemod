'use strict'

import path from 'node:path'

const jsTests = [
  'arrow-function-expression-w-default-export-object',
  // 'arrow-function-expression-wo-default-props',
  'forward-ref-arrow-function-expression-w-default-export-object',
  // 'arrow-function-expression-w-named-exports.input',
  // 'arrow-function-expression-w-default-export-memo',
]

const defineTest = require('jscodeshift/src/testUtils').defineTest
const transform = require('../../transforms/react/func-default-props-to-params')

describe('react.func-default-props-to-params', () => {
  jsTests.forEach((test) =>
    defineTest(
      path.join(__dirname, '..'), // jscodeshift/src/testUtils.js utility assumes transform is one level up from __tests__ directory, but because of 'react' subfolder we have to go up 2 levels from this test file
      'transforms/react/func-default-props-to-params',
      null,
      `react/func-default-props-to-params/${test}`, // above dirName arg also applies to __testfixtures__
    ),
  )
})
