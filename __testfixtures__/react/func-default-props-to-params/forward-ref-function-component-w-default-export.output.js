import React, { forwardRef } from 'react'

const C = forwardRef(({ onChange, type = 'text', value = '' }, ref) => {
  return <input onChange={onChange} type={type} value={value} ref={ref} />
})

C.displayName = 'C'

export default C
