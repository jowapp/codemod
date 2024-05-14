module.exports = (fileInfo, api, options) => {
  const j = api.jscodeshift
  const printOptions = options.printOptions || {}
  const root = j(fileInfo.source)

  let isDirty = false

  const buildRefAndPropsObjectPattern = (j, refArgName, propArgName) =>
    j.objectPattern([
      j.objectProperty.from({
        shorthand: true,
        key: j.identifier('ref'),
        value: j.identifier(refArgName),
      }),
      j.restProperty(j.identifier(propArgName)),
    ])

  const getForwardRefRenderFunction = (j, callExpression) => {
    const [renderFunction] = callExpression.arguments
    if (
      !j.FunctionExpression.check(renderFunction) &&
      !j.ArrowFunctionExpression.check(renderFunction)
    ) {
      return null
    }
    return renderFunction
  }

  let componentsNames = []

  root
    .find(j.CallExpression, {
      callee: {
        type: 'Identifier',
        name: 'forwardRef',
      },
    })
    .replaceWith((callExpressionPath) => {
      const originalCallExpression = callExpressionPath.value

      const renderFunction = getForwardRefRenderFunction(j, callExpressionPath.node)

      if (renderFunction === null) {
        return originalCallExpression
      }

      const [propsArg, refArg] = renderFunction.params

      if (
        !j.Identifier.check(refArg) ||
        !(j.Identifier.check(propsArg) || j.ObjectPattern.check(propsArg))
      ) {
        return originalCallExpression
      }

      // remove refArg
      renderFunction.params.splice(1, 1)
      isDirty = true

      componentsNames.push(callExpressionPath.parent.node.id.name)

      // if propsArg is ObjectPattern, add ref as new ObjectProperty
      if (j.ObjectPattern.check(propsArg)) {
        propsArg.properties.unshift(
          j.objectProperty.from({
            shorthand: true,
            key: j.identifier('ref'),
            value: j.identifier(refArg.name),
          }),
        )
      }

      // if props arg is Identifier, push ref variable declaration to the function body
      if (j.Identifier.check(propsArg)) {
        renderFunction.params[0] = buildRefAndPropsObjectPattern(j, refArg.name, propsArg.name)
      }

      return renderFunction
    })

  if (isDirty) {
    // handle import
    root
      .find(j.ImportDeclaration, {
        source: {
          value: 'react',
        },
      })
      .forEach((importDeclarationPath) => {
        const { specifiers } = importDeclarationPath.node

        const specifiersWithoutForwardRef =
          specifiers?.filter(
            (s) => j.ImportSpecifier.check(s) && s.imported.name !== 'forwardRef',
          ) ?? []

        if (specifiersWithoutForwardRef.length === 0) {
          j(importDeclarationPath).remove()
        }

        importDeclarationPath.node.specifiers = specifiersWithoutForwardRef
      })
    // handle displayName
    componentsNames.forEach((componentName) => {
      root
        .find(j.AssignmentExpression, {
          left: {
            object: { name: componentName },
            property: { name: 'displayName' },
          },
        })
        .remove()
    })
  }

  return isDirty ? root.toSource(printOptions) : null
}
