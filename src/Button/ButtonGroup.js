import React, { createContext } from 'react';
import classes from './Button.module.css';

export const ButtonGroupContext = createContext({});

const ButtonGroup = ({
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
  )
}

export default ButtonGroup;
