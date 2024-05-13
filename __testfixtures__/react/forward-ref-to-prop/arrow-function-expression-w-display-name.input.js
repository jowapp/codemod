import { forwardRef } from 'react';

const C1 = forwardRef((props, ref) => {
  return <input ref={ref} onChange={props.onChange} />;
});

const C2 = forwardRef((props, ref) => {
  return <input ref={ref} onChange={props.onChange} />;
});

C1.displayName = 'C1';
C2.displayName = 'C2';
