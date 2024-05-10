import React, { forwardRef } from 'react'

const MyInput = forwardRef(({ prop1, prop2, prop3 }, ref) => {
  return null
})

MyInput.displayName = 'MyInput'

MyInput.defaultProps = {
  prop1: 'foo',
  prop3: { bar: 'bar' },
}

export default MyInput
