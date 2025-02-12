import React from 'react';
import classes from './Button.module.css';
import { BaseButton } from '../';

const Button = ({
  variant = 'default',
  elevated,
  invisible,
  active,
  ...props
}) => (
  <BaseButton {...props} data-elevated={elevated} data-invisible={invisible} data-variant={variant} data-active={active} className={classes.Button} />
)

export default Button;
