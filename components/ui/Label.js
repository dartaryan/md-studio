import React from 'react';

export const Label = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <label ref={ref} {...props}>
      {children}
    </label>
  );
});
Label.displayName = 'Label';
