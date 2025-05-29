import React from 'react';

export const Dialog = ({ children, open, onOpenChange, ...props }) => open ? <div {...props}>{children}</div> : null;
export const DialogTrigger = ({ children, ...props }) => <div {...props}>{children}</div>; // Usually wraps the trigger element
export const DialogContent = ({ children, ...props }) => <div {...props}>{children}</div>;
export const DialogHeader = ({ children, ...props }) => <div {...props}>{children}</div>;
export const DialogTitle = ({ children, ...props }) => <h2 {...props}>{children}</h2>;
