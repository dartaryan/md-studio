import React from 'react';

export const Button = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <button ref={ref} {...props}>
      {children}
    </button>
  );
});
Button.displayName = 'Button';
