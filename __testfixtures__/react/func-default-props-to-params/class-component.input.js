import React from 'react';

class C extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }
};

C.defaultProps = {
  value: '',
  type: 'text',
};

export default C;
