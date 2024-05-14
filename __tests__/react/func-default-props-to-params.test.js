'use strict'

import path from 'node:path'
import fs from 'fs'
import { defineTest } from 'jscodeshift/dist/testUtils'
import transform from '../../transforms/react/func-default-props-to-params'

const jsTests = [
  'function-component',
  'function-component-w-default-export',
  'function-component-w-named-exports',
  'memo-function-component-w-default-export',
  'forward-ref-function-component-w-default-export',
]

const jsTestsNoOutput = ['function-component-wo-default-props']

describe('react.func-default-props-to-params', () => {
  jsTests.forEach((test) =>
    defineTest(
      path.join(__dirname, '..'),
      'transforms/react/func-default-props-to-params',
      null,
      `react/func-default-props-to-params/${test}`,
    ),
  )

  describe('transforms/react/func-default-props-to-params', () => {
    it.each(jsTestsNoOutput)(
      'does not transform using "react/func-default-props-to-params/%s"',
      (test) => {
        const applyTransform = require('jscodeshift/dist/testUtils').applyTransform
        const transformOptions = {}
        const fixtureDir = path.join(
          __dirname,
          '..',
          '..',
          '__testfixtures__',
          'react',
          'func-default-props-to-params',
        )
        const inputPath = path.join(fixtureDir, test + '.input.js')
        const inputSource = fs.readFileSync(inputPath, 'utf8')
        const output = applyTransform(transform, transformOptions, {
          source: inputSource,
          path: inputPath,
        })
        expect(output).toBe('')
      },
    )
  })
})
