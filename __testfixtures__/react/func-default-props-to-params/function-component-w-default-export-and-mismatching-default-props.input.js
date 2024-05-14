import React from 'react'

const C = ({ onChange, type, value }) => {
  return <input onChange={onChange} type={type} value={value} />
}

C.defaultProps = {
  wrongValue: '',
  wrongType: 'text',
}

export default C
