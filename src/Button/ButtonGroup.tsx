import React, { createContext, ReactNode } from 'react';
import classes from './Button.module.css';

interface ButtonGroupProps {
  variant?: 'danger' | 'primary' | 'secondary'; // Add other variants as needed
  size?: 'sm' | 'md' | 'lg'; // Add other sizes as needed
  className?: string;
  children: ReactNode;
  as?: keyof React.JSX.IntrinsicElements | React.ComponentType<any>;
  role?: string;
  [key: string]: any; // Allow other props
}

export const ButtonGroupContext = createContext<{ variant?: string; group?: boolean, role?: string }>({});

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  variant = 'default',
  size = 'md',
  className,
  children,
  as,
  role,
  ...props
}) => {
  let Component = as;
  if (role === 'nav') Component ||= 'nav'
  Component ||= 'span';

  return (
    <ButtonGroupContext.Provider value={{ variant, group: true, role, }}>
      <Component {...props} role={role} data-variant={variant} data-size={size} className={`${classes.ButtonGroup} ${className || ''}`}>
        {children}
      </Component>
    </ButtonGroupContext.Provider>
  );
}

export default ButtonGroup;
export type { ButtonGroupProps };
