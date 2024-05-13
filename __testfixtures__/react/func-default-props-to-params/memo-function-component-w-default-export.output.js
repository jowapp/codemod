import React, { memo } from 'react'

const C = ({ onChange, type = 'text', value = '' }) => {
  return <input onChange={onChange} type={type} value={value} />
}

export default memo(C)
