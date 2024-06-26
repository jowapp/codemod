#!/usr/bin/env node

// jowapp-codemod optional-name-of-transform optional/path/to/src [...options]

const path = require('node:path')
const yargs = require('yargs')
const { glob } = require('glob')
const { run: jscodeshift } = require('jscodeshift/src/Runner')

const TRANSFORMERS = [
  {
    name: 'Converts functional components default props to default params',
    value: 'react.func-default-props-to-params',
  },
  {
    name: 'Converts forwardRef to regular prop ref',
    value: 'react.forward-ref-to-prop',
  },
]

;(async () => {
  const transformer = process.argv[2]
  const transformerDirectory = path.join(__dirname, '../', 'transforms')

  let transformerPath
  if (transformer && !TRANSFORMERS.find((x) => x.value === transformer)) {
    console.error(
      `${transformer} not found in available transformers, using current working directory default 'transform.js' (if any).`,
    )
    transformerPath = path.resolve('transform.js')
  } else {
    transformerPath = path.join(transformerDirectory, `${path.join(...transformer.split('.'))}.js`)
  }

  const { _: pathsArgs, printOptions, ...options } = yargs(process.argv.slice(3)).argv

  let paths
  if (pathsArgs.length > 0) {
    if (pathsArgs.some((path) => path.includes('*'))) {
      try {
        paths = await glob(pathsArgs, { ignore: 'node_modules/**' })
      } catch (e) {
        console.log(e)
        process.exit(1)
      }
    } else {
      paths = pathsArgs
    }
  }

  function parsePrintOptions(value) {
    try {
      return JSON.parse(value)
    } catch (_e) {}
    return value
  }

  if (printOptions) {
    options.printOptions = parsePrintOptions(printOptions)
  }
  if (!options.babel && options.babel !== false) {
    options.babel = true
  }

  try {
    await jscodeshift(transformerPath, paths, options)
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
})()
