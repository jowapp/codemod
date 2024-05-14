'use strict'

import path from 'path'
import fs from 'fs'
import { defineTest, applyTransform } from 'jscodeshift/dist/testUtils'
import transform from '../../transforms/react/func-default-props-to-params'

const jsTests = [
  'function-component',
  'function-component-w-default-export',
  'function-component-w-default-export-and-merged-default-props',
  'function-component-w-default-export-and-mismatching-default-props',
  'function-component-w-default-export-and-partial-mismatching-default-props',
  'function-component-w-named-exports',
  'memo-function-component-w-default-export',
  'forward-ref-function-component-w-default-export',
]

const jsTestsNoOutput = ['function-component-wo-default-props']

const fixtureDir = path.join(__dirname, '../../__testfixtures__/react/func-default-props-to-params')

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
        const inputPath = path.join(fixtureDir, `${test}.input.js`)
        const inputSource = fs.readFileSync(inputPath, 'utf8')
        const output = applyTransform(transform, undefined, {
          source: inputSource,
          path: inputPath,
        })
        expect(output).toBeDefined()
        expect(output).toEqual('')
      },
    )
  })
})
