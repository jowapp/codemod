module.exports = (fileInfo, api, options) => {
  const j = api.jscodeshift
  const printOptions = options.printOptions || { quote: 'single' }
  const root = j(fileInfo.source)

  if (
    root.find(j.AssignmentExpression, {
      left: {
        property: { name: 'defaultProps' },
      },
    })?.length <= 0
  ) {
    return null
  }

  const defaultPropsCol = root.find(j.AssignmentExpression, {
    left: {
      property: { name: 'defaultProps' },
    },
  })

  if (defaultPropsCol.length <= 0) {
    return null
  }

  const componentName = defaultPropsCol.find(j.MemberExpression).find(j.Identifier).get().node.name

  const defaultPropsPropertiesNodePath = defaultPropsCol.get('right', 'properties')

  if (defaultPropsPropertiesNodePath.node.type !== 'ObjectExpression') {
    throw new Error(
      `Cannot transform \`${componentName}\`. This codemod only support on object initializer as \`defaultProps\`.`,
    )
  }

  const defaultPropsNames = defaultPropsPropertiesNodePath.map((prop) => prop.node.key.name)
  const defaultPropsValues = defaultPropsPropertiesNodePath.map((prop) => prop.node.value)

  const componentCol = root
    .find(j.VariableDeclarator, { id: { name: componentName } }) // returns a jscodeshift Collection
    .find(j.ArrowFunctionExpression)
  if (componentCol.length <= 0) {
    process.stdout.write(
      'Class components will continue to support defaultProps on React 19 since there is no ES6 alternative. Please consider using static defaultProps to remove this alert.\n',
    )
    return null // skip transform
  }

  const componentPropsObjectPropertiesNodePath = componentCol
    .at(0) // returns the 1st ast-types NodePath, with name 'init', or 0 for the argument (assuming there is only one ObjectPattern in the params, so no: ({ a }, { b }) => {...}) of a forwardRef CallExpression
    .get('params', 0, 'properties') // returns an ast-types NodePath

  // if defaultProps are defined but used via the rest operator in the props, they will be discarded!

  const componentPropsNames = componentPropsObjectPropertiesNodePath.map((prop) =>
    prop.node.type === 'RestElement' ? 'rest' : prop.node.key.name,
  )

  let index = -1
  componentPropsObjectPropertiesNodePath.each((pathProperty) => {
    index++
    const pathPropValue = pathProperty.get('value')
    const indexDefault = defaultPropsNames.indexOf(componentPropsNames[index])
    if (indexDefault >= 0) {
      // if a prop has defaults defined both in the FC params and defaultProps, the latter wins
      if (pathPropValue.node.type === 'AssignmentPattern' && pathPropValue.node.right) {
        pathPropValue.get('right').replace(defaultPropsValues[indexDefault])
      } else {
        const newValue = j.assignmentPattern(
          // left
          j.identifier(componentPropsNames[index]),
          // right
          defaultPropsValues[indexDefault],
        )
        pathPropValue.replace(newValue)
      }
    }
  })

  root
    .find(j.AssignmentExpression, {
      left: {
        object: { name: componentName },
        property: { name: 'defaultProps' },
      },
    })
    .remove()

  return root.toSource(printOptions)
}
