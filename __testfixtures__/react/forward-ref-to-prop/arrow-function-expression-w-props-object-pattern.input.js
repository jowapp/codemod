import { forwardRef } from 'react';

const C = forwardRef(function MyInput({ onChange }, ref) {
  return <input ref={ref} onChange={onChange} />;
});
