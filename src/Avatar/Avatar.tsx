import React, { forwardRef, ReactNode } from 'react';
import classes from './Avatar.module.css';
import BaseButton from '../BaseButton';

interface AvatarProps {
  children?: ReactNode;
  className?: string;
  [key: string]: any; // Allow other props
}

const COLORS = ['green', 'brown', 'orange', 'purple', 'blue'];

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(({ className, children, ...props }, forwardedRef) => {
  let stringVariantColor = 'green';

  if (typeof children === 'string') {
    const letterInAlphabet = children.toUpperCase().codePointAt(0) - 65;
    if (letterInAlphabet < 8) stringVariantColor = COLORS[0];
    if (letterInAlphabet >= 8) stringVariantColor = COLORS[1];
    if (letterInAlphabet >= 13) stringVariantColor = COLORS[2];
    if (letterInAlphabet >= 18) stringVariantColor = COLORS[3];
    if (letterInAlphabet > 21) stringVariantColor = COLORS[4];
  }

  return (
    <BaseButton
      {...props}
      ref={forwardedRef}
      data-variant={typeof children === 'string' ? 'string' : 'image'}
      data-color={stringVariantColor}
      className={`${classes.Avatar} ${className || ''}`}
    >
      {children}
    </BaseButton>
  )
});

Avatar.displayName = 'Avatar';

export default Avatar;

export type { AvatarProps };
