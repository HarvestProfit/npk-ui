import React, { createContext, ReactNode } from 'react';
import classes from './Button.module.css';

interface ButtonGroupProps {
  variant?: 'danger' | 'primary' | 'secondary'; // Add other variants as needed
  size?: 'sm' | 'md' | 'lg'; // Add other sizes as needed
  className?: string;
  children: ReactNode;
  [key: string]: any; // Allow other props
}

export const ButtonGroupContext = createContext<{ variant?: string; group?: boolean }>({});

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}) => {
  return (
    <ButtonGroupContext.Provider value={{ variant, group: true }}>
      <span {...props} data-variant={variant} data-size={size} className={`${classes.ButtonGroup} ${className || ''}`}>
        {children}    
      </span>
    </ButtonGroupContext.Provider>
  );
}

export default ButtonGroup;
export type { ButtonGroupProps };