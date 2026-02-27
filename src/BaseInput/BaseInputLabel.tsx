import React, { ReactNode, HTMLAttributes } from 'react';
import classes from './BaseInput.module.css';
import { nextFocusableElement } from '../utils';

const BaseInputLabel: React.FC<BaseInputLabelProps> = ({
  className = '',
  align,
  children,
  for: htmlFor,
  id,
  ...props
}) => {

  const onClick = (event) => {
    if (htmlFor) return;

    if (id) {
      const queryResult = Array.prototype.filter.call(document.querySelectorAll(`[aria-labelledby~="${id}"`), elem => elem.offsetWidth > 0 || elem.offsetHeight > 0);
      const nextElem = queryResult[0];
      nextElem?.focus();
      event.preventDefault();
    }
  }

  return (
    <label id={id} htmlFor={htmlFor} {...props} data-label-align={align} className={`${classes.CustomLabel} ${className}`} onClick={onClick}>
      <span data-component="label">{children}</span>
    </label>
  )
};

export default BaseInputLabel;


export interface BaseInputLabelProps extends HTMLAttributes<HTMLLabelElement> {
  className?: string;
  align?: 'start' | 'center' | 'end';
  for?: string,
  id?: string,
  children?: ReactNode;
  [key: string]: any; // Allow other props
}
