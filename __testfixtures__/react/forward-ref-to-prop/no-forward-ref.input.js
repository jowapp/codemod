import { useState } from 'react';

const C = (props, ref) => {
  return <input ref={ref} onChange={props.onChange} />;
};

export default C;