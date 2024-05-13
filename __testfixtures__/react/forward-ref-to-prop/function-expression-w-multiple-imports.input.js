import { forwardRef, useState } from 'react';

const C = forwardRef(function MyInput(props, ref) {
  return <input ref={ref} onChange={props.onChange} />;
});
