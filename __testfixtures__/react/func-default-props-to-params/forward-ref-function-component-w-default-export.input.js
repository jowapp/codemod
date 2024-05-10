import React, { forwardRef } from 'react'

const C = forwardRef(({ onChange, type, value }, ref) => {
  return <input onChange={onChange} type={type} value={value} ref={ref} />
})

C.displayName = 'C'

C.defaultProps = {
  value: '',
  type: 'text',
}

export default C
