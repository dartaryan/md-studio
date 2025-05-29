import React from 'react';

export const Select = ({ children, ...props }) => <div {...props}>{children}</div>;
export const SelectTrigger = ({ children, ...props }) => <div {...props}>{children}</div>; // Often a button
export const SelectValue = ({ placeholder, ...props }) => <span {...props}>{placeholder || 'Select...'}</span>;
export const SelectContent = ({ children, ...props }) => <div {...props}>{children}</div>;
export const SelectItem = ({ children, value, ...props }) => <div data-value={value} {...props}>{children}</div>;
