import React from 'react';
import classes from './Button.module.css';
import { BaseButton } from '../';

const Button = ({
  variant = 'default',
  elevated,
  invisible,
  active,
  className,
  ...props
}) => (
  <BaseButton {...props} data-elevated={elevated} data-invisible={invisible} data-variant={variant} data-active={active} className={`${classes.Button} ${className || ''}`} />
)

export default Button;
