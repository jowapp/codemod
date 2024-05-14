import { useState } from 'react';

const C = function MyInput(
  {
    ref,
    ...props
  }
) {
  return <input ref={ref} onChange={props.onChange} />;
};
