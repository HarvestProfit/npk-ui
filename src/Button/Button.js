import React from 'react';
import classes from './Button.module.css';

const Button = ({
  variant = 'default',
  icon: Icon,
  as: Component = 'button',
  children,
  ...props
}) => {

  return (
    <Component className={classes.Button} data-variant={variant} {...props}>
      {Icon && <div className={classes.ButtonIcon}>{React.isValidElement(Icon) ? Icon : <Icon />}</div>}
      <p className={classes.ButtonText}>
        {children}
      </p>
    </Component>
  )
}

export default Button;
