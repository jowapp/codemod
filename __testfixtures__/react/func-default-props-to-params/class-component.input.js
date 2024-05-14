import React, { Component } from 'react';

class C extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const { onChange, type, value } = this.props
    return (
      <input onChange={onChange} type={type} value={value} />
    )
  }
};

C.defaultProps = {
  value: '',
  type: 'text',
};

export default C;
