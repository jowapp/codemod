import React from 'react'

const C = ({ onChange, type, value }) => {
  return <input onChange={onChange} type={type} value={value} />
}

C.defaultProps = {
  value: '',
  type: 'text',
}

export default { C }
