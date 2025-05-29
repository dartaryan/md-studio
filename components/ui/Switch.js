import React from 'react';

export const Switch = React.forwardRef(({ checked, onCheckedChange, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      ref={ref}
      checked={checked}
      onChange={(e) => onCheckedChange && onCheckedChange(e.target.checked)}
      {...props}
    />
  );
});
Switch.displayName = 'Switch';
