import React from 'react'

const C = ({ onChange, type = 'text', value }) => {
  return <input onChange={onChange} type={type} value={value} />
}

export default C
