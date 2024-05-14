'use strict'

import path from 'path'
import fs from 'fs'
import { defineTest, applyTransform } from 'jscodeshift/dist/testUtils'

import transform from '../../transforms/react/forward-ref-to-prop'

const transformTests = [
  'function-expression',
  'function-expression-w-multiple-imports',
  'arrow-function-expression-w-display-name',
  'arrow-function-expression-w-props-object-pattern',
]

const noTransformTests = ['no-forward-ref']

const fixturesDir = path.join(__dirname, '../../__testfixtures__/react/forward-ref-to-prop')

describe('react.forward-ref-to-prop', () => {
  transformTests.forEach((test) =>
    defineTest(
      path.join(__dirname, '..'),
      'transforms/react/forward-ref-to-prop',
      null,
      `react/forward-ref-to-prop/${test}`,
    ),
  )

  describe('transforms/react/forward-ref-to-prop', () => {
    it.each(noTransformTests)('does not transform using "react/forward-ref-to-prop/%s"', (test) => {
      const inputPath = path.join(fixturesDir, `${test}.input.js`)
      const inputSource = fs.readFileSync(inputPath, 'utf8')
      const output = applyTransform(transform, undefined, {
        source: inputSource,
        path: inputPath,
      })
      expect(output).toBeDefined()
      expect(output).toEqual('')
    })
  })
})
