'use strict'

import path from 'node:path'
import { defineTest } from 'jscodeshift/dist/testUtils'

const jsTests = [
  'function-expression',
  'function-expression-w-multiple-imports',
  'arrow-function-expression-w-display-name',
  'arrow-function-expression-w-props-object-pattern',
]

describe('react.forward-ref-to-prop', () => {
  jsTests.forEach((test) =>
    defineTest(
      path.join(__dirname, '..'), // jscodeshift/src/testUtils.js utility assumes transform is one level up from __tests__ directory, but because of 'react' subfolder we have to go up 2 levels from this test file
      'transforms/react/forward-ref-to-prop',
      // {
      //   printOptions: {
      //     wrapColumn: 100,
      //     tabWidth: 1, // only option effective with recast's default printer
      //     quote: 'single',
      //     trailingComma: {
      //       objects: true,
      //       arrays: true,
      //       functions: false,
      //     },
      //   },
      // }, // match prettier config
      null,
      `react/forward-ref-to-prop/${test}`, // above dirName arg also applies to __testfixtures__
    ),
  )
})
