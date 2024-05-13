'use strict'

import path from 'node:path'
import fs from 'fs'

const jsTests = [
  'function-component',
  'function-component-w-default-export',
  'function-component-w-named-exports',
  'memo-function-component-w-default-export',
  'forward-ref-function-component-w-default-export',
]

const jsTestsNoOutput = ['function-component-wo-default-props']

const defineTest = require('jscodeshift/dist/testUtils').defineTest
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

describe('react.func-default-props-to-params', () => {
  jsTestsNoOutput.forEach((test) => {
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
    it('should be empty string (null transform output)', () => {
      // applyTransform returns (output || '').trim()
      expect(output).toBe('')
    })
  })
})
