'use strict'

import path from 'node:path'

const jsTests = [
  // 'function-component',
  'function-component-w-default-export',
  'forward-ref-function-component-w-default-export',
  // 'memo-function-component-w-default-export',
]

const defineTest = require('jscodeshift/src/testUtils').defineTest

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
