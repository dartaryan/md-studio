import React from 'react';

export const Textarea = React.forwardRef((props, ref) => {
  return <textarea ref={ref} {...props} />;
});
Textarea.displayName = 'Textarea';
