import React, { memo } from 'react'

const MyInput = ({ prop1 = 'foo', prop2, prop3 = { bar: 'bar' } }, ref) => {
  return null
}

export default memo(MyInput)
