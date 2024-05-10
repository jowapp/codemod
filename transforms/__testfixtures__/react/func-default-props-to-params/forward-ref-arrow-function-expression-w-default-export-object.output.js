import React, { forwardRef } from 'react'

const MyInput = forwardRef(({ prop1 = 'foo', prop2, prop3 = { bar: 'bar' } }, ref) => {
  return null
})

MyInput.displayName = 'MyInput'

export default MyInput
